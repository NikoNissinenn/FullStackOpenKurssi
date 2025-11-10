import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../services/utils';
import * as z from "zod";

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const patients = patientService.getAllPatients();
  res.send(patients);
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.createNewPatient(newPatient);
    res.status(201).json(addedPatient);
    
  } catch (error:unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    }
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

export default patientsRouter;