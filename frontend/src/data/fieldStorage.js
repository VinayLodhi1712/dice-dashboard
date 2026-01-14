import { getFields as getDefaultFields } from "./fieldConfigStore";

const STORAGE_KEY = "custom_form_fields";

export const loadFields = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return Object.values(getDefaultFields());
};

export const saveFields = (fields) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
};
