'use client';
import { useState } from 'react';
import { Review } from '@/types/types';

interface Props {
  reviews: Review[];
}

export default function ReviewsToggle({ reviews }:Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setShow(!show)}
        className="text-sm text-blue-500 underline"
      >
        {show ? 'Hide Reviews' : 'Show Reviews'}
      </button>
      {show && (
        <ul className="text-xs text-gray-600 mt-2 space-y-1">
          {reviews.map((r, i) => (
            <li key={i}>
              <strong>{r.reviewerName}</strong>: {r.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
