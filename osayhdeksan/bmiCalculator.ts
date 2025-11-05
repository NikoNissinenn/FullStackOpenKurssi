interface bmiInputValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): bmiInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (h: number, w: number) => {
  const result = (w / ((h / 100) ** 2))
  
  if (result < 16) {
    return 'Underweight (Severe thinness)'
  } else if (result < 17) {
    return 'Underweight (Moderate thinness)'
  } else if (result < 18.5) {
    return 'Underweight (Mild thinness)'
  } else if (result < 25) {
    return 'Normal range'
  } else if (result < 30) {
    return 'Overweight (Pre-obese)'
  } else if (result < 35) {
    return 'Obese (Class I)'
  } else if (result < 40) {
    return 'Obese (Class II)'
  } else if (result >= 40) {
    return 'Obese (Class III)'
  } else {
    return ''
  }
}

try {
  if (require.main === module) {
    const { value1, value2 } = parseArguments(process.argv)
    console.log(calculateBmi(value1, value2))
  } 
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(error)
}
