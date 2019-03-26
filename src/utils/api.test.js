import { fetchData, createOptions } from './api';

describe('fetchData', () => {
  const mockData = ['some', 'data'];
  const mockOptions = { method: 'GET' };
  window.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    ok: true,
    json: jest.fn(() => mockData)
  }));

  it('should call fetch with the correct params in development', () => {
    const expected = 'http://localhost:3001/api/v1/projects';
    fetchData('/api/v1/projects', mockOptions);
    expect(window.fetch).toHaveBeenCalledWith(expected, mockOptions);
  });
  
  it('should call fetch with the correct params in production', () => {
    process.env.NODE_ENV = 'production';
    const expected = 'https://palette-picker-jd.herokuapp.com/api/v1/projects';
    fetchData('/api/v1/projects', mockOptions);
    expect(window.fetch).toHaveBeenCalledWith(expected, mockOptions);
  });

  it('should return data when the response is ok', async () => {
    const result = await fetchData('/fakepath');
    expect(result).toEqual(mockData);
  });

  it('should return undefined if response status is 202', async () => {
    window.fetch = jest.fn(() => Promise.resolve({  status: 202 }));
    const result = await fetchData('/fakepath');
    expect(result).toEqual(undefined);
  });

  it('should return undefined if response status is 204', async () => {
    window.fetch = jest.fn(() => Promise.resolve({  status: 204 }));
    const result = await fetchData('/fakepath');
    expect(result).toEqual(undefined);
  });

  it('should throw an error if the response is not ok', async () => {
    process.env.NODE_ENV = 'development';
    const expected = Error('Error fetching from http://localhost:3001/fake');
    window.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    await expect(fetchData('/fake')).rejects.toEqual(expected);
  })
});