import React, { useState } from "react";
import "./Calendar_Page.scss";
import CalendarView from "../components/CalendarView/CalendarView";
import RightPanel from "../components/RightPanel/RightPanel";
import ViewSwitcher from "../components/Controls/ViewSwitcher";

type ViewMode = "month" | "week" | "day";
type ClassItem = { id: string; name: string; color?: string };
type EventItem = { id: string; title: string; date: string; classId: string; time?: string };

const sampleClasses: ClassItem[] = [
  { id: "math", name: "Math", color: "#F97316" },
  { id: "history", name: "History", color: "#3B82F6" },
  { id: "science", name: "Science", color: "#10B981" },
];

const sampleEvents: EventItem[] = [
  { id: "e1", title: "Algebra", date: "2026-02-02", classId: "math", time: "09:00" },
  { id: "e2", title: "WWII Lecture", date: "2026-02-03", classId: "history", time: "11:00" },
  { id: "e3", title: "Chem Lab", date: "2026-02-05", classId: "science", time: "14:00" },
  { id: "e4", title: "Geometry", date: "2026-02-05", classId: "math", time: "16:00" },
];

export default function Calendar_Page(): JSX.Element {
  const [view, setView] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [enabledClasses, setEnabledClasses] = useState<Record<string, boolean>>(
    sampleClasses.reduce((acc, c) => ({ ...acc, [c.id]: true }), {})
  );

  const toggleClass = (id: string) => setEnabledClasses((p) => ({ ...p, [id]: !p[id] }));

  // helpers
  const addMonths = (d: Date, months: number) => new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
  const addDays = (d: Date, days: number) => {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
  };

  // navigation that respects current view
  const goPrev = () =>
    setCurrentDate((d) => {
      if (view === "month") return addMonths(d, -1);
      if (view === "week") return addDays(d, -7);
      return addDays(d, -1);
    });

  const goNext = () =>
    setCurrentDate((d) => {
      if (view === "month") return addMonths(d, 1);
      if (view === "week") return addDays(d, 7);
      return addDays(d, 1);
    });

  const goToToday = () => setCurrentDate(new Date());

  // label adapts to view
  const monthLabel =
    view === "month"
      ? `${currentDate.toLocaleString(undefined, { month: "long" })} ${currentDate.getFullYear()}`
      : view === "week"
      ? (() => {
          const weekStart = addDays(currentDate, -currentDate.getDay());
          const weekEnd = addDays(weekStart, 6);
          const a = weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" });
          const b = weekEnd.toLocaleDateString(undefined, { month: "short", day: "numeric" });
          return `${a} — ${b}`;
        })()
      : currentDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  // open a date in day view when user clicks an event/day
  const openDay = (d: Date) => {
    setCurrentDate(d);
    setView("day");
  };

  return (
    <div className="calendar-page">

      <main className="main-column">
        <div className="page-header">
          <div className="header-left">
            <h2 className="page-title">Calendar</h2>
            <div className="page-sub">Canvas-like view</div>
          </div>

          <div className="header-right">
            <div className="nav-controls">
              <button className="nav-btn" onClick={goPrev}>‹</button>
              <div className="month-label">{monthLabel}</div>
              <button className="nav-btn" onClick={goNext}>›</button>
              <button className="nav-btn today" onClick={goToToday}>Today</button>
            </div>

            <ViewSwitcher view={view} setView={setView} />
          </div>
        </div>

        <div className="calendar-content">
          <CalendarView
            view={view}
            date={currentDate}
            events={sampleEvents}
            classes={sampleClasses}
            enabledClasses={enabledClasses}
            onDateSelect={openDay}
          />
        </div>
      </main>

      <aside className="right-column">
        <RightPanel classes={sampleClasses} enabledClasses={enabledClasses} toggleClass={toggleClass} />
      </aside>
    </div>
  );
}