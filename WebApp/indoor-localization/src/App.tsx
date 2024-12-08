import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Reports from "./components/Reports";
import FacilitiesManager from "./components/FacilitiesManager";
import AssetsManager from "./components/AssetsManager";

function App() {
  return (
    <div className="application">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assets" element={<AssetsManager />} />
        <Route path="/facilities" element={<FacilitiesManager />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
