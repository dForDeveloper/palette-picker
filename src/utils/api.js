export const fetchData = async (endpoint, options = {}) => {
  const url = 'http://localhost:3001';
  const response = await fetch(url + endpoint, options);
  if (response.status === 202 || response.status === 204) return;
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(`Error fetching from ${url + endpoint}`);
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