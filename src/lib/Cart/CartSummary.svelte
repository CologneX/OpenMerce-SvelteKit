<script lang="ts">
	import { rupiahCurrency } from '$lib/utils/units';
	import { subTotalStore, totalItemsStore } from '$lib/utils/stores';
	import { goto } from '$app/navigation';
	let grandTotal: number = 0;
	$: grandTotal = $subTotalStore;
</script>

<div class="card p-3 h-fit space-y-8">
	<h5 class="font-bold flex-none">Shopping Summary</h5>

	<h6 class="flex">
		<span class="flex-none">Total Price (item)</span>
		<div class="flex-1" />
		<span>
			{rupiahCurrency($subTotalStore)}
		</span>
	</h6>
	<hr class="!border-t-2 !border-current" />
	<h5 class="font-bold flex">
		<span class="flex-none">Grand Total</span>
		<div class="flex-1" />
		<span>{rupiahCurrency(grandTotal)} </span>
	</h5>
	<div>
		<button
			type="button"
			class="btn w-full variant-filled-primary text-xl font-bold text-current"
			disabled={!$totalItemsStore}
			on:click={() => {
				goto('/cart/checkout');
			}}>Buy ({$totalItemsStore})</button
		>
	</div>
</div>
