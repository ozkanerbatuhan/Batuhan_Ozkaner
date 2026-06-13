import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "mono" | "accent";

const variants: Record<Variant, string> = {
  default: "bg-muted text-muted-foreground border border-border",
  outline: "border border-border text-foreground",
  accent:
    "border border-primary/30 bg-primary/10 text-primary",
  mono: "border border-border bg-muted/50 text-foreground font-mono",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
