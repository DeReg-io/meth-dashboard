<script lang="ts">
	import BaseEChart from '$lib/components/BaseEChart.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import TimeRangeSelect from '$lib/components/TimeRangeSelect.svelte';
	import pieChartOptions from '$lib/charts/pie';
	import lineChartOptions from '$lib/charts/line';
	import { onMount } from 'svelte';

	let timeRange = 'All time';

	onMount(async () => {
		try {
			const response = await fetch(`/data`, {
				method: 'GET'
			});
			console.log('response: ', response);
			const data = await response.json();
			console.log('data: ', data);
		} catch (err) {
			console.error('err fetching data: ', err);
		}
	});
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
		<TimeRangeSelect bind:timeRange />
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3">
		<Stats
			title="Total WETH Gas Spent"
			value={3_100_345}
			lastPeriodValue={2_560_222}
			period="month"
			emoji="🤑"
		/>

		<Stats
			title="Gas Wasted not using METH"
			value={1_100_345}
			lastPeriodValue={760_222}
			period="month"
			emoji="🗑️"
			color="error"
		/>

		<Stats
			title="Gas saved using METH"
			value={3}
			lastPeriodValue={1}
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
	<div class="grid grid-cols-1 md:grid-cols-2 mt-3">
		<div class="">
			<div class="text-xl flex justify-center">METH vs WETH usage</div>
			<BaseEChart option={pieChartOptions} height={300} />
		</div>
		<div class="">
			<div class="text-xl flex justify-center">METH vs WETH usage</div>
			<BaseEChart option={lineChartOptions} height={350} />
		</div>
	</div>
</div>
