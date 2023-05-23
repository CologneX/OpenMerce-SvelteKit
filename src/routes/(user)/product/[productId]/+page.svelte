<script lang="ts">
	import { page } from '$app/stores';
	import { getProductDetails } from '$lib/utils/products';
	import Logo from '$lib/icons/Logo.svelte';
	import Star from '$lib/icons/Star.svelte';
	import { register } from 'swiper/element/bundle';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import MinusSmall from '$lib/icons/MinusSmall.svelte';
	import ShareMini from '$lib/icons/ShareMini.svelte';
	import Wishlist from '$lib/Product/Wishlist.svelte';
	import { screenWidthStore, urlFromStore } from '$lib/utils/stores';
	import HeartMini from '$lib/icons/HeartMini.svelte';
	import AddToCart from '$lib/Product/AddToCart.svelte';
	import { formatNumber, rupiahCurrency } from '$lib/utils/units';
	register();
	let selectedStock: number = 1;
	urlFromStore.set(`/product/${$page.params.productId}`);
</script>

<svelte:head>
	{#await getProductDetails($page.params.productId) then productDetail}
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
<div class="h-fit w-full grid grid-rows-2">
	{#await getProductDetails($page.params.productId)}
		<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full gap-x-2 gap-y-2">
			<div class="h-full w-full">
				<div class=" w-full p-0 sticky top-0 space-y-2 placeholder aspect-square h-full" />
			</div>
			<div class="flex h-full">
				<div class="space-y-4 w-full">
					<div class="space-y-2">
						<div id="productDetail" class="font-semibold placeholder animate-pulse" />
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
							<button class="btn btn-sm flex-1"><span><ShareMini /></span><span>Share</span></button
							>
						</div>
					</div>

					<div class="" id="productDescription">
						<h4 class="font-semibold">Description</h4>
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

						<p class="placeholder animate-pulse" />
						<div class="h-3" />
						<p class="placeholder animate-pulse" />
					</div>
				</div>
			</div>
		</div>
		<div id="productReview">
			<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
				<div class="logo-item animate-pulse placeholder"><h1>Reviews</h1></div>
				<div class="logo-item animate-pulse placeholder" />
				<div class="logo-item animate-pulse placeholder" />
			</div>
		</div>
	{:then productDetail}
		{#if productDetail}
			<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full gap-x-2">
				<div class="h-full w-full">
					<div class=" w-full p-0 sticky top-0 space-y-2">
						{#if productDetail.image_urls}
							<swiper-container
								navigation={'true'}
								slides-per-group={1}
								pagination={'true'}
								grab-cursor={'true'}
							>
								{#each productDetail.image_urls as image}
									<swiper-slide
										class=" shadow-xl card flex justify-center items-center aspect-square"
									>
										<picture>
											{#if image}
												<img
													src="/usercontent/{image}"
													alt="{image}'s image"
													class=" object-contain aspect-square"
												/>
											{:else}
												<div>
													<Logo />
													<p class="text-center">No Image Found</p>
												</div>
											{/if}
										</picture></swiper-slide
									>
								{/each}
							</swiper-container>
						{/if}
						{#if $screenWidthStore > 768}
							<div class="flex gap-2">
								{#if productDetail.image_urls}
									{#each productDetail.image_urls as image}
										<button type="button" class="border-primary-500 border-2 rounded-md">
											<picture class=" shadow-xl card flex justify-center items-center w-20">
												{#if image}
													<img
														src="/usercontent/{image}"
														alt="{image}'s image"
														class="aspect-square object-contain"
													/>
												{:else}
													<div>
														<Logo />
														<p class="text-center">No Image Found</p>
													</div>
												{/if}
											</picture></button
										>
									{/each}
								{/if}
							</div>
						{/if}
					</div>
				</div>
				<div class="flex h-full w-full">
					<div class="space-y-4">
						<div class="space-y-2">
							<h4 id="productDetail" class="font-semibold">
								{productDetail.name}
							</h4>
							<small class="flex gap-x-2">
								<div class="flex items-center">
									Terjual &nbsp; <span class=" text-surface-900-50-token"> 0</span>
								</div>
								<span>•</span>
								<div class="flex items-center">
									<Star />
									{productDetail.cumulative_review} &nbsp;
									<span class="text-surface-900-50-token">(0 rating)</span>
								</div>
							</small>
						</div>

						<h2
							class="font-bold bg-gradient-to-br from-primary-500 box-decoration-clone bg-clip-text text-transparent to-secondary-500"
						>
							{rupiahCurrency(productDetail.price)}
						</h2>

						<div class="card p-3 space-y-2">
							<div class="flex items-center gap-x-2">
								<div class="input-group grid-cols-[auto_1fr_auto] flex-1">
									<button
										class="btn btn-sm text-primary-500"
										on:click={() => {
											if (selectedStock > 0) {
												selectedStock--;
											}
										}}
										disabled={selectedStock <= 1}
									>
										<MinusSmall />
									</button>
									<input
										type="text"
										min="0"
										class="input"
										bind:value={selectedStock}
										on:change={() => {
											if (selectedStock > productDetail.stock) {
												selectedStock = productDetail.stock;
											}
											if (selectedStock < 1) {
												selectedStock = 1;
											}
										}}
									/>
									<button
										class="btn btn-sm text-primary-500"
										on:click={() => {
											if (selectedStock <= productDetail.stock) {
												selectedStock++;
											}
										}}
										disabled={selectedStock >= productDetail.stock}
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
								<button class="btn variant-ringed-primary text-primary-500 font-bold flex-1"
									>Buy Now</button
								>
								<AddToCart productID={productDetail.id} quantity={selectedStock} />
							</div>

							<div class="flex">
								<Wishlist productId={productDetail.id} />
								<span class="divider-vertical h-8" />
								<button class="btn btn-sm flex-1"
									><span><ShareMini /></span><span>Share</span></button
								>
							</div>
						</div>

						<div class="" id="productDescription">
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
			<div id="productReview">
				<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
					<div class="logo-item"><h1>Reviews</h1></div>
					<div class="logo-item" />
					<div class="logo-item">
						<span class="flex"><Star /><Star /><Star /><Star /><Star /></span>
						<span><h1>{productDetail.cumulative_review}</h1></span>
					</div>
				</div>
			</div>
		{/if}
	{:catch error}
		<h1>Oops Hehe, {error.message}</h1>
	{/await}

	<footer class="sticky sm:block md:hidden bottom-0 flex gap-2 justify-center w-screen card p-4">
		<button class="btn variant-ringed-primary text-primary-500 font-bold flex-1">Buy Now</button>
		<button class="btn variant-filled-primary font-bold flex-1"
			><span class="text-white flex items-center"> <PlusSmall />Add to cart</span>
		</button>
	</footer>
</div>
