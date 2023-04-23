<script lang="ts">
	// interface Product {
	// 	id: string;
	// 	name: string;
	// 	description: string;
	// 	price: number;
	// 	stock: number;
	// 	images: string[];
	// }
	// const productData: Product = {
	// 	id: '1',
	// 	name: 'Baju Lebaran',
	// 	description: 'Baju',
	// 	price: 10000,
	// 	stock: 100,
	// 	images: ['https://picsum.photos/200/300']
	// };

	export let data;
	const { productData } = data;
	const formattedPrice = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0
	}).format(productData.price);
</script>

<svelte:head>
	<meta name="description" content="{productData?.name}" />
	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<main class="h-full w-full  grid grid-rows-2 p-10">
	<div class="grid md:grid-cols-2 sm:grid-cols-1">
		<div class=" grid justify-items-center">
			<div class="placeholder animate-pulse w-96 h-96" />
		</div>
		<div class=" grid grid-rows-2">
			<div class="">
				<h4 class="font-bold">
					{productData.name}
				</h4>
				<h3
					class="font-bold bg-gradient-to-br from-primary-500 box-decoration-clone bg-clip-text text-transparent to-secondary-500"
				>
					{formattedPrice}
				</h3>
			</div>
			<div>
				<div class="p-10">
					<h3 class="font-bold">
						<!-- {productData.stock} -->
					</h3>
				</div>
			</div>
		</div>
	</div>

	<div class="card">{productData.description}</div>
</main>
