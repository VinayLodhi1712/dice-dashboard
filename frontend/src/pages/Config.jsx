import { useState } from "react";
import { getFields, updateField } from "../data/fieldConfigStore";
import Button from "../components/ui/Button";
import FieldConfigModal from "../components/FieldConfigModal";
import FieldPreview from "../components/FieldPreview";
export default function Config() {
  const [fields, setFields] = useState(getFields());
  const [selectedField, setSelectedField] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditField = (fieldKey) => {
    setSelectedField(fields[fieldKey]);
    setModalOpen(true);
  };

  const handleSave = (updatedConfig) => {
    const fieldKey = Object.keys(fields).find(
      (key) => fields[key].id === updatedConfig.id
    );
    if (fieldKey) {
      updateField(fieldKey, updatedConfig);
      setFields(getFields());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Custom Form</h1>
          </div>
        </div>

        <div className="space-y-4">
          {Object.keys(fields).map((key) => {
            const field = fields[key];
            return (
              <div key={key} className="bg-white border rounded-lg">
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {field.name.toUpperCase()}{" "}
                      {field.mandatory && "(MANDATORY)"}
                    </div>
                    <FieldPreview field={field} />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditField(key)}
                    >
                      Edit Field
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedField && (
        <FieldConfigModal
          key={selectedField?.id}
          field={selectedField}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
