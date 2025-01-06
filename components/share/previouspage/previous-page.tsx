"use client";

import { Button } from "@/components/ui/button";

export default function PreviousPage() {
  return (
    <Button
      variant={"outline"}
      className="mt-4 ml-2"
      onClick={() => window.history.back()}
    >
      &larr; Back
    </Button>
  );
}
