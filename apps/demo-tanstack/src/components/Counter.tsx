import { useState } from "react";

// LOCAL state — plain React useState, same as the Next hub. TanStack Start
// components are universal (SSR + hydrate), so no directive is needed.
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <button className="lab-btn" onClick={() => setCount((c) => c - 1)}>
        −
      </button>
      <span
        style={{ minWidth: "2.5rem", textAlign: "center", fontSize: "1.1rem", fontWeight: 600 }}
      >
        {count}
      </span>
      <button className="lab-btn" onClick={() => setCount((c) => c + 1)}>
        +
      </button>
      <button className="lab-btn" onClick={() => setCount(0)}>
        reset
      </button>
      <span style={{ fontSize: "0.75rem", color: "var(--lab-muted)" }}>useState local state</span>
    </div>
  );
}
