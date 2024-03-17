<script lang="ts">
  import Chart from "$lib/Chart.svelte";

  async function fetchMeanFlows(sourceID: number) {
    const response = await fetch(
      `http://localhost:8000/flow/source/${sourceID}`,
    );
    const flowMeans = await response.json();
    return {
      title: "Flow Means",
      type: "bar",
      backgroundColor: "#FDAF7B",
      labels: flowMeans.map((flowEntry: FlowEntry) => flowEntry.timestamp),
      data: flowMeans.map((flowEntry: FlowEntry) => flowEntry.value),
    };
  }

  interface FlowEntry {
    timestamp: string;
    value: number;
  }

  let data = {
    title: "Flow Means",
    type: "bar",
    backgroundColor: "#FDAF7B",
    labels: [],
    data: [],
  };

  let sources = {
    1: "bf_plsZUL1100_inflow_ara",
    42: "bf_f03_11e_russikerstr",
    48: "bf_f07_23_bahnhofstr",
    71: "bf_f02_555_mesikerst",
  };

  let selectedSource = 1;
  $: {
    fetchMeanFlows(selectedSource).then((newData) => (data = newData));
  }
</script>

<div>
  <div class="container h-full mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center">
      <h2 class="h2">UWO Dashboard</h2>

      <select
        class="select"
        bind:value={selectedSource}
        on:change={() => fetchMeanFlows(selectedSource)}
      >
        {#each Object.entries(sources) as [index, source]}
          <option value={index}>{source}</option>
        {/each}
      </select>
      {selectedSource}
    </div>
  </div>
  <div>
    <Chart
      type="bar"
      title="Flow Means"
      labels={data.labels}
      data={data.data}
      backgroundColor="#FDAF7B"
    />
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  figure svg {
    @apply w-64 h-64 md:w-80 md:h-80;
  }
</style>
