<script lang="ts">
	import { register } from 'swiper/element/bundle';
	register();

	let isLoading: boolean = true;
	import ProductCard from '$lib/TempProductCard.svelte';
	import BannerCarousel from '$lib/Main/BannerCarousel.svelte';
	import { getProductsMain } from '$lib/utils/products';
	import { screenWidthStore } from '$lib/utils/stores';
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
	<BannerCarousel />
	{#await getProductsMain()}
		<div class="h-96 w-full placeholder animate-pulse" />
	{:then productsData}
		{#each productsData as items}
			<div class="w-full">
				<div class="flex">
					<h4 class="font-semibold flex-1">{items.category_name}</h4>
					<a href="/see-all" class=" decoration-transparent">See All</a>
				</div>
				{#if $screenWidthStore < 1024}
					<div
						class="w-full h-88 grid grid-flow-col overflow-x-auto gap-x-2 hide-scrollbar"
					>
						{#each items.products as products}
							<ProductCard {products} />
						{/each}
					</div>
				{:else}
					<div class="w-full h-96">
						<swiper-container
							slides-per-view={6}
							space-between={10}
							navigation="true"
							slides-per-group={6}
							pagination={false}
							grab-cursor="true"
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

	<div
		class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 justify-items-center h-96"
	>
		{#if !isLoading}
			<!-- {#each products as item}
				<ProductCard products={item} />
			{/each} -->
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
