import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import { CheckCircle2, Building2, UserPlus, FileCheck, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

const BENEFITS = [
  "Access to Benchmark Pricing for Copper & Zinc",
  "Powerful Representation in FICCI, ASSOCHAM, and IMC",
  "Arbitration & Mediation services for trade disputes",
  "Invitations to National & International Trade Fairs",
  "Real-time market updates via BME App (Launching Soon)",
  "Networking with 800+ industry leaders across India",
];

const CATEGORIES = [
  { cat: "Annual Membership",        desc: "Year-on-year membership with regular market access, pricing updates, and participation in BME events and conferences." },
  { cat: "Life Membership",          desc: "Lifetime membership with all privileges, priority access to events, and perpetual market intelligence benefits." },
  { cat: "International Membership", desc: "For overseas trading partners and exporters to access BME market data, benchmarks, and global trade networking." },
];

const MEMBER_TYPES = [
  { icon: Building2, label: "Industries", sub: "Manufacturing & Trading",  color: "text-primary", bg: "bg-primary/10 border-primary/30" },
  { icon: UserPlus,  label: "Traders",    sub: "Metals & Import/Export",   color: "text-accent",  bg: "bg-accent/10 border-accent/30" },
  { icon: FileCheck, label: "Brokers",    sub: "Trading & Dealership",     color: "text-primary", bg: "bg-primary/10 border-primary/30" },
  { icon: Zap,       label: "Exporters",  sub: "Global Trade Partners",    color: "text-accent",  bg: "bg-accent/10 border-accent/30" },
];

export default function Membership() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        title="Become a Member"
        subtitle="Join the most influential network of non-ferrous metal traders and industries in India."
        backgroundImage={copperMetalImg}
        category="Join BME"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">

          {/* Why Join + Member type cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold">Why Join BME?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Membership with Bombay Metal Exchange Ltd. offers unparalleled access to market
                intelligence, government representation, and a nationwide network of industry
                leaders spanning over 800+ active member organizations.
              </p>
              <ul className="space-y-4">
                {BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/membership/apply">
                <Button size="lg" className="bg-primary text-white rounded-full px-10 hover:bg-primary/90 gap-2">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {MEMBER_TYPES.map(({ icon: Icon, label, sub, color, bg }) => (
                <Card key={label} className={`border-2 ${bg} p-4 md:p-8 text-center hover:shadow-lg transition-all`}>
                  <Icon className={`w-10 h-10 md:w-12 md:h-12 ${color} mx-auto mb-3 md:mb-4`} />
                  <h4 className="font-bold font-serif text-base md:text-lg">{label}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">{sub}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Membership Categories */}
          <div className="mt-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-bold mb-4">Membership Categories</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Flexible membership options designed to meet the needs of organizations at all scales
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {CATEGORIES.map((item, i) => (
                <Card key={i} className="border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-serif font-bold mb-3">{item.cat}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/membership/apply">
                <Button size="lg" className="bg-primary text-white rounded-full px-12 hover:bg-primary/90 gap-2">
                  Apply for Membership <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}