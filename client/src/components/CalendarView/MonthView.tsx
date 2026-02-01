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

  // first weekday of current month (0..6)
  const firstDayWeekday = new Date(year, month, 1).getDay();
  const totalCells = 42; // 6 rows * 7 cols

  // group events by YYYY-MM-DD
  const eventsByDate = events.reduce<Record<string, EventItem[]>>((acc, e) => {
    if (!enabledClasses[e.classId]) return acc;
    acc[e.date] = acc[e.date] ?? [];
    acc[e.date].push(e);
    return acc;
  }, {});

  const pad = (n: number) => String(n).padStart(2, "0");

  // build cells for 42 slots; compute actual Date for each cell (handles prev/next month automatically)
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDayWeekday + 1; // may be <=0 or >lastDay -> prev/next month
    const cellDate = new Date(year, month, dayNum);
    const iso = `${cellDate.getFullYear()}-${pad(cellDate.getMonth() + 1)}-${pad(cellDate.getDate())}`;
    const inCurrentMonth = cellDate.getMonth() === month;
    const dayEvents = eventsByDate[iso] ?? [];
    return { cellDate, iso, inCurrentMonth, dayEvents };
  });

  return (
    <div className="month-view">
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      <div className="cells">
        {cells.map(({ cellDate, inCurrentMonth, dayEvents }, idx) => {
          const dayNumber = cellDate.getDate();
          return (
            <div
              key={idx}
              className={`cell ${inCurrentMonth ? "" : "cell--adjacent"}`}
              onClick={() => onDateSelect && onDateSelect(new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate()))}
              role={onDateSelect ? "button" : undefined}
              title={cellDate.toDateString()}
            >
              <div className="cell-day">{dayNumber}</div>

              <div className="events">
                {dayEvents.map((ev) => {
                  const clsColor = classes.find((c) => c.id === ev.classId)?.color ?? "#d1d5db";
                  return (
                    <div
                      key={ev.id}
                      className="event"
                      style={{ background: clsColor }}
                      title={ev.title}
                      onClick={(e) => {
                        // prevent parent cell click from firing twice if an event click is handled elsewhere
                        e.stopPropagation();
                        if (!onDateSelect) return;
                        onDateSelect(new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate()));
                      }}
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