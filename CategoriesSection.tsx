import { useState } from 'react';
import {
  ArrowUpLeft,
  Baby,
  Dumbbell,
  Home,
  Laptop,
  Shirt,
  Smartphone,
  Sparkles,
  Tv,
  Utensils,
  Watch,
} from 'lucide-react';
import {
  CategoryGroup,
  PRODUCT_CATEGORIES,
  ShoppingCategory,
} from '../data/catalog';
import { buildAmazonEgyptSearchUrl } from '../utils/amazonEgypt';

const FILTER_TABS: Array<{ id: CategoryGroup; label: string }> = [
  { id: 'all', label: 'كل الأقسام (10)' },
  { id: 'popular', label: 'الأقسام الأكثر طلباً' },
  { id: 'tech', label: 'التقنية والإلكترونيات' },
  { id: 'lifestyle', label: 'المنزل وأسلوب الحياة' },
];

function CategoryIcon({ name }: { name: ShoppingCategory['iconName'] }) {
  const iconClass = 'w-5 h-5 text-emerald-700';
  switch (name) {
    case 'smartphone':
      return <Smartphone className={iconClass} aria-hidden="true" />;
    case 'tv':
      return <Tv className={iconClass} aria-hidden="true" />;
    case 'laptop':
      return <Laptop className={iconClass} aria-hidden="true" />;
    case 'home':
      return <Home className={iconClass} aria-hidden="true" />;
    case 'utensils':
      return <Utensils className={iconClass} aria-hidden="true" />;
    case 'shirt':
      return <Shirt className={iconClass} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={iconClass} aria-hidden="true" />;
    case 'baby':
      return <Baby className={iconClass} aria-hidden="true" />;
    case 'dumbbell':
      return <Dumbbell className={iconClass} aria-hidden="true" />;
    case 'watch':
      return <Watch className={iconClass} aria-hidden="true" />;
  }
}

export function CategoriesSection() {
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>('all');

  const visibleCategories =
    activeGroup === 'all'
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((cat) => cat.group.includes(activeGroup));

  return (
    <section id="categories" className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
              تصفح حسب القسم
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 [text-wrap:balance]">
              أقسام التسوق الرئيسية على أمازون مصر
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              اختر القسم المناسب للانتقال مباشرة إلى نتائج البحث الرسمية على{' '}
              <span className="font-medium text-slate-800">amazon.eg</span> مع التحقق التلقائي
              من توافر المنتجات والأسعار اللحظية هناك.
            </p>
          </div>

          {/* Interactive segmented filter tabs */}
          <div
            role="tablist"
            aria-label="تصفية أقسام التسوق"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl self-start lg:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveGroup(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {visibleCategories.map((category) => {
            const categoryUrl = buildAmazonEgyptSearchUrl(
              category.searchQuery,
              category.amazonIndex
            );

            return (
              <article
                key={category.id}
                className="group flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-600/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <CategoryIcon name={category.iconName} />
                    </div>
                    <span className="text-xs text-slate-400 font-medium" dir="ltr">
                      {category.englishLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {category.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="space-y-1.5">
                    {category.quickSearches.map((sub) => (
                      <a
                        key={sub.query}
                        href={buildAmazonEgyptSearchUrl(sub.query, category.amazonIndex)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs text-slate-600 hover:text-emerald-700 py-1 transition-colors"
                      >
                        <span className="truncate">{sub.label}</span>
                        <ArrowUpLeft
                          className="w-3.5 h-3.5 shrink-0 text-slate-400"
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>

                  <a
                    href={categoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 hover:border-emerald-700 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>تصفح القسم</span>
                    <ArrowUpLeft className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
