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
	import Reviews from '$lib/Product/Reviews.svelte';
	import {
		productLoadingStore,
		screenWidthStore,
		scrollYStore,
		urlFromStore
	} from '$lib/utils/stores';
	import HeartMini from '$lib/icons/HeartMini.svelte';
	import AddToCart from '$lib/Product/AddToCart.svelte';
	import { formatNumber, rupiahCurrency } from '$lib/utils/units';
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import OngkirCheck from '$lib/Product/OngkirCheck.svelte';
	import { space } from 'postcss/lib/list';
	register();
	let productDetails: any = {};
	let isLoading: boolean = true;
	const loadProducts = async (param: string) => {
		// productLoadingStore.set(true);
		productDetails = await getProductDetails(param);
		setTimeout(() => {
			isLoading = false;
		}, 500);
		productLoadingStore.set(false);
		return productDetails;
	};
	let quantity: number = 1;
	urlFromStore.set(`/product/${$page.params.productId}`);
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
<!-- {#if !isLoading}
	<div class="hidden md:flex sticky top-0 variant-glass card w-full z-10">
		<TableOfContents
			scrollParent="#product"
	
			allowedHeadings="h1,h2,h3,h4,h5,h6"
			active="border-b-2"
			regionList="grid grid-cols-2"
			regionLabel="hidden"
			rounded="rounded-none"
			class="w-full"
		/>
	</div>
{/if} -->

{#await loadProducts($page.params.productId)}
	<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full gap-x-2 gap-y-2">
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

					<p class="placeholder animate-pulse" />
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
			<div class="grid px-3 md:px-0 md:grid-cols-2 sm:grid-cols-1 gap-x-2">
				<div class="h-full w-full">
					<div class=" w-full p-0 sticky top-0 aspect-square grid place-content-center">
						{#if productDetail.image_urls}
							<swiper-container
								navigation={true}
								slides-per-group={1}
								pagination={true}
								grab-cursor={true}
							>
								{#each productDetail.image_urls as image}
									<swiper-slide class=" shadow-xl card flex justify-center items-center">
										<picture>
											{#if image}
												<img
													src="/usercontent/{image}"
													alt="{image}'s image"
													class="object-contain aspect-square"
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
						{:else}
							<Logo height="10" />
							<p class="text-center">No Image Found</p>
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
				<div class="flex h-full w-full" id="detail">
					<div class="space-y-4 w-full">
						<div class="space-y-2">
							<h4 class="font-semibold" data-toc-ignore>
								{productDetail.name}
							</h4>
							<small class="flex gap-x-2">
								{#if $screenWidthStore > 1024}
									<div class="flex items-center">
										Terjual &nbsp; <span class=" text-surface-900-50-token"> 0</span>
									</div>
									<span>•</span>
									<div class="flex items-center">
										<Star />
										{productDetail.cumulative_review} &nbsp;
										<span class="text-surface-900-50-token">(0 rating)</span>
									</div>
								{:else}
									<span class="badge variant-ghost-surface">Terjual 0</span>
									<span class="badge variant-ghost-surface"
										><Star />
										{productDetail.cumulative_review}
										<span class="text-surface-900-50-token">(0)</span></span
									>
								{/if}
							</small>
						</div>

						<h3
							class="font-bold"
							data-toc-ignore
						>
							{rupiahCurrency(productDetail.price)}
						</h3>

						<div class="border-t-2 border-surface-900-50-token py-3 space-y-2">
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
								<button class="btn variant-ringed-primary text-primary-500 font-bold flex-1"
									>Buy Now</button
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
						<div class="border-b-2 border-surface-900-50-token" />
						<OngkirCheck productId={$page.params.productId} weight={productDetail.weight}/>
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
							<!-- <p>{$scrollYStore}</p> -->
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur quisquam adipisci
							esse doloremque cum nostrum, non ratione sit molestiae, natus suscipit laboriosam? Accusamus
							dolorem tempora veritatis illum odit, voluptatum animi id, vero quas dignissimos labore
							sunt, impedit molestias in vel voluptas voluptate iure? Ratione quas eos aliquam animi
							quod ut, quasi fugiat ea sit, ipsa, dolores nemo! Vero ratione nostrum maxime? Temporibus
							quisquam reiciendis ullam, ut ipsa officiis repudiandae quia voluptatibus et. A vero provident
							porro dignissimos blanditiis molestias sit voluptate tenetur eveniet. Quam perferendis
							dolores qui natus placeat officiis nam porro dolore ipsum maiores voluptas quo alias, eveniet
							consequuntur fugiat non, eos, aspernatur sit! Voluptates dignissimos corrupti dolorum esse
							quae culpa sunt ad adipisci, iusto ducimus nesciunt consequatur cumque rerum, possimus
							at numquam laudantium nobis quidem molestias? Dolore debitis alias omnis, magnam dicta
							magni harum sint quisquam aperiam hic exercitationem animi quam illo, obcaecati consectetur
							ab! Sint repellat, aut eos dolores, dicta dolorem voluptates vel inventore doloribus tenetur
							qui ipsum saepe eligendi, vero totam itaque atque esse eveniet ea harum voluptatum deleniti
							quae! Praesentium tempore recusandae voluptatem? Eos earum natus eius, tempore iusto magni
							blanditiis eveniet beatae voluptatem fugit voluptates minima voluptas atque quas numquam
							ab explicabo repellendus omnis nostrum placeat? Beatae corrupti impedit excepturi perferendis
							corporis reiciendis libero, suscipit cumque saepe voluptatum! Ullam voluptatum, molestias
							incidunt fugit sequi dolores quam odit. Omnis et tempore fugiat voluptates facilis odio
							harum, quisquam corporis, necessitatibus pariatur eius unde repudiandae iusto asperiores
							debitis ipsa dolore aperiam molestias, maxime ipsum earum quo soluta. Aliquid quae impedit
							dolorum a fugiat maiores voluptatibus commodi repellat placeat explicabo enim accusamus
							eaque sunt voluptatum quibusdam laborum perspiciatis velit qui sit beatae ex, culpa cum
							quas! Vel impedit officia, ullam, possimus earum culpa fuga consequatur ratione laudantium
							fugit fugiat odio animi molestias aliquid aut perspiciatis. Placeat voluptatem, voluptate
							sunt fugit maiores minima excepturi pariatur blanditiis officia laudantium accusamus magnam
							iusto eum asperiores et laboriosam nemo facilis voluptates tempora nam eius. Velit, eius
							ex accusantium veniam dignissimos rem at. Facilis aut perspiciatis illo consectetur alias,
							possimus debitis at saepe ad ex nobis et minus, est sunt ea impedit inventore hic? Veritatis
							voluptate similique temporibus, saepe ratione ipsam accusantium beatae, nemo sint est in
							pariatur alias esse expedita voluptatum dolore quasi. Minima vel repudiandae dignissimos
							repellat, omnis quasi, laudantium id nisi laborum in esse! Sint, inventore. Nemo provident
							expedita tenetur natus, eius blanditiis voluptatibus ducimus cumque dolor recusandae consequatur
							inventore iure nesciunt fuga quia quibusdam ipsa deleniti quisquam. Magnam sunt provident
							hic maiores earum veniam quae dolores adipisci exercitationem ea possimus illo enim, officia
							atque maxime, nulla incidunt asperiores eum molestias ipsa aspernatur? Quas, excepturi.
							Nihil possimus quia molestias fugiat ad inventore, recusandae animi architecto quo aliquam,
							laboriosam voluptates molestiae odio necessitatibus quam eligendi ratione deleniti distinctio
							non, debitis pariatur iste accusantium explicabo ipsum? Quae, et. Adipisci, facilis iste
							excepturi minima tempore omnis, aspernatur ratione eius incidunt ipsam perferendis tenetur
							at nulla! Culpa delectus dolorum veritatis unde. Officiis reiciendis explicabo exercitationem
							recusandae quod. Labore, ipsa beatae? Itaque aperiam ipsam nihil.
						</div>
					</div>
				</div>
			</div>
			<div id="reviews">
				<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
					<div class="logo-item"><h3 id="Reviews">Reviews</h3></div>
					<div class="logo-item" />
					<div class="logo-item">
						<span class="flex"><Star /><Star /><Star /><Star /><Star /></span>
						<span><h3 data-toc-ignore>{productDetail.cumulative_review}</h3></span>
					</div>
				</div>

				<Reviews productId={$page.params.productId} />
			</div>
		</div>
	{/if}
	<footer class="sticky sm:block md:hidden bottom-0 flex gap-2 justify-center w-screen card p-4">
		<button class="btn variant-ringed-primary text-primary-500 font-bold flex-1">Buy Now</button>
		<AddToCart productID={productDetail.id} {quantity} />
	</footer>
{:catch error}
	<h1>Oops Hehe, {error.message}</h1>
{/await}
