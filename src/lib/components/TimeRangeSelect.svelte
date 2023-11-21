<script lang="ts">
  export let timeRangeOptions: string[] = [];
  export let timeRange = 'All Time';
</script>

{#each timeRangeOptions as range}
  <a
    class="link ml-5 link-hover"
    class:link-primary={timeRange === range}
    class:font-bold={timeRange === range}
    on:click={() => (timeRange = range)}
    on:keypress={() => (timeRange = range)}
    >{range}
  </a>
{/each}
