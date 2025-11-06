import patients from '../data/patients';
import { PatientNoSsn } from '../types';

const getAllPatients = (): PatientNoSsn[] => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation
  }));
};

export default { getAllPatients };