import express from 'express';
import { calculateBmi } from './bmiCalculator';
const qs = require('qs');
const app = express();

app.set('query parser',
  (number:number) => qs.parse(number, { /* custom options */ }))

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi`, (req, res) => {
  try {
    const { height, weight } = req.query;

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
      return res.status(400).send({'error': "malformatted parameters"});
    }    

    const h = Number(height);
    const w = Number(weight);
    const bmi = calculateBmi(h, w);

    const resultJSON = {
      weight: weight,
      height: height,
      bmi: bmi
    }

    return res.status(200).send(resultJSON);
  } catch (error) {
    return res.status(400).send({'error': "malformatted parameters"});
  } 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});