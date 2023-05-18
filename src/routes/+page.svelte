<script lang="ts">
	import Star from '$lib/icons/Star.svelte';

	// if failed to fetch data
	import Logo from '$lib/icons/Logo.svelte';
	// pagination using svelte-pagination
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// end of pagination using svelte-pagination

	import { isLoggedInStore, screenWidthStore } from '$lib/utils/stores';
	let isLoggedIn: boolean;
	import { register } from 'swiper/element/bundle';

	register();
	let screenWidth: number;
	let products: Products[] = [];
	let banner: MainBanner[] = [];
	let isLoading = true;
	// fetch data
	import { error } from '@sveltejs/kit';
	import ProductCard from '$lib/ProductCard.svelte';
	import ProductCarousel from '$lib/ProductCarousel.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import Cart from '$lib/Cart.svelte';
	onMount(async () => {
		const getDataMain = async () => {
			isLoading = true;
			const [getProduct, getBanner, getCartCount] = await Promise.all([
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
				}),
				fetch('/api/v1/customer/cart-count', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
			]);
		
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
<div class="space-y-10 w-full h-full mt-6">
	{#if browser}
		<div class="w-full space-y-2">
			<div class="aspect-[21/5]">
				{#if !isLoading}
					<swiper-container
						navigation={true}
						slides-per-group={1}
						autoplay={true}
						delay={2000}
						grab-cursor={true}
					>
						{#each banner as item}
							<swiper-slide class="shadow-lg flex justify-center items-center">
								<picture>
									{#if banner}
										<img src="/usercontent/{item.image_url}" alt={item.image_url} />
									{:else}
										<div>
											<Logo />
											<p class="text-center">No Image Found</p>
										</div>
									{/if}
								</picture>
							</swiper-slide>
						{/each}
					</swiper-container>
				{:else}
					<div class="placeholder h-full w-full animate-pulse" />
				{/if}
			</div>
		</div>
	{/if}
	<div class="w-full">
		<div class="flex">
			<h4 class="font-semibold flex-1">For You</h4>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>

		<div class="grid grid-flow-col gap-1 overflow-x-auto hide-scrollbar card md:hidden">
			{#each products as item}
				<ProductCard products={item} />
			{/each}
		</div>

		<div class="w-full hidden md:block h-96">
			{#if !isLoading}
				<ProductCarousel {products} />
			{:else}
				<div class="w-full animate-pulse text-center placeholder h-full" />
			{/if}
		</div>
	</div>
	<div class="w-full">
		<div class="flex">
			<h4 class="font-semibold flex-1">Special Promo for You!!</h4>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>

		<div class="grid grid-flow-col gap-1 overflow-x-auto hide-scrollbar card md:hidden">
			{#each products as item}
				<ProductCard products={item} />
			{/each}
		</div>

		<div class="w-full hidden md:block h-96">
			{#if !isLoading}
				<ProductCarousel {products} />
			{:else}
				<div class="w-full animate-pulse text-center placeholder h-full" />
			{/if}
		</div>
	</div>

	<hr class="!border-t-8" />

	<div
		class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 justify-items-center h-96"
	>
		{#if !isLoading}
			{#each products as item}
				<ProductCard products={item} />
			{/each}
		{:else}
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
		{/if}
	</div>
</div>
