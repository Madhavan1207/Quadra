import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ListMaterial from "./pages/ListMaterial";
import RequestMaterial from "./pages/RequestMaterial";
import Impact from "./pages/Impact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-material" element={<ListMaterial />} />
        <Route path="/request-material" element={<RequestMaterial />} />
        <Route path="/impact" element={<Impact />} />

        {/* Fallback route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
