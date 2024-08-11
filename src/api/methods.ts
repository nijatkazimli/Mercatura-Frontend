// const baseUrl = 'https://mercatura-backend.azurewebsites.net:8080';
const baseUrl = 'http://localhost:8080';
// const baseUrl = 'http://192.168.0.109:8080';
// const baseUrl = 'https://mercatura-backend-apim.azure-api.net';

export async function fetchData<T>(path: string, options?: RequestInit): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(baseUrl + path, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function postData<T>(path: string, body: object, options?: RequestInit): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  };

  try {
    const response = await fetch(baseUrl + path, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Post error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
