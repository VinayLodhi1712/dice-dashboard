export const FieldRenderer = ({ field, value, onChange }) => {
  const commonClasses =
    "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg";

  const inputProps = {
    placeholder: field.hint,
    value: value || "",
    onChange: (e) => onChange(field.id, e.target.value),
    disabled: !field.editable,
    required: field.mandatory,
    className: commonClasses,
    ...(field.minLength && { minLength: field.minLength }),
    ...(field.maxLength && { maxLength: field.maxLength }),
    ...(field.minDate && { min: field.minDate }),
    ...(field.maxDate && { max: field.maxDate }),
  };

  if (field.fieldType === "Date") {
    return <input type="date" {...inputProps} />;
  }

  if (field.fieldType === "Phone") {
    return (
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
      />
    );
  }

  return <input type="text" {...inputProps} />;
};
