import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import type { InquiryInput } from "@shared/routes";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function InquiryForm() {
  const { toast } = useToast();

  const form = useForm<any>({
    resolver: zodResolver(api.inquiries.create.input),
    defaultValues: {
      name: "",
      contactNumber: "",
      email: "",
      companyName: "",
      message: "",
      becomeMember: false,
      acceptTerms: false,
      whatsappupdates:false,
    },
  });

  const mutation = useCreateInquiry();

  function onSubmit(data: any) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Success!",
          description:
            "Your inquiry has been submitted to info@bme.in. We'll get back to you soon.",
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description:
            "Failed to submit your inquiry. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      },
    });
  }

  const isSubmitting = mutation.isPending;
  const isSuccess = mutation.isSuccess;

  return (
    <Card className="shadow-xl border-t-4 border-t-primary bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Get in Touch</CardTitle>
        <CardDescription>
          Have questions about membership, pricing, or our services? Drop us a line and we'll respond to info@bme.in
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess && !mutation.isPending ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-foreground">
              Thank You!
            </h3>
            <p className="text-muted-foreground">
              Your inquiry has been successfully submitted.
            </p>
            <Button
              onClick={() => {
                form.reset();
                mutation.reset();
              }}
              variant="outline"
              className="rounded-full px-8"
            >
              Send Another Inquiry
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
  onSubmit={form.handleSubmit(onSubmit)}
  className="space-y-6"
>
  {/* GRID START */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* FULL NAME */}
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-sm">
            Full Name
          </FormLabel>
          <FormControl>
            <Input
              placeholder="John Doe"
              className="h-12 rounded-xl bg-muted/40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* CONTACT NUMBER */}
    <FormField
      control={form.control}
      name="contactNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-sm">
            Contact Number
          </FormLabel>
          <FormControl>
            <Input
              type="tel"
              placeholder="+91 9876543210"
              className="h-12 rounded-xl bg-muted/40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* EMAIL */}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-sm">
            Email Address
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="john@example.com"
              className="h-12 rounded-xl bg-muted/40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* COMPANY NAME */}
    <FormField
      control={form.control}
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-sm">
            Company Name
          </FormLabel>
          <FormControl>
            <Input
              placeholder="ABC Metals Pvt Ltd"
              className="h-12 rounded-xl bg-muted/40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

  </div> 
  <FormField
      control={form.control}
      name="becomeMember"
      render={({ field }) => (
        <FormItem className="flex items-center space-x-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="font-normal cursor-pointer text-sm">
            I would like to become a member
          </FormLabel>
        </FormItem>
      )}
    />

  {/* MESSAGE FULL WIDTH */}
  <FormField
    control={form.control}
    name="message"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-semibold text-sm">
          Message
        </FormLabel>
        <FormControl>
          <Textarea
            placeholder="How can we help you?"
            className="min-h-[80px] rounded-xl bg-muted/40 resize-none"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* CHECKBOXES */}
  <div className="space-y-4">
    <FormField
      control={form.control}
      name="whatsappupdates"
      render={({ field }) => (
        <FormItem className="flex items-center space-x-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="font-normal cursor-pointer text-sm">
            I would agree to recieve whatsapp updates & Newsletters
          </FormLabel>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex items-start space-x-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-1"
            />
          </FormControl>
          <FormLabel className="font-normal cursor-pointer text-sm leading-relaxed">
            I agree to the collection of my data and accept the Terms & Conditions.
          </FormLabel>
        </FormItem>
      )}
    />
  </div>

  {/* SUBMIT */}
  <Button
    type="submit"
    disabled={isSubmitting}
    className="w-full h-14 rounded-xl text-base font-semibold shadow-lg"
  >
    {isSubmitting ? (
      <>
        <div className="animate-spin">⏳</div>
        Submitting...
      </>
    ) : (
      <>
        Submit Inquiry
        <Send className="w-4 h-4" />
      </>
    )}
  </Button>
</form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}