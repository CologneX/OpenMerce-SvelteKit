<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head><title>{$page.error?.message}</title></svelte:head>
<div class="font-bold flex items-center justify-center w-full h-full">
	<div>
		<h2 class="font-bold text-2xl">{$page.error?.message}</h2>
		<h3 class="font-bold text-2xl">{$page.status}</h3>
		<p class="text-sm">Please try again</p>
	</div>
</div>
