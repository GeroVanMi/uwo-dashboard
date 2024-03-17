export const ssr = false;
const BASE_URL = "";

async function fetchSources() {
  const response = await fetch("/cache/flow_sources.json");
  return response.json();
}

export async function load({ params }) {
  return {
    sources: await fetchSources(),
  };
}
