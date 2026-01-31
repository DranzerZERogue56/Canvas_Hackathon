import React from "react";

type ViewMode = "month" | "week" | "day";

export default function ViewSwitcher({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}): JSX.Element {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {(["month", "week", "day"] as ViewMode[]).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: view === v ? "1px solid #111827" : "1px solid #e5e7eb",
            background: view === v ? "#111827" : "white",
            color: view === v ? "white" : "#111827",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {v[0].toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}