'use client';

import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList.client';
import { Product, Category } from '@/types/types';

export default function CSRDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTime, setFetchTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const start = performance.now();
      try {
        const res = await fetch('https://dummyjson.com/products?limit=10');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
          tags: product.tags || [],
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
        setFetchTime(Math.round(performance.now() - start));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header banner */}
      <div className="bg-blue-600 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              CSR
            </span>
            <h1 className="text-2xl font-bold">Client-Side Rendering Demo</h1>
          </div>
          <p className="text-blue-100 text-sm max-w-2xl">
            This page fetches data <strong>in the browser</strong> after the initial HTML loads. The JS bundle ships first, then the browser runs the fetch — you may notice a loading state before products appear.
          </p>
          {fetchTime !== null && (
            <div className="mt-3 inline-flex items-center gap-2 bg-blue-500/50 rounded-full px-3 py-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              Data fetched in <strong>{fetchTime}ms</strong> on the client
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading && <SkeletonGrid />}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load products</h2>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && <ProductList products={products} />}
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          <div className="bg-gray-200 h-44 w-full" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="flex gap-2 mt-2">
              <div className="h-6 bg-gray-200 rounded-full w-16" />
              <div className="h-6 bg-gray-200 rounded-full w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
