import { NewPatientEntry, Gender } from "../types";
import * as z from "zod";

export const newEntrySchema = z.object({
    name: z.string(),
    occupation: z.string(),
    dateOfBirth: z.string().date(),
    gender: z.nativeEnum(Gender),
    ssn: z.string(),
  });

export const toNewPatientEntry = (object:unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};