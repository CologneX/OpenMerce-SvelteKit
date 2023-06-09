<script lang="ts">
	import { goto } from '$app/navigation';
	import { TransactionDetailsModal } from '$lib/utils/modal';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';
	import { rupiahCurrency } from '$lib/utils/units';
	import { modalStore } from '@skeletonlabs/skeleton';
	let orderData: any = [];
	const handleGetOrder = async () => {
		const response = await fetch('/api/v1/customer/order', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/customer/order', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const data = await response.json();
				orderData = data;
			} else if (response.status === 404) {
				throw new Error('You do not have a transaction yet:)');
			} else {
				throw new Error('Cannot load data, sorry :)');
			}
		} else if (response.ok) {
			const data = await response.json();
			orderData = data;
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

	const handleCancelOrder = async (productID: string) => {
		const response = await fetch(`/api/v1/customer/checkout?id=${productID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const responseAgain = await fetch(`/api/v1/customer/checkout?id=${productID}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (responseAgain.ok) {
				await handleGetOrder();
				triggerToast('Order canceled', 'variant-soft');
			} else {
				triggerToast('Error canceling', 'variant-soft-error');
			}
		}
		if (response.ok) {
			await handleGetOrder();
			triggerToast('Order canceled', 'variant-soft');
		} else {
			triggerToast('Error canceling', 'variant-soft-error');
		}
	};
</script>

<svelte:head>
	<title>Transaction List | OpenMerce</title>
</svelte:head>
<div class="m-4">
	<h3 class="font-bold">Transaction List</h3>
	<div class="h-6" />
	{#await handleGetOrder()}
		<div class="md:grid md:grid-cols-2 gap-2">
			<div class="card rounded p-2">
				<div class="flex flex-row h-full space-x-2">
					<div class="placeholder animate-pulse aspect-square basis-1/5 h-full w-full" />
					<div class=" flex flex-col w-full basis-4/5">
						<div class="space-y-2">
							<div class="placeholder animate-pulse w-1/3" />
							<div class="placeholder animate-pulse w-2/3" />
							<div class="placeholder animate-pulse w-1/4" />
						</div>
						<div class="h-full space-x-2 md:space-x-4 flex justify-end">
							<button
								class="btn btn-sm md:btn-md variant-soft-primary font-bold text-sm px-8 lg:px-16"
							>
								<span>Detail</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card rounded p-2">
				<div class="flex flex-row h-full space-x-2">
					<div class="placeholder animate-pulse aspect-square basis-1/5 h-full w-full" />
					<div class=" flex flex-col w-full basis-4/5">
						<div class="space-y-2">
							<div class="placeholder animate-pulse w-1/3" />
							<div class="placeholder animate-pulse w-2/3" />
							<div class="placeholder animate-pulse w-1/4" />
						</div>
						<div class="h-full space-x-2 md:space-x-4 flex justify-end">
							<button
								class="btn btn-sm md:btn-md variant-soft-primary font-bold text-sm px-8 lg:px-16"
							>
								<span>Detail</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:then}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
			{#each { length: orderData.length } as _, index}
				{@const reverseIndex = orderData.length - 1 - index}
				{@const value = orderData[reverseIndex]}
				<div class="card rounded p-2 drop-shadow-md">
					<div class="flex flex-row h-full space-x-2">
						{#if value.image}
							<img
								src="/usercontent/{value.image}"
								alt={value.product_name}
								class="aspect-square flex-initial w-24 h-24 rounded-md"
							/>
						{:else}
							<img
								src="placeholder.png"
								alt={value.product_name}
								class="aspect-square flex-initial w-24 h-24 rounded-md"
							/>
						{/if}
						<div class=" flex flex-col w-full basis-4/5 truncate">
							<div class="space-y-2 flex">
								<div class="w-full">
									<div class="text-xs md:text-base">
										{value.created_at}
										<span
											class="ml-2 badge border
									{value.status === 'pending'
												? 'variant-soft-success border-success-500'
												: value.status === 'settlement'
												? 'variant-soft-primary border-primary-500'
												: value.status === 'expire'
												? 'variant-soft-warning border-warning-500'
												: value.status === 'cancel'
												? 'variant-soft-error border-error-500'
												: ''}
									
									text-xs md:text-base">{value.status.charAt(0).toUpperCase() + value.status.slice(1)}</span
										>
									</div>
									<div class="text-sm md:text-base font-semibold truncate">
										{value.product_name}
									</div>
									<div class="text-xs md:text-base">{value.item_count} item</div>
								</div>
								<!-- <div class="text-end pb-2">
									<div class="text-xs md:text-sm font-thin">
										Total <span class="font-semibold">{rupiahCurrency(value.gross_amount)}</span>
									</div>
								</div> -->
							</div>

							<div class="h-full space-x-2 md:space-x-4 flex justify-end">
								<div class="text-xs md:text-sm font-thin">
									Total <span class="font-semibold">{rupiahCurrency(value.gross_amount)}</span>
								</div>
								<div class="space-x-2 md:space-x-4 flex justify-end w-full">
									{#if value.status === 'pending'}
										<button
											class="btn btn-sm md:btn font-bold text-xs text-error-500 px-8"
											on:click={() => {
												handleCancelOrder(value.id);
											}}
										>
											Cancel
										</button>
									{/if}
									{#if value.status !== 'pending'}
										<button
											class="btn btn-sm md:btn-md variant-soft-primary font-bold text-sm px-8"
											on:click={() => {
												triggerTransactionDetailsModal(value.id);
											}}
										>
											<span>Detail</span>
										</button>
									{/if}
									{#if value.status === 'pending'}
										<button
											class="btn btn-sm md:btn-md variant-soft-success font-bold text-sm px-8"
											on:click={() => {
												triggerTransactionDetailsModal(value.id);
											}}
										>
											<span>Pay Now </span>
										</button>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="card border border-primary-500 rounded p-2 md:p-4 shadow-md">
					<div class="flex flex-row h-full space-x-2">
						{#if value.image}
							<img
								src="/usercontent/{value.image}"
								alt={value.product_name}
								class="aspect-square basis-1/5 flex-initial w-24 rounded-md"
							/>
						{:else}
							<img
								src="placeholder.png"
								alt={value.product_name}
								class="aspect-square basis-1/5 flex-initial w-24 rounded-md"
							/>
						{/if}
						<div class=" flex flex-col w-full basis-4/5">
							<div class="space-y-2">
								<div class="text-xs md:text-base">
									{value.created_at}
									<span
										class="ml-2 badge border
									{value.status === 'pending'
											? 'variant-soft-success border-success-500'
											: value.status === 'settlement'
											? 'variant-soft-primary border-primary-500'
											: value.status === 'expire'
											? 'variant-soft-warning border-warning-500'
											: value.status === 'cancel'
											? 'variant-soft-error border-error-500'
											: ''}
									
									text-xs md:text-base">{value.status.charAt(0).toUpperCase() + value.status.slice(1)}</span
									>
								</div>
								<div class="text-sm md:text-base font-semibold">{value.product_name}</div>
								<div class="text-xs md:text-base">{value.item_count} item</div>
							</div>
						</div>
					</div>
					<div class="w-full flex h-full mt-2">
						<div class="text-xs md:text-base font-thin">
							Total: <div class=" font-semibold">{rupiahCurrency(value.gross_amount)}</div>
						</div>
						<div class="space-x-2 md:space-x-4 flex justify-end w-full">
							{#if value.status === 'pending'}
								<button
									class="btn btn-sm md:btn font-bold text-xs text-error-500 md:px-16"
									on:click={() => {
										handleCancelOrder(value.id);
									}}
								>
									Cancel
								</button>
							{/if}
							{#if value.status}
								<button
									class="btn btn-sm md:btn-md variant-soft-primary font-bold text-sm md:px-16"
									on:click={() => {
										triggerTransactionDetailsModal(value.id);
									}}
								>
									<span>Detail</span>
								</button>
							{/if}
							{#if value.status === 'pending'}
								<button
									class="btn btn-sm md:btn-md variant-soft-success font-bold text-sm md:px-16"
									on:click={() => {
										goto(value.payment_url);
									}}
								>
									<span>Pay Now</span>
								</button>
							{/if}
						</div>
					</div>
				</div> -->
			{/each}
		</div>
	{/await}
</div>
