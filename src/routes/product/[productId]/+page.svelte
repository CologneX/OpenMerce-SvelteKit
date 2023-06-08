<script lang="ts">
	import { page } from '$app/stores';
	import { getProductDetails } from '$lib/utils/products';
	import Logo from '$lib/icons/Logo.svelte';
	import Star from '$lib/icons/Star.svelte';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import MinusSmall from '$lib/icons/MinusSmall.svelte';
	import ShareMini from '$lib/icons/ShareMini.svelte';
	import Wishlist from '$lib/Product/Wishlist.svelte';
	import Reviews from '$lib/Product/Reviews.svelte';
	import { screenWidthStore } from '$lib/utils/stores';
	import HeartMini from '$lib/icons/HeartMini.svelte';
	import AddToCart from '$lib/Product/AddToCart.svelte';
	import { formatNumber, rupiahCurrency } from '$lib/utils/units';
	import OngkirCheck from '$lib/Product/OngkirCheck.svelte';
	import { handleEditItem } from '$lib/utils/cart';
	import { goto } from '$app/navigation';
	let productDetails: any = {};
	let isLoading: boolean = true;
	const loadProducts = async (param: string) => {
		productDetails = await getProductDetails(param);
		setTimeout(() => {
			isLoading = false;
		}, 500);
		return productDetails;
	};
	let quantity: number = 1;
</script>

