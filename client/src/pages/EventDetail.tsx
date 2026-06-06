import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@shared/schema";

const DEFAULT_COVER = "/bme4_1773052578114.jpeg";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const item = events?.find((e) => String(e.id) === id);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        <Skeleton className="h-[50vh] w-full" />
        <div className="container mx-auto px-6 py-16 max-w-4xl space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <h2 className="text-2xl font-serif font-bold mb-4">Event not found</h2>
        <Button asChild variant="outline">
          <Link href="/events">← Back to Events</Link>
        </Button>
      </div>
    );
  }

  const coverImage = item.imageUrl || DEFAULT_COVER;

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-4 backdrop-blur-sm uppercase tracking-widest">
            {item.type || "Event"}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-3xl leading-tight">
            {item.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4" />
              {item.eventDate ? format(new Date(item.eventDate), "MMMM dd, yyyy") : "TBA"}
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4" />
              {item.location}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button asChild variant="ghost" className="mb-10 -ml-2 text-muted-foreground hover:text-primary">
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
            </Link>
          </Button>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap mb-6">
              {item.description}
            </p>
            {item.content && (
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {item.content}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
