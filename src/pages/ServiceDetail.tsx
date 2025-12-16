import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { getServiceBySlug } from "@/data/services";
import { parseMarkdown } from "@/lib/markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">الخدمة غير موجودة</h1>
          <Link to="/">
            <Button>العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Enhanced Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "مؤسسة المسعري",
      "image": service.image,
      "telephone": "+966530016390",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "حي النسيم الغربي، شارع حمد بن فريد",
        "addressLocality": "الرياض",
        "addressRegion": "الرياض",
        "postalCode": "11564",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136,
        "longitude": 46.6753
      },
      "url": `https://www.almsary.com/services/${service.slug}`,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "500"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "الرياض"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "SAR"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://www.almsary.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "الخدمات",
        "item": "https://www.almsary.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.almsary.com/services/${service.slug}`
      }
    ]
  };

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
        
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="keywords" content={service.keywords.join(", ")} />
        
        {/* Open Graph */}
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.almsary.com/services/${service.slug}`} />
        <meta property="og:image" content={service.image} />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة المسعري" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.metaTitle} />
        <meta name="twitter:description" content={service.metaDescription} />
        <meta name="twitter:image" content={service.image} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`https://www.almsary.com/services/${service.slug}`} />
        <meta name="geo.region" content="SA-01" />
        <meta name="geo.placename" content="الرياض" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <WhatsAppButton />

        {/* Hero Section */}
        <section className="relative pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <Link to="/#services" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  العودة للخدمات
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {service.h1}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(service.intro) }} />
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="https://wa.me/966530016390" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      تواصل عبر واتساب
                    </Button>
                  </a>
                  <a href="tel:+966530016390">
                    <Button size="lg" variant="outline" className="gap-2">
                      <Phone className="w-5 h-5" />
                      اتصل الآن
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-strong">
                  <img
                    src={service.image}
                    alt={`${service.title} - مؤسسة المسعري`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Detailed Services */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-8">{service.details.title}</h2>
                <div className="grid gap-6">
                  {service.details.items.map((item, index) => (
                    <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                          <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-8">فوائد للعميل</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <Card key={index} className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          </div>
                          <p className="font-medium">{benefit}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-8">الأسئلة الشائعة</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-6 bg-card">
                      <AccordionTrigger className="text-right hover:no-underline py-4">
                        <span className="font-semibold text-lg">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 text-base">
                        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(faq.answer) }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* CTA Section */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-fade-in">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">{service.cta.title}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: parseMarkdown(service.cta.description) }} />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a href="https://wa.me/966530016390" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gap-2 w-full sm:w-auto">
                        <MessageCircle className="w-5 h-5" />
                        واتساب: 0530016390
                      </Button>
                    </a>
                    <a href="tel:+966509289812">
                      <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                        <Phone className="w-5 h-5" />
                        هاتف: 0509289812
                      </Button>
                    </a>
                  </div>
                  <div className="pt-4 text-sm text-muted-foreground space-y-1">
                    <p>العنوان: حي النسيم الغربي، شارع حمد بن فريد، الرياض</p>
                    <p>ساعات العمل: السبت - الخميس، 8:00 ص - 8:00 م</p>
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

export default ServiceDetail;
