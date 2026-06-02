import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Building2, Calendar, FileText, CheckCircle2 } from "lucide-react";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Sharp inputs, monospace labels, high contrast, clean validation, success state with tactile feel.
*/

const quoteFormSchema = zod.object({
  name: zod.string().min(2, "Full name is required"),
  phone: zod.string().min(10, "Valid phone number is required"),
  email: zod.string().email("Valid email address is required"),
  address: zod.string().min(5, "Property address is required"),
  propertyType: zod.string().min(1, "Please select a property type"),
  sqft: zod.string().min(1, "Approximate square footage is required"),
  buildingsCount: zod.string().min(1, "Number of buildings/units is required"),
  yearBuilt: zod.string().optional(),
  purpose: zod.string().min(1, "Please specify the purpose of inspection"),
  desiredDate: zod.string().min(1, "Please select a desired inspection date"),
  message: zod.string().optional(),
});

type QuoteFormValues = zod.infer<typeof quoteFormSchema>;

export default function CommercialQuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      propertyType: "",
      sqft: "",
      buildingsCount: "1",
      yearBuilt: "",
      purpose: "",
      desiredDate: "",
      message: "",
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitting(true);
    // Simulate API request - ready for Codex to connect later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setIsSubmitted(true);
    toast.success("Commercial quote request submitted successfully!");
    console.log("Commercial Quote Request Data:", data);
  };

  const handleReset = () => {
    reset();
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="border border-primary/40 bg-card p-8 md:p-12 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="border border-primary p-4 mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h3 className="font-serif text-2xl mb-4 text-white uppercase tracking-wider">
          Request Received
        </h3>
        <p className="text-xs text-muted-foreground max-w-md leading-relaxed font-sans mb-8">
          Thank you for requesting a commercial inspection quote. Patrick Murphy, CMI, will review your property details and contact you within 24 hours to discuss scope, pricing, and scheduling.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href="tel:916-432-0332"
            className="border border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors flex items-center justify-center gap-2"
          >
            Call ProSpec Direct
          </a>
          <Button
            onClick={handleReset}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase px-6 py-3"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-border/80 bg-card/40 p-6 md:p-10 max-w-4xl mx-auto flex flex-col gap-6"
    >
      <div className="border-b border-border/60 pb-6 mb-2">
        <h3 className="font-serif text-xl text-white tracking-wider uppercase mb-2">
          Commercial Quote Request
        </h3>
        <p className="text-xs text-muted-foreground font-sans">
          Provide your property specifications below. Patrick Murphy will review the scope of work and deliver a detailed custom proposal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold mb-1">
            01. Contact Information
          </span>
          
          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
              Full Name *
            </label>
            <Input
              {...register("name")}
              placeholder="e.g. John Doe"
              className="bg-background border-border/60 focus:border-primary text-xs h-11"
            />
            {errors.name && (
              <p className="text-[10px] text-destructive mt-1 font-mono">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
              Phone Number *
            </label>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="e.g. (916) 555-0199"
              className="bg-background border-border/60 focus:border-primary text-xs h-11"
            />
            {errors.phone && (
              <p className="text-[10px] text-destructive mt-1 font-mono">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
              Email Address *
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="e.g. john@company.com"
              className="bg-background border-border/60 focus:border-primary text-xs h-11"
            />
            {errors.email && (
              <p className="text-[10px] text-destructive mt-1 font-mono">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Property Specs */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold mb-1">
            02. Property Specifications
          </span>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
              Property Address *
            </label>
            <Input
              {...register("address")}
              placeholder="e.g. 123 Commercial Way, Sacramento, CA"
              className="bg-background border-border/60 focus:border-primary text-xs h-11"
            />
            {errors.address && (
              <p className="text-[10px] text-destructive mt-1 font-mono">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
                Property Type *
              </label>
              <select
                {...register("propertyType")}
                className="w-full bg-background border border-border/60 focus:border-primary text-xs h-11 px-3 text-white focus:outline-none"
              >
                <option value="" className="bg-background text-muted-foreground">Select Type...</option>
                <option value="office" className="bg-background">Office Building</option>
                <option value="retail" className="bg-background">Retail Space</option>
                <option value="warehouse" className="bg-background">Industrial / Warehouse</option>
                <option value="multifamily" className="bg-background">Multi-Family / Apartment</option>
                <option value="mixeduse" className="bg-background">Mixed-Use</option>
                <option value="other" className="bg-background">Other Commercial</option>
              </select>
              {errors.propertyType && (
                <p className="text-[10px] text-destructive mt-1 font-mono">{errors.propertyType.message}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
                Approx. Sq. Footage *
              </label>
              <Input
                {...register("sqft")}
                placeholder="e.g. 12,500"
                className="bg-background border-border/60 focus:border-primary text-xs h-11"
              />
              {errors.sqft && (
                <p className="text-[10px] text-destructive mt-1 font-mono">{errors.sqft.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
                Number of Buildings *
              </label>
              <Input
                {...register("buildingsCount")}
                type="number"
                min="1"
                className="bg-background border-border/60 focus:border-primary text-xs h-11"
              />
              {errors.buildingsCount && (
                <p className="text-[10px] text-destructive mt-1 font-mono">{errors.buildingsCount.message}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
                Year Built (If Known)
              </label>
              <Input
                {...register("yearBuilt")}
                placeholder="e.g. 1998"
                className="bg-background border-border/60 focus:border-primary text-xs h-11"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold mb-1">
            03. Inspection Purpose
          </span>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
              Purpose of Inspection *
            </label>
            <select
              {...register("purpose")}
              className="w-full bg-background border border-border/60 focus:border-primary text-xs h-11 px-3 text-white focus:outline-none"
            >
              <option value="" className="bg-background text-muted-foreground">Select Purpose...</option>
              <option value="acquisition" className="bg-background">Pre-Purchase / Acquisition</option>
              <option value="listing" className="bg-background">Pre-Listing / Seller Due Diligence</option>
              <option value="refinance" className="bg-background">Lender / Refinancing Requirement</option>
              <option value="lease" className="bg-background">Triple-Net (NNN) Lease Review</option>
              <option value="maintenance" className="bg-background">Deferred Maintenance Assessment</option>
            </select>
            {errors.purpose && (
              <p className="text-[10px] text-destructive mt-1 font-mono">{errors.purpose.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold mb-1">
            04. Scheduling
          </span>

          <div>
            <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
              Desired Inspection Date *
            </label>
            <div className="relative">
              <Input
                {...register("desiredDate")}
                type="date"
                className="bg-background border-border/60 focus:border-primary text-xs h-11 px-3 text-white appearance-none"
              />
            </div>
            {errors.desiredDate && (
              <p className="text-[10px] text-destructive mt-1 font-mono">{errors.desiredDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-4 mt-2">
        <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold mb-1">
          05. Additional Details
        </span>
        <div>
          <label className="block font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-1.5">
            Scope of Work / Special Instructions
          </label>
          <Textarea
            {...register("message")}
            rows={4}
            placeholder="Please detail any specific areas of concern, lease structures, or special reporting requirements (e.g., ASTM E2018 standards)."
            className="bg-background border-border/60 focus:border-primary text-xs resize-none"
          />
        </div>
      </div>

      <div className="border-t border-border/60 pt-6 mt-4 flex justify-between items-center flex-col sm:flex-row gap-4">
        <span className="text-[10px] text-muted-foreground font-mono">
          * Indicates a required field
        </span>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold w-full sm:w-auto"
        >
          {submitting ? "Processing..." : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  );
}
