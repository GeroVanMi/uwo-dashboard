<script lang="ts">
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";

  let ctx;
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  export let type;
  export let labels;
  export let data;
  export let title;
  export let backgroundColor;
  export let showLegends = false;

  $: {
    if (chart) {
      console.log("Chart exists");
      console.log(chart.data.datasets);
      chart.data.datasets[0].data = data;
      chart.data.labels = labels;
      chart.update();
    }
  }

  onMount(async () => {
    ctx = chartCanvas.getContext("2d");

    if (ctx === null) {
      console.error("Failed to get canvas context.");
      return;
    }

    chart = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            backgroundColor,
            data,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: title,
          },
          legend: {
            display: showLegends,
            position: "bottom",
          },
        },
      },
    });
  });
</script>

<canvas bind:this={chartCanvas}></canvas>
