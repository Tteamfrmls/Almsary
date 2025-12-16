import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { title: "الرئيسية", href: "/" },
    { title: "خدماتنا", href: "/#services" },
    { title: "من نحن", href: "/#about" },
    { title: "المدونة", href: "/blog" },
    { title: "تواصل معنا", href: "/#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    // Handle hash navigation - navigate to home first if not already there
    if (href.startsWith("/#")) {
      const hash = href.slice(1); // Remove the leading "/"
      if (location.pathname !== "/") {
        // Navigate to home first, then scroll to hash after a brief delay
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="مؤسسة المسعري" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  {item.title}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+966530016390" dir="ltr">
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                <span dir="rtl">اتصل الآن</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-6 border-b">
                  <img 
                    src="/logo.png" 
                    alt="مؤسسة المسعري" 
                    className="h-12 w-auto object-contain"
                  />
                </div>

                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-smooth py-2"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-smooth py-2"
                      >
                        {item.title}
                      </a>
                    )
                  ))}
                </nav>

                <div className="flex flex-col gap-3 pt-6 border-t">
                  <a href="tel:+966530016390" className="w-full" dir="ltr">
                    <Button variant="default" size="lg" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      <span dir="rtl">اتصل الآن</span>
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/966530016390"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                    dir="ltr"
                  >
                    <Button variant="secondary" size="lg" className="w-full gap-2">
                      <span dir="rtl">واتساب</span>
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
