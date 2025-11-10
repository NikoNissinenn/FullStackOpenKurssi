import { z } from 'zod';
import { newEntrySchema } from './services/utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient extends NewPatientEntry {
  id: string;
}

export type PatientNoSsn = Omit<Patient, "ssn">;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}