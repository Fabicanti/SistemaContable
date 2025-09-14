import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

type Props = {
  showSearch?: boolean;
  columns?: number;
  rows?: number;
}

export default function SkeletonDataTable({ columns = 4, rows = 5, showSearch = true }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {showSearch && (
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 md:w-60 w-40" />
            <Skeleton className="h-8 w-24" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={i} className="p-2 text-left text-sm font-medium text-muted-foreground">
                    <Skeleton className="h-4 w-24" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
