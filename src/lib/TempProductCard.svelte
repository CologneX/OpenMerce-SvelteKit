<script lang="ts">
	import type { Products } from '../app';
	export let products: Products;
	import Logo from './icons/Logo.svelte';
	import Star from './icons/Star.svelte';
</script>

<a
	class="card w-40 md:w-44 lg:w-48 drop-shadow-xl h-full max-h-96 card-hover"
	href="/product/{products.id}"
	aria-label="Go to {products.name}'s page"
	title={products.name}
>
	<picture class="aspect-square shadow-lg flex justify-center items-center">
		{#if products.image}
			<img
				src="/usercontent/{products.image}"
				loading="lazy"
				alt="{products.name}'s image"
				class="aspect-square object-cover"
				width="100%"
				height="100%"
			/>
		{:else}
			<div>
				<Logo />
				<p class="text-center">No Image Found</p>
			</div>
		{/if}
	</picture>

	<section class="p-4">
		<p class="truncate">{products.name}</p>
		<p class="font-semibold">
			{products.price.toLocaleString('id-ID', {
				style: 'currency',
				currency: 'IDR',
				minimumFractionDigits: 0
			})}
		</p>
	</section>

	<footer class="p-4">
		<hr class="!border-t-2 border-current" />
		<div class="flex items-center">
			<Star />
			<p>{products.rating}</p>
		</div>
	</footer>
</a>
