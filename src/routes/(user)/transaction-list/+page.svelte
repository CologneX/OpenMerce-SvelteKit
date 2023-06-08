<script lang="ts">
	import { TransactionDetailsModal } from '$lib/utils/modal';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { rupiahCurrency } from '$lib/utils/units';
	import { modalStore } from '@skeletonlabs/skeleton';
	const handleGetOrder = async () => {
		const response = await fetch('/api/v1/customer/order', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const responseAgain = await fetch('/api/v1/customer/order', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (responseAgain.ok) {
				const data = await responseAgain.json();
				return data;
			} else if (responseAgain.status === 404) {
				throw new Error('You do not have a transaction yet:)');
			} else {
				throw new Error('Cannot load data, sorry :)');
			}
		} else if (response.ok) {
			const data = await response.json();
			return data;
		} else if (response.status === 404) {
			throw new Error('You do not have a transaction yet:)');
		} else {
			throw new Error('Cannot load data, sorry :)');
		}
	};
	const triggerTransactionDetailsModal = (orderID: string) => {
		TransactionDetailsModal.meta = {
			orderID: orderID
		};
		modalStore.trigger(TransactionDetailsModal);
	};
</script>

<svelte:head>
	<title>Transaction List | OpenMerce</title>
</svelte:head>
<div class="m-4">
	<h3 class="font-bold">Transaction List</h3>
	<div class="h-6" />
	{#await handleGetOrder()}
		<div class="card rounded p-2 md:p-4">
			<div class="flex flex-row h-full space-x-2">
				<div class="placeholder animate-pulse aspect-square basis-1/5 h-full w-full" />
				<div class=" flex flex-col w-full basis-4/5">
					<div class="space-y-2">
						<div class="placeholder animate-pulse w-1/3" />
						<div class="placeholder animate-pulse w-2/3" />
						<div class="placeholder animate-pulse w-1/4" />
					</div>
				</div>
			</div>
			<div class="w-full flex h-full mt-2">
				<div class="placeholder animate-pulse w-1/3" />
				<div class="space-x-2 md:space-x-4 flex justify-end w-full">
					<button class="font-bold text-xs md:text-sm text-primary-500">Transaction Detail</button>
					<button class="btn btn-sm md:btn variant-filled-primary font-bold md:px-20">Review</button
					>
				</div>
			</div>
		</div>
	{:then data}
		<div class="space-y-2 md:space-y-4">
			{#each data as item}
				<div class="card border border-primary-500 rounded p-2 md:p-4 shadow-md">
					<div class="flex flex-row h-full space-x-2">
						{#if item.image}
							<img
								src="/usercontent/{item.image}"
								alt={item.product_name}
								class="aspect-square basis-1/5 flex-initial w-24 rounded-md"
							/>
						{:else}
							<img
								src="placeholder.png"
								alt={item.product_name}
								class="aspect-square basis-1/5 flex-initial w-24 rounded-md"
							/>
						{/if}
						<div class=" flex flex-col w-full basis-4/5">
							<div class="space-y-2">
								<div class="text-xs md:text-base">
									{item.created_at}
									<span
										class="ml-2 badge
									{item.status === 'pending'
											? 'variant-soft-warning'
											: item.status === 'settlement'
											? 'variant-soft-success'
											: item.status === 'expire'
											? 'variant-soft-error'
											: ''}
									
									text-xs md:text-base">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span
									>
								</div>
								<div class="text-sm md:text-base font-semibold">{item.product_name}</div>
								<div class="text-xs md:text-base">{item.item_count} item</div>
							</div>
						</div>
					</div>
					<div class="w-full flex h-full mt-2">
						<div class="text-xs md:text-base font-thin">
							Total: <div class=" font-semibold">{rupiahCurrency(item.gross_amount)}</div>
						</div>
						<div class="space-x-2 md:space-x-4 flex justify-end w-full">
							{#if item.status !== 'expire'}
								<button
									class="btn btn-sm md:btn variant-filled-primary font-bold md:px-20"
									on:click={() => {
										triggerTransactionDetailsModal(item.id);
									}}>Review</button
								>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/await}
</div>
