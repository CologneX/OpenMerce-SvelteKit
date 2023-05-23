<script lang="ts">
	import type { Products } from '../../app';
	export let products: Products[];
	import ProductCard from '../TempProductCard.svelte';
</script>

<swiper-container
	slides-per-view={6}
	space-between={10}
	navigation="true"
	slides-per-group={6}
	pagination={false}
	grab-cursor="true"
>
	{#each products as products}
		<swiper-slide class="card"> <ProductCard {products} /></swiper-slide>
	{/each}
</swiper-container>
