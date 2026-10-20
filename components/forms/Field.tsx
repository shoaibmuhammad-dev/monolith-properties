import { cn } from "@/lib/utils";

export const inputClasses =
  "min-h-12 w-full rounded border border-neutral-300 bg-white px-4 text-base text-black placeholder:text-neutral-400 transition-colors focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black aria-[invalid=true]:border-black aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-black";

export function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {optional ? <span className="font-normal text-neutral-500"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className={cn("mt-2 text-sm font-medium text-black")}>
          <span aria-hidden="true" className="mr-1.5 inline-block size-1.5 rounded-full bg-black align-middle" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
