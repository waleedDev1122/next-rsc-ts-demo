'use client';

import { Product } from '@/types/types';
import ClientInfo from './ClientInfo';
import Link from 'next/link';
import Image from 'next/image';

const statusConfig = {
  'In Stock': { color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  'Low Stock': { color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  'Out Of Stock': { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
} as const;

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={
              i < full
                ? 'text-yellow-400'
                : i === full && partial >= 0.5
                ? 'text-yellow-300'
                : 'text-gray-300'
            }
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => {
        const status = statusConfig[p.availabilityStatus] ?? statusConfig['In Stock'];
        const originalPrice = p.discountPercentage > 0
          ? (p.price / (1 - p.discountPercentage / 100))
          : null;

        return (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
          >
            {/* Product image */}
            <div className="relative h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src={p.thumbnail}
                alt={p.title}
                fill
                className="object-contain p-3"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {p.discountPercentage > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{Math.round(p.discountPercentage)}%
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2">
              {/* Title + availability */}
              <div className="flex items-start justify-between gap-2">
                <Link href={`/products/${p.id}`}>
                  <h2 className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors leading-tight">
                    {p.title}
                  </h2>
                </Link>
                <span className={`shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {p.availabilityStatus}
                </span>
              </div>

              {/* Brand + Category */}
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {p.brand} · {p.category}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2 flex-1">{p.description}</p>

              {/* Rating */}
              <StarRating rating={p.rating} />

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">${p.price.toFixed(2)}</span>
                {originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Tags */}
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{p.tags.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Footer: stock + SKU */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
                <span>Stock: <strong className="text-gray-600">{p.stock}</strong></span>
                <span>SKU: <strong className="text-gray-600">{p.sku}</strong></span>
                <span>MOQ: <strong className="text-gray-600">{p.minimumOrderQuantity}</strong></span>
              </div>

              <ClientInfo />
            </div>
          </div>
        );
      })}
    </div>
  );
}
