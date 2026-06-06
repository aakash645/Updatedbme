import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Mail, Linkedin } from "lucide-react";
import bme4 from "@assets/bme4_1773052578114.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

// Import images
import sushilKothariImg from "@assets/Sushil_Kothari_F_1773049201801.jpg";
import rikabMehtaImg from "@assets/Rikab_Mehta_1_1773049201800.png";
import manishJainImg from "@assets/Manish_Jain_1773049201799.jpg";
import atulGoyalImg from "@assets/Atul_Goyal_1773049201794.png";
import alpeshMunotImg from "@assets/alpesh_munot_1773049201793.png";
import abhineetAggarwalImg from "@assets/Abhineet_Aggarwal_F_1773049201792.png";
import gautamParoliaImg from "@assets/Gautam_Parolia_1773049201798.jpg";

const teamMembers = [
  {
    name: "Shri Sushil R. Kothari",
    role: "President",
    category: "Office Bearer",
    image: sushilKothariImg
  },
  {
    name: "Shri Rikab V. Mehta",
    role: "Chairman Emeritus",
    category: "Office Bearer",
    image: rikabMehtaImg
  },
  {
    name: "Shri Manish P. Jain",
    role: "Vice President",
    category: "Office Bearer",
    image: manishJainImg
  },
  {
    name: "Shri Atul L. Goyal",
    role: "Hon. Secretary / Director",
    category: "Board Member",
    image: atulGoyalImg
  },
  {
    name: "Shri Alpesh P. Munot",
    role: "Treasurer / Director",
    category: "Board Member",
    image: alpeshMunotImg
  },
  {
    name: "Shri Abhineet V. Aggarwal",
    role: "Director",
    category: "Board Member",
    image: abhineetAggarwalImg
  },
  {
    name: "Shri Gautam P. Parolia",
    role: "Director",
    category: "Board Member",
    image: gautamParoliaImg
  },
];

export default function Team() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Our Team" 
        subtitle="Meet the visionary leaders and dedicated professionals driving the BME legacy forward."
        backgroundImage={copperMetalImg}
        category="Leadership"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Governance</h2>
            <h3 className="text-4xl font-serif font-bold">Office Bearers & Directors</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {teamMembers.map((member, i) => (
              <Card key={i} className="group overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform">
                    <div className="flex gap-4">
                      <Mail className="w-5 h-5 cursor-pointer hover:text-primary" />
                      <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 md:p-8 text-center">
                  <h4 className="text-base md:text-2xl font-serif font-bold mb-1">{member.name}</h4>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-4">{member.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
