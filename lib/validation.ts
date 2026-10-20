import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const optionalEmail = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .optional()
  .or(z.literal(""));

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid phone number, including the country code"),
  email: optionalEmail,
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more, at least 10 characters")
    .max(2000, "Message is too long"),
  propertySlug: z.string().max(200).optional(),
  propertyTitle: z.string().max(200).optional(),
  /** Honeypot. Real visitors never see or fill this field. */
  website: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  website: z.string().optional(),
});

export const apiSchema = z.discriminatedUnion("type", [
  enquirySchema.extend({ type: z.literal("enquiry") }),
  newsletterSchema.extend({ type: z.literal("newsletter") }),
]);

export type EnquiryValues = z.infer<typeof enquirySchema>;
export type NewsletterValues = z.infer<typeof newsletterSchema>;
export type ApiPayload = z.infer<typeof apiSchema>;
