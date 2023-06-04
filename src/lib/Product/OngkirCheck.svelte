<script lang="ts">
	import Truck from '$lib/icons/Truck.svelte';
	import { checkDeliveryRate } from '$lib/utils/freight';
	import { DeliverySimulationModal } from '$lib/utils/modal';
	import { defaultLocationStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let productId: string;
	export let weight2: number;
	const triggerDeliveryDetailsModal = (deliveryDetails: any, weight: number) => {
		DeliverySimulationModal.meta = {
			deliveryDetails: deliveryDetails,
			weight: weight
		};
		modalStore.trigger(DeliverySimulationModal);
	};
</script>

<div class="border-b-2 pb-3 border-surface-900-50-token">
	<h4 class="font-semibold">Delivery</h4>
	<div class="flex flex-row space-x-2">
		<div><Truck /></div>
		<div class="flex flex-col gap-y-1">
			{#await checkDeliveryRate(productId, $defaultLocationStore.id)}
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
			{:then [data, maxRate, minRate]}
				<div class="text-sm">
					Regular Rate <span class="font-semibold">
						{rupiahCurrency(minRate)} - {rupiahCurrency(maxRate)}</span
					>
				</div>
				<div class="text-sm">
					Other couriers
					<span class="space-x-1">
						{#each Object.keys(data) as courier}
							<span class="badge variant-ghost-primary">{courier}</span>
						{/each}
					</span>
				</div>
				<button
					class="text-primary-500 text-sm font-semibold btn bg-initial w-fit h-fit p-0 m-0"
					on:click={() => triggerDeliveryDetailsModal(data, weight2)}
					type="button"
				>
					See other couriers
				</button>
			{:catch error}
				<div class="text-red-500">Error: {error.message}</div>
			{/await}
		</div>
	</div>
</div>
