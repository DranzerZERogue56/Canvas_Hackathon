import React, { useState } from "react";
import "./MainMenu.scss";
import LeftPanel from "../components/LeftPanel/LeftPanel";
//import CalendarView from "../components/CalendarView/CalendarView";
import CalendarPage from "./Calendar_Page";

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

export default function MainMenu(): JSX.Element {
  const [panel, setPanel] = useState<"empty" | "calendar">("empty");
  const [view] = useState<ViewMode>("month");
  const enabledClasses = sampleClasses.reduce((acc, c) => ({ ...acc, [c.id]: true }), {});

  return (
    <div className="main-menu">
      <aside className="main-left">
        <LeftPanel />
        <div className="menu-actions">
          <button onClick={() => setPanel("empty")} className={panel === "empty" ? "active" : ""}>Empty</button>
          <button onClick={() => setPanel("calendar")} className={panel === "calendar" ? "active" : ""}>Sample Calendar</button>
        </div>
      </aside>

      <section className="main-center">
        {panel === "empty" ? (
          <div className="placeholder">
            <h3>Empty Content Area</h3>
            <p>Use this central area to mount pages or components (calendar, class view, etc.).</p>
          </div>
        ) : (
          <div className="embedded-calendar">
            <CalendarPage
            />
          </div>
        )}
      </section>
    </div>
  );
}