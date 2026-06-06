import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import bme1 from "@assets/bme1_1773052578105.jpeg";
import bme3 from "@assets/bme3_1773052578114.jpeg";
import hemantPareikhImg from "@assets/Hemant_K_Parekh_1773057523566.png";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";
import ficciBg from "@assets/FICCI_logo.svg_1773222979760.png";
import assochamBg from "@assets/ASSOCHAM_New_Logo_1773222953944.jpg";
import imfaBg from "@assets/IMFA.NS_BIG-9da63c34_1773222953945.png";
import famBg from "@assets/FAM-LOGO-final4_1773222953945.png";

// Import images
import sushilKothariImg from "@assets/Sushil_Kothari_F_1773049201801.jpg";
import rikabMehtaImg from "@assets/Rikab_Mehta_1_1773049201800.png";
import mahendraKMehtaImg from "@assets/mk_mehta_1773049438092.png";
import manishJainImg from "@assets/Manish_Jain_1773049201799.jpg";
import atulGoyalImg from "@assets/Atul_Goyal_1773049201794.png";
import alpeshMunotImg from "@assets/alpesh_munot_1773049201793.png";
import mihirParaikhImg from "@assets/Mihir_Parikh_ai-removebg-preview_1773049201800.png";
import sandeepJainImg from "@assets/sandeep_Jain_1773049201801.png";
import abhineetAggarwalImg from "@assets/Abhineet_Aggarwal_F_1773049201792.png";
import amitSangaiImg from "@assets/Amieet_Sangai_1773049201794.png";
import gautamParoliaImg from "@assets/Gautam_Parolia_1773049201798.jpg";
import gautamJainImg from "@assets/GaUTAM_jAIN_1773049201797.jpg";
import chiragMajithiaImg from "@assets/Chirag_Majithia_2_1773049201795.jpg";
import akashShahImg from "@assets/aKASH_sHAH_1773049201793.jpg";

