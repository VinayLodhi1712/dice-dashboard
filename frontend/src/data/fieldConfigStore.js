export const fieldTypes = [
  "Text",
  "TextArea",
  "Number",
  "Rating",
  "Currency",
  "Phone",
  "Email",
  "Date",
  "Dropdown",
  "MultiSelect",
  "File",
  "IRN",
  "MasterField",
];

export const FIELD_TYPE_UI = {
  Text: { showHint: true, showLength: true },
  TextArea: { showHint: true, showLength: true },

  Number: { showHint: true, showRange: true },
  Rating: { showHint: true, showRange: true },
  Currency: { showHint: true, showRange: true },

  Phone: { showHint: true, showLength: true },
  Email: { showHint: true, showLength: true },

  Date: { showDate: true },

  Dropdown: { showHint: true, showOptions: true },
  MultiSelect: { showHint: true, showOptions: true },

  File: { showHint: true },
  IRN: { showHint: true, showLength: true },
  MasterField: { showHint: true, showLength: true },
};

export const FIELD_TYPE_DEFAULTS = {
  Text: { hint: "Enter text", minLength: 1, maxLength: 100 },
  TextArea: { hint: "Enter details", minLength: 1, maxLength: 500 },

  Number: { hint: "Enter number", min: 0, max: 100 },
  Rating: { hint: "Rate", min: 1, max: 5 },
  Currency: { hint: "Enter amount", min: 0, max: 100000 },

  Phone: { hint: "Enter mobile number", minLength: 10, maxLength: 10 },
  Email: { hint: "Enter email address", minLength: 5, maxLength: 100 },

  Date: { hint: "Select date", minDate: "", maxDate: "" },

  Dropdown: { hint: "Select option", options: [] },
  MultiSelect: { hint: "Select options", options: [] },

  File: { hint: "Upload file" },
  IRN: { hint: "Enter IRN", minLength: 10, maxLength: 50 },
  MasterField: { hint: "Select value", minLength: 1, maxLength: 100 },
};

export const DEFAULT_FIELDS = [
  {
    id: "text_field",
    name: "Text Field",
    fieldType: "Text",
    mandatory: false,
    editable: true,
    ...FIELD_TYPE_DEFAULTS.Text,
  },
  {
    id: "text_area",
    name: "Text Area",
    fieldType: "TextArea",
    mandatory: false,
    editable: true,
    ...FIELD_TYPE_DEFAULTS.TextArea,
  },
  {
    id: "number",
    name: "Number",
    fieldType: "Number",
    mandatory: false,
    editable: true,
    ...FIELD_TYPE_DEFAULTS.Number,
  },
  {
    id: "rating",
    name: "Rating",
    fieldType: "Rating",
    mandatory: false,
    editable: true,
    ...FIELD_TYPE_DEFAULTS.Rating,
  },
  {
    id: "amount",
    name: "Amount",
    fieldType: "Currency",
    mandatory: false,
    editable: true,
    ...FIELD_TYPE_DEFAULTS.Currency,
  },
  {
    id: "mobile_number",
    name: "Mobile Number",
    fieldType: "Phone",
    mandatory: false,
    editable: true,
    ...FIELD_TYPE_DEFAULTS.Phone,
  },
];
