import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import copperMetalImg from "@assets/Moffatt-Scrap-Iron-Metal-Campbellville-non-ferrous_1773218278459.jpg";

export default function CancellationPolicy() {
  return (
    <div className="flex flex-col w-full">
      <PageHero 
        title="Cancellation Policy" 
        subtitle="Guidelines for canceling your participation or registration"
        backgroundImage={copperMetalImg}
        category="Legal"
      />

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-8">
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">4.1 Participant Cancellation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Participants may cancel participation; however, no refunds shall be provided. Substitutions may be permitted at BME's discretion.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">4.2 BME Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  BME reserves the right to cancel, reschedule, or modify events, including changing format or venue, without liability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">4.3 No-show</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Failure to attend shall be treated as a no-show and shall not entitle the participant to any refund or credit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">4.4 Force Majeure Cancellation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In case of force majeure, BME may offer credits at its discretion but shall not be obligated to provide refunds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-primary/5 p-8">
              <p className="text-sm font-semibold text-primary mb-2">Substitution Request:</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you need to substitute your participation with another representative from your organization, please submit your request to info@bme.in with both the original and substitute participant details.
              </p>
              <p className="text-sm font-semibold text-primary mb-2">Cancellation Notice:</p>
              <p className="text-muted-foreground leading-relaxed">
                For any cancellation requests, please provide written notice to BME at least 15 days before the event date.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
