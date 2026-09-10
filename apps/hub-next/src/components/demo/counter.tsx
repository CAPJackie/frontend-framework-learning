"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * LOCAL state only — the classic useState counter. Nothing global here; this is
 * the minimal reactivity example to contrast with the global todo store.
 */
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => setCount((c) => c - 1)}>
        −
      </Button>
      <span className="min-w-10 text-center text-lg font-semibold tabular-nums">{count}</span>
      <Button variant="outline" size="sm" onClick={() => setCount((c) => c + 1)}>
        +
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setCount(0)}>
        reset
      </Button>
      <span className="text-xs text-muted-foreground">local useState</span>
    </div>
  );
}
