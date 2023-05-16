<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	// import type { PageData } from './$types';
	// export let data: PageData;
	// const { productData } = data;

	// if failed to fetch data
	import Logo from '$lib/icons/Logo.svelte';
	// pagination using svelte-pagination
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import Next from '$lib/icons/Next.svelte';
	import Prev from '$lib/icons/Prev.svelte';
	let carouselOne: any;
	let carouselBanner: any;
	import { onMount } from 'svelte';
	// end of pagination using svelte-pagination

	import { isLoggedInStore, screenWidthStore } from '$lib/utils/stores';
	let isLoggedIn: boolean;

	let screenWidth: number;
	let products: Products[] = [];
	let banner: MainBanner[] = [];
	let isLoading = true;
	// fetch data
	import { error } from '@sveltejs/kit';
	import ProductCard from '$lib/ProductCard.svelte';
	onMount(() => {
		// for fetcing all products
		// const getDataMain = async () => {
		// 	isLoading = true;
		// 	const getProduct = await fetch('/api/v1/product', {
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		}
		// 	});
		// 	const getBanner = await fetch('/api/v1/home-banner', {
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		}
		// 	});
		// 	if (!getProduct.ok) {
		// 		throw error(500, {
		// 			message: 'Unable to fetch products'
		// 		});
		// 	}
		// 	const data = await getProduct.json();
		// 	return data;
		// };
		const getDataMain = async () => {
			isLoading = true;
			const [getProduct, getBanner] = await Promise.all([
				fetch('/api/v1/product', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}),
				fetch('/api/v1/home-banner', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
			]);

			if (!getProduct.ok) {
				throw error(500, {
					message: 'Unable to fetch products'
				});
			}

			const productsData = await getProduct.json();
			const bannerData = await getBanner.json();
			return [productsData, bannerData];
		};
		getDataMain().then(([productsData, bannerData]) => {
			products = productsData[0].products;
			banner = bannerData;
			isLoading = false;
		});
		// end of fetching all products

		isLoggedInStore.subscribe((value) => {
			isLoggedIn = value;
		});
		screenWidthStore.subscribe((value) => {
			screenWidth = value;
		});
	});
</script>

<svelte:head>
	<title>OpenMerce | Main</title>
	<meta name="description" content="OpenMerce - Open Source E-Commerce" />
	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Main, Main"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<!-- <Toast position='br' /> -->
<div class="space-y-10 w-full h-full">
	{#if browser}
		<div class="w-full space-y-2">
			<div class="aspect-[21/5]">
				{#if !isLoading}
					<Carousel bind:this={carouselBanner} arrows={false} autoplay autoplayDuration={4000}>
						{#each banner as item}
							<picture class="shadow-lg flex justify-center items-center">
								{#if banner}
									<img src="/usercontent/{item.image_url}" alt={item.image_url} />
								{:else}
									<div>
										<Logo />
										<p class="text-center">No Image Found</p>
									</div>
								{/if}
							</picture>
						{/each}
					</Carousel>
				{:else}
					<div class="placeholder h-full w-full animate-pulse" />
				{/if}
			</div>

			<div class="flex justify-evenly">
				<button
					type="button"
					class="btn-icon variant-glass-surface z-10 hidden md:flex"
					on:click={() => carouselBanner.goToPrev()}
				>
					<span><Prev /></span>
				</button>
				<button
					type="button"
					class="btn-icon variant-glass-surface z-10 hidden md:flex"
					on:click={() => carouselBanner.goToNext()}
				>
					<span><Next /></span>
				</button>
			</div>
		</div>
	{/if}

	<div class="w-full">
		<div class="flex">
			<h4 class="font-semibold flex-1">For You</h4>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>

		<div class="grid grid-flow-col gap-1 overflow-x-auto hide-scrollbar card p-2 md:hidden">
			{#each products as item}
				<ProductCard products={item} />
			{/each}
		</div>
		{#if browser}
			<div class="w-full space-y-2 hidden md:block">
				<div class="flex w-full h-full card p-2">
					{#if !isLoading}
						<Carousel
							bind:this={carouselOne}
							arrows={false}
							dots={false}
							particlesToScroll={5}
							particlesToShow={screenWidth > 1024 ? 6 : screenWidth > 768 ? 5 : 5}
							infinite={false}
						>
							{#each products as product}
								<ProductCard products={product} />
							{/each}
						</Carousel>
					{:else}
						<div class="w-full animate-pulse text-center h-full">Loading...</div>
					{/if}
				</div>
				{#if !isLoading}
					<div class="flex justify-evenly">
						<button
							type="button"
							class="btn-icon variant-glass-surface z-10"
							on:click={() => carouselOne.goToPrev()}
						>
							<span><Prev /></span>
						</button>
						<button
							type="button"
							class="btn-icon variant-glass-surface z-10"
							on:click={() => carouselOne.goToNext()}
						>
							<span><Next /></span>
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div>
		<div class="flex">
			<h4 class="font-semibold flex-1">Sale just for you</h4>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>
		<div class="grid grid-flow-col gap-1 overflow-x-auto hide-scrollbar card p-2">
			{#each products as item}
				<ProductCard products={item} />
			{/each}
		</div>
	</div>
	<hr class="!border-t-8" />

	<div
		class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 justify-items-center"
	>
		{#each products as item}
			<ProductCard products={item} />
		{/each}
	</div>
</div>
