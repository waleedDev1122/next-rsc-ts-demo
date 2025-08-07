'use client';

import { Product } from '@/types/types';
import ClientInfo from './ClientInfo';
import Link from 'next/link';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow bg-white">
          <img src={p.thumbnail} alt={p.title} className="rounded mb-4 w-36" />

          <Link href={`/products/${p.id}`}>
            <h2 className="text-lg font-semibold hover:underline">{p.title}</h2>
          </Link>
          <p className="text-sm text-gray-600 mb-2">{p.description}</p>

          <p className="text-sm">
            <strong>Brand:</strong> {p.brand} | <strong>SKU:</strong> {p.sku}
          </p>

          <p className="text-sm text-gray-700">
            <strong>Category:</strong> {p.category}
          </p>

          <p className="text-sm text-purple-700">
            ⭐ <strong>Rating:</strong> {p.rating}
          </p>

          <p className="text-sm text-green-700">
            💲<strong>Price:</strong> ${p.price.toFixed(2)}
            {p.discountPercentage > 0 && (
              <> (−{p.discountPercentage}% off)</>
            )}
          </p>

          <p className="text-sm text-orange-600">
            📦 <strong>Status:</strong> {p.availabilityStatus}
          </p>

          <p className="text-sm text-gray-700">
            🏷️ <strong>Tags:</strong> {p.tags.join(', ') || 'None'}
          </p>

          <p className="text-sm text-blue-700">
            🔢 <strong>Stock:</strong> {p.stock} units
          </p>

          <p className="text-sm text-pink-700">
            🛍️ <strong>MOQ:</strong> {p.minimumOrderQuantity}
          </p>

          <p className="text-sm text-gray-500 italic">
            {p.returnPolicy}
          </p>

          <ClientInfo />
        </div>
      ))}
    </div>
  );
}
