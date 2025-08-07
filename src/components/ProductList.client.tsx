'use client';

import { Product } from '@/types/types';
import ClientInfo from './ClientInfo'; // optional

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow bg-white">
          <h2 className="font-semibold">{p.title}</h2>
          <p className="text-sm text-gray-600">{p.description}</p>
          <p className="text-green-600 font-bold">${p.price}</p>
          <ClientInfo />
        </div>
      ))}
    </div>
  );
}
