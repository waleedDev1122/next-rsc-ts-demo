// src/components/ClientOnlyClock.tsx
'use client';
import { useState, useEffect } from "react";

export function ClientOnlyClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);
  return <p>Client Clock: {time}</p>;
}
