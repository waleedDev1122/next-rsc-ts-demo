import ReviewsToggle from './ReviewsToggle.client';
import { Product } from '@/types/types';

export default function ProductCard({ product }: {product: Product}) {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <span className="text-sm text-gray-500">${product.price}</span>
      </div>
      <p className="text-sm text-gray-700">{product.description}</p>
      <p className="text-xs text-green-600">{product.availabilityStatus}</p>
      <p className="text-xs text-yellow-600">Rating: {product.rating}</p>

      {/* Reviews are handled by client component */}
      <ReviewsToggle reviews={product.reviews} />
    </div>
  );
}
