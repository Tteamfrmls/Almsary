import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// TikTok Icon Component
const TikTok: LucideIcon = ({ className, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/#services" },
  { label: "من نحن", href: "/#about" },
  { label: "تواصل معنا", href: "/#contact" },
  { label: "سياسة الخصوصية", href: "/privacy" },
];

const socialLinks = [
  { 
    name: "Facebook", 
    url: "https://facebook.com/almsaryservices", 
    icon: Facebook 
  },
  { 
    name: "Instagram", 
    url: "https://instagram.com/almsaryservices", 
    icon: Instagram 
  },
  { 
    name: "TikTok", 
    url: "https://tiktok.com/@almsaryservices", 
    icon: TikTok 
  },
  { 
    name: "YouTube", 
    url: "https://youtube.com/@almsaryservices", 
    icon: Youtube 
  },
];

const footerServices = [
  { label: "خدمات التنظيف", slug: "cleaning" },
  { label: "مكافحة الحشرات والتعقيم", slug: "pest-control" },
  { label: "خدمات التكييف والتبريد", slug: "ac-and-cooling" },
];

const serviceSegments = [
  { service: "خدمات التنظيف", slug: "cleaning" },
  { service: "مكافحة الحشرات", slug: "pest-control" },
];

const serviceAreas = [
  { label: "المنازل السكنية", hashtag: "home" },
  { label: "الشركات", hashtag: "companies" },
  { label: "المكاتب", hashtag: "offices" },
  { label: "المساجد", hashtag: "mosques" },
  { label: "الخزانات", hashtag: "tanks" },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleQuickLinkNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();

    const isHomeLink = href === "/" || href === "/#home" || href === "#home";

    if (isHomeLink) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), 100);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      return;
    }

    const isHashLink = href.includes("#");

    if (isHashLink) {
      const normalizedHash = href.startsWith("/#")
        ? href.slice(1)
        : href.startsWith("#")
        ? href
        : `#${href}`;

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          if (normalizedHash === "#home") {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return;
          }

          const element = document.querySelector(normalizedHash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        if (normalizedHash === "#home") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          const element = document.querySelector(normalizedHash);
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    navigate(href);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img
                src="/footer-logo.png"
                alt="مؤسسة المسعري"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm opacity-90 leading-relaxed">
              مؤسسة سعودية متخصصة في تقديم خدمات التكييف والتنظيف ومكافحة الحشرات بأعلى معايير الجودة والاحترافية
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => handleQuickLinkNavigation(event, link.href)}
                    className="text-sm opacity-90 hover:opacity-100 transition-smooth"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">خدماتنا</h3>
            <ul className="space-y-2">
              {footerServices.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/services/${slug}`}
                    className="text-sm opacity-90 hover:opacity-100 transition-smooth"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Services & Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">خدمات مميزة</h3>
            <ul className="space-y-2">
              {serviceSegments.map(({ service, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/services/${slug}`}
                    className="text-sm font-medium opacity-90 hover:opacity-100 transition-smooth"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <h4 className="text-sm font-bold mb-2 opacity-90">نخدم</h4>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map(({ label, hashtag }) => (
                  <Link
                    key={hashtag}
                    to="/#services"
                    onClick={(event) => handleQuickLinkNavigation(event, "/#services")}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold opacity-90 hover:opacity-100 transition-smooth"
                  >
                    #{label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm opacity-90">
                  حي النسيم الغربي، شارع حمد بن فريد<br />
                  الرياض، المملكة العربية السعودية
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm opacity-90" dir="ltr">
                  <a href="tel:+966530016390" className="hover:opacity-100 transition-smooth block">
                    +966 530016390
                  </a>
                  <a href="tel:+966509289812" className="hover:opacity-100 transition-smooth block">
                    +966 509289812
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm opacity-90">8:00 ص - 10:00 م (السبت-الخميس)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80">
              © 2025 مؤسسة المسعري. جميع الحقوق محفوظة.
            </p>
            <Link 
              to="/privacy" 
              className="text-sm opacity-80 hover:opacity-100 transition-smooth"
            >
              سياسة الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
