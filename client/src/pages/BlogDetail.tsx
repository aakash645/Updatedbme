import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import type { Blog } from "@shared/schema";

const DEFAULT_IMAGE = "/bme4_1773052578114.jpeg";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Blog>({
    queryKey: ["/api/blogs", id],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${id}`);
      if (!res.ok) throw new Error("Failed to load blog");
      return res.json();
    },
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="pt-2">
        <Skeleton className="h-[38vh] w-full" />
        <div className="container mx-auto px-6 py-10 max-w-2xl space-y-5">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <h2 className="text-2xl font-serif font-bold mb-4">Blog not found</h2>
        <Button asChild variant="outline">
          <Link href="/blog">← Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-background">
      <section className="relative h-[38vh] md:h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.imageUrl || DEFAULT_IMAGE}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-4 backdrop-blur-sm uppercase tracking-widest">
            Blog
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-3xl leading-tight">
            {data.title}
          </h1>
          <p className="text-sm text-white/70 mt-3 max-w-2xl">{data.metaHeading}</p>
          <div className="flex items-center gap-2 text-white/70 mt-4 text-sm">
            <Calendar className="w-4 h-4" />
            {data.publishedAt ? format(new Date(data.publishedAt), "MMMM dd, yyyy") : "Recent"}
          </div>
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <Button asChild variant="ghost" className="mb-4 -ml-2 text-muted-foreground hover:text-primary">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
          </Button>

          <div className="space-y-8">
            {/* <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src={data.imageUrl || DEFAULT_IMAGE} alt={data.title} className="w-full h-[420px] object-cover" />
            </div> */}

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground font-semibold">{data.metaDescription}</p>
              <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">{data.description}</p>
              <div className="mt-8 whitespace-pre-wrap text-justify">{data.content}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
