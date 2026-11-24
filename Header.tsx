import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';

interface HeaderProps {
  onFocusSearch: () => void;
}

const NAV_LINKS = [
  { href: '#categories', label: 'الأقسام' },
  { href: '#guides', label: 'أدلة التسوق' },
  { href: '#link-tool', label: 'صانع الروابط' },
  { href: '#how-it-works', label: 'كيف نعمل' },
  { href: '#deployment', label: 'النشر المجاني' },
];

export function Header({ onFocusSearch }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded"
        >
          دليل تسوق مصر
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-700 hover:underline underline-offset-8 decoration-emerald-600/60 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onFocusSearch}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>ابحث في أمازون مصر</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="قائمة الجوال"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
