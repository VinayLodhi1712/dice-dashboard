import React from "react";
import FieldRenderer from "./fieldRender";

export default function FormField({ field, value, onChange, formData, onConfigClick }) {

  if (field.optionalDependency?.enabled) {
    const dependentValue = formData[field.optionalDependency.fieldId];
    if (dependentValue !== field.optionalDependency.fieldValue) {
      return null;
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {field.name}
          {field.mandatory && <span className="text-red-500 ml-1">*</span>}
        </label>
        {onConfigClick && (
          <button
            type="button"
            onClick={onConfigClick}
            className="text-gray-400 hover:text-indigo-600 transition-colors"
            title="Configure field"
          >
            +
          </button>
        )}
      </div>
      
      <FieldRenderer 
        field={field} 
        value={value} 
        onChange={onChange} 
        formData={formData} 
      />
      
      {field.fieldType === "Date" && (field.minDate || field.maxDate) && (
        <p className="text-xs text-gray-500">
          {field.minDate && field.maxDate && 
            `Select between ${field.minDate} and ${field.maxDate}`}
        </p>
      )}
    </div>
  );
}