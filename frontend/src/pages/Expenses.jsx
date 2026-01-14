import { useState } from "react";
import Tabs from "../components/ui/Tabs";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import ModalUI from "../components/ui/Modal";
import {
  tableColumns,
  tableData,
} from "../data/fakeTableData";

export default function Expenses() {
  const [activeTab, setActiveTab] = useState("Approved");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["Approved", "Rejected", "On Hold"];

  const filteredData = tableData.filter(
    (item) => item.status === activeTab
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 overflow-x-auto">
        <h1 className="text-2xl font-semibold">
          Expense Requests
        </h1>

        <Button onClick={() => setIsModalOpen(true)}>
          + Add Expense
        </Button>
      </div>

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

      <ModalUI
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Expense"
      >
        <p className="text-sm text-gray-600 mb-4">
          New expense added successfully.
        </p>

        <Button onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
      </ModalUI>
    </div>
  );
}
