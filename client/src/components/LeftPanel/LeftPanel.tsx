import React from "react";

export default function LeftPanel(): JSX.Element {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Menu</h3>
      <div style={{ color: "#6b7280", fontSize: 14 }}>
        <div style={{ padding: "8px 0" }}>• Dashboard</div>
        <div style={{ padding: "8px 0" }}>• Courses</div>
        <div style={{ padding: "8px 0" }}>• Assignments</div>
        <div style={{ padding: "8px 0" }}>• Calendar filters</div>
        <div style={{ padding: "8px 0" }}>• Settings</div>
      </div>
    </div>
  );
}