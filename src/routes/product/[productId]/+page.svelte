<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	const param = $page.params.productId;
	let product: ProductDetail = {
		id: '',
		name: '',
		description: '',
		price: 0,
		image_urls: [],
		cumulative_review: 0,
		weight: 0,
		category_name: ''
	};
	onMount(() => {
		const getProduct = async () => {
			const response = await fetch(`/api/v1/product?id=${param}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status == 400 || response.status == 404) {
				throw error(400, {
					message: 'Oops, product not found!'
				});
			} else if (!response.ok) {
				throw error(response.status, {
					message: `${response.statusText}`
				});
			}
			const productData: ProductDetail = await response.json();
			return productData;
		};
		getProduct().then((productData) => {
			product = productData;
		});
	});
	// let Y = 0;

	// for image carousel
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import Logo from '$lib/icons/Logo.svelte';
	let carousel;
	// end for image carousel
</script>

<svelte:head>
	<title>{product.name}</title>
	<meta name="description" content={product.name} />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register, {product.name}"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<div class="h-full w-full grid grid-rows-2">
	<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full">
		<div class="h-full w-full">
			<div class=" w-full aspect-square sticky top-0 p-0 md:pt-7">
				{#if browser}
					<Carousel bind:this={carousel} infinite={false} arrows={false}>
						{#if product.image_urls}
							{#each product.image_urls as image}
								<picture class="aspect-square shadow-xl card flex justify-center items-center">
									{#if image}
										<img src="/usercontent/{image}" alt="{image}'s image" />
									{:else}
										<div>
											<Logo />
											<p class="text-center">No Image Found</p>
										</div>
									{/if}
								</picture>
							{/each}
						{:else}
							<picture class="aspect-square shadow-xl card flex justify-center items-center">
								<div>
									<Logo />
									<p class="text-center">No Image Found</p>
								</div>
							</picture>
						{/if}
					</Carousel>
				{/if}
			</div>
		</div>
		<div class="grid w-full h-full">
			<div class="md:pt-4 md:pl-4 space-y-4">
				<h4 id="productDetail">
					{product.name}
				</h4>
				<h3
					class="font-bold bg-gradient-to-br from-primary-500 box-decoration-clone bg-clip-text text-transparent to-secondary-500"
				>
					{product.price.toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0
					})}
				</h3>

				<div class="md:flex gap-2 hidden">
					<button class="btn variant-filled-primary">Buy Now</button>
					<button class="btn variant-soft-primary">Add to cart</button>
				</div>

				<div class="card" id="productDescription">
					{product.description}
				</div>
			</div>
		</div>
	</div>
	<div class="card border-2" id="productReview">Rating</div>
	<footer class="fixed sm:block md:hidden bottom-0 flex gap-2 justify-center w-screen card p-4">
		<button class="btn variant-filled-primary w-1/2">Buy Now</button>
		<button class="btn variant-soft-primary w-1/2">Add to cart</button>
	</footer>
</div>
