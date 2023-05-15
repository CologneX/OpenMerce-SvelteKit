<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	const param = $page.params.search;
	let products: Products[] = [];
	onMount(() => {
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
				throw error(response.status, {
					message: `${response.statusText}`
				});
			}
			const productData: Products[] = await response.json();
			return productData;
		};
		getProduct().then((productData) => {
			products = productData;
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
<div class="container">
	<div class="font-semibold text-xl">Search Result</div>
	<div class="flex flex-wrap gap-4">
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
	</div>
</div>
