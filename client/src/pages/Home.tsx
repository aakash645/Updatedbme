import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "wouter";
import { ArrowRight, Trophy, ShieldCheck, Globe, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAnnouncements } from "@/hooks/use-announcements";
import InquiryForm from "@/components/InquiryForm";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { HeroSlide, Announcement } from "@shared/schema";

const DEFAULT_HERO_SLIDES = [
  {
    id: 0,
    title: "The Apex Body of",
    highlight: "Non-Ferrous Metals",
    description: "Representing a vast spectrum of the trade and industry. A legacy of excellence powering the national economy with over 800+ active members across India.",
    imageUrl: "/bme1_1773052578105.jpeg",
    order: 0,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 1,
    title: "Empowering India's",
    highlight: "Metal Trade Network",
    description: "Connecting manufacturers, traders, recyclers, and industries through a unified national platform since 1933.",
    imageUrl: "/bme10_1773052578117.jpeg",
    order: 1,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Driving Innovation in",
    highlight: "Copper & Zinc Industry",
    description: "Supporting policy advocacy, market transparency, and industrial growth for India's non-ferrous ecosystem.",
    imageUrl: "/bme4_1773052578114.jpeg",
    order: 2,
    active: true,
    createdAt: new Date(),
  },
];

export default function Home() {
  const { data: announcements, isLoading } = useAnnouncements();

  const { data: heroSlidesData } = useQuery<HeroSlide[]>({
    queryKey: ["/api/hero-slides"],
    queryFn: async () => {
      const res = await fetch("/api/hero-slides");
      if (!res.ok) throw new Error("Failed to fetch hero slides");
      return res.json();
    },
  });

  const heroSlides = (heroSlidesData && heroSlidesData.filter(s => s.active).length > 0)
    ? heroSlidesData.filter(s => s.active)
    : DEFAULT_HERO_SLIDES;

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const heroInterval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(heroInterval);
  }, [heroSlides.length]);

  /* ================= WHY JOIN AUTOPLAY ================= */
  const slides = [
    {
      title: "Industry Benchmarking",
      desc: "Accepted benchmark prices for Copper and Zinc across India.",
      image: "/bme1_1773052578105.jpeg",
    },
    {
      title: "Powerful Representation",
      desc: "Strong voice at Central and State Government levels.",
      image: "/bme10_1773052578117.jpeg",
    },
    {
      title: "Knowledge & Networking",
      desc: "National trade fairs, exhibitions, and technical seminars.",
      image: "/bme4_1773052578114.jpeg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[heroIndex] ?? heroSlides[0];

  return (
    <div className="flex flex-col w-full">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">

        {/* BACKGROUND IMAGE SLIDER */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.imageUrl}
              alt={slide.highlight}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === heroIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl text-white">

            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
              Established 1933
            </div>

            <div className="transition-all duration-700">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                {currentSlide?.title} <br />
                <span className="text-primary">
                  {currentSlide?.highlight}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                {currentSlide?.description}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary text-white rounded-full px-8"
                asChild
              >
                <Link href="#">
                  Explore About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link href="#">Reach Us Out</Link>
              </Button>
            </div>

            {/* SLIDER INDICATORS */}
            <div className="flex gap-3 mt-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === heroIndex
                      ? "w-10 bg-primary"
                      : "w-3 bg-white/40"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-background -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "93+ Years", desc: "Industry Trust" },
              { icon: Factory, title: "800+", desc: "Active Members" },
              { icon: Globe, title: "Pan-India", desc: "Regional Chapters" },
              { icon: Trophy, title: "Benchmark", desc: "Pricing Authority" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <stat.icon className="w-8 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-serif font-bold mb-2">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ANNOUNCEMENTS ================= */}
      <section className="py-20  bg-white/50">
        <div className="container mx-auto px-6">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
              Notice Board
            </h2>
            <h3 className="text-4xl font-serif font-bold">
              Latest Announcements
            </h3>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : announcements?.length ? (
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent>
                {announcements.slice(0, 6).map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Link href={`/news/${item.id}`}>
                      <Card className="shadow-lg h-full hover:shadow-xl hover:border-primary border-2 border-transparent transition-all cursor-pointer">
                        {item.imageUrl && (
                          <div className="h-40 overflow-hidden rounded-t-xl">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <CardContent className="p-8">
                          <div className="text-sm text-muted-foreground mb-4">
                            {item.date
                              ? format(new Date(item.date), "MMM dd, yyyy")
                              : "Recent"}
                          </div>

                          <h4 className="text-xl font-serif font-bold mb-3 hover:text-primary transition-colors">
                            {item.title}
                          </h4>

                          <p className="text-muted-foreground line-clamp-3">
                            {item.content}
                          </p>

                          <div className="mt-4 text-primary text-sm font-semibold flex items-center gap-1">
                            Read more <ArrowRight className="w-3 h-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          ) : (
            <p>No announcements available.</p>
          )}
        </div>
      </section>

     {/* ================= WHY JOIN BME ================= */}
<section className="relative py-24 text-white overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/why-bme-bg.jpg')" }}
  />

  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black/80" />

  {/* Content */}
  <div className="relative container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT SIDE */}
    <div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10">
        Why Join <span className="text-primary">BME?</span>
      </h2>

      <div className="space-y-6">
        {slides.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl transition-all duration-500 ${
              i === activeIndex
                ? "bg-white/20 border border-white/20 scale-105"
                : "opacity-40"
            }`}
          >
            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            <p className="text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="relative">
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/30">
        <img
          src={slides[activeIndex].image}
          alt={slides[activeIndex].title}
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      {/* FLOATING DYNAMIC BOX */}
      <div className="absolute -bottom-8 -left-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl hidden md:block border border-white/20 transition-all duration-500">
        <p className="text-2xl font-serif font-bold text-white mb-2">
          {slides[activeIndex].title}
        </p>
        <p className="text-sm text-primary font-medium">
          {slides[activeIndex].desc}
        </p>
      </div>
    </div>

  </div>
</section>

      {/* TESTIMONIALS */} <section className="py-14 sm:py-24 bg-background">
         <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Member Voices</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-10 sm:mb-16">What Our Members Say</h3> <Carousel className="w-full max-w-4xl mx-auto">
             <CarouselContent> {[ { name: "Sushil Kothari", quote: "BME has been instrumental in our growth, providing valuable support and guidance in the non-ferrous sector." }, { name: "Anjali Sharma", quote: "BME has helped us navigate the complexities of the market with ease. Their pricing benchmarks are invaluable." }, { name: "Rajesh Gupta", quote: "The support and representation from BME has been crucial for our business dealings." } ].map((t, i) => ( <CarouselItem key={i}>
              <div className="p-8 md:p-12"> <p className="text-2xl md:text-3xl font-serif text-muted-foreground italic mb-8">"{t.quote}"</p>
              <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
              <h4 className="font-bold text-lg">{t.name}</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">BME Member</p>
              </div> </CarouselItem> ))} </CarouselContent> <div className="hidden md:block">
                 <CarouselPrevious /> <CarouselNext /> </div> </Carousel> </div>
                  </section>

      {/* CONTACT / INQUIRY */}
<section className="py-14 sm:py-24 bg-white border-t border-border overflow-hidden">
  <div className="container mx-auto px-4 md:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">

      {/* LEFT SIDE */}
      <div>
        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
          Connect With Us
        </h2>

        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
          Get In Touch
        </h3>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Whether you have an inquiry, need market data, or want to explore membership,
          our team is ready to assist you with dedicated support and guidance.
        </p>

        <div className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-2xl shadow-sm border border-primary/20">
            <h4 className="font-bold font-serif text-xl mb-2">
              BME New App Launching Soon
            </h4>
            <p className="text-muted-foreground text-sm">
              Stay tuned for the enhanced mobile experience on iOS and Android.
            </p>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl shadow-sm border border-primary/20">
            <h4 className="font-bold font-serif text-xl mb-2">
              Real-time Updates
            </h4>
            <p className="text-muted-foreground text-sm">
              Receive regular updates on government notifications and market alerts.
            </p>
          </div>

          <div className="bg-primary/5 p-8 rounded-3xl border-2 border-primary/20">
                <h3 className="text-xl font-serif font-bold mb-6 text-foreground">Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground font-semibold">Monday - Friday</span>
                    <span className="font-bold text-foreground">10:30 AM - 06:30 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground font-semibold">Saturday</span>
                    <span className="font-bold text-foreground">10:30 AM - 02:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground font-semibold">Sunday & Holidays</span>
                    <span className="font-bold text-destructive">Closed</span>
                  </div>
                </div>
              </div>

        </div>
      </div>

      {/* RIGHT SIDE (FORM WRAPPER FIXED) */}
      <div className="w-full max-w-xl lg:ml-auto">
        <InquiryForm />
      </div>

    </div>
  </div>
</section>
    </div>
  );
}
