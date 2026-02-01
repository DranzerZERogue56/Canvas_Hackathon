import { Routes, Route } from "react-router-dom";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import MainMenu from "./MainMenu.tsx";
import ClassPage from "./Class_Page";
import API_Key_Landing from "./API_Key_Landing.tsx";

export default function App() {
  return (
    <div style={{ display: "flex" }}>

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<API_Key_Landing/>} />
        </Routes>
      </div>
    </div>
  );
}
