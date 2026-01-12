import { useState } from "react";
import Tabs from "../components/ui/Tabs";

export default function Advances() {
  const [activeTab, setActiveTab] = useState("Approved");

  const tabs = ["Approved", "Rejected", "On Hold"];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Advance Request
      </h1>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === "Approved" && (
          <p>Approved requests content</p>
        )}
        {activeTab === "Rejected" && (
          <p>Rejected requests content</p>
        )}
        {activeTab === "On Hold" && (
          <p>On-hold requests content</p>
        )}
      </div>
    </div>
  );
}
