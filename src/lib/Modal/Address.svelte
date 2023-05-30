<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { isLoggedInStore } from '$lib/utils/stores';

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
				const data = await response.json();
				return data;
			}
		} else if (response.status == 200) {
			const data = await response.json();
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
</script>

<div class="flex flex-col card p-10 w-full max-w-3xl gap-y-6 h-fit max-h-[90%]">
	<span>
		<h4 class="font-bold">Your Addresses</h4>
		<small class="text-surface-600-300-token"
			>Please choose where your product will be send :)</small
		>
	</span>

	{#if $isLoggedInStore}
		{#await handleLoadAddress() then data}
			<span class="overflow-y-auto space-y-2">
				{#each data as address}
					<div class="card shadow-lg py-2">
						<p class="font-semibold text-lg border-l-4 pl-4">{address.label}</p>
						<div class="pl-5">
							<p class="font-semibold text-xl">{address.recipient_name}</p>
							<p class="text-sm">{address.phone_number}</p>
							<p class="text-sm">{address.full_address}</p>
						</div>
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
	{/if}
	<hr class="!border-t-2" />
	<h6 class="font-bold">Want to add another destination?</h6>
	<input type="search" class="input" bind:value={searchLocation} />
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
					<div class="card p-5"><p>{items.name}</p></div>
				{/each}
			{:catch error}
				<p class="text-center">No address found</p>
			{/await}
		</div>
	{/if}
</div>