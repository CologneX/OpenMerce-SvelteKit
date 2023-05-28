<script lang="ts">
	import Truck from '$lib/icons/Truck.svelte';
	import { checkDeliveryRate } from '$lib/utils/freight';
	import { isLoggedInStore } from '$lib/utils/stores';
	export let productId: string;
</script>

<div class="border-b-2 pb-3 border-surface-900-50-token">
	<h4 class="font-semibold">Delivery</h4>
	<div class="flex flex-row">
		<div class=""><Truck /></div>
		<div class="">
			<!-- {#await checkDeliveryRate(productId, 49101) then data} -->
			<div>Regular Rate:</div>
			<div>
				Other couriers:
				<span class="badge variant-ghost-primary">Badge</span>
			</div>
			<!-- {/await} -->
		</div>
	</div>
</div>
