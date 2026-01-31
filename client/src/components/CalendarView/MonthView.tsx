import React from "react";
import "./MonthView.scss";

type EventItem = { id: string; title: string; date: string; classId: string; time?: string };
type ClassItem = { id: string; name: string; color?: string };

// ...existing code...
export default function MonthView({
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
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  // use local first-day weekday (consistent with local date formatting below)
  const firstDayWeekday = new Date(year, month, 1).getDay(); // 0..6 (Sun..Sat)
  const totalCells = 42; // 6 rows * 7 cols for consistent sizing

  // group events by YYYY-MM-DD (keep strings as provided)
  const eventsByDate = events.reduce<Record<string, EventItem[]>>((acc, e) => {
    if (!enabledClasses[e.classId]) return acc;
    acc[e.date] = acc[e.date] ?? [];
    acc[e.date].push(e);
    return acc;
  }, {});

  // build 42 cells (null for empty leading/trailing)
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDayWeekday + 1;
    return dayNum >= 1 && dayNum <= lastDay ? dayNum : null;
  });

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="month-view">
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      <div className="cells">
        {cells.map((dayNum, idx) => {
          const iso =
            dayNum == null
              ? null
              : `${year}-${pad(month + 1)}-${pad(dayNum)}`;
          const dayEvents = iso ? eventsByDate[iso] ?? [] : [];
          return (
            <div key={idx} className="cell">
              <div className="cell-day">{dayNum ?? ""}</div>

              <div className="events">
                {dayEvents.map((ev) => {
                  const clsColor = classes.find((c) => c.id === ev.classId)?.color ?? "#d1d5db";
                  return (
                    <div
                      key={ev.id}
                      onClick={() => {
                        if (!onDateSelect) return;
                        // create a local Date (year, month, day) to avoid timezone shift
                        const d = new Date(year, month, dayNum ?? 1);
                        onDateSelect(d);
                      }}
                      className="event"
                      style={{ background: clsColor }}
                      title={ev.title}
                    >
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