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
<div class="grid grid-cols-{$screenWidthStore > 1024 ? 3 : 2}  gap-x-2 mt-6">
	<div class="col-span-2 overflow-auto">
		<header><h3 class="font-bold">Cart</h3></header>
		<label class="flex items-center space-x-2 px-2">
			<input class="checkbox" type="checkbox" bind:checked={checkAll} />
			<p>Select All</p>
		</label>
		<CartItems checkAll={checkAll} />
	</div>
	{#if $screenWidthStore > 1024}
		<CartSummary />
	{/if}
</div>
