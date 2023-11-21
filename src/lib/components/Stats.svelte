<script lang="ts">
	import { numToHumanText } from '$lib/util/number-to-string';

	export let title: string;
	export let value: number;
	export let lastPeriodValue: number;
	export let currency = '$';
	export let period: string; // month etc.
	export let emoji: string;
	export let color = 'primary';

	let percentage = Math.round(((value - lastPeriodValue) * 100) / lastPeriodValue);
</script>

<div class="stats shadow mx-3">
	<div class="stat">
		<!-- <div class="stat-figure text-{color} text-4xl">{emoji}</div> -->
		<div class="stat-title">{title}</div>
		<div class="stat-value text-{color}">{numToHumanText(value)} {currency}</div>
		<div class="stat-desc">
			{percentage > 0 ? '↗' : '↘'}
			{percentage || 0}% {percentage > 0 ? 'highter' : 'lower'} than last {period}
		</div>
	</div>
</div>
