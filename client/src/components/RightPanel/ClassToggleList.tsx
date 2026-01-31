import React from "react";

type ClassItem = { id: string; name: string; color?: string };

export default function ClassToggleList({
  classes,
  enabledClasses,
  toggleClass,
}: {
  classes: ClassItem[];
  enabledClasses: Record<string, boolean>;
  toggleClass: (id: string) => void;
}): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {classes.map((c) => (
        <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none" }}>
          <input type="checkbox" checked={!!enabledClasses[c.id]} onChange={() => toggleClass(c.id)} />
          <div style={{ width: 10, height: 10, background: c.color ?? "#d1d5db", borderRadius: 2 }} />
          <span>{c.name}</span>
        </label>
      ))}
    </div>
  );
}