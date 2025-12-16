import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AirVent, Sparkles, Bug, Phone, CheckCircle2, Shield, Clock, Award, MessageCircle, MapPin, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { getRecentBlogPosts } from "@/data/blogPosts";

const Index = () => {
  // Structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "مؤسسة المسعري",
    "alternateName": "Al-Msary Establishment",
    "url": "https://www.almsary.com",
    "logo": "https://www.almsary.com/logo.png",
    "description": "مؤسسة سعودية متخصصة في خدمات التكييف والتنظيف ومكافحة الحشرات في الرياض",
    "telephone": "+966530016390",
    "email": "info@almsary.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "حي النسيم الغربي، شارع حمد بن فريد",
      "addressLocality": "الرياض",
      "addressRegion": "الرياض",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7136",
      "longitude": "46.6753"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966530016390",
      "contactType": "customer service",
      "areaServed": "SA",
      "availableLanguage": "Arabic"
    },
    "sameAs": [
      "https://wa.me/966530016390"
    ]
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "مؤسسة المسعري",
    "image": "https://www.almsary.com/logo.png",
    "@id": "https://www.almsary.com",
    "url": "https://www.almsary.com",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "08:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    }
  };

  // Service Schema for all services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "خدمات التكييف والتبريد",
        "description": "تركيب وصيانة وإصلاح أنظمة التكييف المركزي والمنفصل",
        "provider": {
          "@type": "Organization",
          "name": "مؤسسة المسعري"
        },
        "areaServed": {
          "@type": "City",
          "name": "الرياض"
        },
        "serviceType": "HVAC Service"
      },
      {
        "@type": "Service",
        "name": "خدمات التنظيف",
        "description": "تنظيف شامل للمنازل والمكاتب والمباني التجارية",
        "provider": {
          "@type": "Organization",
          "name": "مؤسسة المسعري"
        },
        "areaServed": {
          "@type": "City",
          "name": "الرياض"
        },
        "serviceType": "Cleaning Service"
      },
      {
        "@type": "Service",
        "name": "مكافحة الحشرات والتعقيم",
        "description": "حلول متخصصة للقضاء على الحشرات والآفات مع برامج وقائية",
        "provider": {
          "@type": "Organization",
          "name": "مؤسسة المسعري"
        },
        "areaServed": {
          "@type": "City",
          "name": "الرياض"
        },
        "serviceType": "Pest Control Service"
      }
    ]
  };

  const services = [
    {
      icon: Sparkles,
      slug: "cleaning",
      title: "خدمات التنظيف",
      description: "تنظيف شامل للمنازل والمكاتب والمباني التجارية مع استخدام مواد صديقة للبيئة ومعدات حديثة",
      features: ["تنظيف عميق", "تعقيم شامل", "تنظيف السجاد", "خدمة ما بعد البناء"],
      gradient: "from-secondary to-secondary-light",
    },
    {
      icon: Bug,
      slug: "pest-control",
      title: "مكافحة الحشرات والتعقيم",
      description: "حلول متخصصة للقضاء على الحشرات والآفات مع برامج وقائية طويلة الأمد وتعقيم آمن",
      features: ["رش وقائي", "مكافحة شاملة", "مواد آمنة", "ضمان الخدمة"],
      gradient: "from-accent to-orange-500",
    },
    {
      icon: AirVent,
      slug: "ac-and-cooling",
      title: "خدمات التكييف والتبريد",
      description: "تركيب وصيانة وإصلاح أنظمة التكييف المركزي والمنفصل بأحدث التقنيات وأعلى معايير الجودة",
      features: ["تركيب احترافي", "صيانة دورية", "إصلاح سريع", "كفاءة الطاقة"],
      gradient: "from-primary to-primary-light",
    },
  ];

  const coverageSegments = [
    "المنازل السكنية",
    "الفلل",
    "المكاتب",
    "الشركات",
    "المساجد",
    "الخزانات",
  ];

  const features = [
    { icon: Shield, title: "جودة مضمونة", description: "نلتزم بأعلى معايير الجودة في كل خدمة نقدمها" },
    { icon: Clock, title: "استجابة سريعة", description: "فريق عمل جاهز للوصول إليكم في أسرع وقت ممكن" },
    { icon: Award, title: "خبرة سعودية", description: "خبرة محلية عميقة في سوق المملكة العربية السعودية" },
    { icon: CheckCircle2, title: "أسعار منافسة", description: "أفضل الأسعار مع الشفافية الكاملة في التكلفة" },
  ];

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
        
        <title>مؤسسة المسعري - أفضل خدمات التكييف والتنظيف ومكافحة الحشرات في الرياض | خدمة 24/7</title>
        <meta name="description" content="مؤسسة المسعري الرياض - خدمات احترافية في صيانة التكييف المركزي، تنظيف المنازل والشركات، مكافحة الحشرات والتعقيم. خبرة محلية، أسعار تنافسية، خدمة سريعة لجميع أحياء الرياض. اتصل الآن: 0530016390" />
        <meta name="keywords" content="شركة تكييف الرياض, صيانة تكييف بالرياض, تنظيف منازل الرياض, مكافحة حشرات الرياض, شركة تنظيف الرياض, رش مبيدات الرياض, تكييف مركزي الرياض, تعقيم الرياض, غسيل مكيفات الرياض, تنظيف بعد البناء, النسيم, العليا, الملقا" />
        
        {/* Open Graph */}
        <meta property="og:title" content="مؤسسة المسعري - خدمات التكييف والتنظيف ومكافحة الحشرات في الرياض" />
        <meta property="og:description" content="شركة خدمات سعودية محترفة في الرياض - تكييف، تنظيف، مكافحة حشرات. خدمة 24/7 بأفضل الأسعار" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.almsary.com" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة المسعري" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مؤسسة المسعري - خدمات التكييف والتنظيف ومكافحة الحشرات" />
        <meta name="twitter:description" content="خدمات احترافية في الرياض - تكييف، تنظيف، مكافحة حشرات" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.almsary.com" />
        <meta name="geo.region" content="SA-01" />
        <meta name="geo.placename" content="الرياض" />
        <meta name="geo.position" content="24.7136;46.6753" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen" id="home">
        <Header />
        <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Desktop Two-Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Right Column - Content */}
            <div className="text-white text-center md:text-right order-1 md:order-1">
              <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
                <span className="text-sm font-medium flex items-center gap-2 justify-center md:justify-start">
                  <Shield className="w-4 h-4" />
                  مؤسسة سعودية معتمدة في الرياض
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in">
                أفضل خدمات التكييف والتنظيف
                <br />
                <span className="text-accent">ومكافحة الحشرات في الرياض</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 leading-relaxed animate-fade-in">
                مؤسسة المسعري متخصصة في تقديم خدمات احترافية متكاملة لسكان الرياض منذ سنوات. نوفر حلول صيانة التكييف المركزي والمنفصل، التنظيف العميق للمنازل والشركات، ومكافحة جميع أنواع الحشرات بأحدث التقنيات وأفضل الأسعار.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8 text-sm animate-fade-in">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>خدمة 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>فريق محترف</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>أسعار تنافسية</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in">
                <a href="tel:+966530016390" className="w-full sm:w-auto" dir="ltr">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover:scale-105 text-lg px-10 py-7 shadow-strong transition-spring">
                    <Phone className="ml-2 h-5 w-5" />
                    <span dir="rtl">اتصل الآن للحجز</span>
                  </Button>
                </a>
                <a href="https://wa.me/966530016390" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" dir="ltr">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary-light hover:scale-105 text-white border-0 text-lg px-10 py-7 shadow-strong transition-spring">
                    <MessageCircle className="ml-2 h-5 w-5" />
                    <span dir="rtl">واتساب</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Left Column - Stats & Trust Elements */}
            <div className="order-2 md:order-2 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                {/* Stats Cards */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-smooth">
                  <CardContent className="p-6 text-center text-white">
                    <div className="text-4xl font-bold mb-2 text-accent">500+</div>
                    <div className="text-sm opacity-90">عميل راضٍ</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-smooth">
                  <CardContent className="p-6 text-center text-white">
                    <div className="text-4xl font-bold mb-2 text-accent">5+</div>
                    <div className="text-sm opacity-90">سنوات خبرة</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-smooth">
                  <CardContent className="p-6 text-center text-white">
                    <div className="text-4xl font-bold mb-2 text-accent">24/7</div>
                    <div className="text-sm opacity-90">خدمة متواصلة</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-smooth">
                  <CardContent className="p-6 text-center text-white">
                    <div className="text-4xl font-bold mb-2 text-accent">100%</div>
                    <div className="text-sm opacity-90">ضمان الجودة</div>
                  </CardContent>
                </Card>
              </div>

              {/* Trust Badge */}
              <Card className="mt-6 bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-lg">خدمات معتمدة في الرياض</h3>
                      <p className="text-sm opacity-90 leading-relaxed">
                        نخدم جميع أحياء الرياض: النسيم، العليا، الملقا، الصحافة، الياسمين، والمزيد
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Keywords for SEO */}
          <div className="hidden">
            شركة تكييف بالرياض، صيانة تكييف الرياض، تنظيف منازل الرياض، مكافحة حشرات الرياض، 
            شركة تنظيف بالرياض، رش مبيدات الرياض، تكييف مركزي الرياض، تعقيم منازل الرياض
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-smooth text-center"
                >
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">خدماتنا المتميزة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              نقدم مجموعة شاملة من الخدمات الاحترافية بأعلى معايير الجودة لعملائنا في الرياض والمناطق المجاورة
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {coverageSegments.map((segment) => (
                <span
                  key={segment}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  نخدم {segment}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} to={`/services/${service.slug}`}>
                  <Card className="overflow-hidden hover:shadow-strong transition-spring border-none shadow-medium group cursor-pointer h-full">
                    <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-spring`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        <span>اعرف المزيد</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </div>
            
            <Card className="shadow-medium border-none">
              <CardContent className="p-8 md:p-12">
                <p className="text-lg leading-relaxed text-foreground mb-6">
                  <strong className="text-primary">مؤسسة المسعري</strong> هي شركة خدمات سعودية محترفة مقرها الرياض، متخصصة في 
                  <strong> خدمات التكييف والتبريد</strong>، <strong>التنظيف السكني والتجاري</strong>، و
                  <strong> مكافحة الحشرات والتعقيم</strong>.
                </p>
                <p className="text-lg leading-relaxed text-foreground mb-6">
                  بخبرة محلية عميقة، نقدم حلولاً عالية الجودة وموثوقة وبأسعار تنافسية للمنازل والمكاتب والمنشآت التجارية، 
                  لضمان الراحة والنظافة والبيئة الصحية لجميع عملائنا.
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  رسالتنا هي تقديم <strong>خدمات موثوقة وسريعة واحترافية</strong> تفوق توقعات العملاء - من خلال الجمع بين 
                  المعدات الحديثة والفنيين المدربين والعناية الممتازة بالعملاء.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">أحدث المقالات</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نصائح وإرشادات مفيدة من خبرائنا في التكييف والتنظيف ومكافحة الحشرات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {getRecentBlogPosts(3).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card
                  className="overflow-hidden hover:shadow-strong transition-spring border-none shadow-medium group cursor-pointer h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-spring"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-smooth">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Button variant="outline" className="w-full group/btn">
                      اقرأ المزيد
                      <ArrowRight className="mr-2 h-4 w-4 group-hover/btn:-translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button size="lg" className="bg-primary hover:bg-primary-light">
                عرض جميع المقالات
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h2>
              <p className="text-xl text-muted-foreground">
                نحن هنا لخدمتك على مدار الساعة. تواصل معنا الآن
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Contact Form */}
              <ContactForm />

              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="shadow-medium border-none">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">اتصل بنا</h3>
                    <div className="space-y-2">
                      <a
                        href="tel:+966530016390"
                        dir="ltr"
                        className="block text-lg text-primary hover:text-primary-light transition-smooth font-medium"
                      >
                        +966 530016390
                      </a>
                      <a
                        href="tel:+966509289812"
                        dir="ltr"
                        className="block text-lg text-primary hover:text-primary-light transition-smooth font-medium"
                      >
                        +966 509289812
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-none">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">واتساب مباشر</h3>
                    <a
                      href="https://wa.me/966530016390"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button size="lg" className="bg-secondary hover:bg-secondary-light">
                        راسلنا على واتساب
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-none">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-right">
                        <h3 className="text-xl font-bold mb-2">عنواننا</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          حي النسيم الغربي، شارع حمد بن فريد<br />
                          الرياض، المملكة العربية السعودية
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          ساعات العمل: 8:00 ص - 10:00 م (السبت-الخميس)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
