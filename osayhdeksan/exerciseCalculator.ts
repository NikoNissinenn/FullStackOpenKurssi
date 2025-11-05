interface ResultValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


function calculateExercises(values: Array<number>, target:number) : ResultValues {
  const periodLength = values.length;
  const trainingDays = values.filter(v => v > 0).length;

  const average = values.reduce((sum, v) => sum + v, 0) / periodLength;

  let success: boolean;
  let ratingDescription: string;
  let rating: number


  if (average >= target) {
    success = true
  } else {
    success = false
  }

  const successPercent = (average / target)

  if (successPercent >= 1) {
    rating = 3
    ratingDescription = 'Training went as expected'
  } else if (successPercent < 1 && successPercent > 0.75) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'Training went worse than expected'
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


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))