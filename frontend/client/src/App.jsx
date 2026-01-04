import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Impact from "./pages/Impact";
import ListMaterial from "./pages/ListMaterial";
import RequestMaterial from "./pages/RequestMaterial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/materials" element={<ListMaterial />} />
        <Route path="/request" element={<RequestMaterial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
