import { Skeleton } from "@/components/ui/skeleton"

export function ProductosPopulares() {
  return (
    <div className="flex flex-row flex-wrap space-x-3 w-full justify-center p-5 -z-1">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="mb-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-indigo-400" />
          <div className="space-y-3 mt-2">
            <Skeleton className="h-4 w-[250px] bg-indigo-400" />
            <Skeleton className="h-4 w-[200px] bg-indigo-400" />
          </div>
        </div>
      ))}
    </div>
  )
}