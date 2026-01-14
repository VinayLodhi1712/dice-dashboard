export default function FieldPreview({ field }) {
  const commonProps = {
    disabled: true,
    placeholder: field.hint,
    className:
      "w-full px-4 py-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
  };

  switch (field.fieldType) {
    case "Text":
      return <input type="text" {...commonProps} />;

    case "Email":
      return <input type="email" {...commonProps} />;

    case "Number":
      return <input type="number" {...commonProps} />;

    case "Date":
      return (
        <input
          type="date"
          {...commonProps}
          min={field.minDate}
          max={field.maxDate}
        />
      );

    case "Dropdown":
      return (
        <select {...commonProps}>
          <option>{field.hint || "Dropdown value"}</option>
        </select>
      );

    default:
      return <input type="text" {...commonProps} />;
  }
}
