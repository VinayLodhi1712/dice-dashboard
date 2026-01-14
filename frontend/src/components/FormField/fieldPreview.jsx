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

    if (field.fieldType === "Phone" && value) {
      if (!/^\d+$/.test(value)) {
        setError("Only numbers allowed");
        return;
      }
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
      {field.fieldType === "Text" && <input type="text" {...commonProps} />}

      {field.fieldType === "Phone" && (
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          {...commonProps}
        />
      )}

      {field.fieldType === "Date" && (
        <input
          type="date"
          {...commonProps}
          min={field.minDate}
          max={field.maxDate}
        />
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
