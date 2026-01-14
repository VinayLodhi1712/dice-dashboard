import { useState } from "react";
import Tabs from "../components/ui/Tabs";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import ModalUI from "../components/ui/Modal";
import {
  tableColumns,
  tableData,
} from "../data/fakeTableData";

export default function Travel() {
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
          Travel Requests
        </h1>

        <Button onClick={() => setIsModalOpen(true)}>
          + Add Trip
        </Button>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Table
        className="min-w-[700px] w-full text-sm"
        columns={tableColumns}
        data={filteredData}
        pageSizeOptions={[5, 10, 20]}
      />

      {/* Modal */}
      <ModalUI
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Trip"
      >
        <p className="text-sm text-gray-600 mb-4">
          New trip added successfully.
        </p>

        <Button
          onClick={() => setIsModalOpen(false)}
          className="w-full"
        >
          Close
        </Button>
      </ModalUI>
    </div>
  );
}
