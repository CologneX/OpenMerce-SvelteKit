<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { defaultLocationStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';
	import { modalStore } from '@skeletonlabs/skeleton';
	const handleGetCheckoutFreight = async () => {
		await refreshTokenUser();
		const response = await fetch(
			`/api/v1/customer/pre-freight?id=${$defaultLocationStore.address_id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		const data = await response.json();
		return data;
	};
</script>

{#if $modalStore[0]}
	<div class="flex flex-col card p-4 md:p-10 w-full max-w-3xl gap-y-6 h-fit max-h-[98%]">
		<span>
			<h3 class="font-bold">Choose Shipping</h3>
		</span>
		<hr class="!border-t-2" />
		{#await handleGetCheckoutFreight()}
			<div class=" card space-y-2 h-fit">
				<p class="font-semibold text-lg border-l-4 pl-4 placeholder animate-pulse" />
				<div class="p-5 space-y-1">
					<p class="font-semibold text-xl placeholder animate-pulse" />
					<p class="text-sm placeholder animate-pulse" />
					<p class="text-sm placeholder animate-pulse" />
				</div>
			</div>
		{:then data}
			<span class="overflow-y-auto grid grid-flow-row space-y-2">
				{#each data as items}
					<button type="button" class="text-start">
						<div class="font-bold">{items.product_name}</div>
						<div class="text-sm font-bold">{rupiahCurrency(items.rates)}</div>
					</button>
					<hr class="last:hidden" />
				{/each}
			</span>
		{:catch error}
			<div class="card">
				<div class="flex flex-col items-center justify-center">
					<p class="text-center">{error.message}</p>
					<!-- <button class="btn btn-primary">Add Address</button> -->
				</div>
			</div>
		{/await}
	</div>
{/if}
