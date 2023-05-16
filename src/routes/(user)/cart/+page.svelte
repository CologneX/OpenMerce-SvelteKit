<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import { logoutUser } from '$lib/utils/auth';
	import Trash from '$lib/icons/Trash.svelte';
	import { goto } from '$app/navigation';
	import { triggerToast } from '$lib/utils/toast';
	import { isLoggedInStore } from '$lib/utils/stores';
	let products: CartProducts[] = [];
	let isLoading: boolean = true;
	onMount(() => {
		const getCart = async () => {
			const response = await fetch('/api/v1/customer/cart', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status === 401) {
				await refreshTokenUser();
				const response = await fetch('/api/v1/customer/cart', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					const cartData: CartProducts[] = await response.json();
					return cartData; 
				}
			} else if (!response.ok) {
				throw error(response.status, {
					message: `${response.statusText}`
				});
			}
			const cartData: CartProducts[] = await response.json();
			return cartData;
		};
		getCart().then((cartData) => {
			products = cartData;
			isLoading = false;
		});
	});
	let checkedItemIds = [];

	$: {
		checkedItemIds = products.filter((item) => item.checked).map((item) => item.id);
		console.log(checkedItemIds);
	}
	let totalPrice: number = 0;
	let grandTotal: number = 0;
	let totalItems: number = 0;
</script>

<svelte:head>
	<title>Cart | OpenMerce</title>
</svelte:head>

<div class="grid grid-cols-3 gap-x-2 mt-6">
	<div class="col-span-2 overflow-auto">
		<header><h3 class="font-bold">Cart</h3></header>
		<label class="flex items-center space-x-2 px-2">
			<input class="checkbox" type="checkbox" />
			<p>Select All</p>
		</label>
		<div class="grid grid-flow-row gap-y-2">
			{#each products as item}
				<div class="card flex flex-row gap-x-2 p-2">
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:checked={item.checked} />
					</label>
					<picture class="aspect-square shadow-xl flex justify-center items-center h-24 rounded">
						{#if item.image}
							<a href="/product/{item.id}" class="unstyled"
								><img
									src="/usercontent/{item.image}"
									alt="{item.name}'s image"
									class="rounded"
								/></a
							>
						{:else}
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						{/if}
					</picture>
					<div class="w-full">
						<a href="/product/{item.id}" class="unstyled"><h6>{item.name}</h6></a>
						<h6 class="font-semibold">
							{item.price.toLocaleString('id-ID', {
								style: 'currency',
								currency: 'IDR',
								minimumFractionDigits: 0
							})}
						</h6>
						<div class="flex justify-end">
							<button class="btn-icon btn-icon-sm" type="button">
								<Trash />
							</button>

							<button class="btn-icon btn-icon-sm" type="button">
								<MinusCircle />
							</button>
							<input
								type="text"
								inputmode="numeric"
								pattern="[0-9]*"
								class="input w-8 p-0 text-center"
								value={item.quantity}
							/>
							<button class="btn-icon btn-icon-sm" type="button">
								<PlusCircle />
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="card p-3 h-fit space-y-8">
		<h5 class="font-bold flex-none">Shopping Summary</h5>

		<h6 class="flex">
			<span class="flex-none">Total Price (item)</span>
			<div class="flex-1" />
			<span>
				{totalPrice.toLocaleString('id-ID', {
					style: 'currency',
					currency: 'IDR',
					minimumFractionDigits: 0
				})}
			</span>
		</h6>
		<hr class="!border-t-2 !border-current" />
		<h5 class="font-bold flex">
			<span class="flex-none">Grand Total</span>
			<div class="flex-1" />
			<span
				>{grandTotal.toLocaleString('id-ID', {
					style: 'currency',
					currency: 'IDR',
					minimumFractionDigits: 0
				})}
			</span>
		</h5>
		<div>
			<button type="button" class="btn w-full variant-filled-primary text-xl font-bold text-current"
				>Buy ({totalItems})</button
			>
		</div>
	</div>
</div>
