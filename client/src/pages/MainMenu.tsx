import React, { useState } from "react";
import "./MainMenu.scss";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import Calendar_Page from "./Calendar_Page"; // render the full calendar page inside main menu
import ClassView from "../components/ClassView/ClassView";

type ClassItem = { id: string; name: string; color?: string; description?: string };
type EventItem = { id: string; title: string; date: string; classId: string; time?: string };

const sampleClasses: ClassItem[] = [
  { id: "math", name: "Math", color: "#F97316", description: "Algebra & geometry" },
  { id: "history", name: "History", color: "#3B82F6", description: "World history" },
  { id: "science", name: "Science", color: "#10B981", description: "Chemistry & labs" },
];

const sampleEvents: EventItem[] = [
  { id: "e1", title: "Algebra", date: "2026-02-02", classId: "math", time: "09:00" },
  { id: "e2", title: "WWII Lecture", date: "2026-02-03", classId: "history", time: "11:00" },
  { id: "e3", title: "Chem Lab", date: "2026-02-05", classId: "science", time: "14:00" },
  { id: "e4", title: "Geometry", date: "2026-02-05", classId: "math", time: "16:00" },
];

export default function MainMenu(): JSX.Element {
  const [panel, setPanel] = useState<"class" | "calendar" | "class">("calendar");
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openClassFromDate = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const eventsOnDate = sampleEvents.filter((e) => e.date === iso);
    const classId = eventsOnDate.length > 0 ? eventsOnDate[0].classId : sampleClasses[0].id;
    const cls = sampleClasses.find((c) => c.id === classId) ?? sampleClasses[0];
    setSelectedClass(cls);
    setSelectedDate(d);
    setPanel("class");
  };

  const handleEventClick = (ev: EventItem) => {
    const cls = sampleClasses.find((c) => c.id === ev.classId) ?? sampleClasses[0];
    setSelectedClass(cls);
    const [y, m, day] = ev.date.split("-").map(Number);
    setSelectedDate(new Date(y, m - 1, day));
    setPanel("class");
  };

  return (
    <div className="main-menu">
      <aside className="main-left">
        <LeftPanel />
        <div className="menu-actions">
          <button onClick={() => setPanel("class")} className={panel === "class" ? "active" : ""}>View Class</button>
          <button onClick={() => setPanel("calendar")} className={panel === "calendar" ? "active" : ""}>Calendar</button>
        </div>
      </aside>

      <section className="main-center">
        {/* {panel === "class" && <div className="placeholder">Empty</div>} */}

        {panel === "calendar" && (
          <div style={{ height: "100%" }}>
            <Calendar_Page
              onEventClick={handleEventClick} // when a class/event clicked in DayView -> open ClassView
            />
          </div>
        )}

        {panel === "class" && selectedClass && (
          <ClassView
            classItem={selectedClass}
            events={sampleEvents}
            onBack={() => setPanel("calendar")}
          />
        )}
      </section>
    </div>
  );
}