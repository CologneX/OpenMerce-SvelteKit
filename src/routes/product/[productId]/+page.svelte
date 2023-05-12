<script lang="ts">
	export let data;
	const { productData } = data;
	let tabSet: number = 0;
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let Y = 0;
	// for scroll to id in div
	// onMount(() => {});
	// end for scroll to id in div

	// for image carousel
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	let carousel;
	// end for image carousel
</script>

<svelte:head>
	<title>{productData?.name}</title>
	<meta name="description" content={productData?.name} />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register, {productData?.name}"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<div class="h-full w-full grid grid-rows-2">
	<div class="grid md:grid-cols-2 sm:grid-cols-1 w-full h-full">
		<div class="h-full w-full">
			<div class=" w-full aspect-square sticky top-0 p-0 md:pt-7">
				{#if browser}
					<Carousel bind:this={carousel}>
						<img
							src="/products/{productData?.id}.webp"
							alt={productData?.name}
							class="aspect-square w-full h-full"
						/></Carousel
					>
				{/if}
			</div>
		</div>
		<div class="grid w-full h-full">
			<div class="hidden md:block sticky top-0 variant-glass card">
				<TabGroup flex="flex flex-col items-center w-1/3">
					<Tab bind:group={tabSet} name="productDetail" value={0}>Product Detail</Tab>
					<Tab bind:group={tabSet} name="description" value={1}>Description</Tab>
					<Tab bind:group={tabSet} name="review" value={2}>Review</Tab>
				</TabGroup>
			</div>
			<div class="md:pt-4 md:pl-4 space-y-4">
				<h4 id="productDetail">
					{productData?.name}
				</h4>
				<h3
					class="font-bold bg-gradient-to-br from-primary-500 box-decoration-clone bg-clip-text text-transparent to-secondary-500"
				>
					{productData?.price.toLocaleString('id-ID', {
						style: 'currency',
						currency: 'IDR',
						minimumFractionDigits: 0
					})}
				</h3>

				<div class="md:flex gap-2 hidden">
					<button class="btn variant-filled-primary">Buy Now</button>
					<button class="btn variant-soft-primary">Add to cart</button>
					<!-- <p>{Y}</p> -->
				</div>

				<div class="card" id="productDescription">
					<!-- {productData?.description} -->
					this is description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident voluptates
					blanditiis asperiores dolores magni architecto? Repellat laudantium, aliquid aperiam temporibus
					vero aut ipsum? Asperiores harum, consequatur aliquam quia tempore quae at eveniet officia
					iure saepe excepturi non voluptas cum deleniti consectetur quis? Odit et distinctio nihil delectus
					amet officiis neque excepturi eius accusamus tempore incidunt non nobis at explicabo id saepe
					expedita ratione facere molestias, dignissimos quos placeat dolor. Nihil debitis voluptas enim
					quidem inventore architecto. Deserunt maxime est nam sequi magnam labore? Ut dolore corporis
					eius, eaque animi similique ipsum officia error, molestias enim voluptatibus voluptatum ipsa.
					Fugiat obcaecati recusandae impedit est reprehenderit, illo expedita enim sunt beatae temporibus
					dolor odit repellat consectetur id sapiente ad unde molestiae sequi quasi nostrum ullam itaque
					cum dicta harum! Tempore, laboriosam. Doloribus tempore corrupti quam animi laborum porro optio,
					hic quos nobis, nisi laboriosam unde ipsum minima sit autem earum ea. Consectetur enim quibusdam
					animi obcaecati ipsam voluptates maiores, fugiat in exercitationem dolor praesentium pariatur.
					Deleniti tenetur mollitia numquam aspernatur ut ea, illum assumenda. Assumenda harum quasi
					obcaecati, explicabo itaque adipisci accusamus dolorum illo facilis. Quo ipsam consequuntur
					quisquam corporis itaque facilis dignissimos laboriosam quam molestiae eveniet at omnis atque
					delectus velit, ullam perspiciatis corrupti perferendis? Modi, cumque consectetur sed culpa
					distinctio quod facilis, aut excepturi quo dolore ut reiciendis vitae expedita minus! Impedit
					cumque accusantium qui quis nisi, sit rerum nesciunt dolorem molestias officia totam illum
					laboriosam! Commodi facilis provident nostrum sapiente laboriosam facere maiores nisi saepe
					illum excepturi. Ipsum quaerat modi sit excepturi reprehenderit repellendus nam? Voluptate
					placeat facere corrupti sint veniam est nulla quae dolorem ratione, repudiandae distinctio
					facilis. Tempora quidem voluptates dolore quisquam ipsam illo dolorum repudiandae illum, pariatur
					perferendis, optio ipsa. Repudiandae iusto facere, enim itaque dolor, molestias impedit dolores
					voluptatum adipisci nobis nihil optio reprehenderit veritatis!
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
