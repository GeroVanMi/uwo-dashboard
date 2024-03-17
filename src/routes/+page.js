export const ssr = false;
const BASE_URL = "http://localhost:8000";

async function fetchSources() {
  const response = await fetch(`${BASE_URL}/flow/sources/`);
  return response.json();
}

export async function load({ params }) {
  return {
    sources: await fetchSources(),
  };
}
