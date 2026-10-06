import Link from "next/link";
import { cn } from "@/lib/utils";

interface ConfigMenuLinkProps {
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

export function ConfigMenuLink({
  title,
  shortTitle,
  description,
  icon: Icon,
  href,
  isActive = false,
}: ConfigMenuLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex min-w-0 items-center justify-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:items-start md:justify-start md:p-4",
        isActive
          ? "border-primary/25 bg-primary/5 text-foreground shadow-sm"
          : "border-transparent text-muted-foreground",
      )}
    >
      <Icon className="size-5 shrink-0 md:mt-0.5" aria-hidden="true" />
      <div className="min-w-0">
        <span className="text-sm font-medium md:hidden">{shortTitle}</span>
        <span className="hidden text-sm font-semibold md:block">{title}</span>
        <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground md:block">
          {description}
        </p>
      </div>
    </Link>
  );
}
