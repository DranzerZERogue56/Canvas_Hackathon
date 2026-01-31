import React from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

type ViewMode = "month" | "week" | "day";
type EventItem = { id: string; title: string; date: string; classId: string; time?: string };
type ClassItem = { id: string; name: string; color?: string };

export default function CalendarView({
  view,
  date,
  events,
  classes,
  enabledClasses,
}: {
  view: ViewMode;
  date: Date;
  events: EventItem[];
  classes: ClassItem[];
  enabledClasses: Record<string, boolean>;
}): JSX.Element {
  if (view === "month") return <MonthView date={date} events={events} classes={classes} enabledClasses={enabledClasses} />;
  if (view === "week") return <WeekView date={date} events={events} classes={classes} enabledClasses={enabledClasses} />;
  return <DayView date={date} events={events} classes={classes} enabledClasses={enabledClasses} />;
}