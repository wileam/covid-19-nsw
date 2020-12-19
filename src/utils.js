export const formatNewNumber = (number, showZero = true, showDonut = false) => {
  let formatted = ''
  if (number > 0) {
    return `+${number}`
  } else if (number < 0) {
    return number
  } else {
    if (showZero) {
      formatted = showDonut ? '🍩' : 0
    }
  }
  return formatted
}

// DD-MM-YY to YYYY-MM-DD
export const toDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-")
  return `20${year}-${month}-${day}`
}

export function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export function parseJSON(response) {
  return response.json();
}
