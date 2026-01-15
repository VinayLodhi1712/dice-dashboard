import { useState } from "react";
import Button from "../components/ui/Button";
import FieldConfigModal from "../components/FormField/FieldConfigModal";
import FieldPreview from "../components/FormField/fieldPreview";
import { loadFields, saveFields } from "../data/fieldStorage";
import SimpleModal from "../components/ui/ModalUI";

export default function Config() {
  const [fields, setFields] = useState(() => loadFields());
  const [selectedField, setSelectedField] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const EMPTY_FIELD = {
    id: "",
    name: "",
    fieldType: "Text",
    hint: "",
    mandatory: false,
    editable: true,
  };

  const handleEditField = (index) => {
    setSelectedField(fields[index]);
    setModalOpen(true);
  };

  const handleSave = (updatedConfig) => {
    setFields((prev) => {
      let updatedFields;

      const index = prev.findIndex((f) => f.id === updatedConfig.id);

      if (index !== -1) {
        updatedFields = [...prev];
        updatedFields[index] = updatedConfig;
      } else {
        updatedFields = [
          ...prev,
          {
            ...updatedConfig,
            id: updatedConfig.id || `field_${Date.now()}`,
          },
        ];
      }

      saveFields(updatedFields);
      return updatedFields;
    });

    setModalOpen(false);
    setSelectedField(null);
  };

  const handleDeleteField = (field) => {
    setDeleteTarget(field);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Custom Form Configuration
          </h1>

          <Button
            onClick={() => {
              setSelectedField({ ...EMPTY_FIELD });
              setModalOpen(true);
            }}
          >
            + Add Field
          </Button>
        </div>

        {fields.length === 0 && (
          <div className="text-gray-500 text-sm border rounded-lg p-4 bg-white">
            No fields configured. Click <strong>Add Field</strong> to create
            one.
          </div>
        )}

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id || index}
              className="bg-white border rounded-lg p-4 flex items-center gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="text-sm font-semibold text-gray-700 uppercase">
                  {field.name || "Untitled Field"}
                  {field.mandatory && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </div>

                <FieldPreview field={field} />

                {field.fieldType === "Date" &&
                  (field.minDate || field.maxDate) && (
                    <p className="text-xs text-gray-500">
                      Allowed range: {field.minDate} – {field.maxDate}
                    </p>
                  )}
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={() => handleEditField(index)}>
                  Edit Field
                </Button>

                <Button
                  className="bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => handleDeleteField(field)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedField && (
        <FieldConfigModal
          key={selectedField.id || "new"}
          field={selectedField}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedField(null);
          }}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <SimpleModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          title="Delete Field"
        >
          <p className="text-sm text-gray-700 mb-6">
            Are you sure you want to delete{" "}
            <strong>{deleteTarget.name || "this field"}</strong>
            
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setFields((prev) => {
                  const updated = prev.filter((f) => f.id !== deleteTarget.id);
                  saveFields(updated);
                  return updated;
                });
                setDeleteTarget(null);
              }}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </SimpleModal>
      )}
    </div>
  );
}
