<script lang="ts">
	import Search from '$lib/icons/Search.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { defaultLocationStore, isLoggedInStore } from '$lib/utils/stores';
	import { triggerToast } from '$lib/utils/toast';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { Address, AddressDetail } from '../../app';
	const handleLoadAddress = async () => {
		const response = await fetch('/api/v1/customer/address', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.status == 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/customer/address', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			if (response.status == 200) {
				const data: Address[] = await response.json();
				return data;
			}
		} else if (response.status == 200) {
			const data: Address[] = await response.json();
			return data;
		}
		return [];
	};

	let searchLocation: string;
	let timeoutId: ReturnType<typeof setTimeout>;
	const handleSearchLocation = (searchLocation: string) => {
		return new Promise((resolve, reject) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				try {
					const response = await fetch(`/api/v1/area/suggest?search=${searchLocation}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (!response.ok) {
						throw new Error('An error occurred while fetching the data');
					}
					const data = await response.json();
					resolve(data);
				} catch (error) {
					reject(error);
				}
			}, 500);
		});
	};

	let isSettingDefaultLocation: boolean = false;
	const handleLoginSetLocation = async (id: string) => {
		isSettingDefaultLocation = true;
		const responseDetail = await fetch(`/api/v1/customer/address?id=${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		if (responseDetail.ok) {
			const data: AddressDetail = await responseDetail.json();
			defaultLocationStore.set({ id: data.area_id, name: data.shipping_area });

			modalStore.clear();
			triggerToast('Address has been set', 'variant-filled-success');
		} else if (responseDetail.status === 401) {
			await refreshTokenUser();
			const responseDetail = await fetch(`/api/v1/customer/address?id=${id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			if (responseDetail.ok) {
				const data: AddressDetail = await responseDetail.json();
				defaultLocationStore.set({ id: data.area_id, name: data.shipping_area });
				modalStore.clear();
				triggerToast('Address has been set', 'variant-filled-success');
			}
		}
		isSettingDefaultLocation = false;
	};
</script>

{#if $modalStore[0]}
	<div class="flex flex-col card p-10 w-full max-w-3xl gap-y-6 h-fit max-h-[98%]">
		<span>
			<h3 class="font-bold">Your Addresses</h3>
			<small class="text-surface-600-300-token"
				>Please choose where your product will be send :)</small
			>
		</span>

		{#if $isLoggedInStore}
			{#await handleLoadAddress()}
				<div class=" card space-y-2 h-fit">
					<p class="font-semibold text-lg border-l-4 pl-4 placeholder animate-pulse" />
					<div class="p-5 space-y-1">
						<p class="font-semibold text-xl placeholder animate-pulse" />
						<p class="text-sm placeholder animate-pulse" />
						<p class="text-sm placeholder animate-pulse" />
					</div>
				</div>
			{:then data}
				<span class="overflow-y-auto space-y-2">
					{#each data as address}
						<div class="card shadow-md py-2 flex flex-row items-center">
							<div class="basis-3/4">
								<p class="font-semibold text-lg border-l-4 pl-4">{address.label}</p>
								<div class="pl-5">
									<p class="font-semibold text-xl">{address.recipient_name}</p>
									<p class="text-sm">{address.phone_number}</p>
									<p class="text-sm">{address.full_address}</p>
								</div>
							</div>
							<button
								type="button"
								class="btn btn-sm variant-soft-primary basis-1/4 h-fit w-full mr-5 font-bold"
								disabled={isSettingDefaultLocation}
								on:click={() => handleLoginSetLocation(address.id)}>Select</button
							>
						</div>
					{/each}
				</span>
			{:catch error}
				<div class="card">
					<div class="flex flex-col items-center justify-center">
						<p class="text-center">You don't have any address yet</p>
						<!-- <button class="btn btn-primary">Add Address</button> -->
					</div>
				</div>
			{/await}
		{:else}
			<div class="card shadow-lg p-6">
				<div class="flex justify-between flex-row items-center">
					<span class="basis-3/4">
						<p class="font-bold text-lg">Login</p>
						<p class="text-sm">Log in first before choosing your address :)</p>
					</span>

					<a
						href="/login"
						class="btn btn-sm variant-soft-primary font-bold basis-2/5 h-fit"
						on:click={() => {
							modalStore.close();
						}}>Login</a
					>
				</div>
			</div>
		{/if}
		<hr class="!border-t-2" />
		<p class="font-bold">Want to add another destination?</p>
		{#if searchLocation}
			<div class="space-y-1 overflow-y-auto">
				{#await handleSearchLocation(searchLocation)}
					<div class="placeholder animate-pulse p-8" />
					<div class="placeholder animate-pulse p-8" />
					<div class="placeholder animate-pulse p-8" />
					<div class="placeholder animate-pulse p-8" />
					<div class="placeholder animate-pulse p-8" />
				{:then address}
					{#each address as items}
						<button
							class="card p-5 w-full text-start"
							type="button"
							on:click={() => {
								defaultLocationStore.set({ id: items.id, name: items.name });
								triggerToast('Address has been set', 'variant-filled-success');
								modalStore.close();
							}}><p>{items.name}</p></button
						>
					{/each}
				{:catch error}
					<p class="text-center">No address found</p>
				{/await}
			</div>
		{/if}
		<label class="label">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">
					<Search />
				</div>
				<input
					type="search"
					class="input placeholder:text-xs md:placeholder:text-base"
					bind:value={searchLocation}
					placeholder="Choose city, district or subdistrict"
				/>
			</div>
			<span class="text-xs">Press on the address to change your current address</span>
		</label>
	</div>
{/if}
