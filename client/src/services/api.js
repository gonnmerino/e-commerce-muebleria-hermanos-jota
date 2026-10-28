const API_URL = 'http://localhost:3000/api';

async function request(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Error ${res.status}`);
  }
  return res.json();
}

export function fetchProducts() {
  return request('/products');
}

export function fetchProductById(id) {
  return request(`/products/${id}`);
}