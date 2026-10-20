"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/Icons";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation";
import { inputClasses } from "./Field";

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", website: "" },
  });
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function onSubmit(values: NewsletterValues) {
    setMessage(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "newsletter" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not subscribe. Please try again.");
      reset();
      setMessage({ kind: "success", text: "You're subscribed. Watch your inbox for new listings." });
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof Error ? err.message : "Could not subscribe." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          className={inputClasses}
          aria-invalid={!!errors.email}
          aria-describedby="newsletter-feedback"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
        >
          {isSubmitting ? <Spinner className="size-5" /> : "Subscribe"}
        </button>
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <p id="newsletter-feedback" role={errors.email || message?.kind === "error" ? "alert" : "status"} className="mt-2 min-h-5 text-sm font-medium">
        {errors.email?.message ?? message?.text}
      </p>
    </form>
  );
}
