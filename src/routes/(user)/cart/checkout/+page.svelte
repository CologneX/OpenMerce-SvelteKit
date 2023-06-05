<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import {
		defaultLocationStore,
		screenWidthStore,
		subTotalStore,
		totalItemsStore
	} from '$lib/utils/stores';
	import { ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import type { AddressDetail, Products } from '../../../../app';
	import { AddAddressModal, AddressListModal } from '$lib/utils/modal';
	import Logo from '$lib/icons/Logo.svelte';
	import { rupiahCurrency } from '$lib/utils/units';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { triggerToast } from '$lib/utils/toast';
	if ($defaultLocationStore.address_id == '') {
		modalStore.trigger(AddressListModal);
	}
	if (get(totalItemsStore) == 0) {
		triggerToast('You do not have items to check out!', 'variant-filled-primary');
		goto('/cart');
	}
	const handleGetDefaultAddress = async (id: string) => {
		await refreshTokenUser();
		const response = await fetch(`/api/v1/customer/address?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error('An error occurred while fetching the data');
		}
		const data: AddressDetail = await response.json();
		return data;
	};

	const handleGetPrecheckoutItems = async () => {
		const response = await fetch(`/api/v1/customer/pre-items`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error('An error occurred while fetching the data');
		}
		const data: Products = await response.json();
		return data;
	};
	let courier_data: any = {
		courier_name: null,
		product_name: null,
		product_code: null,
		rates: null,
		etd: null
	};
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
		courier_data = data;
		return data;
	};
	let isCheckingOut: boolean = false;
	const handlePostCheckout = async () => {
		isCheckingOut = true;
		const response = await fetch(`/api/v1/customer/checkout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				address_code: $defaultLocationStore.address_id,
				courier_code: courier_data.product_code
			})
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch(`/api/v1/customer/checkout`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					address_code: $defaultLocationStore.address_id,
					courier_code: courier_data.product_code
				})
			});
		}
		if (!response.ok) {
			throw new Error('An error occurred while fetching the data');
		}
		isCheckingOut = false;
		const data = await response.json();
		goto(data.redirect_url);
	};
</script>

<svelte:head>
	<title>Checkout | OpenMerce</title>
	<!-- meta -->
	<meta name="description" content="OpenMerce Checkout" />
	<meta name="keywords" content="OpenMerce, Ecommerce, Checkout" />
	<!-- <script
		type="text/javascript"
		src="https://app.sandbox.midtrans.com/snap/snap.js"
		data-client-key=""
	></script> -->
</svelte:head>

