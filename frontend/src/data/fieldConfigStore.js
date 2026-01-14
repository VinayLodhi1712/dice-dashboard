export const fieldTypes = ['Text', 'Date', 'Email'];

let fieldStore = {
  fullName: {
    id: 'full_name',
    name: 'Full Name',
    fieldType: 'Text',
    hint: 'Enter your full name',
    mandatory: true,
    editable: true,
    minLength: 3,
    maxLength: 50
  },
  eventDate: {
    id: 'event_date',
    name: 'Event Date',
    fieldType: 'Date',
    hint: 'Select event date',
    mandatory: true,
    editable: true,
    minDate: '2025-01-20',
    maxDate: '2025-12-31'
  },
  email: {
    id: 'email_address',
    name: 'Email Address',
    fieldType: 'Email',
    hint: 'Enter your email',
    mandatory: false,
    editable: true,
    minLength: 5,
    maxLength: 100
  }
};

export const getFields = () => fieldStore;

export const updateField = (fieldKey, updatedConfig) => {
  fieldStore = {
    ...fieldStore,
    [fieldKey]: updatedConfig
  };
};