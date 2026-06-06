import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import bme12 from "@assets/bme12_1773052578118.jpeg";
import hemantPareikhImg from "@assets/Hemant_K_Parekh_1773057523566.png";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

// Import images
import sushilKothariImg from "@assets/Sushil_Kothari_F_1773049201801.jpg";
import rikabMehtaImg from "@assets/Rikab_Mehta_1_1773049201800.png";
import mahendraKMehtaImg from "@assets/mk_mehta_1773049438092.png";
import manishJainImg from "@assets/Manish_Jain_1773049201799.jpg";
import atulGoyalImg from "@assets/Atul_Goyal_1773049201794.png";
import alpeshMunotImg from "@assets/alpesh_munot_1773049201793.png";
import mihirParaikhImg from "@assets/Mihir_Parikh_ai-removebg-preview_1773049201800.png";
import sandeepJainImg from "@assets/sandeep_Jain_1773049201801.png";
import abhineetAggarwalImg from "@assets/Abhineet_Aggarwal_F_1773049201792.png";
import amitSangaiImg from "@assets/Amieet_Sangai_1773049201794.png";
import gautamParoliaImg from "@assets/Gautam_Parolia_1773049201798.jpg";
import gautamJainImg from "@assets/GaUTAM_jAIN_1773049201797.jpg";
import chiragMajithiaImg from "@assets/Chirag_Majithia_2_1773049201795.jpg";
import akashShahImg from "@assets/aKASH_sHAH_1773049201793.jpg";

export default function Directors() {
  const officeBarers = [
    { name: "Shri Sushil R. Kothari", role: "President", image: sushilKothariImg },
    { name: "Shri Rikab V. Mehta", role: "Chairman Emeritus", image: rikabMehtaImg },
    { name: "Shri Mahendra K. Mehta", role: "Sr. Vice President", image: mahendraKMehtaImg },
    { name: "Shri Manish P. Jain", role: "Vice President", image: manishJainImg },
    { name: "Shri Atul L. Goyal", role: "Hon. Secretary / Director", image: atulGoyalImg },
    { name: "Shri Alpesh P. Munot", role: "Treasurer / Director", image: alpeshMunotImg },
    { name: "Shri Mihir R. Parikh", role: "Hon. Jt. Secretary / Director", image: mihirParaikhImg },
    { name: "Shri Sandeep T. Jain", role: "Imm. Past President / Director", image: sandeepJainImg },
  ];

  const directors = [
    { name: "Shri Hemant K. Parekh", role: "Past President / Director", image: hemantPareikhImg },
    { name: "Shri Abhineet V. Aggarwal", role: "Director", image: abhineetAggarwalImg },
    { name: "Shri Amit R. Sangai", role: "Director", image: amitSangaiImg },
    { name: "Shri Gautam P. Parolia", role: "Director", image: gautamParoliaImg },
    { name: "Shri Gautam N. Jain", role: "Director", image: gautamJainImg },
    { name: "Shri Chirag D. Majithia", role: "Director", image: chiragMajithiaImg },
    { name: "Shri Akash S. Shah", role: "Director", image: akashShahImg },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Board of Directors" 
        subtitle="Visionary leaders guiding BME towards a sustainable future."
        backgroundImage={copperMetalImg}
        category="Governance"
      />

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="bg-gradient-dark text-white rounded-3xl p-10 md:p-16 mb-24 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-3xl font-serif font-bold mb-6 text-primary">Commitment to Excellence</h3>
            <p className="text-lg leading-relaxed text-white/80 mb-8">
              Our board members uphold the ideals of BME's forebearers, ensuring we remain at the forefront of innovation while honoring over 90 years of tradition and excellence in the non-ferrous metals industry.
            </p>
          </div>
        </div>

        {/* Office Bearers */}
        <div className="mb-24">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Office Bearers</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {officeBarers.map((member, i) => (
              <Card key={i} className="group border-none shadow-xl hover:shadow-2xl transition-all overflow-hidden bg-white">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4 md:p-6 text-center">
                  <h4 className="text-sm md:text-lg font-serif font-bold text-foreground mb-1 line-clamp-2">{member.name}</h4>
                  <p className="text-xs md:text-sm text-primary font-semibold leading-relaxed">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Board Directors */}
        <div>
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Board Directors</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {directors.map((member, i) => (
              <Card key={i} className="group border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4 md:p-6 text-center">
                  <h4 className="text-sm md:text-lg font-serif font-bold text-foreground mb-1 line-clamp-2">{member.name}</h4>
                  <p className="text-xs md:text-sm text-accent font-semibold leading-relaxed">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
