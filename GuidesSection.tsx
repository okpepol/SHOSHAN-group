import { ArrowUpLeft } from 'lucide-react';
import { SHOPPING_GUIDES } from '../data/catalog';
import { buildAmazonEgyptSearchUrl } from '../utils/amazonEgypt';
import { ResilientImage } from './ResilientImage';

export function GuidesSection() {
  return (
    <section
      id="guides"
      className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            أدلة الشراء الذكي
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 [text-wrap:balance]">
            استكشف المنتجات حسب احتياجك اليومي
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            قوائم منظمة تساعدك على الوصول السريع إلى أفضل نتائج البحث داخل أمازون مصر
            دون الحاجة للبحث المتكرر أو الاعتماد على بيانات غير محدثة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SHOPPING_GUIDES.map((guide) => (
            <article
              key={guide.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                  <ResilientImage
                    src={guide.image}
                    alt={guide.imageAlt}
                    fallbackTitle={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 pb-4">
                  <p className="text-xs font-semibold text-emerald-700 mb-1.5">
                    {guide.kicker}
                  </p>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 divide-y divide-slate-100">
                {guide.items.map((item) => (
                  <a
                    key={item.query}
                    href={buildAmazonEgyptSearchUrl(item.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-3.5 first:pt-2 last:pb-0 hover:text-emerald-800 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0 whitespace-nowrap">
                      <span>بحث</span>
                      <ArrowUpLeft className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
