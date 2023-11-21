<script lang="ts">
  import BaseEChart from '$lib/components/BaseEChart.svelte';
  import Stats from '$lib/components/Stats.svelte';
  import TimeRangeSelect from '$lib/components/TimeRangeSelect.svelte';
  import pieChartOptions from '$lib/charts/pie';
  import getLineChartOptions from '$lib/charts/line';
  import type { PageData } from './$types';
  export let data: PageData;

  let timeRangeOptions: string[] = ['All time', '1y', '30d', '1d'];
  let timeRange = timeRangeOptions[0];

  let totalGasSpentWeth = 0;
  let totalGasSpentWethLastPeriod: number | null = null;
  let gasSpentOverTimeX: string[] = [];
  let gasSpentOverTimeY: number[] = [];
  $: {
    if (timeRange === timeRangeOptions[0]) {
      gasSpentOverTimeX = data.allTime.perDay.map((d) => d.day);
      gasSpentOverTimeY = data.allTime.perDay.map(
        (d) => d.total_gas_spent_usd || 0
      );
      totalGasSpentWeth = data.allTime.total.usd;
      totalGasSpentWethLastPeriod = null;
    } else if (timeRange === timeRangeOptions[1]) {
      gasSpentOverTimeX = data.year.perDay.map((d) => d.day);
      gasSpentOverTimeY = data.year.perDay.map(
        (d) => d.total_gas_spent_usd || 0
      );
      totalGasSpentWeth = data.year.total.usd;
      totalGasSpentWethLastPeriod = data.lastYear.total.usd;
    } else if (timeRange === timeRangeOptions[2]) {
      gasSpentOverTimeX = data.month.perDay.map((d) => d.day);
      gasSpentOverTimeY = data.month.perDay.map(
        (d) => d.total_gas_spent_usd || 0
      );
      totalGasSpentWeth = data.month.total.usd;
      totalGasSpentWethLastPeriod = data.lastMonth.total.usd;
      // TODO: implement
    } else if (timeRange === timeRangeOptions[3]) {
    }
  }
</script>

<div class="container mx-auto w-max">
  <div class="container mx-auto w-max mt-5 mb-3">
    <img class="w-80" src="/logo_main.png" />
  </div>
  <div class="hidden">
    <div class="text-primary" />
    <div class="text-error" />
    <div class="text-success" />
  </div>
  <div class="flex justify-center mt-3">
    <TimeRangeSelect bind:timeRange {timeRangeOptions} />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3">
    <Stats
      title="Total WETH Gas Spent"
      value={totalGasSpentWeth}
      lastPeriodValue={totalGasSpentWethLastPeriod}
      period={timeRange}
      emoji="🤑"
    />

    <Stats
      title="Gas Wasted not using METH"
      value={totalGasSpentWeth * 0.06}
      lastPeriodValue={totalGasSpentWethLastPeriod
        ? totalGasSpentWethLastPeriod * 0.06
        : null}
      period={timeRange}
      emoji="🗑️"
      color="error"
    />

    <Stats
      title="Gas saved using METH"
      value={0}
      lastPeriodValue={null}
      period="month"
      emoji="💸"
      color="success"
    />

    <!-- <Stats
			title="Num of METH Calls"
			value={3}
			lastPeriodValue={1}
			period="month"
			emoji="#"
			currency=" "
		/> -->
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 mt-7">
    <div class="">
      <div class="text-xl flex justify-center">METH vs WETH usage</div>
      <BaseEChart option={pieChartOptions} height={300} />
    </div>
    <div class="">
      <div class="text-xl flex justify-center">METH vs WETH Gas usage</div>
      <BaseEChart
        option={getLineChartOptions(gasSpentOverTimeX, gasSpentOverTimeY)}
        height={350}
        notMerge={true}
      />
    </div>
  </div>
</div>
