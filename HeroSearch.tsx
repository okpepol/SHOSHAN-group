import { RefObject, useState } from 'react';
import { ArrowUpLeft, Search } from 'lucide-react';
import { FEATURED_SEARCH_SUGGESTIONS, SEARCH_SCOPE_OPTIONS } from '../data/catalog';
import { AFFILIATE_TAG, buildAmazonEgyptSearchUrl } from '../utils/amazonEgypt';
import { ResilientImage } from './ResilientImage';

interface HeroSearchProps {
  searchInputRef: RefObject<HTMLInputElement | null>;
}

export function HeroSearch({ searchInputRef }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('aps');
  const [validationMessage, setValidationMessage] = useState('');

  const trimmedQuery = query.trim();
  const previewUrl = trimmedQuery
    ? buildAmazonEgyptSearchUrl(trimmedQuery, scope)
    : '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!trimmedQuery) {
      e.preventDefault();
      setValidationMessage('اكتب اسم المنتج أو الفئة التي تبحث عنها أولاً.');
      searchInputRef.current?.focus();
      return;
    }
    setValidationMessage('');
  };

  return (
    <section
      id="top"
      className="bg-gradient-to-b from-slate-50/70 to-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Content & Search Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-800 mb-3">
              <span>بوابة التسوق المصرية</span>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              <span className="text-slate-600">نتائج مباشرة من Amazon.eg</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight mb-4 [text-wrap:balance]">
              اكتشف منتجات أمازون مصر بوضوح، وانتقل مباشرة لنتائج البحث الرسمية
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-7">
              منصة عربية صُممت لمساعدة المتسوقين في مصر على الوصول السريع للأقسام، أدلة
              الشراء حسب الميزانية، والبحث المباشر داخل{' '}
              <span className="font-semibold text-slate-900">Amazon.eg</span> دون أسعار
              وهمية أو بيانات مضللة.
            </p>

            {/* Functional Search Form targeting Amazon Egypt */}
            <form
              action="https://www.amazon.eg/s"
              method="GET"
              target="_blank"
              rel="noopener noreferrer"
              onSubmit={handleSubmit}
              className="bg-white border border-slate-300 rounded-xl p-2 shadow-sm focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/15 transition-all"
            >
              <input type="hidden" name="tag" value={AFFILIATE_TAG} />
              {scope !== 'aps' && <input type="hidden" name="i" value={scope} />}

              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="sm:w-44 shrink-0">
                  <label htmlFor="hero-search-scope" className="sr-only">
                    نطاق القسم
                  </label>
                  <select
                    id="hero-search-scope"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full h-12 px-3 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-700 cursor-pointer"
                  >
                    {SEARCH_SCOPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex-1 flex items-center">
                  <label htmlFor="hero-search-input" className="sr-only">
                    ابحث في أمازون مصر
                  </label>
                  <Search
                    className="w-5 h-5 text-slate-400 absolute start-3.5 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    id="hero-search-input"
                    name="k"
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (validationMessage) setValidationMessage('');
                    }}
                    placeholder="ابحث عن هاتف، قلاية هوائية، لابتوب، أو أي منتج..."
                    className="w-full h-12 ps-11 pe-3 rounded-lg text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <span>ابحث في أمازون مصر</span>
                  <ArrowUpLeft className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {validationMessage && (
              <p role="alert" className="mt-2 text-xs sm:text-sm text-amber-800 font-medium">
                {validationMessage}
              </p>
            )}

            {previewUrl && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-xs">
                <span className="text-emerald-900 font-medium">
                  رابط البحث المباشر الجاهز:
                </span>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-800 hover:underline truncate max-w-full sm:max-w-md"
                  dir="ltr"
                >
                  {previewUrl}
                </a>
              </div>
            )}

            {/* Featured Search Suggestions */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-500 mb-2.5">
                عمليات بحث شائعة في مصر:
              </p>
              <div className="flex flex-wrap gap-2">
                {FEATURED_SEARCH_SUGGESTIONS.map((item) => (
                  <a
                    key={item.query}
                    href={buildAmazonEgyptSearchUrl(item.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 hover:border-emerald-600 hover:text-emerald-800 hover:bg-emerald-50/40 transition-colors whitespace-nowrap"
                  >
                    <span>{item.label}</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Showcase Media Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[260px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <ResilientImage
                src="/src/assets/images/hero_egypt_shopping_1795543532954.jpg"
                alt="تشكيلة منتجات تقنية ومنزلية عصرية متاحة للاستكشاف على أمازون مصر"
                fallbackTitle="اكتشف منتجات أمازون مصر"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Clear Affiliate Disclosure Banner (Arabic + English) */}
        <div
          aria-label="إفصاح الشراكة والتسويق بالعمولة"
          className="mt-8 pt-5 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs sm:text-sm text-slate-600"
        >
          <p>
            هذا الموقع قد يحصل على عمولة عند شراء منتجات من خلال الروابط الموجودة فيه، دون
            تكلفة إضافية عليك.
          </p>
          <p className="text-slate-500 font-medium shrink-0" dir="ltr">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </section>
  );
}
