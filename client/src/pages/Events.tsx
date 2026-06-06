import { Calendar, MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { Event } from "@shared/schema";

// Import fallback images
import bme1 from "@assets/bme1_1773052578105.jpeg";
import bme2 from "@assets/bme2_1773052578113.jpeg";
import bme3 from "@assets/bme3_1773052578114.jpeg";
import bme4 from "@assets/bme4_1773052578114.jpeg";
import bme5 from "@assets/bme5_1773052578115.jpeg";
import bme6 from "@assets/bme6_1773052578115.jpeg";
import bme7 from "@assets/bme7_1773052578116.jpeg";
import bme8 from "@assets/bme8_1773052578116.jpeg";
import bme13 from "@assets/bme13_1773052578119.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

const staticEvents = [
  {
    title: "BME Conclave 2025",
    date: "April 8-9, 2025",
    location: "Grand Hotel, Mumbai",
    description: "The flagship annual gathering of BME with government officials, industry leaders, and 800+ active members. Policy discussions, networking, and the prestigious awards.",
    image: bme4,
    id: null,
  },
  {
    title: "BME-Cyclothon",
    date: "Monthly",
    location: "Mumbai & Regional Centers",
    description: "Promoting health and wellness among BME community members.",
    image: bme13,
    id: null,
  },
  {
    title: "BME Diwali Functions",
    date: "October-November 2025",
    location: "BME House, Mumbai & Zonal Chapters",
    description: "Celebration of the festival of lights with BME family. Networking events, cultural programs, and traditional festivities.",
    image: bme5,
    id: null,
  },
];

export default function Events() {
  const { data: dbEvents } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const hasDbEvents = dbEvents && dbEvents.length > 0;

  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Events & Exhibitions"
        subtitle="Stay updated with our conclave, cyclothon, annual meetings, and networking events."
        backgroundImage={copperMetalImg}
        category="Calendar"
      />

      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-8 sm:space-y-12">
            {hasDbEvents
              ? dbEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0 md:gap-8 bg-white dark:bg-card rounded-md overflow-hidden border border-primary/10 hover:border-primary hover:shadow-xl transition-all"
                  >
                    <div className="h-48 sm:h-64 md:h-auto overflow-hidden">
                      <img
                        src={event.imageUrl || copperMetalImg}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-primary font-semibold text-xs sm:text-sm bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {event.eventDate ? format(new Date(event.eventDate), "MMM dd, yyyy") : "TBA"}
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm bg-muted/50 px-2 sm:px-3 py-1 rounded-full">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {event.location}
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-4 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl leading-relaxed text-sm sm:text-base">
                        {event.description}
                      </p>
                      <Link href={`/events/${event.id}`}>
                        <Button className="w-fit rounded-full px-6 sm:px-8 gap-2 bg-primary text-white">
                          View Details <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              : staticEvents.map((event, i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0 md:gap-8 bg-white dark:bg-card rounded-md overflow-hidden border border-primary/10 hover:border-primary hover:shadow-xl transition-all"
                  >
                    <div className="h-48 sm:h-64 md:h-auto overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-primary font-semibold text-xs sm:text-sm bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm bg-muted/50 px-2 sm:px-3 py-1 rounded-full">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {event.location}
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-4 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl leading-relaxed text-sm sm:text-base">
                        {event.description}
                      </p>
                      <Button className="w-fit rounded-full px-6 sm:px-8 gap-2 bg-primary text-white" disabled>
                        View Details <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Past Highlights Gallery */}
      <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2">Past Highlights</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Visual memories from our successful events and exhibitions</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Board Meeting - Strategic Discussion", img: bme1 },
              { title: "LME Strategic Alliance 2005", img: bme2 },
              { title: "Dhaturatna Award Ceremony", img: bme3 },
              { title: "BME Conclave 2025 - Main Stage", img: bme4 },
              { title: "Award Presentation Ceremony", img: bme5 },
              { title: "Virtual Conclave 2024", img: bme6 },
              { title: "Conclave 2024 Awards", img: bme7 },
              { title: "Annual General Meeting", img: bme8 },
            ].map((item, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
