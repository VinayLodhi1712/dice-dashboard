import { useState } from "react";
import ModalUI from "../ui/Modal";
import Input from "../ui/Input";
import Toggle from "../ui/Toggle";
import Button from "../ui/Button";
import {
  fieldTypes,
  FIELD_TYPE_UI,
  FIELD_TYPE_DEFAULTS,
} from "../../data/fieldConfigStore";

export default function FieldConfigModal({ field, open, onClose, onSave }) {
  const [config, setConfig] = useState({ ...field });
  const [errors, setErrors] = useState({});

  const ui = FIELD_TYPE_UI[config.fieldType] || {};

  const handleFieldTypeChange = (type) => {
    const defaults = FIELD_TYPE_DEFAULTS[type];
    if (!defaults) return;

    setConfig((prev) => ({
      ...prev,
      fieldType: type,
      ...defaults,
      mandatory: prev.mandatory ?? false,
      editable: prev.editable ?? true,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!config.name?.trim()) {
      newErrors.name = "Field name is required";
    }

    if (!config.id?.trim()) {
      newErrors.id = "Field ID is required";
    }

    if (!config.hint?.trim()) {
      newErrors.hint = "Field hint is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave(config);
    onClose();
  };

  if (!open) return null;

  return (
    <ModalUI open={open} onClose={onClose} title="Edit Field" width="900px">
      <div className="space-y-2 text-sm">
        <div>
          <label className="text-xs uppercase text-gray-600 font-medium">
            Select Field Type
          </label>
          <div className="flex flex-wrap gap-2 mt-3 mb-1">
            {fieldTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFieldTypeChange(type)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                  config.fieldType === type
                    ? "bg-indigo-100 border-indigo-600 text-indigo-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Input
              label="Field Name"
              value={config.name}
              onChange={(e) => {
                setConfig({ ...config, name: e.target.value });
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
            />

            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Field ID"
              value={config.id}
              onChange={(e) => {
                setConfig({ ...config, id: e.target.value });
                setErrors((prev) => ({ ...prev, id: "" }));
              }}
            />

            {errors.id && <p className="text-xs text-red-500">{errors.id}</p>}
          </div>
        </div>

        {ui.showHint && (
          <div className="space-y-1">
            <Input
              label="Field Hint"
              value={config.hint}
              onChange={(e) => {
                setConfig({ ...config, hint: e.target.value });
                setErrors((prev) => ({ ...prev, hint: "" }));
              }}
            />

            {errors.hint && (
              <p className="text-xs text-red-500">{errors.hint}</p>
            )}
          </div>
        )}

        {ui.showLength && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Length"
              type="number"
              value={config.minLength || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  minLength: Number(e.target.value),
                })
              }
            />
            <Input
              label="Max Length"
              type="number"
              value={config.maxLength || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  maxLength: Number(e.target.value),
                })
              }
            />
          </div>
        )}

        {ui.showRange && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Value"
              type="number"
              value={config.min || ""}
              onChange={(e) =>
                setConfig({ ...config, min: Number(e.target.value) })
              }
            />
            <Input
              label="Max Value"
              type="number"
              value={config.max || ""}
              onChange={(e) =>
                setConfig({ ...config, max: Number(e.target.value) })
              }
            />
          </div>
        )}

        {ui.showDate && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Date"
              type="date"
              value={config.minDate || ""}
              onChange={(e) =>
                setConfig({ ...config, minDate: e.target.value })
              }
            />
            <Input
              label="Max Date"
              type="date"
              value={config.maxDate || ""}
              onChange={(e) =>
                setConfig({ ...config, maxDate: e.target.value })
              }
            />
          </div>
        )}

        {ui.showOptions && (
          <div className="space-y-2 bg-gray-50 p-3 rounded-md border">
            <label className="text-sm font-medium p-3">Options</label>

            {(config.options || []).map((opt, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  value={opt}
                  onChange={(e) => {
                    const updated = [...config.options];
                    updated[idx] = e.target.value;
                    setConfig({ ...config, options: updated });
                  }}
                />
                <Button
                  className="px-2 py-1 text-xs"
                  onClick={() =>
                    setConfig({
                      ...config,
                      options: config.options.filter((_, i) => i !== idx),
                    })
                  }
                >
                  ✕
                </Button>
              </div>
            ))}

            <Button
              className="text-sm"
              onClick={() =>
                setConfig({
                  ...config,
                  options: [...(config.options || []), ""],
                })
              }
            >
              + Add Option
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-1 rounded-md">
          <Toggle
            label="This field is mandatory"
            checked={config.mandatory}
            onChange={(val) => setConfig({ ...config, mandatory: val })}
          />

          <Toggle
            label="This field is editable"
            checked={config.editable}
            onChange={(val) => setConfig({ ...config, editable: val })}
          />
        </div>

        <div className="sticky bottom-0 bg-white pt-4 mt-2 border-t">
          <Button onClick={handleSave} className="w-full">
            Save Field
          </Button>
        </div>
      </div>
    </ModalUI>
  );
}
