'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Product,
    ApiResponse,
    ProductWithSEO,
    ProductPreview,
    ProductForm,
    NothingReturned,
    Size,
    sizes,
    UnknownObject,
    Empty
} from '@/types/types';

// ✅ LITERAL TYPE EXAMPLE
// Here, we're explicitly defining the value using a string literal union type from Product.
// This helps avoid typos and ensures only valid availability strings can be used.
const defaultAvailability: Product['availabilityStatus'] = 'Out Of Stock';

// ✅ INTERSECTION TYPE
// This function takes a Product and returns a new object that combines all Product fields
// PLUS some SEO-specific fields. TypeScript enforces that the result must satisfy both types.
const addSEO = (product: Product): ProductWithSEO => ({
    ...product,
    seoTitle: `${product.title} | My Shop`,
    seoDescription: product.description.slice(0, 150),
});

// ✅ UTILITY TYPES + TUPLE SIMPLIFICATION
// This returns a simplified version of Product used for list displays.
// Pick<> extracts only the needed fields (type-safe).
const previewFromProduct = (
    product: Product
): ProductPreview => ({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    category: product.category,
    rating: product.rating,
});

const previewProductExceptIdAndMeta = (product: Product): ProductForm => {
  const { id, meta, ...formData } = product;
  return formData;
};

// ✅ SPECIAL TYPES — `void`, `never`, etc.
// Function that returns void — used to explain "nothing is returned"
// Can be used for logging, event handlers, or demo.
const doNothing = (): NothingReturned => { };
const doNever = (): Empty => {
    throw new Error("This function never returns! It's type: never");
};

// ✅ COMPONENT START
export default function ProductDetailPage() {
    const { id } = useParams(); // id comes as `string | undefined`

    // We use state with an intersection type (Product + SEO fields).
    // TypeScript enforces that whatever we put in `setProduct` must match that shape.
    const [product, setProduct] = useState<ProductWithSEO | null>(null);

    // Error state is always a string or null — simple and type-safe.
    const [error, setError] = useState<string | null>(null);

    // ✅ as const + literal union usage
    // This state uses `Size`, which comes from a `const array` like:
    // ['small', 'medium', 'large'] as const
    const [selectedSize, setSelectedSize] = useState<Size>('medium');

    useEffect(() => {
        // ✅ GENERIC + TYPE NARROWING
        // This function uses a generic API response with unknown data.
        // TypeScript will enforce us to either cast or validate shape before using.
        const fetchProduct = async (): Promise<void> => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if (!res.ok) throw new Error('Failed to fetch product');

                // try {
                //     const result1 = doNothing();
                //     console.log("✅ doNothing() returned:", result1); // Logs: undefined
                //     const result2 = doNever();
                //     console.log("✅ doNever() returned:", result2); // ❌ Never runs
                // } catch (e) {
                //     console.error("❌ Error", e);
                // }



                // We type this response loosely as unknown — a good practice for APIs.
                const data: ApiResponse<UnknownObject> = await res.json();

                // Instead of trusting the shape directly, we cast the data.
                // In real-world code, you'd validate with zod or io-ts before this step.
                const casted = data as unknown as Product;

                // ✅ Using the intersection helper to enrich product data
                setProduct(addSEO(casted));
            } catch (err: unknown) {
                // ✅ TYPE NARROWING
                // TypeScript forces us to narrow unknown to Error before accessing `.message`
                if (err instanceof Error) setError(err.message);
                else setError('Unknown error occurred');
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (error) {
        // You can’t accidentally pass non-strings here because of `useState<string | null>`
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <div className="p-4 text-gray-500">Loading...</div>;
    }

    // ✅ Using a utility type (Pick<Product, ...>) to generate a UI preview model.
    const preview: ProductPreview = previewFromProduct(product);
    // setProduct(preview);

    const omitProductFeature: ProductForm = previewProductExceptIdAndMeta(product);
    

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <img src={product.thumbnail} alt={product.title} className="w-64 mb-4" />

            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>

            <div className="mt-4 text-sm space-y-1">
                {/* ✅ TypeScript ensures all fields accessed here actually exist on the product type */}
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p><strong>Discount:</strong> {product.discountPercentage}%</p>
                <p><strong>Availability:</strong> {product.availabilityStatus}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Weight:</strong> {product.weight}g</p>
                <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                <p><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</p>

                {/* ✅ as const + Literal Union */}
                {/* Sizes can only be one of the literal values defined in the sizes array */}
                <p>
                    <strong>Size:</strong>
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`ml-2 px-2 py-1 border rounded ${selectedSize === size ? 'bg-black text-white' : ''
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </p>
            </div>

            {/* ✅ Array typing + iteration of a union type */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Reviews</h2>
                {product.reviews.length > 0 ? (
                    product.reviews.map((review, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-gray-50 border rounded">
                            <p className="font-semibold">{review.reviewerName}</p>
                            {/* Union type (number | string) means this will never crash */}
                            <p className="text-yellow-600">Rating: {review.rating}</p>
                            <p className="text-sm">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No reviews yet.</p>
                )}
            </div>
        </div>
    );
}
