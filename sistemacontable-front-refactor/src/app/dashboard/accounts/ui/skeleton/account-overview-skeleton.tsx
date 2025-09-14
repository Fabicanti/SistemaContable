import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCuentasOverview() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>

        <div className="rounded-md border p-4 bg-muted/50 space-y-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="rounded-md border p-4 bg-muted/50 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}