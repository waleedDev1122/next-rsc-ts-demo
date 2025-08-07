import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/types';

export default async function SSRDemo() {
  const res = await fetch('https://dummyjson.com/products?limit=10', {
    cache: 'no-store',
  });
  const data = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Server Side Rendered</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.products.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
