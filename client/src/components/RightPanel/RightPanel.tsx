import React from "react";
import ClassToggleList from "./ClassToggleList";

type ClassItem = { id: string; name: string; color?: string };

export default function RightPanel({
  classes,
  enabledClasses,
  toggleClass,
}: {
  classes: ClassItem[];
  enabledClasses: Record<string, boolean>;
  toggleClass: (id: string) => void;
}): JSX.Element {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Classes</h3>
      <ClassToggleList classes={classes} enabledClasses={enabledClasses} toggleClass={toggleClass} />
      <div style={{ marginTop: 20, color: "#6b7280", fontSize: 13 }}>
        Use the toggles to show or hide classes on the calendar.
      </div>
    </div>
  );
}