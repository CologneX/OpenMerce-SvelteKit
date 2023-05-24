<script lang="ts">
	export let productID: string;
	export let quantity: number;
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import { handleEditItem } from '$lib/utils/cart';
</script>

<button
	class="btn variant-filled-primary font-bold flex-1"
	on:click={() => handleEditItem(productID, quantity)}
	><span class="text-white flex items-center"> <PlusSmall /> Add to cart</span>
</button>
