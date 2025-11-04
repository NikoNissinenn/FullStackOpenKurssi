const calculateBmi = (h: number, w: number) => {
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
  }
}

console.log(calculateBmi(180, 74))