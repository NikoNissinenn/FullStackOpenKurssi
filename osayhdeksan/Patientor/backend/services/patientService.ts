import patients from '../data/patients';
import { Patient, PatientNoSsn, NewPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const generateId = () => {
  const id = uuidv4();
  return id;
};

const getAllPatients = (): PatientNoSsn[] => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation
  }));
};

const createNewPatient = ( entry: NewPatientEntry ): Patient => {

  const newPatient = {
    id: generateId(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};


export default { getAllPatients, createNewPatient };