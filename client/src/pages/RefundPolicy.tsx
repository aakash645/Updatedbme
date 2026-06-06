import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function RefundPolicy() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Refund Policy" 
        subtitle="Understanding refunds and reimbursements"
        backgroundImage={copperMetalImg}
        category="Legal"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-8">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Refund Policy Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All payments made to BME are strictly non-refundable except under exceptional circumstances determined solely by BME.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">3.1 Event Fees</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Delegate passes, stall bookings, and sponsorship fees are non-refundable once confirmed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">3.2 Exceptions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Refunds may be granted for duplicate transactions, technical errors, or event cancellation by BME.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">3.3 Refund Processing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Approved refunds shall be processed within 15–30 working days via the original payment method.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-primary/5 p-8">
              <p className="text-sm font-semibold text-primary mb-2">Important Note:</p>
              <p className="text-muted-foreground leading-relaxed">
                For any refund inquiries or to request an exception, please contact BME directly at info@bme.in or call 022 4960 5039 with your transaction details.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
