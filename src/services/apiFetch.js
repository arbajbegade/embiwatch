const BASE_URL =  import.meta.env.VITE_BASE_URL; // Or use process.env if supported

// API Fetch Wrapper
const apiFetch = async (endpoint, init = {}) => {
  const fullUrl = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl, init);

    if (!response.ok) {
      const errorText = await response.text(); // in case API returns error message
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    return response; // caller will use .json() if needed
  } catch (err) {
    console.error('API fetch failed:', err.message);
    throw err;
  }
};

export default apiFetch;
