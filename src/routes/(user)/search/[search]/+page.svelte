<script lang="ts">
	export let data;
	const { productData } = data;
	import Star from '$lib/icons/Star.svelte';
</script>

<svelte:head>
	<title>Search Result | OpenMerce - Main</title>
</svelte:head>
<div class="container">
	<div class="font-semibold text-xl">Search Result</div>
	<div class="flex flex-wrap gap-4">
		{#each productData as item}
			<a class="card grid w-48 grid-rows-1 card-hover" href="product/{item.id}">
				<img src="/products/{item.id}.webp" alt={item.name} class="aspect-square shadow-xl card" />

				<div class="p-4">
					<h5>{item.name}</h5>

					<hr class="!border-t-2 border-current" />
					<div class="flex">
						<Star />
						<span>{item.rating}</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
