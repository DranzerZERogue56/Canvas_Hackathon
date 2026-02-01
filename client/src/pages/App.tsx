import { Routes, Route } from "react-router-dom";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import MainMenu from "./MainMenu.tsx";
import ClassPage from "./Class_Page";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <LeftPanel />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/courses" element={<ClassPage />} />
        </Routes>
      </div>
    </div>
  );
}
