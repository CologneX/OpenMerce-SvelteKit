<script lang="ts">
	import { goto } from '$app/navigation';
	import CartItems from '$lib/Cart/CartItems.svelte';
	import CartSummary from '$lib/Cart/CartSummary.svelte';
	import { screenWidthStore, subTotalStore, totalItemsStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';
	let checkAll: boolean = false;
</script>

<svelte:head>
	<title>Cart | OpenMerce</title>
	<meta name="description" content="OpenMerce | Cart page" />
</svelte:head>
<div class="grid grid-cols-3 gap-8 mx-5 mt-5">
	<div class="{$screenWidthStore > 1024 ? 'col-span-2' : 'col-span-3'} overflow-auto space-y-4">
		<h3 class="font-bold">Cart</h3>
		<hr class="!border-t-2" />
		<label class="flex items-center space-x-2 px-2 sticky top-0">
			<input class="checkbox" type="checkbox" bind:checked={checkAll} />
			<p>Select All</p>
		</label>
		<CartItems />
	</div>
	{#if $screenWidthStore > 1024}
		<CartSummary />
	{/if}
</div>
{#if $screenWidthStore < 1024}
	<div class="fixed bottom-0 flex w-full bg-dark p-4">
		<div class="flex-1">
			<small>Total Price</small>
			<div class="font-bold text-lg">{rupiahCurrency($subTotalStore)}</div>
		</div>
		<button
			type="button"
			class="btn btn-sm font-bold variant-filled-primary flex-1"
			on:click={() => {
				goto('/cart/checkout');
			}}
			><span class="text-white text-base">Checkout ({$totalItemsStore})</span>
		</button>
	</div>
{/if}
