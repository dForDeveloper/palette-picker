export const fetchData = async (path, options = {}) => {
  try {
    const url = 'http://localhost:3001';
    const response = await fetch(url + path, options);
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

export const createOptions = (method, body) => {
  return {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  };
}