export const getAuthToken = () =>
  localStorage.getItem('tracker') &&
  JSON.parse(localStorage.getItem('tracker'))['token']

export const calculateBMI = (height, weight) => {
  return (weight / (height * height)) * 10000
}

export const calculateWeight = (height, gender) => {
  if (gender === 'Male') {
    return height - 100 - (height - 100) * 0.1
  } else {
    return height - 100 - (height - 100) * 0.25
  }
}

export const calculateCalories = (weight) => {
  return weight * 2.204623 * 15
}
