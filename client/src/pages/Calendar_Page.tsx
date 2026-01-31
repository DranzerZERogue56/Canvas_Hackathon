import React, { useState } from "react";
import LeftPanel from "../components/LeftPanel/LeftPanel";
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
  const [currentDate] = useState(() => new Date());
  const [enabledClasses, setEnabledClasses] = useState<Record<string, boolean>>(
    sampleClasses.reduce((acc, c) => ({ ...acc, [c.id]: true }), {})
  );

  const toggleClass = (id: string) => setEnabledClasses((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "260px 1fr 300px", gap: 12, background: "#f5f7fb" }}>
      <div style={{ borderRight: "1px solid #e6e9ee", padding: 16 }}>
        <LeftPanel />
      </div>

      <div style={{ padding: 16, overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ margin: 0 }}>Calendar</h2>
            <div style={{ color: "#6b7280", fontSize: 13 }}>Canvas-like view</div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ViewSwitcher view={view} setView={setView} />
          </div>
        </div>

        <CalendarView
          view={view}
          date={currentDate}
          events={sampleEvents}
          classes={sampleClasses}
          enabledClasses={enabledClasses}
        />
      </div>

      <div style={{ borderLeft: "1px solid #e6e9ee", padding: 16 }}>
        <RightPanel classes={sampleClasses} enabledClasses={enabledClasses} toggleClass={toggleClass} />
      </div>
    </div>
  );
}