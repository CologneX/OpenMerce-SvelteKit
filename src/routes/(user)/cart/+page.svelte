<script lang="ts">
	import CartItems from '$lib/Cart/CartItems.svelte';
	import CartSummary from '$lib/Cart/CartSummary.svelte';
	import { screenWidthStore } from '$lib/utils/stores';
	let checkAll: boolean = false;
</script>

<svelte:head>
	<title>Cart | OpenMerce</title>
	<meta name="description" content="OpenMerce | Cart page" />
</svelte:head>
<div class="grid grid-cols-3 gap-8 mt-6">
	<div class="col-span-2 overflow-auto space-y-4">
		<h3 class="font-bold">Cart</h3>
		<hr class="!border-t-2">
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
