<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	// -- toast settings and trigger function
	import type { PageData } from './$types';
	export let data: PageData;
	const { productData } = data;
	interface Product {
		id: string;
		name: string;
		price: number;
		image: string;
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
	<div>
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
					<div class="w-full">
						<picture class="rounded-md w-full z-0 aspect-[21/5]">
							<source src="/usercontent/" />
							<div class="grid justify-items-center place-items-center">
								<!-- <Logo height={'1/2'} /> -->
								<p>No Image Found</p>
							</div>
						</picture>
					</div>
					<!-- <picture class="rounded-md w-full z-0 aspect-[21/5]">
						<source src="/usercontent/" />
						<div class="grid justify-items-center place-items-center">
							<Logo height={'1/2'} />
							<p>No Image Found</p>
						</div>
					</picture> -->
				</Carousel>
			</div>
		{/if}
	</div>
	<div>
		<div>
			<span class="font-semibold text-2xl">For You</span>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>
		{#if browser}
			<div class="relative">
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
				<div class="flex space-x-4">
					<Carousel
						bind:this={carouselOne}
						arrows={false}
						dots={false}
						particlesToScroll={6}
						particlesToShow={6}
						infinite={false}
					>
						{#each products as product}
							<div class="px-2 bg-transparent w-28 first:pl-0 last:pr-0">
								<a class="card grid card-hover w-full h-full" href="product/{product.id}">
									<picture class="aspect-square shadow-xl card flex justify-center items-center">
										<source src="/usercontent/{product.images}" />
										<div>
											<Logo />
											<p class="text-center">No Image Found</p>
										</div>
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
										<span>{product.rating}</span>
									</div>
								</footer>
							</a>
						{/each}
					</Carousel>
				</div>
			</div>
		{/if}
	</div>

	<!-- <div>
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
	</div> -->

	<div>
		<h3>Alat Mario | Scrollbar</h3>
		<div class="grid grid-flow-col overflow-x-auto hide-scrollbar gap-1">
			{#each products as item}
				<a class="card w-32" href="product/{item.id}">
					<picture class="aspect-square shadow-xl flex justify-center items-center w-full">
						{#if item.image}
							<img src="/usercontent/{item.image}" alt="{item.name}'s image" />
						{:else}
							<div class="no-image">
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
