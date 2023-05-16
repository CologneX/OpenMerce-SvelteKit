<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	const param = $page.params.search;
	let products: Products[] = [];
	let isLoading: boolean = true;
	onMount(() => {
		isLoading = true;
		const getProduct = async () => {
			const response = await fetch(`/api/v1/product?search=${param}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status == 400 || response.status == 404) {
				throw error(400, {
					message: 'Oops, product not found!'
				});
			} else if (!response.ok) {
				console.log(response.status);
				throw error(response.status, {
					message: `${response.statusText}`
				});
			}
			const productData: Products[] = await response.json();
			return productData;
		};
		getProduct().then((productData) => {
			products = productData;
			isLoading = false;
		});
	});
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
	<div class="flex flex-wrap gap-4 w-full border">
		{#if isLoading}
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
		{:else}
			{#each products as item}
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
		{/if}
	</div>
</div>