<div class="grid grid-cols-3 gap-8 mx-5 my-5">
	<div class="{$screenWidthStore > 1024 ? 'col-span-2' : 'col-span-3'} overflow-auto space-y-4">
		<p class="font-bold text-2xl">Checkout</p>
		<div class="h-4" />
		<div class="font-semibold">Shipping Address</div>
		<hr class="my-4" />
		{#await handleGetDefaultAddress($defaultLocationStore.address_id)}
			<div class="space-y-1.5">
				<p><span class="placeholder animate-pulse" /></p>
				<p class="placeholder animate-pulse" />
				<p class="placeholder animate-pulse" />
				<p class="placeholder animate-pulse" />
				<p class="placeholder animate-pulse" />
			</div>
		{:then data}
			<p><span class="font-bold">{data.recipient_name}</span> ({data.label})</p>
			<p>{data.phone_number}</p>
			<p>{data.full_address}</p>
			<small>{data.shipping_area}</small>
			<small>{data.note}</small>
		{:catch error}
			<p>{error.message}</p>
		{/await}
		<div class="h-4" />

		<button
			type="button"
			class="btn btn-sm variant-ringed-primary w-full max-w-xs"
			on:click={() => {
				modalStore.close();
				modalStore.trigger(AddressListModal);
			}}
		>
			Change Address
		</button>

		<hr class="my-4" />
		{#await handleGetPrecheckoutItems()}
			<p>loading products</p>
		{:then data}
			<div class="flex flex-col gap-4">
				{#each data as item}
					<div class="flex flex-row gap-x-2 p-3">
						<picture
							class="aspect-square shadow-xl flex justify-center items-center h-full max-h-32 rounded"
						>
							{#if item.image}
								<a href="/product/{item.id}" class="unstyled"
									><img
										loading="lazy"
										src={`/usercontent/${item.image}`}
										alt="{item.name}'s image"
										class="rounded"
										width="100%"
										height="100%"
										title={item.name}
									/>
								</a>
							{:else}
								<div>
									<Logo />
									<p class="text-center">No Image Found</p>
								</div>
							{/if}
						</picture>
						<div class="w-full grid grid-rows-3">
							<a href="/product/{item.id}" class="unstyled truncate"
								><h5 class="truncate">{item.name}</h5></a
							>
							<p class="font-semibold">
								{rupiahCurrency(item.price)}
							</p>
							<p class="text-sm">
								Items {item.quantity}
							</p>
						</div>
					</div>
					<hr class="!border-b-2" />
				{/each}
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
		<Accordion hover="hover:bg-transparent">
			<AccordionItem regionControl="font-bold text-sm" padding="py-2">
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">Choose Shipping</svelte:fragment>
				<svelte:fragment slot="content">
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
								<button
									type="button"
									class="text-start"
									on:click={() => {
										courier_data = items;
									}}
								>
									<div class="font-bold">{items.product_name}</div>
									<div class="text-sm font-bold">{rupiahCurrency(items.rates)}</div>
									<div class="text-sm">Estimated {items.etd}</div>
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
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
		{#if courier_data.courier_name}
			<hr class="!border-t-2" />
			<div>
				<p class="font-bold">{courier_data.courier_name} ({rupiahCurrency(courier_data.rates)})</p>
				<p class="font-bold text-sm">{courier_data.product_name}</p>
				<p class="text-xs">On-time Delivery Guaranteed</p>
			</div>
			<hr class="!border-t-2" />
			{#if $screenWidthStore < 1024}
				<Accordion hover="hover:bg-transparent">
					<AccordionItem regionControl="font-bold text-sm" padding="py-2">
						<svelte:fragment slot="summary">Shopping Summary</svelte:fragment>
						<svelte:fragment slot="content">
							<div class="flex">
								<span class="flex-none">Total Price (item)</span>
								<div class="flex-1" />
								<span>
									{rupiahCurrency($subTotalStore)}
								</span>
							</div>
							<div class="flex">
								<span class="flex-none">Delivery Fee</span>
								<div class="flex-1" />
								<span>
									{rupiahCurrency(courier_data.rates)}
								</span>
							</div>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
				<hr class="!border-t-2" />
			{/if}
		{/if}
		{#if $screenWidthStore < 1024}
			<div class=" flex w-full mt-4 gap-x-4">
				<div class="flex-1">
					<small>Total Price</small>
					<div class="font-bold text-lg truncate">
						{#if courier_data.rates}
							<span class="truncate">{rupiahCurrency(courier_data.rates + $subTotalStore)} </span>
						{:else}
							<span>-</span>
						{/if}
					</div>
				</div>
				<button
					type="button"
					class="btn btn-sm font-bold variant-filled-primary flex-1"
					on:click={handlePostCheckout}
					disabled={courier_data.rates == null || isCheckingOut}
					>{#if isCheckingOut}
						<span><ProgressRadial width="w-5" /></span>{/if}
					<span>Select Payment</span>
				</button>
			</div>
		{/if}
	</div>
	{#if $screenWidthStore > 1024}
		<div class="card p-3 h-fit space-y-8 sticky top-6">
			<h5 class="font-bold flex-none">Shopping Summary</h5>

			<div class="flex">
				<span class="flex-none">Total Price (item)</span>
				<div class="flex-1" />
				<span>
					{rupiahCurrency($subTotalStore)}
				</span>
			</div>
			<div class="flex">
				<span class="flex-none">Delivery Fee (item)</span>
				<div class="flex-1" />
				<span>
					{rupiahCurrency(courier_data.rates)}
				</span>
			</div>
			<hr class="!border-t-8" />
			<div class="font-bold flex text-xl">
				<span class="flex-none">Grand Total</span>
				<div class="flex-1" />
				{#if courier_data.rates}
					<span>{rupiahCurrency(courier_data.rates + $subTotalStore)} </span>
				{:else}
					<span>-</span>
				{/if}
			</div>
			<div>
				<button
					type="button"
					class="btn w-full variant-filled-primary text-xl font-bold text-current"
					disabled={courier_data.rates == null || isCheckingOut}
					on:click={handlePostCheckout}
				>
					{#if isCheckingOut}
						<span><ProgressRadial width="w-8" /></span>{/if}
					<span>Select Payment</span>
				</button>
			</div>
		</div>
	{/if}
</div>
