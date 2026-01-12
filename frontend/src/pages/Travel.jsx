import Tabs from "../components/ui/Tabs";
import Table from "../components/ui/Table";
import { useState } from "react";
import {
  tableColumns,
  tableData,
} from "../data/fakeTableData";

export default function Travel() {
  const [activeTab, setActiveTab] = useState("Approved");

  const tabs = ["Approved", "Rejected", "On Hold"];

  const filteredData = tableData.filter(
    (item) => item.status === activeTab
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Travel Requests
      </h1>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Table
        columns={tableColumns}
        data={filteredData}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
