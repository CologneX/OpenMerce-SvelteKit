<script lang="ts">
	import CartItems from '$lib/Cart/CartItems.svelte';
	import CartSummary from '$lib/Cart/CartSummary.svelte';
</script>

<svelte:head>
	<title>Cart | OpenMerce</title>
	<meta name="description" content="OpenMerce | Cart page" />
</svelte:head>
<div class="grid grid-cols-3 gap-x-2 mt-6">
	<div class="col-span-2 overflow-auto">
		<header><h3 class="font-bold">Cart</h3></header>
		<label class="flex items-center space-x-2 px-2">
			<input class="checkbox" type="checkbox" />
			<p>Select All</p>
		</label>
		<CartItems />
	</div>
	<CartSummary />
</div>
