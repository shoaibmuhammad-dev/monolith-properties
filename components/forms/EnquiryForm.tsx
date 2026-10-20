"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClasses } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Icons";
import { enquirySchema, type EnquiryValues } from "@/lib/validation";
import { Field, inputClasses } from "./Field";

interface Props {
  idPrefix: string;
  propertySlug?: string;
  propertyTitle?: string;
  submitLabel?: string;
  /** Optional WhatsApp link shown after a successful submission. */
  whatsappHref?: string;
}

type Status = "idle" | "success" | "error";

export function EnquiryForm({ idPrefix, propertySlug, propertyTitle, submitLabel = "Send enquiry", whatsappHref }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: propertyTitle ? `I'd like more information about ${propertyTitle}.` : "",
      website: "",
    },
  });
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(values: EnquiryValues) {
    setStatus("idle");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "enquiry", propertySlug, propertyTitle }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "We couldn't send your message. Please try again or contact us on WhatsApp.");
      }
      reset();
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded border border-black p-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-white">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl leading-snug font-semibold">Thank you, we have your enquiry</h3>
        <p className="mt-2 text-sm text-neutral-600">
          An agent will reply within one working day. For a faster answer, message us on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "md", "w-full")}>
              Continue on WhatsApp
            </a>
          ) : null}
          <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("outline", "md", "w-full")}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const id = (name: string) => `${idPrefix}-${name}`;
  const describedBy = (name: keyof EnquiryValues) => (errors[name] ? `${id(name)}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5" aria-busy={isSubmitting}>
      <Field id={id("name")} label="Full name" error={errors.name?.message}>
        <input
          id={id("name")}
          type="text"
          autoComplete="name"
          className={inputClasses}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          {...register("name")}
        />
      </Field>
      <Field id={id("phone")} label="Phone or WhatsApp" error={errors.phone?.message}>
        <input
          id={id("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+971 50 000 0000"
          className={inputClasses}
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy("phone")}
          {...register("phone")}
        />
      </Field>
      <Field id={id("email")} label="Email" optional error={errors.email?.message}>
        <input
          id={id("email")}
          type="email"
          autoComplete="email"
          className={inputClasses}
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          {...register("email")}
        />
      </Field>
      <Field id={id("message")} label="Message" error={errors.message?.message}>
        <textarea
          id={id("message")}
          rows={5}
          className={`${inputClasses} resize-y py-3`}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded border border-black p-4 text-sm font-medium">
          {serverError}
        </p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className={buttonClasses("primary", "lg", "w-full")}>
        {isSubmitting ? (
          <>
            <Spinner className="size-5" /> Sending…
          </>
        ) : (
          submitLabel
        )}
      </button>
      <p className="text-xs text-neutral-500">
        We only use your details to reply to this enquiry. We never share them with third parties.
      </p>
    </form>
  );
}
