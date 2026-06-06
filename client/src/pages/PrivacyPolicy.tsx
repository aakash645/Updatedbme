import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Privacy Policy" 
        subtitle="How we collect, use, and protect your information"
        backgroundImage={copperMetalImg}
        category="Legal"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Effective Date: 01/03/2026</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  This Privacy Policy ("Policy") governs the manner in which Bombay Metal Exchange ("BME") collects, uses, processes, stores, and discloses information collected from users, members, sponsors, exhibitors, and event participants.
                </p>
              </div>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1. Scope</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This Policy applies to all users of BME's website, mobile application, membership systems, and event platforms including BME Conclave 2026.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.2 Information Collected</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BME may collect personal information (name, contact details), business information (company name, GST, product categories), transactional data (payments, invoices), and technical data (IP address, device, cookies).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.3 Lawful Basis</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Data is processed for contractual necessity, legal compliance, legitimate business interests, and user consent where applicable.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.4 Usage of Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Information is used for member management, event execution, stall allocation, sponsorship visibility, communication, analytics, and compliance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.5 Data Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BME may share information with service providers, event partners, payment gateways (including Razorpay), and authorities where legally required.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.6 Media and Publicity Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By participating in events, users grant BME irrevocable rights to capture and use their name, likeness, company identity, and branding for promotional purposes without compensation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.7 Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BME retains data only as long as necessary for operational, legal, and compliance purposes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.8 Security Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    While BME implements reasonable safeguards, it shall not be liable for unauthorized access beyond its control.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">1.9 User Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Users may request access, correction, or deletion of personal data by written request to BME.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
