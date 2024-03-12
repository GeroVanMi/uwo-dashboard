<script lang="ts">
  import LinePlot from "../lib/LinePlot.svelte";
  // @ts-ignore The types for the d3 library seem to be missing.
  import * as d3 from "d3";

  let data = d3.ticks(-2, 2, 200).map(Math.sin);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h2 class="h2">UWO Dashboard</h2>
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
