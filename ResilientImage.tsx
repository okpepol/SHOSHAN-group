import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/40 to-slate-100 text-slate-600 p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3 text-emerald-700">
          <ShoppingBag className="w-6 h-6" aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-slate-700">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
