interface ExerciseValues {
  values: Array<number>;
  value2: number;
}

interface ResultValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseBmiArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const values: Array<number> = [];

  for (let i = 2; i < (args.length - 1); i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    values.push(Number(args[i]));
  }

  if (!isNaN(Number(args[args.length - 1]))) {
    return {
      values,
      value2: Number(args[args.length - 1])
    };
  } else {
    throw new Error('Provided target value was not number!');
  }
};


function calculateExercises(values: Array<number>, target:number) : ResultValues {
  const periodLength = values.length;
  const trainingDays = values.filter(v => v > 0).length;

  const average = values.reduce((sum, v) => sum + v, 0) / periodLength;

  let success: boolean;
  let ratingDescription: string;
  let rating: number;


  if (average >= target) {
    success = true;
  } else {
    success = false;
  }

  const successPercent = (average / target);

  if (successPercent >= 1) {
    rating = 3;
    ratingDescription = 'Training went as expected';
  } else if (successPercent < 1 && successPercent > 0.75) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Training went worse than expected';
  }

  const result: ResultValues = { 
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
  
  return result;
}


try {
  const { values, value2 } = parseBmiArguments(process.argv);
  console.log(calculateExercises(values, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
    console.log(errorMessage);
  }
  console.log(error);
}