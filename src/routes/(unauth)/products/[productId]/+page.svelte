<script lang="ts">
	export let data;
	const { productData } = data;
</script>

<svelte:head>
	<title>{productData?.name}</title>
	<meta name="description" content="{productData?.name}" />

	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<div class="h-full w-full grid grid-rows-2">
	<div class="grid md:grid-cols-2 sm:grid-cols-1">
		<div class=" grid justify-items-center">
			<div class="placeholder animate-pulse w-96 h-96" />
		</div>
		<div class=" grid grid-rows-2">
			<div class="">
				<h4 class="font-bold">
					{productData?.name}
				</h4>
				<h3
					class="font-bold bg-gradient-to-br from-primary-500 box-decoration-clone bg-clip-text text-transparent to-secondary-500"
				>
					{productData?.price.toLocaleString('en-US', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0})}
				</h3>
			</div>
			<div>
				<div class="p-10">
					<h3 class="font-bold">
						<span>Stock:</span>
						{productData?.quantity}
					</h3>
				</div>
			</div>
		</div>
	</div>

	<div class="card">
		<!-- {productData?.description} -->
		this is description
	</div>
</div>
