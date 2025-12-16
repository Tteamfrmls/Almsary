import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <>
      <Helmet>
        {/* Favicon for all browsers and Google Search */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        
        <title>سياسة الخصوصية - مؤسسة المسعري</title>
        <meta name="description" content="سياسة الخصوصية لمؤسسة المسعري - نلتزم بحماية خصوصية بيانات عملائنا ومعلوماتهم الشخصية" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.almsary.com/privacy" />
      </Helmet>

      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <WhatsAppButton />

        {/* Privacy Policy Content */}
        <section className="pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">
                سياسة الخصوصية
              </h1>
              <p className="text-muted-foreground text-center mb-12">
                آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <Card className="shadow-lg">
                <CardContent className="p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">1. مقدمة</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        مؤسسة المسعري ("نحن"، "لنا"، "مؤسستنا") تحترم خصوصية زوار موقعنا الإلكتروني وعملائنا. 
                        تشرح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها لنا.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">2. المعلومات التي نجمعها</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">2.1 المعلومات التي تقدمها لنا</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            عند استخدام خدماتنا أو التواصل معنا، قد نجمع المعلومات التالية:
                          </p>
                          <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground mr-4">
                            <li>الاسم الكامل</li>
                            <li>رقم الهاتف</li>
                            <li>عنوان البريد الإلكتروني</li>
                            <li>العنوان الفعلي</li>
                            <li>أي معلومات أخرى تختار مشاركتها معنا</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">2.2 المعلومات التي نجمعها تلقائياً</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            عند زيارة موقعنا، قد نجمع تلقائياً معلومات معينة مثل:
                          </p>
                          <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground mr-4">
                            <li>عنوان IP</li>
                            <li>نوع المتصفح ونظام التشغيل</li>
                            <li>صفحات الموقع التي تزورها</li>
                            <li>وقت وتاريخ الزيارة</li>
                            <li>مصدر الإحالة (الموقع الذي أتيت منه)</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">3. كيفية استخدام المعلومات</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        نستخدم المعلومات التي نجمعها للأغراض التالية:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                        <li>توفير وتحسين خدماتنا</li>
                        <li>الرد على استفساراتك وطلباتك</li>
                        <li>إرسال تحديثات حول خدماتنا (بموافقتك)</li>
                        <li>تحليل استخدام الموقع لتحسين تجربة المستخدم</li>
                        <li>الامتثال للالتزامات القانونية</li>
                        <li>حماية حقوقنا ومصالحنا القانونية</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">4. مشاركة المعلومات</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
                      </p>
                      <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground mr-4">
                        <li>مع موفري الخدمات الذين يساعدوننا في تشغيل موقعنا وخدماتنا (مع ضمان التزامهم بسياسة الخصوصية)</li>
                        <li>عندما يكون ذلك مطلوباً بموجب القانون أو استجابة لطلب حكومي</li>
                        <li>لحماية حقوقنا وممتلكاتنا أو حقوق وممتلكات عملائنا</li>
                        <li>في حالة الاندماج أو الاستحواذ أو بيع الأصول</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">5. حماية المعلومات</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        نتخذ إجراءات أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. 
                        ومع ذلك، لا يمكن ضمان أمان 100% لأي نقل بيانات عبر الإنترنت.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">6. ملفات تعريف الارتباط (Cookies)</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        قد نستخدم ملفات تعريف الارتباط لتتبع نشاطك على موقعنا وتحسين تجربتك. يمكنك تعطيل ملفات تعريف الارتباط 
                        من خلال إعدادات المتصفح، ولكن قد يؤثر ذلك على وظائف معينة في الموقع.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">7. حقوقك</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        لديك الحق في:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                        <li>الوصول إلى معلوماتك الشخصية</li>
                        <li>تصحيح أي معلومات غير دقيقة</li>
                        <li>طلب حذف معلوماتك الشخصية</li>
                        <li>الاعتراض على معالجة معلوماتك</li>
                        <li>طلب نقل معلوماتك</li>
                        <li>سحب موافقتك في أي وقت</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">8. روابط الطرف الثالث</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        قد يحتوي موقعنا على روابط لمواقع أخرى. نحن لسنا مسؤولين عن ممارسات الخصوصية أو محتوى هذه المواقع. 
                        ننصحك بمراجعة سياسات الخصوصية الخاصة بهم.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">9. تغييرات على سياسة الخصوصية</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنقوم بنشر أي تغييرات على هذه الصفحة وتحديث تاريخ "آخر تحديث". 
                        ننصحك بمراجعة هذه الصفحة بانتظام للبقاء على اطلاع.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold text-primary mb-4">10. الاتصال بنا</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه، يرجى الاتصال بنا:
                      </p>
                      <div className="mt-4 space-y-2 text-muted-foreground">
                        <p><strong>مؤسسة المسعري</strong></p>
                        <p>حي النسيم الغربي، شارع حمد بن فريد</p>
                        <p>الرياض، المملكة العربية السعودية</p>
                        <p>الهاتف: <a href="tel:+966530016390" className="text-primary hover:underline">+966 530016390</a></p>
                        <p>البريد الإلكتروني: <a href="mailto:info@almsary.com" className="text-primary hover:underline">info@almsary.com</a></p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;

