<script lang="ts">
	import ProductCard from '$lib/TempProductCard.svelte';
	import BannerCarousel from '$lib/Main/BannerCarousel.svelte';
	import { getProductsMain } from '$lib/utils/products';
	import { screenWidthStore } from '$lib/utils/stores';
	import type { Products } from '../app';
	import Prev from '$lib/icons/Prev.svelte';
	import Next from '$lib/icons/Next.svelte';
	import Logo from '$lib/icons/Logo.svelte';
	import Star from '$lib/icons/Star.svelte';
	import { goto } from '$app/navigation';
	import TempProductCardSecondary from '$lib/TempProductCardSecondary.svelte';
	import TempProductCard from '$lib/TempProductCard.svelte';
	let allProducts: Products[] = [];
	let isLoading: boolean = true;
	const MainMenuLoad = async () => {
		// await getProductsMain();
		let data = await getProductsMain();
		data = data.filter((category) => category.products !== null);
		allProducts = data.reduce((acc: any[], category: any) => {
			isLoading = false;
			if (category.products) {
				return [...acc, ...category.products];
			} else {
				return acc;
			}
		}, []);

		return data;
	};
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
<div class="space-y-10 w-full h-full mt-6 px-6">
	<BannerCarousel />
	{#await MainMenuLoad()}
		<swiper-container
			pagination={false}
			slides-per-view={$screenWidthStore < 640
				? 2
				: $screenWidthStore < 768
				? 4
				: $screenWidthStore < 1024
				? 5
				: 6}
			space-between={10}
			free-mode={true}
		>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
		</swiper-container>
	{:then allProducts}
		{#each allProducts as items, i}
			<div class="flex">
				<div class="font-semibold text-xl flex-1">{items.category_name}</div>
				<a href="/category/{items.category_id}" class="decoration-transparent">See All</a>
			</div>
			<!-- <div class="h-4" /> -->
			<hr class="!border-b-2" />
			<!-- <div class="h-4" /> -->

			<div class="relative group">
				<button
					type="button"
					class="btn-icon absolute variant-filled top-1/2 transform -translate-y-1/2 z-10 -right-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 next"
					on:click={() => {
						const swiper = document.getElementById(`${i}`)['swiper'];
						swiper.slideNext();
					}}
				>
					<span><Next /></span>
				</button>
				<button
					type="button"
					class="btn-icon variant-filled z-10 absolute top-1/2 transform -translate-y-1/2 -left-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					on:click={() => {
						const swiper = document.getElementById(i)['swiper'];
						swiper.slidePrev();
					}}
				>
					<span><Prev /></span>
				</button>
				{#if $screenWidthStore < 1024}
					<div class="w-full h-full">
						<swiper-container
							pagination={false}
							navigation={false}
							slides-per-view={$screenWidthStore < 640
								? 2
								: $screenWidthStore < 768
								? 4
								: $screenWidthStore < 1024
								? 5
								: 6}
							space-between={10}
							id={i}
							free-mode={true}
						>
							{#each items.products as products}
								<ProductCard {products} />
							{/each}
						</swiper-container>
					</div>
				{:else}
					<div class="w-full h-full">
						<swiper-container
							slides-per-view={6}
							space-between={10}
							navigation={false}
							slides-per-group={6}
							pagination={false}
							grab-cursor={true}
							id={i}
							class="py-8"
						>
							{#each items.products as products}
								<ProductCard {products} />
							{/each}
						</swiper-container>
					</div>
				{/if}
			</div>
		{/each}
	{/await}

	<hr class="!border-t-8" />

	{#if isLoading}
		<swiper-container
			pagination={false}
			slides-per-view={$screenWidthStore < 640
				? 2
				: $screenWidthStore < 768
				? 4
				: $screenWidthStore < 1024
				? 5
				: 6}
			space-between={10}
			free-mode={true}
		>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
			<swiper-slide class="card card-hover shadow-xl">
				<div class="h-96 w-full placeholder animate-pulse" /></swiper-slide
			>
		</swiper-container>
	{:else}
		<div class="font-semibold text-xl">All Products</div>
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
			{#each allProducts as products}
				<!-- <TempProductCardSecondary {products} /> -->
				<TempProductCard {products} />
			{/each}
		</div>
	{/if}
</div>