export default function About() {
  const officeBarers = [
    { name: "Shri Sushil R. Kothari", role: "President", image: sushilKothariImg },
    { name: "Shri Rikab V. Mehta", role: "Chairman Emeritus", image: rikabMehtaImg },
    { name: "Shri Mahendra K. Mehta", role: "Sr. Vice President", image: mahendraKMehtaImg },
    { name: "Shri Manish P. Jain", role: "Vice President", image: manishJainImg },
    { name: "Shri Atul L. Goyal", role: "Hon. Secretary / Director", image: atulGoyalImg },
    { name: "Shri Alpesh P. Munot", role: "Treasurer / Director", image: alpeshMunotImg },
    { name: "Shri Mihir R. Parikh", role: "Hon. Jt. Secretary / Director", image: mihirParaikhImg },
    { name: "Shri Sandeep T. Jain", role: "Imm. Past President / Director", image: sandeepJainImg },
  ];

  const directors = [
    { name: "Shri Hemant K. Parekh", role: "Past President / Director", image: hemantPareikhImg },
    { name: "Shri Abhineet V. Aggarwal", role: "Director", image: abhineetAggarwalImg },
    { name: "Shri Amit R. Sangai", role: "Director", image: amitSangaiImg },
    { name: "Shri Gautam P. Parolia", role: "Director", image: gautamParoliaImg },
    { name: "Shri Gautam N. Jain", role: "Director", image: gautamJainImg },
    { name: "Shri Chirag D. Majithia", role: "Director", image: chiragMajithiaImg },
    { name: "Shri Akash S. Shah", role: "Director", image: akashShahImg },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="About Us" 
        subtitle="Heritage, Leadership & Vision of Bharat Metal Exchange Ltd."
        backgroundImage={copperMetalImg}
        category="Our Journey"
      />

      <div className="container mx-auto px-4 md:px-6 py-24 space-y-24">
        
        {/* HERITAGE SECTION */}
        <div>
          <h2 className="text-4xl font-serif font-bold mb-16 text-center">Our Heritage</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold text-foreground">A Legacy of Over 90 Years</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                The roots of BME stretch back to 1933. In that pivotal year, the organization was born with just 8 members under the leadership of Sheikh Gulamally Shamshuddin Tambawala.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The 1955 amalgamation of the Metal Exchange Association and the Metal Traders' Association created the Bharat Metal Exchange Limited, envisioned as an embodiment of unity and growth.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, BME stands as the apex body of non-ferrous metals trade with 800 + active members, setting benchmark prices and advocating for industry interests at national levels.
              </p>
            </div>
            <div className="relative">
              <img 
                src={bme3} 
                alt="Metal Ingots Manufacturing"
                className="rounded-3xl shadow-2xl object-cover h-[450px] w-full"
              />
            </div>
          </div>

          <div className="bg-gradient-dark text-white rounded-3xl p-12 md:p-16 mt-16 relative overflow-hidden">
            <h3 className="text-center text-3xl font-serif mb-12">Our Numbers Speak</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold font-serif text-primary mb-2">800+</div>
                <div className="text-sm uppercase tracking-wider text-white/70">Members</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-serif text-primary mb-2">65+</div>
                <div className="text-sm uppercase tracking-wider text-white/70">Brokers</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-serif text-primary mb-2">93+</div>
                <div className="text-sm uppercase tracking-wider text-white/70">Years</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-serif text-primary mb-2">4+</div>
                <div className="text-sm uppercase tracking-wider text-white/70">Zones</div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-3xl font-serif font-bold mb-4">Voice of the Industry</h3>
              <p className="text-muted-foreground">Strong representation at Central and State Government levels.</p>
            </div>
            <IndustrySlider />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

        {/* PRESIDENT MESSAGE */}
        <div>
          <h2 className="text-4xl font-serif font-bold mb-16 text-center">President's Message</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-2 border-primary/10">
              <div className="grid md:grid-cols-[1fr_2fr]">
                <div className="bg-gradient-to-b from-primary/10 to-primary/5 relative overflow-hidden">
                  <img 
                    src={sushilKothariImg}
                    alt="Shri Sushil R. Kothari"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-serif font-bold mb-1">Shri Sushil R. Kothari</h3>
                    <p className="text-primary font-semibold text-lg">President, BME Ltd.</p>
                    <p className="text-white/70 text-sm mt-2">Leading BME Towards Excellence</p>
                  </div>
                </div>

                <div className="p-10 md:p-16 flex flex-col justify-center relative">
                  <Quote className="absolute top-10 right-10 w-24 h-24 text-muted/20 -z-10" />
                  <h3 className="text-2xl font-serif font-bold mb-8 text-primary italic leading-relaxed">
                    "As we navigate unprecedented global change, our role has never been more vital to the nation's economic growth."
                  </h3>
                  
                  <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      It is a profound honor to serve as the President of the Bharat Metal Exchange Ltd., an institution that has stood as a pillar for over 90 years in the non-ferrous metals industry.
                    </p>
                    <p>
                      Since our humble beginnings in 1933, BME has evolved into a national powerhouse representing over 800 + active members across India, setting benchmark prices and advocating for industry interests.
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="font-semibold text-foreground mb-3">Our Strategic Vision for 2026:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>National Integration across all four regional zones</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>Digital Transformation for real-time market services</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>Policy Advocacy on tariffs, GST, and trade matters</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

        {/* CHAIRMAN MESSAGE */}
        <div>
          <h2 className="text-4xl font-serif font-bold mb-16 text-center">Chairman Emeritus Message</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-2 border-primary/10">
              <div className="grid md:grid-cols-[1fr_2fr]">
                <div className="bg-gradient-to-b from-primary/10 to-primary/5 relative overflow-hidden">
                  <img 
                    src={rikabMehtaImg}
                    alt="Shri Rikab V. Mehta"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-serif font-bold mb-1">Shri Rikab V. Mehta</h3>
                    <p className="text-primary font-semibold text-lg">Chairman Emeritus, BME Ltd.</p>
                    <p className="text-white/70 text-sm mt-2">Visionary Builder of BME</p>
                  </div>
                </div>

                <div className="p-10 md:p-16 flex flex-col justify-center relative">
                  <Quote className="absolute top-10 right-10 w-24 h-24 text-muted/20 -z-10" />
                  <h3 className="text-2xl font-serif font-bold mb-8 text-primary italic leading-relaxed">
                    "BME's strength lies in its unity and commitment to the collective prosperity of all stakeholders."
                  </h3>
                  
                  <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      As Chairman Emeritus, it is with great satisfaction that I reflect on BME's remarkable journey and the exceptional leadership that has guided our organization through various economic cycles.
                    </p>
                    <p>
                      The consolidation of regional exchanges in 1955 into one unified body was a visionary move that created the strongest voice for the non-ferrous metals industry in India. Today, that vision continues to bear fruit.
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="font-semibold text-foreground mb-3">Focus Areas for Continued Growth:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>Strengthening commodity trading infrastructure</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>Enhancing member support and capacity building</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>Maintaining industry benchmark standards</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

        {/* BOARD SECTION */}
        <div>
          <h2 className="text-4xl font-serif font-bold mb-16 text-center">Board of Directors</h2>
          
          <div className="bg-gradient-dark text-white rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden mb-16">
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-3xl font-serif font-bold mb-6 text-primary">Our Leadership Team</h3>
              <p className="text-lg leading-relaxed text-white/80">
                Our board members uphold the ideals of BME's forebearers, ensuring we remain at the forefront of innovation while honoring over 90 years of tradition and excellence in the non-ferrous metals industry.
              </p>
            </div>
          </div>

          {/* Office Bearers */}
          <div className="mb-20">
            <h3 className="text-3xl font-serif font-bold mb-12 text-center">Office Bearers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officeBarers.map((member, i) => (
                <Card key={i} className="group border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h4 className="text-sm font-serif font-bold text-foreground mb-1 line-clamp-2">{member.name}</h4>
                    <p className="text-xs text-primary font-semibold">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Board Directors */}
          <div>
            <h3 className="text-3xl font-serif font-bold mb-12 text-center">Board Directors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {directors.map((member, i) => (
                <Card key={i} className="group border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h4 className="text-sm font-serif font-bold text-foreground mb-1 line-clamp-2">{member.name}</h4>
                    <p className="text-xs text-accent font-semibold">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function IndustrySlider() {
  const organizations = [
    {
      name: "FICCI",
      fullName: "Federation of Indian Chambers of Commerce and Industry",
      ministry: "Ministry of Commerce & Industry",
      logo: ficciBg
    },
    {
      name: "ASSOCHAM",
      fullName: "Associated Chambers of Commerce and Industry of India",
      ministry: "Confederation of Industry",
      logo: assochamBg
    },
    {
      name: "IMC",
      fullName: "Indian Metals & Minerals Association",
      ministry: "Ministry of Mines",
      logo: imfaBg
    },
    {
      name: "FAM",
      fullName: "Federation of All-India Metal Merchants",
      ministry: "Ministry of Commerce",
      logo: famBg
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % organizations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % organizations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + organizations.length) % organizations.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const visibleCount = isMobile ? 1 : 3;
  const slides = [
    ...organizations.slice(currentIndex, currentIndex + visibleCount),
    ...organizations.slice(0, Math.max(0, currentIndex + visibleCount - organizations.length))
  ];

  return (
    <div className="relative w-full px-10 md:px-14">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-6 transition-transform duration-500">
          {slides.map((org, idx) => (
            <div key={`${currentIndex}-${idx}`} className="flex-1 min-w-0">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all h-full bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6 md:p-8 flex flex-col justify-center items-center text-center h-full">
                  <div className="mb-6 w-full h-40 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-4">
                    <img 
                      src={org.logo} 
                      alt={org.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold font-serif text-primary mb-2">{org.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{org.fullName}</p>
                  <div className="pt-4 border-t border-border w-full">
                    <p className="text-xs uppercase tracking-widest font-semibold text-primary">{org.ministry}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        data-testid="button-slider-prev"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white rounded-full p-2 md:p-3 transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        data-testid="button-slider-next"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white rounded-full p-2 md:p-3 transition-all"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {organizations.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            data-testid={`button-slider-dot-${idx}`}
            className={`h-3 rounded-full transition-all ${
              idx === currentIndex ? 'bg-primary w-8' : 'bg-primary/30 w-3 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
