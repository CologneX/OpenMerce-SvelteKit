<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	// -- toast settings and trigger function
	// import type { PageData } from './$types';
	// export let data: PageData;
	// const { productData } = data;

	// if failed to fetch data

	// pagination using svelte-pagination
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import Next from '$lib/icons/Next.svelte';
	import Prev from '$lib/icons/Prev.svelte';
	let carouselOne: any;
	let carouselBanner: any;
	import { onMount } from 'svelte';
	// end of pagination using svelte-pagination

	import { isLoggedInStore, screenWidthStore } from '$lib/stores';
	import Logo from '$lib/icons/Logo.svelte';
	let isLoggedIn: boolean;

	let screenWidth: number;
	interface Product {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
	}
	let products: Product[] = [];
	let isLoading = true;
	// fetch data
	import { error } from '@sveltejs/kit';
	onMount(() => {
		const getAllProducts = async () => {
			isLoading = true;
			const response = await fetch('/api/v1/product', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				throw error(500, {
					message: 'Unable to fetch products'
				});
			}
			const productsData = await response.json();
			return productsData;
		};
		getAllProducts().then((productsData) => {
			products = productsData[0].products;
			isLoading = false;
		});
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
<div class="space-y-10 mt-4 w-full h-full">
	<div class="w-full border-2">
		{#if browser}
			<div class="relative aspect-[21/5] w-full">
				{#if screenWidth > 1154}
					<button
						type="button"
						class="btn-icon variant-glass-surface absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10"
						on:click={() => carouselBanner.goToPrev()}
					>
						<span><Prev /></span>
					</button>
					<button
						type="button"
						class="btn-icon variant-glass-surface absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10"
						on:click={() => carouselBanner.goToNext()}
					>
						<span><Next /></span>
					</button>
				{/if}
				<Carousel bind:this={carouselBanner} arrows={false} autoplay autoplayDuration={3000}>
					<div class="w-auto md:w-full">
						<picture class="rounded-md w-full">
							<img src="/usercontent/" alt="banner" class="w-full" />
							<div class="grid justify-items-center place-items-center w-full">
								<p>No Image Found</p>
							</div>
						</picture>
					</div>
				</Carousel>
			</div>
		{/if}
	</div>

	<div class="w-full">
		<div>
			<span class="font-semibold text-2xl">For You</span>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>
		{#if browser}
			<div class="relative w-full h-full">
				{#if screenWidth > 1154}
					<button
						type="button"
						class="btn-icon variant-glass-surface absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10"
						on:click={() => carouselOne.goToPrev()}
					>
						<span><Prev /></span>
					</button>
					<button
						type="button"
						class="btn-icon variant-glass-surface absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10"
						on:click={() => carouselOne.goToNext()}
					>
						<span><Next /></span>
					</button>
				{/if}
				<div class="flex w-full h-full">
					{#if !isLoading}
						<Carousel
							bind:this={carouselOne}
							arrows={false}
							dots={false}
							particlesToScroll={5}
							particlesToShow={5}
							infinite={false}
						>
							{#each products as product}
								<div class="bg-transparent w-auto md:w-24">
									<a
										class="card grid card-hover w-full h-full first:p-0 last:p-0"
										href="product/{product.id}"
									>
										<picture class="aspect-square card flex justify-center items-center">
											{#if product.image}
												<img src="/usercontent/{product.image}" alt="{product.name}'s image" />
											{:else}
												<div>
													<Logo />
													<p class="text-center">No Image Found</p>
												</div>
											{/if}
										</picture>

										<section class="p-4">
											<h6>{product.name}</h6>
											<h6 class="font-semibold">
												{product.price.toLocaleString('id-ID', {
													style: 'currency',
													currency: 'IDR',
													minimumFractionDigits: 0
												})}
											</h6>
										</section>
										<footer class="p-4">
											<hr class="!border-t-2 border-current" />
											<div class="flex items-center">
												<Star />
												<h6>{product.rating}</h6>
											</div>
										</footer>
									</a>
								</div>
							{/each}
						</Carousel>
					{:else}
						<div class="placeholder w-full animate-pulse text-center h-full">Loading...</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<div>
		<h3>All Products</h3>
		<div class="grid grid-flow-col overflow-x-auto hide-scrollbar gap-1">
			{#each products as item}
				<a class="card w-32" href="product/{item.id}">
					<picture class="aspect-square shadow-xl flex justify-center items-center w-full">
						{#if item.image}
							<img src="/usercontent/{item.image}" alt="{item.name}'s image" />
						{:else}
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						{/if}
					</picture>

					<section class="p-4">
						<h6>{item.name}</h6>
						<h6 class="font-semibold">
							{item.price.toLocaleString('id-ID', {
								style: 'currency',
								currency: 'IDR',
								minimumFractionDigits: 0
							})}
						</h6>
					</section>
					<footer class="p-4 card-footer">
						<hr class="!border-t-2 border-current" />
						<div class="flex items-center">
							<Star />
							<h6>{item.rating}</h6>
						</div>
					</footer>
				</a>
			{/each}
		</div>
	</div>
</div>
