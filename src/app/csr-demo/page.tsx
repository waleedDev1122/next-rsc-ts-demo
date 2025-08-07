'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/types';
import ProductList from '@/components/ProductList.client';

export default function CSRDemo() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=10')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Client Side Rendered</h1>
      <ProductList products={products} />
    </div>
  );
}
