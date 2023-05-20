<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const param = $page.params.search;
	const getProduct = async () => {
		const response = await fetch(`/api/v1/product?search=${param}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status == 400 || response.status == 404) {
			throw new Error('Product not found');
		} else if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const productData: Products[] = await response.json();
		return productData;
	};

	import Logo from '$lib/icons/Logo.svelte';
	import Star from '$lib/icons/Star.svelte';
</script>

<svelte:head>
	<title>Search Result | OpenMerce - Main</title>
	<meta name="description" content="Searching for {param}?" />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register, {param}"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>

<div class="w-full h-full">
	<div class="font-semibold text-xl">Search Result</div>
	<div class="flex flex-wrap gap-4 w-full">
		{#await getProduct()}
			<div class="placeholder w-full h-64 card animate-pulse" />
			<div class="flex w-full gap-4">
				{#each [1, 2, 3, 4, 5, 6] as item}
					<div
						class="card w-36 md:w-40 lg:w-44 drop-shadow-xl h-full max-h-68 animate-pulse flex-1"
					>
						<div class="aspect-square shadow-lg flex justify-center items-center w-full" />

						<section class="p-4">
							<div class="h-4 bg-gray-400 rounded w-3/4" />
							<div class="h-4 bg-gray-400 rounded mt-2" />
						</section>

						<footer class="p-4">
							<hr class="!border-t-2 border-current" />
							<div class="flex items-center">
								<div class="h-4 bg-gray-400 rounded w-3/4" />
							</div>
						</footer>
					</div>
				{/each}
			</div>
		{:then productData}
			{#each productData as item}
				<a class="card grid w-48 grid-rows-1 card-hover" href="/product/{item.id}">
					<picture class="aspect-square shadow-xl card flex justify-center items-center">
						<source src="/usercontent/{item.image}" />
						<div>
							<Logo />
							<p class="text-center">No Image Found</p>
						</div>
					</picture>
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
		{:catch error}
			<div class="card w-full h-64">
				<div class="flex flex-col justify-center items-center h-full">
					<h1 class="text-2xl font-semibold">Error</h1>
					<p class="text-center">{error.message}</p>
				</div>
			</div>
		{/await}
	</div>
</div>
