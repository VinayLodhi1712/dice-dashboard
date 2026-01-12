import { useState } from "react";
import Tabs from "../components/ui/Tabs";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import AppModal from "../components/ui/Modal";
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
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Travel Requests
        </h1>

        <Button onClick={() => setIsModalOpen(true)}>
          + Add Trip
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Table */}
      <Table
        columns={tableColumns}
        data={filteredData}
        pageSizeOptions={[5,10,20]}
      />

      {/* Modal */}
      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Trip"
      >
        <p className="text-sm text-gray-600 mb-4">
          New trip added successfully.
        </p>

        <Button
          variant="secondary"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </AppModal>
    </div>
  );
}
