<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AddToCartCard from '$lib/AddToCartCard.svelte';
	import Logo from '$lib/icons/Logo.svelte';
	import Star from '$lib/icons/Star.svelte';
	import { getProductSearch } from '$lib/utils/products';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { rupiahCurrency } from '$lib/utils/units';

	const handleGetWishlist = async () => {
		const getWishlist = await fetch(`/api/v1/customer/wishlist`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (getWishlist.status === 401) {
			await refreshTokenUser();
			const getWishlistAgain = await fetch(`/api/v1/customer/wishlist`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await getWishlistAgain.json();
			return data;
		}
		const data = await getWishlist.json();
		return data;
	};
</script>

<svelte:head>
	<title>Wishlist | OpenMerce</title>
	<meta name="description" content="Your Wishlist" />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Wishlist, Wishlist"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<!-- 
<div class="w-full h-full p-4">
	<h3 class="font-bold">Your Wishlist</h3>
	<div class="h-4" />
	<div class="flex flex-col gap-2">
		{#await handleGetWishlist()}
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
		{:then productData}
			{#each productData as item}
				<div class="flex flex-row gap-4">
					<button
						on:click={() => {
							goto(`/product/${item.id}`);
						}}
						class="aspect-square flex justify-center items-center rounded basis-3/12 shadow-md"
					>
						<picture>
							{#if item.image}
								<img
									src="/usercontent/{item.image}"
									loading="lazy"
									alt="{item.name}'s image"
									class="aspect-square object-cover rounded"
									width="100%"
									height="100%"
								/>
							{:else}
								<div class="grid place-items-center w-full h-full">
									<Logo />
									<p class="text-center text-sm">No Image Found</p>
								</div>
							{/if}
						</picture>
					</button>
					<div class="text-sm md:text-base text-start w-full truncate flex flex-col">
						<p class="truncate">{item.name}</p>
						<p class="font-bold">{rupiahCurrency(item.price)}</p>
						<button
							type="button"
							class="btn btn-sm variant-ringed-primary text-primary-500 text-xs mt-auto w-1/3"
							>Add to Cart</button
						>
					</div>
				</div>
				<hr class="!border last:hidden" />
			{/each}
		{:catch error}
			<div class="card w-full h-64">
				<div class="flex flex-col justify-center items-center h-full">
					<h1 class="text-2xl font-semibold">Error</h1>
					<p class="text-center">{error.message}</p>
				</div>
			</div>
		{/await}
	</div>
</div> -->

<h3 class=" text-xl py-6 font-bold">Your Cart</h3>

{#await handleGetWishlist()}
	<div class="rounded-md placeholder animate-pulse w-full h-96" />
{:then data}
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-y-2 w-full">
		{#each data as products}
			<AddToCartCard {products} />
		{/each}
	</div>
{/await}
