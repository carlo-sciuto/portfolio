import { Card } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="h-48 bg-muted" />
        <div className="p-6 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-muted rounded" />
            <div className="h-3 bg-muted rounded w-5/6" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SkeletonText({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
      <div className="h-4 bg-muted rounded w-4/6" />
    </div>
  );
}

export function SkeletonSection() {
  return (
    <section className="py-12">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-1/4 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  );
}
