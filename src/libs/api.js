
const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

// Common function for API requests
async function fetchAPI(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

// 1. Get all categories
export async function getCategories() {
  return fetchAPI("/categories");
}

// 2. Get single category
export async function getCategoryBySlug(slug) {
  return fetchAPI(`/categories/${slug}`);
}

// 3. Get all products
export async function getAllProducts() {
  return fetchAPI("/products");
}

// 4. Get products by category
export async function getProductsByCategory(slug) {
  return fetchAPI(`/products?category=${encodeURIComponent(slug)}`);
}

// 5. Get single product by ID
export async function getProductById(id) {
  return fetchAPI(`/products/${id}`);
}
