<script lang="ts">
	import MinusSmall from '$lib/icons/MinusSmall.svelte';
	import type { CartProducts } from '../../app';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';

	export let item: CartProducts[];
</script>

<button
	class="btn btn-sm text-primary-500"
	disabled={item.quantity < 1}
	on:click|preventDefault={() => handleItem(item.id, item.quantity - 1)}
>
	<span><MinusSmall /></span>
</button>
<input
	type="number"
	class="input w-8 p-0 text-center"
	bind:value={item.quantity}
	on:change|preventDefault={() => handleItem(item.id, item.quantity)}
	on:input|preventDefault={() => {
		if (item.quantity < 0) {
			item.quantity = 0;
		} else if (item.quantity > item.curr_stock) {
			item.quantity = item.curr_stock;
		}
	}}
	on:keypress={(e) => {
		if (e.key.match(/[^0-9]/g)) {
			e.preventDefault();
		}
	}}
/>
<button
	class="btn btn-sm text-primary-500"
	on:click|preventDefault={() => handleItem(item.id, item.quantity + 1)}
	disabled={item.quantity >= item.curr_stock}
>
	<span><PlusSmall /></span>
</button>
