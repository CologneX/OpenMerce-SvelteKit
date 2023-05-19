<script lang="ts">
	import TempProductCarousel from '$lib/Main/TempProductCarousel.svelte';
	import { getProductsMain } from '$lib/utils/products';
</script>

{#await getProductsMain()}
	<div class="h-full w-full placeholder animate-pulse" />
{:then products}
	<TempProductCarousel {products} />
{:catch error}
	<div class="flex justify-center items-center h-screen">
		<p class="text-2xl text-gray-500">{error}</p>
	</div>
{/await}
