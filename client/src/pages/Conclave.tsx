import PageHero from "@/components/PageHero";
import { Shield, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import bme4 from "@assets/bme4_1773052578114.jpeg";
import bme6 from "@assets/bme6_1773052578115.jpeg";
import bme7 from "@assets/bme7_1773052578116.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";
import bme8 from "@assets/bme8_1773052578116.jpeg";
import bme1 from "@assets/bme1_1773052578105.jpeg";

export default function Conclave() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="BME Conclave 2025" 
        subtitle="April 8-9, 2025 — The flagship annual gathering of the non-ferrous metals industry."
        backgroundImage={copperMetalImg}
        category="Flagship Event"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Shaping the <span className="text-primary">Future</span> of Non-Ferrous Metals
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The BME Conclave is the most anticipated event in the industry calendar. Bringing together government officials, industry titans, and 800 + active members for policy discussions, strategic insights, and networking opportunities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <Shield className="w-10 h-10 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Policy Advocacy</h4>
                    <p className="text-sm text-muted-foreground">Direct engagement with government bodies</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
                  <Target className="w-10 h-10 text-accent shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Market Trends</h4>
                    <p className="text-sm text-muted-foreground">Global supply chain analysis</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-primary/10 rounded-2xl border-2 border-primary/30">
                <Calendar className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">April 8-9, 2025</h4>
                  <p className="text-sm text-muted-foreground">Mark your calendar for BME's premier annual event</p>
                </div>
              </div>

              <Button size="lg" className="bg-primary text-white rounded-full px-10 hover:bg-primary/90">Register for 2025 Conclave</Button>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={bme4}
                  alt="Conclave 2026"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl hidden md:block border-2 border-primary/20">
                <p className="text-4xl font-serif font-bold text-primary mb-1">93+</p>
                <p className="text-sm text-foreground font-semibold tracking-widest uppercase">Years of Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Conclaves Highlights */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Past Conclaves Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Relive the memorable moments from our recent conclaves showcasing industry excellence and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { 
                title: "Conclave 2024 - Grand Stage",
                description: "Record attendance with keynote speakers and industry leaders presenting strategic insights.",
                image: bme4
              },
              { 
                title: "Virtual Conclave 2024",
                description: "Innovative hybrid format bringing together global participants and regional representatives.",
                image: bme6
              },
              { 
                title: "Conclave 2024 Awards Ceremony",
                description: "Celebrating distinguished personalities honored for their contributions to the industry.",
                image: bme7
              },
              { 
                title: "Annual General Meeting",
                description: "Strategic planning and governance discussions with the executive board and members.",
                image: bme8
              },
            ].map((highlight, i) => (
              <Card key={i} className="group border-2 border-primary/10 hover:border-primary hover:shadow-2xl transition-all overflow-hidden" data-testid={`card-highlight-${i}`}>
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <CardContent className="p-6 relative z-10">
                  <h3 className="text-xl font-serif font-bold mb-2 text-foreground">{highlight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
