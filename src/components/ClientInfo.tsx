'use client';

import { useEffect, useState } from 'react';

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Unknown';
}

function parseOS(ua: string): string {
  if (/Windows NT/.test(ua)) return 'Windows';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone|iPad/.test(ua)) return 'iOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown';
}

export default function ClientInfo() {
  const [info, setInfo] = useState<{ browser: string; os: string } | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    setInfo({ browser: parseBrowser(ua), os: parseOS(ua) });
  }, []);

  if (!info) return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
        🖥 {info.os}
      </span>
      <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
        🌐 {info.browser}
      </span>
      <span className="text-xs text-gray-400 italic">client-only</span>
    </div>
  );
}
