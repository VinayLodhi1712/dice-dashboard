import { useState } from "react";
import Button from "../components/ui/Button";
import FieldConfigModal from "../components/FormField/FieldConfigModal";
import FieldPreview from "../components/FormField/fieldPreview";
import { loadFields} from "../data/fieldStorage";
import { saveFields } from "../data/fieldStorage";

export default function Config() {
  const [fields, setFields] = useState(loadFields());
  const [selectedField, setSelectedField] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditField = (fieldKey) => {
    setSelectedField(fields[fieldKey]);
    setModalOpen(true);
  };

  const EMPTY_FIELD = {
    id: "",
    name: "",
    fieldType: "Text",
    hint: "",
    mandatory: false,
    editable: true,
  };

 const handleSave = (updatedConfig) => {
  setFields((prev) => {
    const index = prev.findIndex((f) => f.id === updatedConfig.id);

    let updatedFields;
    if (index !== -1) {
      updatedFields = [...prev];
      updatedFields[index] = updatedConfig;
    } else {
      updatedFields = [...prev, updatedConfig];
    }

    saveFields(updatedFields); // ✅ persist
    return updatedFields;
  });

  setModalOpen(false);
};



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6">
        <div className="flex-1 mb-2">
           <h1 className="text-2xl font-bold text-gray-900 mb-6">
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
       

        <div className="space-y-4">
          {Object.keys(fields).map((key) => {
            const field = fields[key];

            return (
              <div
                key={key}
                className="bg-white border rounded-lg p-4 flex items-center gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-semibold text-gray-700 uppercase">
                    {field.name}
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

                <Button onClick={() => handleEditField(key)}>Edit Field</Button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedField && (
        <FieldConfigModal
          key={selectedField.id}
          field={selectedField}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
