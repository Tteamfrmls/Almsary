import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/966530016390"
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      className="fixed bottom-6 left-6 z-50 animate-bounce hover:scale-110 transition-spring"
      aria-label="تواصل عبر واتساب"
    >
      <Button
        size="lg"
        className="rounded-full w-16 h-16 shadow-strong bg-secondary hover:bg-secondary-light transition-spring"
      >
        <MessageCircle className="w-7 h-7" />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
