import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateEquipment from "./pages/CreateEquipment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEquipment />} />
        <Route path="/edit/:id" element={<CreateEquipment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
