import { useState } from 'react';
import { Check, Copy, Globe, Server } from 'lucide-react';

type DeployProvider = 'vercel' | 'cloudflare' | 'netlify';

const DEPLOY_PROVIDERS: Record<
  DeployProvider,
  {
    name: string;
    freeDomain: string;
    buildCommand: string;
    outputDir: string;
    steps: string[];
  }
> = {
  vercel: {
    name: 'Vercel (استضافة مجانية)',
    freeDomain: 'your-site.vercel.app',
    buildCommand: 'npm run build',
    outputDir: 'dist',
    steps: [
      'ارفع مجلد المشروع إلى حساب مجاني على GitHub.',
      'سجل الدخول في vercel.com بحساب GitHub مجاني واختر Add New Project.',
      'اختر المستودع، وسيتعرف Vercel تلقائياً على Vite بأمر البناء npm run build ومجلد dist.',
      'اضغط Deploy لتحصل فوراً على رابط مجاني ينتهي بـ vercel.app بدون الحاجة لشراء دومين.',
    ],
  },
  cloudflare: {
    name: 'Cloudflare Pages',
    freeDomain: 'your-site.pages.dev',
    buildCommand: 'npm run build',
    outputDir: 'dist',
    steps: [
      'أنشئ حساباً مجانياً على dash.cloudflare.com وانتقل إلى Workers & Pages.',
      'اربط مستودع GitHub أو ارفع مجلد dist مباشرة بعد تشغيل npm run build.',
      'حدد Build command ليكون npm run build و Build output directory ليكون dist.',
      'احفظ وانشر لتحصل على رابط مجاني وسريع عالمياً ينتهي بـ pages.dev.',
    ],
  },
  netlify: {
    name: 'Netlify Drop',
    freeDomain: 'your-site.netlify.app',
    buildCommand: 'npm run build',
    outputDir: 'dist',
    steps: [
      'نفذ الأمر npm run build محلياً لتوليد مجلد dist الجاهز للنشر.',
      'افتح app.netlify.com/drop واسحب مجلد dist مباشرة داخل المتصفح.',
      'أو اربط مستودع GitHub للنشر التلقائي مع كل تحديث بدون أي تكلفة.',
      'ستحصل على رابط مجاني وآمن (HTTPS) ينتهي بـ netlify.app فوراً.',
    ],
  },
};

const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'ابحث أو اختر دليلك المناسب',
    description:
      'استخدم شريط البحث المباشر أو تصفح الأقسام العشرة وأدلة الشراء المرتبة حسب الميزانية والاحتياج الفعلي في مصر.',
  },
  {
    number: '02',
    title: 'انتقل إلى صفحة أمازون مصر الرسمية',
    description:
      'كل رابط يفتح صفحة البحث أو المنتج مباشرة على موقع Amazon.eg الرسمي للاطلاع على الأسعار الحالية، التقييمات الحقيقية، وحالة التوافر والشحن.',
  },
  {
    number: '03',
    title: 'شفافية كاملة دون تكلفة إضافية',
    description:
      'تتم عملية الشراء والدفع بالكامل عبر أمازون مصر بضمانها المعتاد، وقد يحصل الموقع على عمولة تسويقية دون أي زيادة في السعر عليك.',
  },
];

export function HowItWorksAndDeploy() {
  const [provider, setProvider] = useState<DeployProvider>('vercel');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const currentProvider = DEPLOY_PROVIDERS[provider];

  const handleCopyBuildCommand = async () => {
    try {
      await navigator.clipboard.writeText('npm install && npm run build');
      setCopiedCmd(true);
      window.setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      setCopiedCmd(false);
    }
  };

  return (
    <>
      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-14 sm:py-16 bg-slate-50/70 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
              آلية العمل
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 [text-wrap:balance]">
              كيف يساعدك دليل تسوق مصر؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <span className="font-mono text-sm font-semibold text-emerald-700 tabular-nums">
                  {step.number}.
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 mt-2 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Deployment Guide Section */}
      <section id="deployment" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
                تشغيل واستضافة مجانية 100%
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 [text-wrap:balance]">
                دليل النشر المجاني بدون دومين مدفوع
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                الموقع مبني كتطبيق واجهة أمامية سريع وخفيف ولا يحتاج إلى مفاتيح API أو
                اشتراكات مدفوعة أو قواعد بيانات. يمكنك نشره مجاناً بالكامل والحصول على
                رابط عام مباشر.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">أمر البناء المحلي:</span>
                  <button
                    type="button"
                    onClick={handleCopyBuildCommand}
                    className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
                  >
                    {copiedCmd ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>نسخ الأمر</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  dir="ltr"
                  className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto"
                >
                  npm install &amp;&amp; npm run build
                </pre>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-2xl p-5 sm:p-7">
              <div
                role="tablist"
                aria-label="خيارات الاستضافة المجانية"
                className="flex flex-wrap gap-1.5 p-1 bg-slate-200/70 rounded-xl mb-6"
              >
                {(Object.keys(DEPLOY_PROVIDERS) as DeployProvider[]).map((key) => {
                  const active = provider === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setProvider(key)}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {DEPLOY_PROVIDERS[key].name}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">رابط مجاني متاح</p>
                    <p className="text-sm font-mono font-medium text-slate-900 truncate" dir="ltr">
                      {currentProvider.freeDomain}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
                  <Server className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">مجلد الإخراج (Output)</p>
                    <p className="text-sm font-mono font-medium text-slate-900 truncate" dir="ltr">
                      {currentProvider.outputDir} ({currentProvider.buildCommand})
                    </p>
                  </div>
                </div>
              </div>

              <ol className="space-y-3">
                {currentProvider.steps.map((stepText, idx) => (
                  <li key={stepText} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{stepText}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
