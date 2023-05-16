<script lang="ts">
	export let products: Products = {
		id: '',
		name: '',
		price: 0,
		quantity: 0,
		image: '',
		rating: 0
	};
	import Logo from './icons/Logo.svelte';
	import Star from './icons/Star.svelte';
</script>

<a
	class="card w-40 md:w-44 lg:w-48 drop-shadow-xl h-full max-h-68 card-hover"
	href="/product/{products.id}"
	aria-label="Go to {products.name}'s page"
	title={products.name}
>
	<picture class="aspect-square shadow-lg flex justify-center items-center">
		{#if products.image}
			<img
				src="/usercontent/{products.image}"
				alt="{products.name}'s image"
				class="aspect-square object-contain"
			/>
		{:else}
			<div>
				<Logo />
				<p class="text-center">No Image Found</p>
			</div>
		{/if}
	</picture>

	<section class="p-4">
		<h6 class="truncate">{products.name}</h6>
		<h6 class="font-semibold">
			{products.price.toLocaleString('id-ID', {
				style: 'currency',
				currency: 'IDR',
				minimumFractionDigits: 0
			})}
		</h6>
	</section>

	<footer class="p-4">
		<hr class="!border-t-2 border-current" />
		<div class="flex items-center">
			<Star />
			<h6>{products.rating}</h6>
		</div>
	</footer>
</a>
