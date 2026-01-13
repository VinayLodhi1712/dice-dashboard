import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import Travel from "./pages/Travel";
import Expenses from "./pages/Expenses";
import Advances from "./pages/Advances";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 pt-16 md:pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/advances" element={<Advances />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
