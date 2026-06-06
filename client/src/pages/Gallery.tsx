import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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

const STATIC_ITEMS = [
  { id: "s1",  category: "Events",      title: "Board Meeting - Strategic Discussion", image: bme1 },
  { id: "s2",  category: "History",     title: "LME Strategic Alliance 2005",          image: bme2 },
  { id: "s3",  category: "Awards",      title: "Dhaturatna Award Ceremony",            image: bme3 },
  { id: "s4",  category: "Events",      title: "BME Conclave 2026 - Main Stage",       image: bme4 },
  { id: "s5",  category: "Awards",      title: "Award Presentation Ceremony",          image: bme5 },
  { id: "s6",  category: "Events",      title: "Virtual Conclave 2024",                image: bme6 },
  { id: "s7",  category: "Awards",      title: "Conclave 2024 Awards",                 image: bme7 },
  { id: "s8",  category: "Events",      title: "Annual General Meeting",               image: bme8 },
  { id: "s9",  category: "Government",  title: "Government Delegation Visit",          image: bme9 },
  { id: "s10", category: "Awards",      title: "Government Recognition",               image: bme10 },
  { id: "s11", category: "Government",  title: "Official Delegation Meeting",          image: bme11 },
  { id: "s12", category: "Events",      title: "BSE Platform Speaking",                image: bme12 },
  { id: "s13", category: "Activities",  title: "BME Cyclothon Community Event",        image: bme13 },
  { id: "s14", category: "Events",      title: "Leadership Meeting",                   image: bme14 },
];

const CATEGORIES = ["All", "Events", "Awards", "Government", "Activities", "History"];

const CATEGORY_MAP: Record<string, string> = {
  event: "Events", exhibition: "Events", award: "Awards",
  conclave: "Events", team: "Activities", general: "Activities",
};

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  image: string;
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="aspect-square rounded-md overflow-hidden shadow-lg group relative bg-muted">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-4">
        <div>
          <p className="text-white font-semibold text-xs sm:text-sm">{item.title}</p>
          <p className="text-white/70 text-xs mt-1">{item.category}</p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [dbItems, setDbItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then(r => r.json())
      .then((data: any[]) => {
        const mapped: GalleryItem[] = data.map(item => ({
          id: `db_${item.id}`,
          category: CATEGORY_MAP[item.category] || "Activities",
          title: item.title || "BME Gallery",
          image: item.imageUrl,
        }));
        setDbItems(mapped);
      })
      .catch(() => setDbItems([]))
      .finally(() => setLoading(false));
  }, []);

  // DB images appear first (newest), then static fallbacks
  const allItems = [...dbItems, ...STATIC_ITEMS];
  const filtered = (cat: string) =>
    cat === "All" ? allItems : allItems.filter(i => i.category === cat);

  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="BME Gallery"
        subtitle="Visual highlights from our conclaves, award ceremonies, government interactions, and community activities."
        backgroundImage={copperMetalImg}
        category="Visuals"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-12 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList className="bg-muted/50 p-1 rounded-full border-2 border-primary/20 inline-flex flex-nowrap min-w-0">
                {CATEGORIES.map(cat => (
                  <TabsTrigger
                    key={cat} value={cat}
                    className="rounded-full px-3 sm:px-6 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white whitespace-nowrap"
                  >
                    {cat}
                    {cat === "All" && !loading && dbItems.length > 0 && (
                      <span className="ml-1.5 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full font-mono">
                        +{dbItems.length}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {CATEGORIES.map(cat => (
              <TabsContent key={cat} value={cat} className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-md" />
                    ))}
                  </div>
                ) : filtered(cat).length === 0 ? (
                  <div className="col-span-4 text-center py-16 text-muted-foreground">
                    No images in this category yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                    {filtered(cat).map(item => (
                      <GalleryCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
