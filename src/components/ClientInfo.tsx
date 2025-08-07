'use client';

import { useEffect, useState } from 'react';

export default function ClientInfo() {
  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  return (
    <div className="text-sm text-blue-600 mt-2">
      🧠 Client-only info: {userAgent}
    </div>
  );
}
