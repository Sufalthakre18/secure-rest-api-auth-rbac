import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = Cookies.get('token');

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// API methods
const API = {
  get: (endpoint) => {
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },

  post: (endpoint, body) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put: (endpoint, body) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  patch: (endpoint, body) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete: (endpoint) => {
    return apiRequest(endpoint, {
      method: 'DELETE',
    });
  },
};

export default API;