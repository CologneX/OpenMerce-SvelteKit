<script lang="ts">
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import { AddressModal } from '$lib/utils/modal';
	import { defaultLocationStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';
	import { modalStore } from '@skeletonlabs/skeleton';
</script>

{#if $modalStore[0]}
	<div class="card shadow-2xl p-10 w-full max-w-screen-md gap-y-6 h-full max-h-[90%] truncate">
		<span>
			<h4 class="font-bold">Delivery Simulation</h4>
			<small class="text-surface-600-300-token">Details of the delivery</small>
		</span>

		<div class=" card p-3 h-fit w-full shadow-lg">
			<div>
				<small>Product weight </small>
				<span class="font-bold">{$modalStore[0].meta?.weight} kg</span>
			</div>
			<button
				class="text-sm w-full btn flex justify-start p-0"
				type="button"
				on:click={() => {
					modalStore.close();
					modalStore.trigger(AddressModal);
				}}
			>
				<span class="border-2 truncate">
					Delivery to <span class="font-semibold"> {$defaultLocationStore.name} </span></span
				>
				<span><ChevronDown /></span>
			</button>
		</div>
		<div class="h-4" />
		<div class="overflow-y-auto space-y-8 h-full max-h-[75%] pr-2">
			{#if $modalStore[0].meta?.deliveryDetails}
				{#each Object.entries($modalStore[0].meta?.deliveryDetails) as [key, value]}
					<div class="text-lg font-bold">{key}</div>
					<hr class="!border-t-2" />
					<span class="space-y-3">
						{#each value as item (item)}
							<span class="flex justify-between items-center">
								<span class="font-semibold">{item.product_name}:</span>
								<span class="text-end font-semibold">{rupiahCurrency(item.rates)}</span>
							</span>

							<small>Estimated arrival date {item.etd}</small>
						{/each}
					</span>
				{/each}
			{/if}
		</div>
	</div>
{/if}
