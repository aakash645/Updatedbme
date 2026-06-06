import PageHero from "@/components/PageHero";
import { Box, Layers, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import bme7 from "@assets/bme7_1773052578116.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function Products() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Products & Services" 
        subtitle="The backbone of electrical, construction, and manufacturing sectors."
        backgroundImage={copperMetalImg}
        category="Portfolio"
      />

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="mb-24">
          <Tabs defaultValue="base" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-16 h-auto p-1.5 sm:p-2 bg-muted/50 rounded-2xl">
              <TabsTrigger value="base" className="py-2 sm:py-3 text-sm sm:text-lg rounded-xl font-serif">Base</TabsTrigger>
              <TabsTrigger value="minor" className="py-2 sm:py-3 text-sm sm:text-lg rounded-xl font-serif">Minor</TabsTrigger>
              <TabsTrigger value="scrap" className="py-2 sm:py-3 text-sm sm:text-lg rounded-xl font-serif">Scrap</TabsTrigger>
            </TabsList>
            
            <TabsContent value="base">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {['Copper', 'Aluminium', 'Zinc', 'Lead', 'Nickel', 'Tin'].map((metal) => (
                  <Card key={metal} className="border-none shadow-lg hover:shadow-xl transition-all bg-white">
                    <CardContent className="p-6 sm:p-10 flex flex-col items-center text-center gap-3 sm:gap-4">
                      <Box className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                      <h4 className="font-bold font-serif text-lg sm:text-2xl">{metal}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="minor">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {['Antimony', 'Cadmium', 'Cobalt', 'Manganese', 'Magnesium', 'Silicon'].map((metal) => (
                  <Card key={metal} className="border-none shadow-lg bg-white">
                    <CardContent className="p-6 sm:p-10 flex flex-col items-center text-center gap-3 sm:gap-4">
                      <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
                      <h4 className="font-bold font-serif text-base sm:text-xl">{metal}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-gradient-dark text-white rounded-3xl p-6 sm:p-8 md:p-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="md:w-1/3">
              <Settings className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">BME Services</h3>
              <p className="text-white/70">Empowering our members with intelligence and advocacy.</p>
            </div>
            
            <div className="md:w-2/3 w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-white/10">
                  <AccordionTrigger className="text-base sm:text-xl font-serif hover:text-primary">Market Intelligence & Pricing</AccordionTrigger>
                  <AccordionContent className="text-white/70 text-base leading-relaxed">
                    BME declares benchmark prices for Copper and Zinc accepted across India. Members receive daily price updates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/10">
                  <AccordionTrigger className="text-base sm:text-xl font-serif hover:text-primary">Advocacy & Representation</AccordionTrigger>
                  <AccordionContent className="text-white/70 text-base leading-relaxed">
                    Powerful presence in FICCI, ASSOCHAM, and IMC. Direct engagement on FTA, GST, and BIS issues.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-white/10">
                  <AccordionTrigger className="text-base sm:text-xl font-serif hover:text-primary">Professional Development</AccordionTrigger>
                  <AccordionContent className="text-white/70 text-base leading-relaxed">
                    Regular seminars and participation in National and International Trade Fairs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
