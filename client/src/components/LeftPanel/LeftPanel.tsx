import { Link } from "react-router-dom";
import React from "react";

export default function LeftPanel() {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Menu</h3>

      <div style={{ color: "#6b7280", fontSize: 14 }}>
        <div style={{ padding: "8px 0" }}>• Dashboard</div>

        <Link
          to="/courses"
          style={{
            padding: "8px 0",
            display: "block",
            color: "#6b7280",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          • Courses
        </Link>

        <div style={{ padding: "8px 0" }}>• Assignments</div>
        <div style={{ padding: "8px 0" }}>• Calendar filters</div>
        <div style={{ padding: "8px 0" }}>• Settings</div>
      </div>
    </div>
  );
}
