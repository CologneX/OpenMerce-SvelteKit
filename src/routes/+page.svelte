<script lang="ts">
	import Toast from '$lib/Toast.svelte';
	import Star from '$lib/icons/Star.svelte';
	function triggerToast(type: string, message: string) {
		const toast = new Toast({
			target: document.body,
			props: {
				messageText: message,
				type: type
			}
		});
		toast.triggerToast();
	}
	// -- toast settings and trigger function

	import type { PageData } from './$types';
	export let data: PageData;
	const { productData } = data;
	interface Product {
		id: string;
		name: string;
		price: number;
		images: string[];
		rating: number;
	}
	let products: Product[] = productData[0].products;
	// if failed to fetch data

	// pagination using svelte-pagination
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import Next from '$lib/icons/Next.svelte';
	import Prev from '$lib/icons/Prev.svelte';
	let carouselOne: any;
	let carouselBanner: any;

	function chunkArray<T>(array: T[], size: number): T[][] {
		const result: T[][] = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	}

	// end of pagination using svelte-pagination

	import { isLoggedInStore, screenWidthStore } from '$lib/stores';
	import Logo from '$lib/icons/Logo.svelte';
	let isLoggedIn: boolean;
	isLoggedInStore.subscribe((value) => {
		isLoggedIn = value;
	});
	let screenWidth: number;
	screenWidthStore.subscribe((value) => {
		screenWidth = value;
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
<div class="space-y-3 mt-4">
	<div class="container">
		{#if browser}
			<div class="relative h-64">
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
				<Carousel bind:this={carouselBanner} arrows={false} autoplay autoplayDuration={3000}>
					<img src="LinkedIn Banner 2023.png" alt="tokopedia logo" class="rounded-md h-64" />
					<img src="tokopedia logo.png" alt="tokopedia logo" class="rounded-md h-64" />
				</Carousel>
			</div>
		{/if}
	</div>
	<div class="container">
		<div class="font-semibold text-xl">For You</div>
		<small><a href="/see-all" class="no-underline">See All</a></small>

		{#if browser}
			<div class="relative">
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
				<Carousel bind:this={carouselOne} arrows={false} dots={false}>
					{#each chunkArray(products, 6) as productChunk}
						<div class="flex gap-4">
							{#each productChunk as product}
								<a
									class="card grid w-full h-full grid-rows-1 card-hover flex-grow"
									href="product/{product.id}"
								>
									<!-- <img
										src="/products/{product.id}.webp"
										alt={product.name}
										class="aspect-square shadow-xl card"
									/> -->
									<picture class="aspect-square shadow-xl card flex justify-center items-center">
										<source src="/usercontent/{product.images}" />
										<div>
											<Logo />
											<p class="text-center">No Image Found</p>
										</div>
									</picture>
									<div class="p-4">
										<h6>{product.name}</h6>
										<h6 class="font-semibold">
											{product.price.toLocaleString('id-ID', {
												style: 'currency',
												currency: 'IDR',
												minimumFractionDigits: 0
											})}
										</h6>
										<hr class="!border-t-2 border-current" />
										<div class="flex">
											<Star />
											<span>{product.rating}</span>
										</div>
									</div>
								</a>
							{/each}
						</div>
					{/each}
				</Carousel>
			</div>
		{/if}
	</div>
	<div class="container">
		<div class="font-semibold text-xl">Recommended Products</div>
		<small><a href="/see-all" class="no-underline">See All</a></small>
		<div class="flex flex-wrap gap-4">
			{#each products as item}
				<a class="card grid w-48 grid-rows-1 card-hover" href="product/{item.id}">
					<picture class="aspect-square shadow-xl card flex justify-center items-center">
						<source src="/usercontent/{item.images}" />
						<div>
							<Logo />
							<p class="text-center">No Image Found</p>
						</div>
					</picture>

					<div class="p-4">
						<h6>{item.name}</h6>
						<h6 class="font-semibold">
							{item.price.toLocaleString('id-ID', {
								style: 'currency',
								currency: 'IDR',
								minimumFractionDigits: 0
							})}
						</h6>
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

	<div class="container">
		<h3>Alat Mario | Scrollbar</h3>
		<div class="flex gap-3 overflow-x-auto hide-scrollbar">
			{#each products as item}
				<a class="card p-4 grid" href="product/{item.id}">
					<picture class="aspect-square shadow-xl card flex justify-center items-center">
						<source src="/usercontent/{item.images}" />
						<div>
							<Logo />
							<p class="text-center">No Image Found</p>
						</div>
					</picture>
					<div class="placeholder place-self-center" />
					<h5>{item.name}</h5>
					<h6>
						{item.price.toLocaleString('en-US', {
							style: 'currency',
							currency: 'IDR',
							minimumFractionDigits: 0
						})}
					</h6>
					<hr class="!border-t-2 border-current" />
					<div class="flex">
						<Star />
						<span>{item.rating}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
