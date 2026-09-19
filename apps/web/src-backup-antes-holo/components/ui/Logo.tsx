'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <Link href="/" className={`flex items-center gap-4 ${className}`}>
      <div className="relative h-20 w-20 flex-shrink-0">  {/* Aumentado a h-20 (80px) */}
        {!hasError ? (
          <img
            src="/images/brand/logo.png"
            alt="BESTIGE"
            className="h-20 w-auto object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
            B
          </div>
        )}
      </div>
      {showText && (
        <span className="text-4xl font-bold text-white tracking-tight">  {/* Aumentado a text-4xl */}
          BESTIGE
          <span className="text-base text-gray-400 font-light ml-1">®</span>  {/* Aumentado a text-base */}
        </span>
      )}
    </Link>
  );
}