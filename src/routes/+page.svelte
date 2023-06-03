<script lang="ts">
	import ProductCard from '$lib/TempProductCard.svelte';
	import BannerCarousel from '$lib/Main/BannerCarousel.svelte';
	import { getProductsMain } from '$lib/utils/products';
	import { screenWidthStore } from '$lib/utils/stores';
	import type { Products } from '../app';
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
		<div class="h-96 w-full placeholder animate-pulse" />
	{:then allProducts}
		{#each allProducts as items}
			<div class="w-full">
				<div class="flex">
					<h4 class="font-semibold flex-1">{items.category_name}</h4>
					<a href="/see-all" class=" decoration-transparent">See All</a>
				</div>
				{#if $screenWidthStore < 1024}
					<div class="w-full h-full">
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
							{#each items.products as products}
								<swiper-slide class="card card-hover shadow-xl">
									<ProductCard {products} /></swiper-slide
								>
							{/each}
						</swiper-container>
					</div>
				{:else}
					<div class="w-full h-full">
						<swiper-container
							slides-per-view={6}
							space-between={10}
							navigation={true}
							slides-per-group={6}
							pagination={false}
							grab-cursor={true}
						>
							{#each items.products as products}
								<swiper-slide class="card card-hover w-40 md:w-44 lg:w-48 h-full max-h-96">
									<ProductCard {products} /></swiper-slide
								>
							{/each}
						</swiper-container>
					</div>
				{/if}
			</div>
		{/each}
	{/await}

	<hr class="!border-t-8" />

	{#if isLoading}
		<div class="h-96 w-full placeholder animate-pulse" />
	{:else}
		<h4 class="font-semibold">All Products</h4>
		<div class="flex flex-row flex-wrap grow gap-3">
			{#each allProducts as products}
				<ProductCard {products} />
			{/each}
		</div>
	{/if}
</div>
