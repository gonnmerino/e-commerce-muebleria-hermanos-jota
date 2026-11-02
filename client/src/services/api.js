const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options) {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Error ${res.status}`);
  }
  return res.json();
}

function sendJson(endpoint, method, data) {
  return request(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export function fetchProducts() {
  return request('/products');
}

export function fetchProductById(id) {
  return request(`/products/${id}`);
}

export function createProduct(data) {
  return sendJson('/products', 'POST', data);
}

export function updateProduct(id, data) {
  return sendJson(`/products/${id}`, 'PUT', data);
}

export function deleteProduct(id) {
  return request(`/products/${id}`, { method: 'DELETE' });
}
