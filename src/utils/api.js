export const fetchData = async (path, options = {}) => {
  const url = 'http://localhost:3001';
  try {
    const response = await fetch(url + path, options);
    return await response.json();
  } catch (error) {
    throw Error(`Error fetching from ${url + path}`);
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