<svelte:head>
	{#await productDetails then productDetail}
		{#if productDetail}
			<title>{productDetail.name}</title>
			<meta name="description" content={productDetail.name} />
			<meta
				name="keywords"
				content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register, {productDetail.name}"
			/>
			<meta name="author" content="OpenMerce" />
			<meta property="og:title" content={$page.params.productId} />
			<meta property="og:image" content="/usercontent/{productDetail.image_urls}" />
		{:else}
			<title>{$page.params.productId} - Product not Found</title>
		{/if}
	{:catch error}
		<title>{$page.params.productId} - {error.message}</title>
	{/await}
</svelte:head>
{#await loadProducts($page.params.productId)}
	<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full gap-2">
		<div class="h-full w-full">
			<div class=" w-full p-0 sticky top-0 space-y-2 placeholder aspect-square h-full" />
		</div>
		<div class="flex h-full">
			<div class="space-y-4 w-full">
				<div class="space-y-2">
					<div class="font-semibold placeholder animate-pulse" />
					<small class="flex gap-x-2">
						<div class="flex items-center animate-pulse placeholder w-10" />
						<span>•</span>
						<div class="flex items-center">
							<Star />
							&nbsp;
							<span class="text-surface-900-50-token placeholder animate-pulse w-20" />
						</div>
					</small>
				</div>

				<div class="font-bold placeholder animate-pulse" />

				<div class="card p-3 space-y-2">
					<div class="flex items-center gap-x-2">
						<button class="btn btn-sm text-primary-500 placeholder animate-pulse" />
						<button class="btn btn-sm text-primary-500 placeholder animate-pulse" />
						<button class="btn btn-sm text-primary-500 placeholder animate-pulse" />

						<p class="placeholder animate-pulse w-16" />
					</div>
					<small class=" text-surface-900-50-token placeholder animate-pulse" />
					<div class="md:flex gap-2 hidden">
						<button class="btn variant-ringed-primary text-primary-500 font-bold flex-1"
							>Buy Now</button
						>
						<button class="btn variant-filled-primary font-bold flex-1"
							><span class="text-white flex items-center"> <PlusSmall />Add to cart</span>
						</button>
					</div>

					<div class="flex">
						<button class="btn btn-sm flex-1"
							><span><HeartMini /></span><span>Wishlist</span></button
						>

						<span class="divider-vertical h-8" />
						<button class="btn btn-sm flex-1"><span><ShareMini /></span><span>Share</span></button>
					</div>
				</div>

				<div>
					<h4 class="font-semibold" data-toc-ignore>Description</h4>
					<div class="h-6" />
					<p class="text-sm">
						<span class=" text-surface-900-50-token">Weight: </span>
					</p>
					<p class="text-sm">
						<span class=" text-surface-900-50-token">Dimension: </span>
					</p>
					<p class="text-sm">
						<span class=" text-surface-900-50-token">Category: </span>
					</p>

					<div class="h-2" />
					<span class="space-y-2">
						<p class="placeholder animate-pulse" />
						<p class="placeholder animate-pulse" />
						<p class="placeholder animate-pulse" />
						<p class="placeholder animate-pulse" />

						<p class="placeholder animate-pulse" /></span
					>

					<div class="h-3" />
					<p class="placeholder animate-pulse" />
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
			<div class="logo-item animate-pulse placeholder"><h1>Reviews</h1></div>
			<div class="logo-item animate-pulse placeholder" />
			<div class="logo-item animate-pulse placeholder" />
		</div>
	</div>
{:then productDetail}
	{#if productDetail}
		<div id="product">
			<div class="grid p-4 md:grid-cols-2 grid-cols-1 gap-x-12">
				<div>
					<div class="sticky top-12 rounded-lg">
						{#if productDetail.image_urls}
							<swiper-container
								navigation={true}
								slides-per-view={1}
								slides-per-group={1}
								pagination={true}
								grab-cursor={true}
								class=" drop-shadow-2xl -mx-3"
							>
								{#each productDetail.image_urls as image}
									<swiper-slide class="shadow-xl rounded">
										<picture>
											{#if image}
												<img
													src="/usercontent/{image}"
													alt="{image}'s image"
													class=" w-full h-full aspect-square"
												/>
											{:else}
												<div class="h-full aspect-square grid place-content-center">
													<Logo height="10" />
													<p class="text-center">No Image Found</p>
												</div>
											{/if}
										</picture>
									</swiper-slide>
								{/each}
							</swiper-container>
						{:else}
							<div class="h-full aspect-square grid place-content-center shadow-xl">
								<Logo height="10" />
								<p class="text-center">No Image Found</p>
							</div>
						{/if}
						<div class="h-6" />
						{#if $screenWidthStore > 768}
							<div class="flex flex-wrap gap-2 -m-2">
								{#if productDetail.image_urls}
									{#each productDetail.image_urls as image}
										<button type="button" class="border-primary-500 border-2 rounded-md">
											<picture class=" shadow-xl card flex justify-center items-center w-20">
												{#if image}
													<img
														src="/usercontent/{image}"
														alt="{image}'s image"
														class="aspect-square object-cover"
													/>
												{:else}
													<div>
														<Logo />
														<p class="text-center">No Image Found</p>
													</div>
												{/if}
											</picture>
										</button>
									{/each}
								{/if}
							</div>
						{/if}
					</div>
				</div>
				<div class="flex h-full w-full" id="detail">
					<div class="space-y-4 w-full">
						<div class="space-y-2">
							<h4 class="font-semibold">
								{productDetail.name}
							</h4>
							<small class="flex gap-x-2">
								{#if $screenWidthStore > 1024}
									<div class="flex items-center">
										Sold &nbsp; <span class=" text-surface-900-50-token"> 0</span>
									</div>
									<span>•</span>
									<div class="flex items-center">
										<Star />
										{productDetail.cumulative_review} &nbsp;
										<span class="text-surface-900-50-token">(0 rating)</span>
									</div>
								{:else}
									<span class="badge variant-ghost-surface">Sold 0</span>
									<span class="badge variant-ghost-surface"
										><Star />
										{productDetail.cumulative_review}
										<span class="text-surface-900-50-token">(0)</span></span
									>
								{/if}
							</small>
						</div>

						<h3 class="font-bold">
							{rupiahCurrency(productDetail.price)}
						</h3>
						<hr class="!border-t-4" />
						<div class="border-surface-900-50-token py-3 space-y-2">
							<div class="flex items-center gap-x-2">
								<div class="input-group grid-cols-[auto_1fr_auto] w-fit">
									<button
										class="btn btn-sm text-primary-500"
										on:click|preventDefault={() => {
											if (quantity > 0) {
												quantity--;
											}
										}}
										disabled={quantity <= 1}
									>
										<MinusSmall />
									</button>
									<input
										type="number"
										class="input text-center w-14 p-0"
										bind:value={quantity}
										on:input|preventDefault={() => {
											if (quantity > productDetail.stock) {
												quantity = productDetail.stock;
											} else if (quantity < 0) {
												quantity = 0;
											}
										}}
										on:keypress={(e) => {
											if (e.key.match(/[^0-9]/g)) {
												e.preventDefault();
											}
										}}
									/>
									<button
										class="btn btn-sm text-primary-500"
										on:click|preventDefault={() => {
											if (quantity <= productDetail.stock) {
												quantity++;
											}
										}}
										disabled={quantity >= productDetail.stock}
									>
										<PlusSmall />
									</button>
								</div>
								<p class="flex-1">
									Total Stock: <span class="font-bold">{productDetail.stock}</span>
								</p>
							</div>
							<small class=" text-surface-900-50-token"
								>Max. purchased items {productDetail.stock}</small
							>
							<div class="md:flex gap-2 hidden">
								<button
									class="btn variant-ringed-primary text-primary-500 font-bold flex-1"
									on:click|preventDefault={async () => {
										await handleEditItem(productDetail.id, quantity);
										goto('/cart');
									}}>Buy Now</button
								>
								<AddToCart productID={productDetail.id} {quantity} />
							</div>

							<div class="flex">
								<Wishlist productId={productDetail.id} />
								<span class="divider-vertical h-8" />
								<button class="btn btn-sm flex-1"
									><span><ShareMini /></span><span>Share</span></button
								>
							</div>
						</div>
						<hr class="!border-t-4" />
						<OngkirCheck productId={$page.params.productId} weight2={productDetail.weight} />
						<hr class="!border-t-4" />
						<div id="description">
							<h4 class="font-semibold">Description</h4>
							<div class="h-6" />
							<p class="text-sm">
								<span class=" text-surface-900-50-token">Weight: </span>
								{formatNumber(productDetail.weight)}
								kg
							</p>
							<p class="text-sm">
								<span class=" text-surface-900-50-token">Dimension: </span>
								{productDetail.dimension}
								cm
							</p>
							<p class="text-sm">
								<span class=" text-surface-900-50-token">Category: </span>
								<a
									href="/category/{productDetail.category_name}"
									class="font-semibold text-primary-500 unstyled hover:underline"
									>{productDetail.category_name}</a
								>
							</p>

							<div class="h-2" />

							<p>{productDetail.name}</p>
							<div class="h-3" />
							<p>{productDetail.description}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="h-12" />
			<div id="reviews">
				<div class="flex flex-col md:flex-row gap-4">
					<div class="card drop-shadow-md border border-primary-500 rounded-md p-4 basis-1/4">
						<p class="font-semibold text-lg">BUYER REVIEWS</p>
						<div class="text-6xl text-center">
							{productDetails.cumulative_review}<span class="text-2xl">/5</span>
						</div>
					</div>
					<div class="basis-3/4 flex flex-col gap-4">
						<Reviews productId={$page.params.productId} />
					</div>
				</div>
			</div>
		</div>
	{/if}
	<footer class="sticky sm:block md:hidden bottom-0 flex gap-2 justify-center w-screen card p-4">
		<button
			class="btn variant-ringed-primary text-primary-500 font-bold flex-1"
			on:click|preventDefault={() => {
				handleEditItem(productDetail.id, quantity);
				goto('/cart');
			}}>Buy Now</button
		>
		<AddToCart productID={productDetail.id} {quantity} />
	</footer>
{:catch error}
	<h2>Oops Hehe, {error.message}</h2>
{/await}
