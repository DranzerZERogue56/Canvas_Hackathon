import React from "react";
import "./ClassView.scss";

type ClassItem = { id: string; name: string; color?: string; description?: string };
type EventItem = { id: string; title: string; date: string; classId: string; time?: string };

export default function ClassView({
  classItem,
  events = [],
  onBack,
}: {
  classItem: ClassItem;
  events?: EventItem[];
  onBack?: () => void;
}): JSX.Element {
  const pad = (n: number) => String(n).padStart(2, "0");
  const upcoming = events
    .filter((e) => e.classId === classItem.id)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? ""));

  return (
    <div className="class-view">
      <div className="class-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">←</button>
        <div className="class-meta">
          <div className="class-badge" style={{ background: classItem.color ?? "#9CA3AF" }} />
          <div>
            <div className="class-name">{classItem.name}</div>
            {classItem.description && <div className="class-desc">{classItem.description}</div>}
          </div>
        </div>
      </div>

      <section className="class-body">
        <h4>Upcoming Items</h4>
        {upcoming.length === 0 ? (
          <div className="empty">No items for this class.</div>
        ) : (
          <ul className="items">
            {upcoming.map((ev) => (
              <li key={ev.id} className="item">
                <div className="item-left">
                  <div className="item-title">{ev.title}</div>
                  <div className="item-date">
                    {ev.date} {ev.time ? `• ${ev.time}` : ""}
                  </div>
                </div>
                <div className="item-right" title={classItem.name} style={{ background: classItem.color ?? "#9CA3AF" }} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}