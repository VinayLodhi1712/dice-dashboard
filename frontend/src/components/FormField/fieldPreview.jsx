import { useState } from "react";

export default function FieldPreview({ field }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (val) => {
    if (!val) {
      setError("");
      return;
    }

    if (field.minLength && val.length < field.minLength) {
      setError(`Minimum ${field.minLength} characters required`);
      return;
    }

    if (field.maxLength && val.length > field.maxLength) {
      setError(`Maximum ${field.maxLength} characters allowed`);
      return;
    }

    if (
      (field.fieldType === "Number" ||
        field.fieldType === "Currency" ||
        field.fieldType === "Rating") &&
      (field.min !== undefined || field.max !== undefined)
    ) {
      const num = Number(val);
      if (field.min !== undefined && num < field.min) {
        setError(`Value must be greater than ${field.min}`);
        return;
      }
      if (field.max !== undefined && num > field.max) {
        setError(`Value must be less than ${field.max}`);
        return;
      }
    }

    if (field.fieldType === "Date") {
      if (field.minDate && val < field.minDate) {
        setError(`Date must be after ${field.minDate}`);
        return;
      }
      if (field.maxDate && val > field.maxDate) {
        setError(`Date must be before ${field.maxDate}`);
        return;
      }
    }

    if (field.fieldType === "Phone" && !/^\d+$/.test(val)) {
      setError("Only numbers allowed");
      return;
    }

    setError("");
  };

  const commonProps = {
    value,
    placeholder: field.hint,
    onChange: (e) => {
      const val = e.target.value;
      setValue(val);
      validate(val);
    },
    className: `w-full px-4 py-2 border rounded ${
      error ? "border-red-500" : "border-gray-300"
    }`,
  };

  return (
    <div className="space-y-1">
      {["Text", "Email", "IRN", "MasterField"].includes(field.fieldType) && (
        <input type="text" {...commonProps} />
      )}

      {field.fieldType === "TextArea" && <textarea rows={3} {...commonProps} />}

      {field.fieldType === "Phone" && (
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          placeholder={field.hint}
          onChange={(e) => {
            const val = e.target.value;

            if (!/^\d*$/.test(val)) return;
            if (field.maxLength && val.length > field.maxLength) return;

            setValue(val);
            validate(val);
          }}
          className={`w-full px-4 py-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {["Number", "Currency", "Rating"].includes(field.fieldType) && (
        <input type="number" {...commonProps} />
      )}

      {field.fieldType === "Date" && (
        <input
          type="date"
          min={field.minDate}
          max={field.maxDate}
          {...commonProps}
        />
      )}

      {["Dropdown", "MultiSelect"].includes(field.fieldType) && (
        <select {...commonProps}>
          <option value="">Preview</option>
          {(field.options || []).map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      )}

      {field.fieldType === "File" && <input type="file" className="w-full" />}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
