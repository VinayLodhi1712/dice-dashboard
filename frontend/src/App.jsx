import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Modal from "react-modal";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import Travel from "./pages/Travel";
import Expenses from "./pages/Expenses";
import Advances from "./pages/Advances";
import Config from "./pages/Config";
import SeatSelection from "./pages/SeatSelection";
import OfflineForms from "./pages/OfflineForms";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 pt-16 md:pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/advances" element={<Advances />} />
          <Route path="/config" element={<Config/>} />
          <Route path="/seat-booking" element={<SeatSelection/>} />
          <Route path="/offline-forms" element={<OfflineForms/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
