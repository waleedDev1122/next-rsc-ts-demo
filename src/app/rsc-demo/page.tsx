import { Suspense } from 'react';
import { Product } from '@/types/types';
import ProductList from '@/components/ProductList.server';

async function getProducts(): Promise<Product[]> {
  // Add delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch('https://dummyjson.com/products?limit=10', { cache: 'no-store' });
  const data = await res.json();
  return data.products;
}


export default async function RSCDemo() {
  const productsPromise = getProducts();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">React Server Components Streaming Demo</h1>

      <Suspense fallback={<p className="text-gray-500">⏳ Loading products...</p>}>
        {/* Streaming boundary */}
        <ProductList products={await productsPromise} />
      </Suspense>
    </div>
  );
}
