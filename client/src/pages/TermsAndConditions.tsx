import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Terms and Conditions" 
        subtitle="Legal terms governing the use of BME platforms and services"
        backgroundImage={copperMetalImg}
        category="Legal"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-8">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.1 Binding Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing BME platforms or participating in events, users agree to be legally bound by these Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.2 Membership Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Membership approval is at BME's sole discretion. Misrepresentation or misconduct may result in suspension or termination without refund.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.3 Event Participation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Participants must comply with all event guidelines, venue rules, and applicable laws. BME reserves the right to deny access.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.4 Stall and Sponsorship Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Stall allocation, branding, and benefits are subject to availability and BME discretion. No guarantees of business outcomes or leads are provided.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.5 Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All payments must be completed prior to confirmation. Applicable taxes including GST shall be borne by the participant.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.6 Razorpay Payment Clause</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Payments are facilitated via Razorpay. Users agree to Razorpay's terms. BME shall not be liable for failed, delayed, or unauthorized transactions due to gateway or banking issues.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.7 Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  BME shall not be liable for indirect, incidental, consequential, or business losses arising from use of services or participation in events.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.8 Indemnity</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Users agree to indemnify and hold harmless BME from any claims, damages, or liabilities arising from their actions or participation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.9 Force Majeure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  BME shall not be liable for failure or delay caused by events beyond its control including natural disasters, government restrictions, or pandemics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">2.10 Jurisdiction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
