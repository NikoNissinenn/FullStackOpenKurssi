import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import qs from 'qs';
const app = express();
app.use(express.json());

app.set('query parser',
  (string:string) => qs.parse(string, { /* custom options */ }));

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
    };

    return res.status(200).send(resultJSON);
  } catch (error) {
    return res.status(400).send({
      'error': "malformatted parameters",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      'message': `${error.message}`
    });
  } 
});

app.post(`/exercises`, (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;    

    if (!daily_exercises || !target) {
      return res.status(400).send({'error': "parameters missing"});
    }    

    if (
      isNaN(Number(target)) ||
      !Array.isArray(daily_exercises ||
      Array(daily_exercises).some(isNaN))
    )
    {
      return res.status(400).send({'error': "malformatted parameters"});
    }

    for (let i = 0; i < (daily_exercises as Array<number>).length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (typeof(daily_exercises[i]) !== 'number') {
        return res.status(400).send({'error': "malformatted parameters"});
      }
    }

    const result = calculateExercises(daily_exercises as number[], target as number);
    return res.status(200).send(result);

  } catch (error) {
    return res.status(400).send({
      'error': "unknown error",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      'message': `${error.message}`
    });
  };  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});