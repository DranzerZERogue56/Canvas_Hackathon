import React, { useState } from "react";
import "./Calendar_Page.scss";
import CalendarView, { EventItem } from "../components/CalendarView/CalendarView";
import ViewSwitcher from "../components/Controls/ViewSwitcher";
import RightPanel from "../components/RightPanel/RightPanel";

type ViewMode = "month" | "week" | "day";
type ClassItem = { id: string; name: string; color?: string };

export default function Calendar_Page({
  onEventClick,
}: {
  onEventClick?: (ev: EventItem) => void;
}): JSX.Element {
  // ...existing state and helpers...
  const [view, setView] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
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
  const enabledClasses = sampleClasses.reduce((acc, c) => ({ ...acc, [c.id]: true }), {});

  // navigation helpers...
  const addMonths = (d: Date, months: number) => new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
  const addDays = (d: Date, days: number) => { const x = new Date(d); x.setDate(x.getDate() + days); return x; };
  const goPrev = () => setCurrentDate((d) => (view === "month" ? addMonths(d, -1) : view === "week" ? addDays(d, -7) : addDays(d, -1)));
  const goNext = () => setCurrentDate((d) => (view === "month" ? addMonths(d, 1) : view === "week" ? addDays(d, 7) : addDays(d, 1)));
  const goToToday = () => setCurrentDate(new Date());

  const monthLabel = view === "month"
    ? `${currentDate.toLocaleString(undefined, { month: "long" })} ${currentDate.getFullYear()}`
    : view === "week"
    ? (() => { const weekStart = addDays(currentDate, -currentDate.getDay()); const weekEnd = addDays(weekStart, 6); const a = weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" }); const b = weekEnd.toLocaleDateString(undefined, { month: "short", day: "numeric" }); return `${a} — ${b}`; })()
    : currentDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  const openDay = (d: Date) => { setCurrentDate(d); setView("day"); };

  return (
    <div className="calendar-page">
      <main className="main-column">
        <div className="page-header">
          <div className="header-left">
            <h2 className="page-title">Calendar</h2>
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
            onEventClick={onEventClick} // forward event clicks to parent
          />
        </div>
      </main>
    </div>
  );
}