<script lang="ts">
  import Chart from "$lib/Chart.svelte";
  interface FlowEntry {
    hour: number;
    minute: number;
    value: number;
  }

  interface FlowMeans {
    labels: String[];
    data: number[];
  }

  async function fetchFlowMeans(sourceID: number): Promise<FlowMeans> {
    const response = await fetch(
      `http://localhost:8000/flow/source/${sourceID}`,
    );
    const flowMeans = await response.json();
    return {
      labels: flowMeans.map(
        (flowEntry: FlowEntry) =>
          `${String(flowEntry.hour).padStart(2, "0")}:${String(flowEntry.minute).padStart(2, "0")}`,
      ),
      data: flowMeans.map((flowEntry: FlowEntry) => flowEntry.value),
    };
  }

  export let data;
  $: console.log(data);
  let flowMeans: FlowMeans = {
    labels: [],
    data: [],
  };

  let selectedSource = "1";
  $: {
    fetchFlowMeans(parseInt(selectedSource)).then(
      (newFlowMeans) => (flowMeans = newFlowMeans),
    );
  }
</script>

<div class="container mx-auto mt-10">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h2 class="h2">Daily Flow Average</h2>

    <div class="flex justify-center items-center">
      <select
        class="select"
        bind:value={selectedSource}
        on:change={() => fetchFlowMeans(parseInt(selectedSource))}
      >
        {#each Object.entries(data.sources) as [index, source]}
          <option value={index}>{source}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="mt-10">
    <Chart
      type="bar"
      title="Flow Means"
      labels={flowMeans.labels}
      data={flowMeans.data}
      backgroundColor="#6199D5"
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
