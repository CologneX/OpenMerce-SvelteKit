<script lang="ts">
	import { goto } from '$app/navigation';
	import CartItems from '$lib/Cart/CartItems.svelte';
	import CartSummary from '$lib/Cart/CartSummary.svelte';
	import { screenWidthStore, subTotalStore, totalItemsStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';

	const handlePostCheckAll = async () => {
		const response = await fetch(`/api/v1/customer/cart-checked-all`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				checkAll: true
			})
		});
		if (!response.ok) {
			throw new Error('An error occurred while fetching the data');
		}
	};
</script>

<svelte:head>
	<title>Cart | OpenMerce</title>
	<meta name="description" content="OpenMerce | Cart page" />
</svelte:head>
<div class="mt-6">
	<div class="px-5">
		<div class="font-bold text-2xl mb-4">Cart</div>
		<label class="flex items-center space-x-2 sticky top-0 px-3">
			<input class="checkbox" type="checkbox" on:change={handlePostCheckAll} />
			<p>Select All</p>
		</label>
	</div>
	<div class="grid grid-cols-3 gap-8 mx-5 mt-5">
		<div class="{$screenWidthStore > 1024 ? 'col-span-2' : 'col-span-3'} overflow-auto space-y-4">
			<hr class="!border-t-4 -p-5" />
			<CartItems />
		</div>
		{#if $screenWidthStore > 1024}
			<CartSummary />
		{/if}
	</div>
	{#if $screenWidthStore < 1024}
		<div class="sticky bottom-0 flex w-full bg-dark p-4">
			<div class="flex-1">
				<small>Total Price</small>
				<div class="font-bold text-lg">{rupiahCurrency($subTotalStore)}</div>
			</div>
			<button
				type="button"
				class="btn btn-sm font-bold variant-filled-primary flex-1"
				disabled={!$totalItemsStore}
				on:click={() => {
					goto('/cart/checkout');
				}}
				><span class="text-white text-base">Checkout ({$totalItemsStore})</span>
			</button>
		</div>
	{/if}
</div>
