import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../services/utils';

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
    
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
    console.log(errorMessage);
  }
  
});

export default patientsRouter;