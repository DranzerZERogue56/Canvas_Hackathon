import React from "react";

type EventItem = { id: string; title: string; date: string; classId: string; time?: string };
type ClassItem = { id: string; name: string; color?: string };

export default function DayView({
  date,
  events,
  classes,
  enabledClasses,
}: {
  date: Date;
  events: EventItem[];
  classes: ClassItem[];
  enabledClasses: Record<string, boolean>;
}): JSX.Element {
  const iso = date.toISOString().slice(0, 10);
  const dayEvents = events.filter((e) => e.date === iso && enabledClasses[e.classId]);

  // Show 24 hours (0..23)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div style={{ height: "100%", display: "flex", gap: 12 }}>
      <div style={{ width: 80, display: "flex", flexDirection: "column" }}>
        {hours.map((h) => (
          <div key={h} style={{ flex: 1, paddingTop: 6, color: "#6b7280", fontSize: 13 }}>
            {String(h).padStart(2, "0")}:00
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {hours.map((h) => (
          <div
            key={h}
            style={{
              flex: 1,
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              padding: 8,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {dayEvents
              .filter((ev) => {
                if (!ev.time) return false;
                const hh = Number(ev.time.split(":")[0]);
                return hh === h;
              })
              .map((ev) => {
                const clsColor = classes.find((c) => c.id === ev.classId)?.color ?? "#d1d5db";
                return (
                  <div key={ev.id} style={{ padding: "6px 8px", background: clsColor, color: "white", borderRadius: 6, marginRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {ev.title}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}