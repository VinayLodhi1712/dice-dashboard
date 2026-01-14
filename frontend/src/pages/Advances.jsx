import { useState } from "react";
import Tabs from "../components/ui/Tabs";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import ModalUi from "../components/ui/Modal";
import {
  tableColumns,
  tableData,
} from "../data/fakeTableData";
import ModalUI from "../components/ui/Modal";

export default function Advances() {
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
          Advance Requests
        </h1>

        <Button onClick={() => setIsModalOpen(true)}>
          + Add Advance
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Advance"
      >
        <p className="text-sm text-gray-600 mb-4">
          New advance added successfully.
        </p>

        <Button onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
      </ModalUI>
    </div>
  );
}
