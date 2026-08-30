import { Suspense } from "react";
import OffresPageClient from "@/components/OffresPageClient";

export default function OffresPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric border-t-transparent" />
        </div>
      }
    >
      <OffresPageClient />
    </Suspense>
  );
}
