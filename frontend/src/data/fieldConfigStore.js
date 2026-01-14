export const fieldTypes = ["Text", "Date", "Phone"];

let fieldStore = {
  fullName: {
    id: "full_name",
    name: "Full Name",
    fieldType: "Text",
    hint: "Enter your full name",
    mandatory: true,
    editable: true,
    minLength: 3,
    maxLength: 50,
  },
  eventDate: {
    id: "event_date",
    name: "Event Date",
    fieldType: "Date",
    hint: "Select event date",
    mandatory: true,
    editable: true,
    minDate: "2025-01-20",
    maxDate: "2025-12-31",
  },
  mobile: {
    id: "mobile_number",
    name: "Mobile Number",
    fieldType: "Phone",
    hint: "Enter your mobile number",
    mandatory: false,
    editable: true,
    minLength: 10,
    maxLength: 10,
  },
};

export const getFields = () => fieldStore;

export const updateField = (fieldKey, updatedConfig) => {
  fieldStore = {
    ...fieldStore,
    [fieldKey]: updatedConfig,
  };
};

export const FIELD_TYPE_UI = {
  Text: {
    showHint: true,
    showLength: true,
    showDateRange: false,
  },
  Phone: {
    showHint: true,
    showLength: true,
    showDateRange: false,
  },

  Date: {
    showHint: false,
    showLength: false,
    showDateRange: true,
  },
};

export const FIELD_TYPE_DEFAULTS = {
  Text: {
    name: "Full Name",
    id: "full_name",
    hint: "Enter your full name",
    minLength: 3,
    maxLength: 50,
    minDate: undefined,
    maxDate: undefined,
  },
  Phone: {
    name: "Mobile Number",
    id: "mobile_number",
    hint: "Enter mobile number",
    minLength: 10,
    maxLength: 10,
    minDate: undefined,
    maxDate: undefined,
  },
  Date: {
    name: "Event Date",
    id: "event_date",
    hint: "Select date",
    minLength: undefined,
    maxLength: undefined,
    minDate: "",
    maxDate: "",
  },
};
