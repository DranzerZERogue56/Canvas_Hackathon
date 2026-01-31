import React from "react";

type EventItem = { id: string; title: string; date: string; classId: string; time?: string };
type ClassItem = { id: string; name: string; color?: string };

export default function MonthView({
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
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: lastDay }, (_, i) => i + 1);

  const eventsByDate = events.reduce<Record<string, EventItem[]>>((acc, e) => {
    if (!enabledClasses[e.classId]) return acc;
    acc[e.date] = acc[e.date] ?? [];
    acc[e.date].push(e);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} style={{ fontWeight: 600, color: "#6b7280" }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginTop: 8 }}>
        {days.map((d) => {
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const dayEvents = eventsByDate[iso] ?? [];
          return (
            <div key={d} style={{ minHeight: 120, padding: 8, background: "white", borderRadius: 6, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>{d}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {dayEvents.map((ev) => {
                  const clsColor = classes.find((c) => c.id === ev.classId)?.color ?? "#d1d5db";
                  return (
                    <div key={ev.id} style={{ padding: "4px 6px", background: clsColor, color: "white", borderRadius: 4, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ev.time ? `${ev.time} — ` : ""}{ev.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}