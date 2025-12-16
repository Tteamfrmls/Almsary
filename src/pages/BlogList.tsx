import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogList = () => {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "مدونة مؤسسة المسعري",
    "description": "نصائح وإرشادات احترافية في التكييف والتنظيف ومكافحة الحشرات",
    "url": "https://www.almsary.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "مؤسسة المسعري",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.almsary.com/logo.png"
      }
    }
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
        
        <title>مدونة مؤسسة المسعري - نصائح وإرشادات في التكييف والتنظيف ومكافحة الحشرات</title>
        <meta name="description" content="مدونة مؤسسة المسعري - نصائح احترافية وإرشادات عملية في صيانة التكييف، التنظيف، ومكافحة الحشرات في الرياض من خبراء سعوديين" />
        <meta name="keywords" content="مدونة تكييف, نصائح تنظيف, مكافحة حشرات, صيانة مكيفات, تنظيف منازل الرياض" />
        
        <meta property="og:title" content="مدونة مؤسسة المسعري - نصائح التكييف والتنظيف" />
        <meta property="og:description" content="نصائح احترافية وإرشادات عملية من خبراء مؤسسة المسعري" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.almsary.com/blog" />
        
        <link rel="canonical" href="https://www.almsary.com/blog" />
        <meta name="robots" content="index, follow" />
        
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              مدونة مؤسسة المسعري
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              نصائح وإرشادات احترافية في التكييف والتنظيف ومكافحة الحشرات
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-smooth">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
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
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogList;
