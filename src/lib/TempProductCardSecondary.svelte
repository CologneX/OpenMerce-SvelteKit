<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Products } from '../app';
	export let products: Products;
	import Logo from './icons/Logo.svelte';
	import Star from './icons/Star.svelte';
</script>

<button
	class="card rounded-md w-40 md:w-44 lg:w-48 card-hover drop-shadow-md"
	on:click={() => {
		goto(`/product/${products.id}`);
	}}
>
	{#if products.image}
		<img
			src="/usercontent/{products.image}"
			loading="lazy"
			alt="{products.name}'s image"
			class="aspect-square object-cover rounded-t-md"
			width="100%"
			height="100%"
		/>
		<!-- <div class="swiper-lazy-preloader -z-50" /> -->
	{:else}
		<img
			src="/placeholder.png"
			loading="lazy"
			alt="{products.name}'s image"
			class="aspect-square object-cover rounded-t-md"
			width="100%"
			height="100%"
		/>
	{/if}

	<section class="p-2 text-start">
		<p class="truncate">{products.name}</p>
		<p class="font-semibold">
			{products.price.toLocaleString('id-ID', {
				style: 'currency',
				currency: 'IDR',
				minimumFractionDigits: 0
			})}
		</p>
	</section>

	<footer class="p-2">
		<hr class="!border-t-2 border-current" />
		<div class="flex flex-row pt-2">
			<div class="badge variant-ghost">
				<span>
					<Star />
				</span>
				<p>{products.rating}</p>
			</div>
			<div class="badge variant-ghost">
				<span> Sold </span>
				<p>{products.sold}</p>
			</div>
		</div>
	</footer></button
>
