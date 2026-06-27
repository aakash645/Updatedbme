import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Blog } from "@shared/schema";

export default function Blog() {
  const { data, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  return (
    <div className="pb-12 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-5 text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-primary mb-3">BME Insights</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Latest Blog Posts</h1>
          <p className="mt-4 text-muted-foreground">Read the latest updates, member stories, and industry insights from the BME community.</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-80 rounded-3xl" />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No blog posts are available yet.</p>
          </div>
        ) : (
          <div className="relative">
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[
                Autoplay({
                  delay: 4500,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent className="flex items-stretch">
                {data.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-transparent hover:border-primary/20 h-full">
                      <div className="h-56 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.26em] mb-3">{item.metaHeading}</p>
                        <h2 className="text-2xl font-serif font-bold mb-3">{item.title}</h2>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-6">{item.metaDescription}</p>
                        <Button asChild variant="ghost" className="text-primary px-0">
                          <Link href={`/blog/${item.id}`}>
                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
