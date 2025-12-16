import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const riyadhAreas = [
  "النسيم",
  "العليا",
  "الملقا",
  "الصحافة",
  "الياسمين",
  "النخيل",
  "الربوة",
  "المروج",
  "العزيزية",
  "الورود",
  "الملز",
  "السليمانية",
  "الخليج",
  "الفلاح",
  "الواحة",
  "أخرى"
];

const services = [
  { value: "ac-and-cooling", label: "خدمات التكييف والتبريد" },
  { value: "cleaning", label: "خدمات التنظيف" },
  { value: "pest-control", label: "مكافحة الحشرات والتعقيم" },
];

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }).max(100),
  phone: z.string().trim().min(10, { message: "رقم الجوال غير صحيح" }).max(15),
  area: z.string().min(1, { message: "يرجى اختيار المنطقة" }),
  service: z.string().min(1, { message: "يرجى اختيار الخدمة" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      area: "",
      service: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const serviceLabel = services.find(s => s.value === data.service)?.label || data.service;
    
    const message = `مرحباً، أنا ${data.name}
رقم الجوال: ${data.phone}
المنطقة: ${data.area}
الخدمة المطلوبة: ${serviceLabel}

أرغب في الحصول على المزيد من المعلومات والحجز.`;

    const whatsappUrl = `https://wa.me/966530016390?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "جاري فتح واتساب",
      description: "سيتم تحويلك لإكمال طلبك عبر واتساب",
    });
  };

  return (
    <Card className="shadow-medium border-none">
      <CardContent className="p-8" dir="rtl">
        <h3 className="text-2xl font-bold mb-6 text-center">احجز خدمتك الآن</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right block">الاسم *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="أدخل اسمك"
              dir="rtl"
              className={`text-right ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-destructive text-right">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">رقم الجوال *</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="05xxxxxxxx"
              dir="ltr"
              className={`text-left ${errors.phone ? "border-destructive" : ""}`}
            />
            {errors.phone && (
              <p className="text-sm text-destructive text-right">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="area" className="text-right block">المنطقة في الرياض *</Label>
            <Select
              onValueChange={(value) => setValue("area", value)}
              value={watch("area")}
              dir="rtl"
            >
              <SelectTrigger className={`text-right ${errors.area ? "border-destructive" : ""}`}>
                <SelectValue placeholder="اختر المنطقة" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {riyadhAreas.map((area) => (
                  <SelectItem key={area} value={area} className="text-right">
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.area && (
              <p className="text-sm text-destructive text-right">{errors.area.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-right block">الخدمة المطلوبة *</Label>
            <Select
              onValueChange={(value) => setValue("service", value)}
              value={watch("service")}
              dir="rtl"
            >
              <SelectTrigger className={`text-right ${errors.service ? "border-destructive" : ""}`}>
                <SelectValue placeholder="اختر الخدمة" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value} className="text-right">
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="text-sm text-destructive text-right">{errors.service.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-secondary hover:bg-secondary-light"
          >
            <MessageCircle className="ml-2 h-5 w-5" />
            إرسال عبر واتساب
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
