'use client';

import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList.client';
import { Product, Category } from '@/types/types';

export default function CSRDemo() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://dummyjson.com/products?limit=10');
      const data = await res.json();

      const mapped: Product[] = data.products.map((product: Product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category as Category,
        tags: product.tags || [], // fallback if not available
        sku: product.sku || 'N/A',
        weight: product.weight || 0,
        dimensions: product.dimensions || { width: 0, height: 0, depth: 0 },
        warrantyInformation: product.warrantyInformation || 'No warranty',
        shippingInformation: product.shippingInformation || 'Standard shipping',
        availabilityStatus: product.availabilityStatus || 'In Stock',
        reviews: product.reviews || [],
        returnPolicy: product.returnPolicy || 'Not specified',
        minimumOrderQuantity: product.minimumOrderQuantity || 1,
        meta: product.meta || {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          barcode: 'UNKNOWN',
          qrCode: ''
        },
        images: product.images || [],
        thumbnail: product.thumbnail,
      }));

      setProducts(mapped);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products Listing</h1>
      <ProductList products={products} />
    </div>
  );
}
