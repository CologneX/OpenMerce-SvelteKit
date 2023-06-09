<script lang="ts">
	import { page } from '$app/stores';
	import TempProductCard from '$lib/TempProductCard.svelte';
	import { getProductSearch } from '$lib/utils/products';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	const handleGetCategory = async () => {
		const response = await fetch('/api/v1/category', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		return data;
	};
	let dataProduct: any = [];
	const handleSearchProduct = async (searchParam: string) => {
		dataProduct = await getProductSearch(searchParam);
	};
	const handleGetProductSearch = async (
		key: string | Array<number>,
		filterBy: string,
		searchParam: string
	) => {
		if (filterBy == 'category') {
			const response = await fetch(
				`
			/api/v1/product?category=${key}&search=${searchParam}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				dataProduct = data;
			} else if (response.status === 404) {
				throw new Error('Something went wrong');
			}
		} else if (filterBy == 'price') {
			const response = await fetch(`/api/v1/product?price_from=${key[0]}}&price_to=${key[1]}}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const data = await response.json();
				dataProduct = data;
			} else if (response.status === 404) {
				throw new Error('Something went wrong');
			}
		}
	};

	// const handleGetProductSearchFromPrice = async (key: string, filterBy: string) => {
	// 	if (filterBy == 'category') {
	// 		const response = await fetch(`/api/v1/product?category=${key}`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		});
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			return data;
	// 		} else if (response.status === 404) {
	// 			return null;
	// 		} else {
	// 			throw new Error('Something went wrong');
	// 		}
	// 	}
	// };
</script>

<svelte:head>
	<title>Search Result | OpenMerce - Main</title>
	<meta name="description" content="Searching for {$page.params.search}?" />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register, {$page
			.params.search}"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>

<div class="w-full h-full p-4">
	<h3 class="font-semibold text-xl">Search Result</h3>
	<div class="h-4" />
	<div class="flex flex-col md:flex-row gap-4">
		<div
			class="card rounded-md border border-primary-500 drop-shadow-md p-4 basis-1/5 h-fit sticky top-6"
		>
			<p class="font-semibold">Filter</p>
			<Accordion regionControl="font-semibold">
				<AccordionItem open>
					<svelte:fragment slot="summary">Category</svelte:fragment>
					<svelte:fragment slot="content">
						{#await handleGetCategory() then data}
							{#each data as categoryItem}
								<button
									type="button"
									class="btn btn-sm w-full text-end variant-soft-primary"
									on:click={() => {
										handleGetProductSearch(categoryItem.id, 'category', $page.params.search);
									}}
									><span>{categoryItem.name}</span>
								</button>
							{/each}
						{/await}
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
		<div>
			{#await handleSearchProduct($page.params.search)}
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
			{:then}
				<div
					class="grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full"
				>
					{#each dataProduct as item}
						<TempProductCard products={item} />
					{/each}
				</div>
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
</div>
