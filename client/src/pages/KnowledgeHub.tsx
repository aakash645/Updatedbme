import PageHero from "@/components/PageHero";
import { BookOpen, LineChart, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import bme9 from "@assets/bme9_1773052578117.jpeg";
import bme11 from "@assets/bme11_1773052578118.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function KnowledgeHub() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Knowledge Hub" 
        subtitle="A storehouse of technical data and industry insights for our members."
        backgroundImage={copperMetalImg}
        category="Resources"
      />

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <Card className="shadow-2xl border-none h-full bg-white">
            <CardHeader className="p-6 md:p-10">
              <LineChart className="w-12 h-12 text-primary mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-serif">Technical Data</CardTitle>
            </CardHeader>
            <CardContent className="px-6 md:px-10 pb-6 md:pb-10 space-y-4">
              {['Benchmark Pricing', 'Regulatory Updates', 'Technical Education'].map((item) => (
                <div key={item} className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                  <h4 className="font-bold text-lg">{item}</h4>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-none h-full bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardHeader className="p-6 md:p-10">
              <BookOpen className="w-12 h-12 text-white mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-serif text-white">Reference Library</CardTitle>
            </CardHeader>
            <CardContent className="px-6 md:px-10 pb-6 md:pb-10">
              <p className="text-white/90 leading-relaxed text-lg">
                Establishing an international-standard reference library with journals, bulletins, and comprehensive data banks.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={bme11} 
            alt="Community"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
          
          <div className="relative z-10 p-6 md:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-white">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <HeartHandshake className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Social Responsibility</h3>
              <h4 className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">BME Charitable Trust</h4>
              <p className="text-lg text-white/80 leading-relaxed">
                Committed to rendering medical, educational, and social services to the needy and deserving sections of society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
