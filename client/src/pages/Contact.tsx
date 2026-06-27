import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";
import bme10 from "@assets/bme10_1773052578117.jpeg";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with the apex body of non-ferrous metals. We are here to assist you."
        backgroundImage={copperMetalImg}
        category="Get in Touch"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Registered Office</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground font-medium">
                        Bharat Metal Exchange Ltd.<br />
                        BME House, 88/90, 1st Floor,<br />
                        Kika Street, Gulalwadi,<br />
                        Mumbai - 400 004, Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground font-medium">022 4960 5039<br />022 2242 1964</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground font-medium">info@bme.in<br />membership@bme.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ExternalLink className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Website</h4>
                      <p className="text-muted-foreground font-medium">www.bme.in</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-8 rounded-3xl border-2 border-primary/20">
                <h3 className="text-xl font-serif font-bold mb-6 text-foreground">Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground font-semibold">Monday - Friday</span>
                    <span className="font-bold text-foreground">10:30 AM - 06:30 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground font-semibold">Saturday</span>
                    <span className="font-bold text-foreground">10:30 AM - 02:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground font-semibold">Sunday & Holidays</span>
                    <span className="font-bold text-destructive">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl border-2 border-primary/10 relative sticky top-24">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Send an Inquiry</h2>
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="w-full h-[300px] md:h-[500px] bg-muted relative">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7633033865676!2d72.82868!3d19.02263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e8e8e8e8ed%3A0x3be7c8e8e8e8e8ed!2s88%2F90%20Tower%20Building%2C%201st%20Floor%2C%20Kika%20Street%2C%20Gulalwadi%2C%20Mumbai%20400004!5e0!3m2!1sen!2sin!4v1234567890"
        ></iframe>
      </section>
    </div>
  );
}
