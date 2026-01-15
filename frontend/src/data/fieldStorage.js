import { DEFAULT_FIELDS } from "./fieldConfigStore";

const STORAGE_KEY = "custom_form_fields";

export const loadFields = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Invalid field schema in localStorage", e);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FIELDS));
  return DEFAULT_FIELDS;
};

export const saveFields = (fields) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
};
