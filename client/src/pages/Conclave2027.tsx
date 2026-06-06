import PageHero from "@/components/PageHero";
import { MapPin, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";
import bme1 from "@assets/bme1_1773052578105.jpeg";
import bme2 from "@assets/bme2_1773052578113.jpeg";
import bme3 from "@assets/bme3_1773052578114.jpeg";
import bme4 from "@assets/bme4_1773052578114.jpeg";
import bme5 from "@assets/bme5_1773052578115.jpeg";
import bme6 from "@assets/bme6_1773052578115.jpeg";
import bme7 from "@assets/bme7_1773052578116.jpeg";
import bme8 from "@assets/bme8_1773052578116.jpeg";
import bme9 from "@assets/bme9_1773052578117.jpeg";
import bme10 from "@assets/bme10_1773052578117.jpeg";
import bme11 from "@assets/bme11_1773052578118.jpeg";
import bme12 from "@assets/bme12_1773052578118.jpeg";
import bme13 from "@assets/bme13_1773052578119.jpeg";
import bme14 from "@assets/bme14_1773052578119.jpeg";






export default function Conclave2027() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <PageHero
        title="BME Conclave 2027"
        subtitle="Connect • Collaborate • Elevate — Coming Soon"
        backgroundImage={copperMetalImg}
        category="Flagship Event"
      />

      {/* ABOUT */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
              About The Conclave
            </p>

            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">
              India’s Premier Non-Ferrous Industry Gathering
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The BME Conclave 2027 is the flagship national gathering of
              India's non-ferrous metal industry hosted by Bombay Metal
              Exchange Ltd.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Bringing together traders, importers, exporters, manufacturers,
              recyclers, policymakers, and industry leaders, the conclave serves
              as a strategic platform to discuss market trends, policy reforms,
              global trade dynamics, and the future of India's metal sector.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Under the theme{" "}
              <span className="font-semibold text-foreground">
                “Connect • Collaborate • Elevate”
              </span>
              , the event fosters meaningful partnerships, strengthens industry
              integration, and promotes innovation across the non-ferrous
              ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT CONCLAVE BROUGHT */}
      <section className="py-12 md:py-24 bg-white/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              What Conclave 2027 <span className="text-primary">Will Bring</span>
            </h2>

            <p className="text-center text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              BME Conclave 2027 will create a powerful platform for networking,
              policy dialogue, innovation showcases, industry collaboration, and
              strategic growth discussions for India’s non-ferrous metals
              ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Industry Networking",
                description:
                  "Connected traders, manufacturers, recyclers, policymakers, and global delegates under one national platform.",
              },
              {
                icon: Users,
                title: "Strategic Collaborations",
                description:
                  "Enabled partnerships, policy discussions, and business expansion opportunities across India.",
              },
              {
                icon: Sparkles,
                title: "Knowledge Sessions",
                description:
                  "Featured expert-led seminars, fireside chats, and future-focused panel discussions.",
              },
              {
                icon: Sparkles,
                title: "Expo & Innovation Showcase",
                description:
                  "Presented cutting-edge technologies, industrial solutions, and modern metal sector innovations.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="border-none shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section className="py-12 md:py-24 bg-white/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Conclave 2026 Highlights
            </p>

            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Conclave <span className="text-primary">Gallery</span>
            </h2>

            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Glimpses from the prestigious BME Conclave 2026 featuring
              networking, exhibitions, keynote sessions, and gala celebrations.
            </p>
          </div>

          <Tabs defaultValue="networking" className="w-full">
            {/* TABS */}
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl mx-auto mb-14">
              <TabsTrigger value="networking">Networking</TabsTrigger>
              <TabsTrigger value="stalls">Expo Stalls</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="gala">Gala Night</TabsTrigger>
            </TabsList>

            {/* NETWORKING */}
            <TabsContent value="networking">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  bme1,
                  bme2,
                  bme3,
                  bme4,
                  bme5,
                  bme6,
                ].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden shadow-xl group"
                  >
                    <img
                      src={img}
                      alt="Networking"
                      className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* STALLS */}
            <TabsContent value="stalls">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  bme3,
                  bme4,
                  bme5,
                  bme6,
                  bme7,
                  bme8,
                ].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden shadow-xl group"
                  >
                    <img
                      src={img}
                      alt="Expo Stall"
                      className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* SESSIONS */}
            <TabsContent value="sessions">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                 bme1,
                  bme2,
                  bme3,
                  bme4,
                  bme9,
                  bme10,
                ].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden shadow-xl group"
                  >
                    <img
                      src={img}
                      alt="Sessions"
                      className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* GALA NIGHT */}
            <TabsContent value="gala">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
               bme3,
                  bme14,
                  bme5,
                  bme11,
                  bme12,
                  bme13,
                ].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden shadow-xl group"
                  >
                    <img
                      src={img}
                      alt="Gala Night"
                      className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* VENUE DETAILS */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
               Conclave 2026 - Venue
              </p>

              <h2 className="text-3xl md:text-5xl font-serif font-bold">
                Bharat <span className="text-primary">Mandapam</span>
              </h2>
            </div>

            <Card className="border-none shadow-2xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      Bharat Mandapam
                    </h3>

                    <p className="text-muted-foreground text-lg">
                      New Delhi, India
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-xl mb-4">
                      About the Venue
                    </h4>

                    <p className="text-muted-foreground leading-relaxed">
                      Bharat Mandapam is one of India's premier international
                      convention centers featuring world-class infrastructure,
                      exhibition halls, conference facilities, and advanced
                      technology for hosting large-scale global events.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xl mb-4">
                      Accessibility
                    </h4>

                    <ul className="space-y-3 text-muted-foreground">
                      <li>✓ Easy access via Delhi Metro</li>
                      <li>✓ Premium parking facilities</li>
                      <li>✓ Accessible venue infrastructure</li>
                      <li>✓ On-site dining & hospitality</li>
                      <li>✓ High-security event premises</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
    </div>
  );
}