import express from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  const diagnoses = diagnosisService.getAllDiagnoses();
  res.send(diagnoses);
});

export default diagnosesRouter;