import PageHero from "@/components/PageHero";
import { Quote } from "lucide-react";
import sushilKothariImg from "@assets/Sushil_Kothari_F_1773049068347.jpg";
import bme6 from "@assets/bme6_1773052578115.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function President() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="President's Message" 
        subtitle="Preserving Our Legacy, Powering Our Future"
        backgroundImage={copperMetalImg}
        category="Leadership"
      />

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-2 border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
              <div className="bg-gradient-to-b from-primary/10 to-primary/5 relative overflow-hidden">
                <img 
                  src={sushilKothariImg}
                  alt="Shri Sushil R. Kothari"
                  className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-serif font-bold mb-1">Shri Sushil R. Kothari</h3>
                  <p className="text-primary font-semibold text-lg">President, BME Ltd.</p>
                  <p className="text-white/70 text-sm mt-2">Leading BME Towards Excellence</p>
                </div>
              </div>

              <div className="p-6 md:p-16 flex flex-col justify-center relative">
                <Quote className="absolute top-10 right-10 w-24 h-24 text-muted/20 -z-10" />
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-6 md:mb-8 text-primary italic leading-relaxed">
                  "As we navigate unprecedented global change, our role has never been more vital to the nation's economic growth."
                </h3>
                
                <div className="space-y-4 md:space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
                  <p>
                    It is a profound honor to serve as the President of the Bombay Metal Exchange Ltd., an institution that has stood as a pillar for over 90 years in the non-ferrous metals industry.
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
    </div>
  );
}
