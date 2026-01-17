import { auth } from '@/lib/firebase/client';

/**
 * Makes an authenticated API request with Firebase ID token
 *
 * @param {string} url - API endpoint URL
 * @param {Object} options - fetch options
 * @returns {Promise<Response>}
 */
export async function fetchWithAuth(url, options = {}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const token = await user.getIdToken();

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Makes an authenticated API request and returns JSON
 *
 * @param {string} url - API endpoint URL
 * @param {Object} options - fetch options
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, options = {}) {
  const response = await fetchWithAuth(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}
