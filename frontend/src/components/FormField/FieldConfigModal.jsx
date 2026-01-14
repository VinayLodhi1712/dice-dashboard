import { useState } from "react";
import ModalUI from "../ui/Modal";
import Input from "../ui/Input";
import Toggle from "../ui/Toggle";
import Button from "../ui/Button";
import { fieldTypes } from "../../data/fieldConfigStore";
import { FIELD_TYPE_UI, FIELD_TYPE_DEFAULTS } from "../../data/fieldConfigStore";

export default function FieldConfigModal({ field, open, onClose, onSave }) {
  const [config, setConfig] = useState(() => ({ ...field }));

  const ui = FIELD_TYPE_UI[config.fieldType];

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const handleFieldTypeChange = (type) => {
    const defaults = FIELD_TYPE_DEFAULTS[type];

    setConfig((prev) => ({
      ...prev,
      fieldType: type,

      name: defaults.name,
      id: defaults.id,
      hint: defaults.hint,

      minLength: defaults.minLength,
      maxLength: defaults.maxLength,
      minDate: defaults.minDate,
      maxDate: defaults.maxDate,
    }));
  };
  if (!field) return null;

  return (
    <ModalUI open={open} onClose={onClose} title="Edit Field" width="520px">
      <div className="space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
            Select Field Type
          </label>
          <div className="flex gap-2">
            {fieldTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFieldTypeChange(type)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  config.fieldType === type
                    ? "bg-indigo-100 border-indigo-600 text-indigo-700"
                    : "bg-white border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Field Name"
          value={config.name}
          onChange={(e) =>
            setConfig((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <Input
          label="Field ID"
          value={config.id}
          onChange={(e) =>
            setConfig((prev) => ({ ...prev, id: e.target.value }))
          }
        />

        {ui.showHint && (
          <Input
            label="Field Hint"
            value={config.hint || ""}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, hint: e.target.value }))
            }
            placeholder={
              config.fieldType === "Phone"
                ? "Enter mobile number"
                : "Enter text"
            }
          />
        )}

        {ui.showLength && (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Length"
              type="number"
              value={config.minLength || ""}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  minLength: Number(e.target.value) || 0,
                }))
              }
            />
            <Input
              label="Maximum Length"
              type="number"
              value={config.maxLength || ""}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  maxLength: Number(e.target.value) || 0,
                }))
              }
            />
          </div>
        )}

        {/* DATE */}
        {ui.showDateRange && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-4">Date Range Configuration</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Minimum Date"
                type="date"
                value={config.minDate || ""}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    minDate: e.target.value,
                  }))
                }
              />
              <Input
                label="Maximum Date"
                type="date"
                value={config.maxDate || ""}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    maxDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        )}

        {/* COMMON TOGGLES */}
        <Toggle
          label="This field is mandatory"
          checked={config.mandatory}
          onChange={(val) => setConfig((prev) => ({ ...prev, mandatory: val }))}
        />

        <Toggle
          label="This field is editable"
          checked={config.editable}
          onChange={(val) => setConfig((prev) => ({ ...prev, editable: val }))}
        />

        <Button onClick={handleSave} className="w-full">
          Save Field
        </Button>
      </div>
    </ModalUI>
  );
}
