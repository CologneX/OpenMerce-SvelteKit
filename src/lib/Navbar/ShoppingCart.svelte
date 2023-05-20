<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import ShoppingCart from '$lib/icons/ShoppingCart.svelte';
	import { isLoggedInStore } from '$lib/utils/stores';
	import type { CartCount } from '../../app';
	export const getCartCount = async () => {
		if ($isLoggedInStore) {
			const response = await fetch('/api/v1/customer/cart-count', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status === 401) {
				await refreshTokenUser();
				const response = await fetch('/api/v1/customer/cart', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					const cartCount: CartCount = await response.json();
					return cartCount;
				}
			}
			if (response.ok) {
				const cartCount: CartCount = await response.json();
				return cartCount;
			}
		}
	};
</script>

<div class="relative inline-block">
	{#if $isLoggedInStore}
		{#await getCartCount() then cartCount}
			<span class="badge-icon variant-filled-secondary absolute -top-2 -right-2 z-10 shadow-md"
				>{cartCount?.count}</span
			>
		{/await}
	{/if}

	<ShoppingCart />
</div>
