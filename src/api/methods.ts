// const baseUrl = 'https://mercatura-backend.azurewebsites.net:8080';
const baseUrl = 'http://localhost:8080';
// const baseUrl = 'http://192.168.0.109:8080';
// const baseUrl = 'https://mercatura-backend-apim.azure-api.net';

export async function fetchData<T>(
  path: string,
  options?: RequestInit,
  token?: string,
): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (token && defaultOptions.headers) {
    (
      defaultOptions.headers as Record<string, string>
    ).Authorization = `Bearer ${token}`;
  }

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

export async function postData<T>(
  path: string,
  body?: object,
  options?: RequestInit,
  token?: string,
  isJsonResponse = true,
): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (body) {
    defaultOptions.body = JSON.stringify(body);
  }

  if (token && defaultOptions.headers) {
    (
      defaultOptions.headers as Record<string, string>
    ).Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(baseUrl + path, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (isJsonResponse) {
      const data: T = await response.json();
      return data;
    }
    return response as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Post error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function patchData<T>(
  path: string,
  body?: object,
  options?: RequestInit,
  token?: string,
  returns = false,
): Promise<T | void> {
  const defaultOptions: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (body) {
    defaultOptions.body = JSON.stringify(body);
  }

  if (token && defaultOptions.headers) {
    (
      defaultOptions.headers as Record<string, string>
    ).Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(baseUrl + path, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (returns) {
      const data: T = await response.json();
      return data;
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Patch error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function deleteData<T>(
  path: string,
  body?: object,
  options?: RequestInit,
  token?: string,
  returns = false,
): Promise<T | void> {
  const defaultOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (body) {
    defaultOptions.body = JSON.stringify(body);
  }

  if (token && defaultOptions.headers) {
    (
      defaultOptions.headers as Record<string, string>
    ).Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(baseUrl + path, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (returns) {
      const data: T = await response.json();
      return data;
    }
    // eslint-disable-next-line consistent-return, no-useless-return
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Delete error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function postImage(path: string, file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);
  const options: RequestInit = {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(baseUrl + path, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Image post error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function postImages(
  path: string,
  files: Array<File>,
  token: string,
) {
  const uploadPromises = files.map((file) => postImage(path, file, token));
  Promise.all(uploadPromises);
}
