<script lang="ts">
	export const getCartCount = async () => {
		const response = await fetch('/api/v1/customer/cart-count', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const cartCount: number = await response.json();
		return cartCount;
	};
	import ShoppingCart from '$lib/icons/ShoppingCart.svelte';
</script>

<div></div>