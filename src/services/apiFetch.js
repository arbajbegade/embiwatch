const BASE_URL =  import.meta.env.VITE_BASE_URL;;

const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Something went wrong!');
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    throw error;
  }
};

export default apiFetch;
