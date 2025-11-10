import { NewPatientEntry, Gender } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseEntry = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field in new patient entry: ' + text);
  };
  return String(text);
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(text);
};

const parseGender = (text: string): string => {
  if (!text || !isGender(text)) {
    throw new Error('Incorrect or missing field in new patient entry: gender');
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
      gender: parseGender(object.gender as string),
      ssn: parseEntry(object.ssn),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');  
};