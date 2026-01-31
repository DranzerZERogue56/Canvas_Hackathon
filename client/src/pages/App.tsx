// Calendar view Page

import { useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function App() {
  const [view, setView] = useState("month");
  const [enabledClasses, setEnabledClasses] = useState({
    math: true,
    history: true,
    science: true,
  });

  const toggleClass = (key) => {
    setEnabledClasses((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-screen grid grid-cols-[260px_1fr_260px] bg-muted">
      {/* Left Sidebar */}
      <aside className="bg-background border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Options</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div>Placeholder Option 1</div>
          <div>Placeholder Option 2</div>
          <div>Placeholder Option 3</div>
        </div>
      </aside>

      {/* Main Calendar Area */}
      <main className="p-6 overflow-auto">
        <Card className="mb-4">
          <CardContent className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold">Calendar</h1>
            <div className="flex gap-2">
              <Button
                variant={view === "day" ? "default" : "outline"}
                onClick={() => setView("day")}
              >
                Day
              </Button>
              <Button
                variant={view === "week" ? "default" : "outline"}
                onClick={() => setView("week")}
              >
                Week
              </Button>
              <Button
                variant={view === "month" ? "default" : "outline"}
                onClick={() => setView("month")}
              >
                Month
              </Button>
            </div>
          </CardContent>
        </Card>

        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-2"
        >
          {view === "month" && (
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <Card key={i} className="h-28">
                  <CardContent className="p-2 text-xs text-muted-foreground">
                    Day {i + 1}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {view === "week" && (
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Card key={i} className="h-96">
                  <CardContent className="p-2 text-xs">Day {i + 1}</CardContent>
                </Card>
              ))}
            </div>
          )}

          {view === "day" && (
            <Card className="h-[600px]">
              <CardContent className="p-4">Single Day View</CardContent>
            </Card>
          )}
        </motion.div>
      </main>

      {/* Right Sidebar */}
      <aside className="bg-background border-l p-4">
        <h2 className="text-lg font-semibold mb-4">Classes</h2>
        <div className="space-y-3">
          {Object.entries(enabledClasses).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox checked={value} onCheckedChange={() => toggleClass(key)} />
              <span className="capitalize text-sm">{key}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

//export default App
