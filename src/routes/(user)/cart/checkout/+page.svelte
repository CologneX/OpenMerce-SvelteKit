<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { defaultLocationStore } from '$lib/utils/stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { AddressDetail, ProductDetail, Products, ProductsMain } from '../../../../app';
	import { AddressModal } from '$lib/utils/modal';
	import Logo from '$lib/icons/Logo.svelte';
	import { rupiahCurrency } from '$lib/utils/units';
	if ($defaultLocationStore.address_id == '') {
		modalStore.trigger(AddressModal);
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
</script>

<svelte:head>
	<title>Checkout | OpenMerce</title>
	<!-- meta -->
	<meta name="description" content="OpenMerce Checkout" />
	<meta name="keywords" content="OpenMerce, Ecommerce, Checkout" />
</svelte:head>

<div class="p-5">
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
						<h6 class="font-semibold">
							{rupiahCurrency(item.price)}
						</h6>
					</div>
				</div>
				<hr class="!border-b-2" />
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
