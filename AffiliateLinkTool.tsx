import { useState } from 'react';
import {
  AlertCircle,
  ArrowUpLeft,
  Check,
  Copy,
  Link2,
  RotateCcw,
} from 'lucide-react';
import {
  AFFILIATE_TAG,
  AffiliateLinkResult,
  generateAmazonEgyptAffiliateUrl,
} from '../utils/amazonEgypt';

const SAMPLE_URLS = [
  {
    label: 'مثال: رابط منتج على amazon.eg',
    value: 'https://www.amazon.eg/dp/B0CHX2F5QT?ref=dlx_deals',
  },
  {
    label: 'مثال: رابط بحث على amazon.eg',
    value: 'https://www.amazon.eg/s?k=سماعات+بلوتوث',
  },
  {
    label: 'مثال: رابط مرفوض (amazon.com)',
    value: 'https://www.amazon.com/dp/B0CHX2F5QT',
  },
];

export function AffiliateLinkTool() {
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState<AffiliateLinkResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (rawValue: string) => {
    setCopied(false);
    setResult(generateAmazonEgyptAffiliateUrl(rawValue));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGenerate(inputUrl);
  };

  const handleCopy = async () => {
    if (!result?.affiliateUrl) return;
    try {
      await navigator.clipboard.writeText(result.affiliateUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy method when clipboard permissions are restricted
      const textarea = document.createElement('textarea');
      textarea.value = result.affiliateUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setInputUrl('');
    setResult(null);
    setCopied(false);
  };

  const getLinkTypeArabic = (type?: AffiliateLinkResult['linkType']) => {
    switch (type) {
      case 'product':
        return 'رابط صفحة منتج';
      case 'search':
        return 'رابط نتائج بحث';
      case 'category':
        return 'رابط قسم تسوق';
      default:
        return 'رابط صفحة أمازون مصر';
    }
  };

  return (
    <section id="link-tool" className="py-14 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Explanation Column */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
              أداة تحويل الروابط
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 [text-wrap:balance]">
              مولد روابط التسوق بالعمولة لأمازون مصر
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              الصق أي رابط منتج أو بحث من{' '}
              <span className="font-semibold text-slate-900">amazon.eg</span> لتحويله
              فوراً إلى رابط شراكة جاهز يحمل المعرف الخاص بك{' '}
              <code
                className="font-mono text-xs sm:text-sm bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200"
                dir="ltr"
              >
                {AFFILIATE_TAG}
              </code>
              .
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 border-t border-slate-200 pt-5">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>يتحقق تلقائياً من أن الرابط يتبع نطاق أمازون مصر (amazon.eg) فقط.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>يرفض روابط المتاجر الأخرى مثل amazon.com أو amazon.ae لحماية العمولات.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>ينظف معاملات التتبع الزائدة ويثبت وسم الشراكة shoshan09-21.</span>
              </div>
            </div>
          </div>

          {/* Interactive Tool Card */}
          <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-2xl p-5 sm:p-7">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="affiliate-url-input"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  رابط أمازون مصر (Product أو Search URL)
                </label>
                <div className="relative">
                  <Link2
                    className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="affiliate-url-input"
                    type="text"
                    dir="ltr"
                    value={inputUrl}
                    onChange={(e) => {
                      setInputUrl(e.target.value);
                      if (result) setResult(null);
                      if (copied) setCopied(false);
                    }}
                    placeholder="https://www.amazon.eg/dp/..."
                    className="w-full h-12 ps-10 pe-4 rounded-xl bg-white border border-slate-300 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {SAMPLE_URLS.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => {
                      setInputUrl(sample.value);
                      handleGenerate(sample.value);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
                >
                  إنشاء رابط الشراكة
                </button>
                {(inputUrl || result) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>مسح</span>
                  </button>
                )}
              </div>
            </form>

            {/* Validation Error State */}
            {result && !result.ok && (
              <div
                role="alert"
                className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-900"
              >
                <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold">تعذر إنشاء الرابط</p>
                  <p className="mt-0.5 text-red-800">{result.error}</p>
                </div>
              </div>
            )}

            {/* Generated Success State */}
            {result?.ok && result.affiliateUrl && (
              <div className="mt-5 p-4 sm:p-5 rounded-xl bg-white border border-emerald-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    <span>رابط أمازون مصر جاهز ومعتمد</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>{getLinkTypeArabic(result.linkType)}</span>
                    {result.asin && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono" dir="ltr">
                          ASIN: {result.asin}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div
                  dir="ltr"
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 break-all select-all"
                >
                  {result.affiliateUrl}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[40px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>تم النسخ للحافظة</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>نسخ الرابط</span>
                      </>
                    )}
                  </button>

                  <a
                    href={result.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors min-h-[40px]"
                  >
                    <span>فتح في أمازون مصر</span>
                    <ArrowUpLeft className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
