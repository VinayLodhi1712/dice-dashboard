export const FieldRenderer = ({ field, value, onChange }) => {
  const commonClasses =
    "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg";

  const commonProps = {
    value: value || "",
    placeholder: field.hint,
    disabled: !field.editable,
    required: field.mandatory,
    className: commonClasses,
    onChange: (e) => onChange(field.id, e.target.value),
  };

  switch (field.fieldType) {
    case "Text":
      return <input type="text" {...commonProps} />;

    case "TextArea":
      return <textarea rows={4} {...commonProps} />;

    case "Phone":
      return (
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          {...commonProps}
        />
      );

    case "Email":
      return <input type="email" {...commonProps} />;

    case "Number":
    case "Currency":
    case "Rating":
      return (
        <input
          type="number"
          min={field.min}
          max={field.max}
          {...commonProps}
        />
      );

    case "Date":
      return (
        <input
          type="date"
          min={field.minDate}
          max={field.maxDate}
          {...commonProps}
        />
      );

    case "Dropdown":
      return (
        <select {...commonProps}>
          <option value="">Select</option>
          {(field.options || []).map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    case "MultiSelect":
      return (
        <select multiple {...commonProps}>
          {(field.options || []).map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    case "File":
      return <input type="file" {...commonProps} />;

    case "IRN":
    case "MasterField":
      return <input type="text" {...commonProps} />;

    default:
      return <input type="text" {...commonProps} />;
  }
};
