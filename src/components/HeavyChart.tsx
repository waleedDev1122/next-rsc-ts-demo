// src/components/HeavyChart.tsx
'use client';

import { useEffect, useState } from 'react';

export default function HeavyChart() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const nums = Array.from({ length: 10000 }, () => Math.random());
    setData(nums);
  }, []);

  return (
    <div>
      <h3>Heavy Client Chart</h3>
      <p>Generated {data.length} points</p>
    </div>
  );
}
