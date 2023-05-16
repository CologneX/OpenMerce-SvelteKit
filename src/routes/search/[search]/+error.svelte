<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Search Result | OpenMerce </title>
</svelte:head>
<div class="flex items-center justify-center w-full h-full">
	<div class=" max-h-64 h-full w-full card flex justify-center items-center">
		<span>
			<h2 class="font-bold text-2xl">{$page.error?.message}</h2>
			<p class="text-sm">Please try another keyword!</p>
		</span>
	</div>
</div>
