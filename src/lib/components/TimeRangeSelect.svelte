<script lang="ts">
	export let timeRange = 'All time';
</script>

{#each ['1d', '30d', '1y', 'All time'] as range}
	<a
		class="link ml-5 link-hover"
		class:link-primary={timeRange === range}
		class:font-bold={timeRange === range}
		on:click={() => (timeRange = range)}
		on:keypress={() => (timeRange = range)}
		>{range}
	</a>
{/each}
