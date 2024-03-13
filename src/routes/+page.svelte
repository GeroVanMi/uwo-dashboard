<script lang="ts">
  import LinePlot from "../lib/LinePlot.svelte";
  // @ts-ignore The types for the d3 library seem to be missing.
  import * as d3 from "d3";

  let data = d3.ticks(-2, 2, 200).map(Math.sin);

  // TODO: We want to fetch this from a CSV file.
  let sources = {
    1: "bf_plsZUL1100_inflow_ara",
    42: "bf_f03_11e_russikerstr",
    48: "bf_f07_23_bahnhofstr",
    71: "bf_f02_555_mesikerst",
  };

  $: selectedSource = 1;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h2 class="h2">UWO Dashboard</h2>

    <select class="select" bind:value={selectedSource}>
      {#each Object.entries(sources) as [index, source]}
        <option value={index}>{source}</option>
      {/each}
    </select>
    {selectedSource}

    <LinePlot {data} />
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  figure svg,
  .img-bg {
    @apply w-64 h-64 md:w-80 md:h-80;
  }
</style>
