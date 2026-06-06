import { useState } from "react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { FileText, Download, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { Circular } from "@shared/schema";

const mockCirculars = [
  { id: -1, title: "BME Benchmark Prices - Copper", date: new Date(), description: "Daily benchmark prices for Copper announced by BME, widely accepted across India as the reference standard.", tag: "Pricing", content: null, fileUrl: null },
  { id: -2, title: "BME Benchmark Prices - Zinc", date: new Date(Date.now() - 86400000), description: "Official benchmark prices for Zinc for the current trading period, updated daily.", tag: "Pricing", content: null, fileUrl: null },
  { id: -3, title: "BME Conclave 2025 - April 8-9", date: new Date(Date.now() - 86400000 * 3), description: "Invitation and registration details for the flagship BME Conclave 2025.", tag: "Events", content: null, fileUrl: null },
  { id: -4, title: "GST Rate Changes for Non-Ferrous Metals", date: new Date(Date.now() - 86400000 * 5), description: "Detailed notification regarding the latest GST amendments affecting the non-ferrous metals sector.", tag: "Regulatory", content: null, fileUrl: null },
  { id: -5, title: "Export Incentive Scheme 2026", date: new Date(Date.now() - 86400000 * 10), description: "New guidelines for export benefits and incentives available to BME member organizations.", tag: "Government", content: null, fileUrl: null },
  { id: -6, title: "BIS Standards for Copper Rods", date: new Date(Date.now() - 86400000 * 15), description: "Updated quality control orders and BIS standards for copper rod manufacturing and distribution.", tag: "Standards", content: null, fileUrl: null },
];

export default function Circulars() {
  const categories = ["All", "Pricing", "Events", "Regulatory", "Government", "Standards"];
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: dbCirculars } = useQuery<Circular[]>({
    queryKey: ["/api/circulars"],
    queryFn: async () => {
      const res = await fetch("/api/circulars");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const allCirculars = (dbCirculars && dbCirculars.length > 0) ? dbCirculars : mockCirculars;

  const filteredCirculars = activeCategory === "All"
    ? allCirculars
    : allCirculars.filter((c) => c.tag === activeCategory);

  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Circulars & Notices"
        subtitle="Stay updated with BME benchmark prices, government notifications, and important trade circulars."
        backgroundImage={copperMetalImg}
        category="Announcements"
      />

      <section className="py-12 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-12 flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full ${activeCategory === cat ? "bg-primary text-white" : ""}`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {filteredCirculars.map((circular) => (
              <Card
                key={circular.id}
                className="group hover:shadow-lg transition-all border-2 border-primary/10 hover:border-primary bg-white"
              >
                <CardContent className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 sm:block">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      {circular.tag === "Pricing" ? (
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      ) : (
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      )}
                    </div>
                    <div className="sm:hidden flex-grow">
                      <h3 className="text-base font-serif font-bold group-hover:text-primary transition-colors">
                        {circular.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
                      <Calendar className="w-3 h-3" />
                      <span>{circular.date ? format(new Date(circular.date), "MMMM dd, yyyy") : "Recent"}</span>
                      <span className="ml-2 px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold text-[10px]">
                        {circular.tag}
                      </span>
                    </div>
                    <h3 className="hidden sm:block text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                      {circular.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {circular.description}
                    </p>

                    {circular.id > 0 && (
                      <Link href={`/circulars/${circular.id}`}>
                        <Button variant="ghost" size="sm" className="mt-3 text-primary px-0 hover:bg-transparent hover:text-primary/80">
                          Read More <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  {circular.fileUrl ? (
                    <a href={circular.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-full shrink-0 hidden sm:flex">
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="icon" className="rounded-full shrink-0 hidden sm:flex" disabled>
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
