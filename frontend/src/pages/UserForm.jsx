import React, { useState } from "react";
import Button from "../components/ui/Button";
import ModalUI from "../components/ui/Modal";
import { FieldRenderer } from "../components/FormField/fieldRender";
import { loadFields } from "../data/fieldStorage";


export default function UserForm() {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fields = loadFields();
  // safer state update
  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    Object.values(fields).forEach((field) => {
      const value = formData[field.id];

      // Mandatory check
      if (field.mandatory && !value) {
        errors.push(`${field.name} is required`);
        return;
      }

      if (!value) return;

      // Text / Phone length validation
      if (field.fieldType === "Text" || field.fieldType === "Phone") {
        if (field.minLength && value.length < field.minLength) {
          errors.push(
            `${field.name} must be at least ${field.minLength} characters`
          );
        }
        if (field.maxLength && value.length > field.maxLength) {
          errors.push(
            `${field.name} must not exceed ${field.maxLength} characters`
          );
        }
      }

      // Phone numeric validation
      if (field.fieldType === "Phone" && !/^\d+$/.test(value)) {
        errors.push(`${field.name} must contain only numbers`);
      }

      // Date validation
      if (field.fieldType === "Date") {
        if (field.minDate && value < field.minDate) {
          errors.push(`${field.name} must be after ${field.minDate}`);
        }
        if (field.maxDate && value > field.maxDate) {
          errors.push(`${field.name} must be before ${field.maxDate}`);
        }
      }
    });

    if (errors.length > 0) {
      setModalMessage(errors.join("\n"));
      setShowModal(true);
      return;
    }

    setModalMessage(
      "Form submitted successfully!\n\n" +
        JSON.stringify(formData, null, 2)
    );
    setShowModal(true);
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Custom Form
          </h1>
          <p className="text-gray-600">
            Please fill in all required fields
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.values(fields).map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {field.name}
                  {field.mandatory && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                <FieldRenderer
                  field={field}
                  value={formData[field.id]}
                  onChange={handleFieldChange}
                />

                {/* Helper text */}
                {field.fieldType === "Date" &&
                  field.minDate &&
                  field.maxDate && (
                    <p className="text-xs text-gray-500">
                      Select between {field.minDate} and {field.maxDate}
                    </p>
                  )}

                 {field.fieldType === "Phone" &&
                  field.minLength &&
                  field.maxLength && (
                    <p className="text-xs text-gray-500">
                      Enter 10 Digit Number
                    </p>
                  )}

                {(field.fieldType === "Text" ) &&
                  field.minLength &&
                  field.maxLength && (
                    <p className="text-xs text-gray-500">
                     {field.minLength} - {field.maxLength} characters 
                    </p>
                  )}
              </div>
            ))}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>

      <ModalUI
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Form Submission"
      >
        <pre className="whitespace-pre-wrap text-sm">
          {modalMessage}
        </pre>
        <Button onClick={() => setShowModal(false)} className="w-full mt-4">
          Close
        </Button>
      </ModalUI>
    </div>
  );
}
