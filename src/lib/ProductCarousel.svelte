<script lang="ts">
	export let products: Products[] = [];
	import ProductCard from './ProductCard.svelte';
</script>

<swiper-container
	slides-per-view={6}
	space-between={10}
	navigation="true"
	slides-per-group={6}
	pagination={false}
	grab-cursor="true"
>
	{#each products as product}
		<swiper-slide class="card"> <ProductCard products={product} /></swiper-slide>
	{/each}
</swiper-container>
