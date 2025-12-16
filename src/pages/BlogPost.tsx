import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { getBlogPostBySlug, getRecentBlogPosts } from "@/data/blogPosts";
import { parseMarkdown } from "@/lib/markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentBlogPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "مؤسسة المسعري"
    },
    "publisher": {
      "@type": "Organization",
      "name": "مؤسسة المسعري",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.almsary.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.almsary.com/blog/${post.slug}`
    },
    "articleSection": post.category
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
        "name": "المدونة",
        "item": "https://www.almsary.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.almsary.com/blog/${post.slug}`
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
        
        <title>{post.title} - مدونة مؤسسة المسعري</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, صيانة تكييف, تنظيف منازل, مكافحة حشرات, الرياض`} />
        
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.almsary.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="مؤسسة المسعري" />
        <meta property="article:section" content={post.category} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        
        <link rel="canonical" href={`https://www.almsary.com/blog/${post.slug}`} />
        <meta name="robots" content="index, follow" />
        
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-8 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-medium border-none mb-12">
              <div className="relative h-64 md:h-96 overflow-hidden rounded-t-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 md:p-10">
                <div 
                  className="prose prose-lg max-w-none 
                    prose-headings:text-right prose-p:text-right prose-li:text-right 
                    prose-headings:font-bold 
                    prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-12
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-5 prose-h2:mt-10
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8
                    prose-h4:text-lg prose-h4:font-semibold prose-h4:mb-3 prose-h4:mt-6
                    prose-p:leading-relaxed prose-p:text-foreground prose-p:mb-4
                    prose-headings:text-foreground 
                    prose-strong:text-primary prose-strong:font-bold
                    prose-ul:my-4 prose-ul:space-y-2 prose-ul:pr-4
                    prose-ol:my-4 prose-ol:space-y-2 prose-ol:pr-4
                    prose-li:text-foreground prose-li:mb-2
                    prose-blockquote:border-r-4 prose-blockquote:border-primary 
                    prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:my-4 
                    prose-blockquote:bg-muted/50 prose-blockquote:italic prose-blockquote:text-muted-foreground
                    prose-a:text-primary prose-a:hover:underline
                    prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-border
                    prose-table:rounded-lg prose-table:bg-card prose-table:my-6
                    prose-th:px-4 prose-th:py-3 prose-th:border-b prose-th:border-border 
                    prose-th:text-right prose-th:font-semibold prose-th:bg-muted/50
                    prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-border 
                    prose-td:text-right
                    prose-tr:hover:bg-muted/50"
                  dangerouslySetInnerHTML={{ 
                    __html: parseMarkdown(post.content)
                  }}
                />
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="shadow-medium border-none bg-gradient-to-br from-primary to-primary-light text-white mb-12">
              <CardContent className="p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  هل تحتاج إلى خدماتنا؟
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر تنافسي
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+966530016390" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                      <Phone className="ml-2 h-5 w-5" />
                      اتصل الآن
                    </Button>
                  </a>
                  <a href="https://wa.me/966530016390" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20">
                      <MessageCircle className="ml-2 h-5 w-5" />
                      واتساب
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">مقالات ذات صلة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {recentPosts.map((recentPost) => (
                    <Card key={recentPost.id} className="overflow-hidden hover:shadow-medium transition-smooth">
                      <div className="relative h-40 overflow-hidden bg-muted">
                        <img
                          src={recentPost.image}
                          alt={recentPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2 text-sm">
                          {recentPost.title}
                        </h3>
                        <Link to={`/blog/${recentPost.slug}`}>
                          <Button variant="link" className="p-0 h-auto text-primary">
                            اقرأ المزيد
                            <ArrowRight className="mr-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full">
                    عودة إلى المدونة
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
