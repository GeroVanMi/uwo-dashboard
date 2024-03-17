export const ssr = false;

async function fetchMeanFlows(sourceID) {
  const response = await fetch(`http://localhost:8000/flow/source/${sourceID}`);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function load({ params }) {
  const flowMeans = await fetchMeanFlows(1);
  return {
    title: "Flow Means",
    type: "bar",
    backgroundColor: "#ffaaaa",
    labels: flowMeans.map((flowEntry) => flowEntry.timestamp),
    data: flowMeans.map((flowEntry) => flowEntry.value),
  };
}
