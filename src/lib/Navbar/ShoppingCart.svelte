<script lang="ts">
	import ShoppingCart from '$lib/icons/ShoppingCart.svelte';
	import { getCartCount } from '$lib/utils/navbar';
	import { cartCountStore, isLoggedInStore } from '$lib/utils/stores';
</script>

<div class="relative inline-block">
	{#if $isLoggedInStore}
		{#await getCartCount() then}
			<span class="badge-icon variant-filled-secondary absolute -top-2 -right-2 z-10 shadow-md"
				>{$cartCountStore}</span
			>
		{/await}
	{/if}
	<ShoppingCart />
</div>
