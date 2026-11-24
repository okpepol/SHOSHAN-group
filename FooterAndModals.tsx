import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { AFFILIATE_TAG } from '../utils/amazonEgypt';

type ModalTopic = 'about' | 'disclosure' | 'contact' | 'privacy' | null;

export function FooterAndModals() {
  const [activeModal, setActiveModal] = useState<ModalTopic>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const openModal = (topic: Exclude<ModalTopic, null>) => {
    setContactSent(false);
    setActiveModal(topic);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      return;
    }
    setContactSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <>
      <footer className="bg-slate-50 text-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-bold text-slate-900 mb-2">
                دليل تسوق مصر
              </p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                دليل تسوق عربي مخصص لمتسوقي أمازون مصر (Amazon.eg) للوصول السريع إلى
                الأقسام وأدلة الشراء وروابط البحث الرسمية المباشرة.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="font-semibold text-slate-900 mb-3">التصفح</p>
                <ul className="space-y-2 text-slate-600">
                  <li>
                    <a href="#categories" className="hover:text-emerald-700 transition-colors">
                      أقسام المنتجات
                    </a>
                  </li>
                  <li>
                    <a href="#guides" className="hover:text-emerald-700 transition-colors">
                      أدلة التسوق
                    </a>
                  </li>
                  <li>
                    <a href="#link-tool" className="hover:text-emerald-700 transition-colors">
                      صانع الروابط
                    </a>
                  </li>
                  <li>
                    <a href="#deployment" className="hover:text-emerald-700 transition-colors">
                      النشر المجاني
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-3">عن الموقع</p>
                <ul className="space-y-2 text-slate-600">
                  <li>
                    <button
                      type="button"
                      onClick={() => openModal('about')}
                      className="hover:text-emerald-700 transition-colors cursor-pointer text-start"
                    >
                      من نحن
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openModal('disclosure')}
                      className="hover:text-emerald-700 transition-colors cursor-pointer text-start"
                    >
                      إفصاح الشراكة
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openModal('contact')}
                      className="hover:text-emerald-700 transition-colors cursor-pointer text-start"
                    >
                      تواصل معنا
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openModal('privacy')}
                      className="hover:text-emerald-700 transition-colors cursor-pointer text-start"
                    >
                      سياسة الخصوصية
                    </button>
                  </li>
                </ul>
              </div>

              <div className="col-span-2">
                <p className="font-semibold text-slate-900 mb-3">إفصاح التسويق بالعمولة</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
                  هذا الموقع قد يحصل على عمولة عند شراء منتجات من خلال الروابط الموجودة فيه،
                  دون تكلفة إضافية عليك.
                </p>
                <p className="text-xs font-medium text-slate-500" dir="ltr">
                  As an Amazon Associate I earn from qualifying purchases.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} دليل تسوق مصر — مخصص لمتسوقي Amazon.eg</p>
            <p dir="ltr" className="font-mono">
              Amazon.eg Affiliate ID: {AFFILIATE_TAG}
            </p>
          </div>
        </div>
      </footer>

      {/* Policy & Contact Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px]"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <h3 id="modal-title" className="font-display text-xl font-bold text-slate-900">
                {activeModal === 'about' && 'من نحن'}
                {activeModal === 'disclosure' && 'إفصاح الشراكة والتسويق بالعمولة'}
                {activeModal === 'contact' && 'تواصل معنا'}
                {activeModal === 'privacy' && 'سياسة الخصوصية'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="إغلاق النافذة"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="pt-5 text-sm text-slate-600 leading-relaxed space-y-4">
              {activeModal === 'about' && (
                <>
                  <p>
                    «دليل تسوق مصر» منصة إلكترونية عربية تهدف إلى تسهيل اكتشاف المنتجات على
                    موقع أمازون مصر (Amazon.eg) عبر تقسيم واضح للفئات وأدلة شراء منظمة
                    ومحرك بحث مباشر.
                  </p>
                  <p>
                    نلتزم بالشفافية الكاملة: لا نعرض أسعاراً تقديرية أو تقييمات مختلقة، بل
                    نوفر روابط بحث مباشرة إلى أمازون مصر لتشاهد السعر الفعلي والتوافر
                    اللحظي من المصدر الرسمي.
                  </p>
                </>
              )}

              {activeModal === 'disclosure' && (
                <>
                  <p className="font-medium text-slate-900">
                    هذا الموقع قد يحصل على عمولة عند شراء منتجات من خلال الروابط الموجودة
                    فيه، دون تكلفة إضافية عليك.
                  </p>
                  <p dir="ltr" className="font-mono text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                    As an Amazon Associate I earn from qualifying purchases. (Tag: {AFFILIATE_TAG})
                  </p>
                  <p>
                    تُوجّه جميع روابط التسوق حصرياً إلى موقع أمازون مصر الرسمي (amazon.eg)
                    لمساعدة المتسوقين داخل مصر.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    يعمل هذا الموقع بشكل مباشر وخفيف في المتصفح ولا يطلب إنشاء حسابات أو
                    تخزين بيانات بطاقات الدفع أو معلومات الشحن.
                  </p>
                  <p>
                    عند النقر على أي رابط بحث أو منتج، يتم توجيهك إلى موقع أمازون مصر
                    (amazon.eg) حيث تخضع تجربتك الشرائية لسياسة الخصوصية وشروط الاستخدام
                    الخاصة بأمازون مصر.
                  </p>
                </>
              )}

              {activeModal === 'contact' && (
                <>
                  {contactSent ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold">تم تسجيل رسالتك بنجاح</p>
                        <p className="text-xs text-emerald-800 mt-1">
                          شكراً لتواصلك مع فريق دليل تسوق مصر. سنراجع اقتراحك في أقرب وقت.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-800 mb-1">
                          الاسم
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="اكتب اسمك"
                          className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-800 mb-1">
                          البريد الإلكتروني
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          dir="ltr"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-800 mb-1">
                          الرسالة أو الاقتراح
                        </label>
                        <textarea
                          id="contact-message"
                          rows={3}
                          required
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="كيف يمكننا مساعدتك أو تحسين أدلة التسوق؟"
                          className="w-full p-3 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full h-11 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                      >
                        إرسال الرسالة
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
