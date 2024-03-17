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
      chart.data.datasets[0].data = data;
      chart.data.labels = labels;
      chart.update();
    }
  }

  onMount(async () => {
    const TEXT_COLOR = "#FFFFFF";
    const TEXT_FONT_SIZE = 16;
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
            display: false,
            text: title,
          },
          legend: {
            display: showLegends,
            position: "bottom",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time of day (in 15 minute intervals)",
              color: TEXT_COLOR,
              font: {
                size: TEXT_FONT_SIZE,
              },
            },
            ticks: { color: TEXT_COLOR },
          },
          y: {
            title: {
              display: true,
              text: "Average flow rate in Litres / Second",
              color: TEXT_COLOR,
              font: {
                size: TEXT_FONT_SIZE,
              },
            },
            ticks: { color: TEXT_COLOR },
          },
        },
      },
    });
  });
</script>

<canvas bind:this={chartCanvas}></canvas>
