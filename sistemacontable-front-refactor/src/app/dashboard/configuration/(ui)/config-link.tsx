import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ConfigMenuLinkProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

export const ConfigMenuLink = ({
  title,
  description,
  icon: Icon,
  href,
  isActive = false,
}: ConfigMenuLinkProps) => {
  return (
    <Link href={href} passHref>
      <Card
        className={cn(
          "flex items-start gap-4 p-4 cursor-pointer w-full transition-all",
          "hover:shadow-md hover:bg-accent hover:text-accent-foreground",
          isActive && "border border-primary bg-muted text-primary"
        )}
      >
        <div className="mt-1 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  );
};