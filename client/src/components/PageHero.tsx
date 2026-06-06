interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  category?: string;
}

export default function PageHero({ title, subtitle, backgroundImage, category }: PageHeroProps) {
  return (
    <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        {category && (
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold text-sm mb-6 backdrop-blur-sm uppercase tracking-widest">
            {category}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
