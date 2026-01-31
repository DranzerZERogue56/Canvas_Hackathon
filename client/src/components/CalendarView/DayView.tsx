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

  const hours = Array.from({ length: 12 }, (_, i) => 8 + i);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 80 }}>
        {hours.map((h) => (
          <div key={h} style={{ height: 48, paddingTop: 10, color: "#6b7280" }}>{h}:00</div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {hours.map((h) => (
          <div key={h} style={{ height: 48, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: 8 }}>
            {dayEvents
              .filter((ev) => {
                if (!ev.time) return false;
                const hh = Number(ev.time.split(":")[0]);
                return hh === h;
              })
              .map((ev) => {
                const clsColor = classes.find((c) => c.id === ev.classId)?.color ?? "#d1d5db";
                return (
                  <div key={ev.id} style={{ padding: "6px 8px", background: clsColor, color: "white", borderRadius: 6, marginRight: 8 }}>
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