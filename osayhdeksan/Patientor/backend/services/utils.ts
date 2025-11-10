import { NewPatientEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseEntry = (text:unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field in new patient entry:' + text);
  };
  return String(text);
};

export const toNewPatientEntry = (object:unknown): NewPatientEntry => {

  if (!object || typeof object !== 'object') {
    throw new Error('Missing body in new patient entry');
  }

  if ('name' in object && 'occupation' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object) {
    const newEntry: NewPatientEntry = {
      name: parseEntry(object.name),
      occupation: parseEntry(object.occupation),
      dateOfBirth: parseEntry(object.dateOfBirth),
      gender: parseEntry(object.gender),
      ssn: parseEntry(object.ssn),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');  
};