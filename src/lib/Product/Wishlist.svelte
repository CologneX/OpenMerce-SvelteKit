<script lang="ts">
	import { triggerToast } from '$lib/utils/toast';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { isLoggedInStore, isWishlistedStore } from '$lib/utils/stores';
	import { goto } from '$app/navigation';
	import HeartMini from '$lib/icons/HeartMini.svelte';
	import { get } from 'svelte/store';
	export let productId: string;
	isWishlistedStore.set(false);
	const handleWishlist = async (productId: string) => {
		if (get(isLoggedInStore)) {
			if (!get(isWishlistedStore)) {
				const response = await fetch(`/api/v1/customer/wishlist?id=${productId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.status === 401) {
					await refreshTokenUser();
					const responseAgain = await fetch(`/api/v1/customer/wishlist?id=${productId}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (responseAgain.ok) {
						isWishlistedStore.set(true);
						triggerToast('Product added to wishlist!', 'variant-filled-success');
					}
				}
				if (response.ok) {
					isWishlistedStore.set(true);
					triggerToast('Product added to wishlist!', 'variant-filled-success');
				}
			} else {
				const response = await fetch(`/api/v1/customer/wishlist?id=${productId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.status === 401) {
					await refreshTokenUser();
					const responseAgain = await fetch(`/api/v1/customer/wishlist?id=${productId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (responseAgain.ok) {
						isWishlistedStore.set(false);
						triggerToast('Product deleted from wishlist!', 'variant-filled-success');
					}
				}
				if (response.ok) {
					isWishlistedStore.set(false);
					triggerToast('Product deleted from wishlist!', 'variant-filled-success');
				}
			}
		} else {
			triggerToast('You need to login first!', 'variant-filled-warning');
			goto('/login');
		}
	};

	const handleCheckWishlist = async (productId: string) => {
		if (get(isLoggedInStore)) {
			const response = await fetch(`/api/v1/customer/wishlist?id=${productId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const responseJson = await response.json();
				if (responseJson.state === true) {
					isWishlistedStore.set(true);
				}
			} else if (response.status === 401) {
				await refreshTokenUser();
				const response = await fetch(`/api/v1/customer/wishlist?id=${productId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					const responseJson = await response.json();
					if (responseJson.state === true) {
						isWishlistedStore.set(true);
					}
				}
			}
		}
	};
</script>

{#await handleCheckWishlist(productId)}
	<div class="animate-pulse placeholder flex-1 m-2" />
{:then}
	<button
		class="btn btn-sm flex-1 {$isWishlistedStore ? 'text-primary-500' : ''}"
		on:click={() => {
			handleWishlist(productId);
		}}><span><HeartMini /></span><span>Wishlist</span></button
	>
{/await}
