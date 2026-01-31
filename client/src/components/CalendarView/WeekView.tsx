import React from "react";

type EventItem = { id: string; title: string; date: string; classId: string; time?: string };
type ClassItem = { id: string; name: string; color?: string };

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export default function WeekView({
  date,
  events,
  classes,
  enabledClasses,
  onDateSelect,
}: {
  date: Date;
  events: EventItem[];
  classes: ClassItem[];
  enabledClasses: Record<string, boolean>;
  onDateSelect?: (d: Date) => void;
}): JSX.Element {
  const dayOfWeek = date.getDay();
  const weekStart = addDays(date, -dayOfWeek);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const eventsByDate = events.reduce<Record<string, EventItem[]>>((acc, e) => {
    if (!enabledClasses[e.classId]) return acc;
    acc[e.date] = acc[e.date] ?? [];
    acc[e.date].push(e);
    return acc;
  }, {});

  return (
    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
      {days.map((d) => {
        const iso = d.toISOString().slice(0, 10);
        const dayEvents = eventsByDate[iso] ?? [];
        return (
          <div
            key={iso}
            style={{
              padding: 8,
              background: "white",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              {d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
            </div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, flex: 1, overflow: "hidden" }}>
              {dayEvents.map((ev) => {
                const clsColor = classes.find((c) => c.id === ev.classId)?.color ?? "#d1d5db";
                return (
                  <div
                    key={ev.id}
                    onClick={() => onDateSelect && onDateSelect(new Date(ev.date))}
                    style={{
                      padding: "8px",
                      background: clsColor,
                      color: "white",
                      borderRadius: 6,
                      cursor: onDateSelect ? "pointer" : "default",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{ev.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>{ev.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}