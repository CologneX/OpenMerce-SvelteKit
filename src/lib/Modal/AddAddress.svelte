<script lang="ts">
	import { ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import type { AddAddress } from '../../app';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';

	let AddAddressValue: AddAddress = {
		recipient_name: '',
		phone_number: '',
		label: '',
		full_address: '',
		postal_code: '',
		note: '',
		shipping_area: 0
	};

	let isSavingAddress: boolean = false;
	const handlePostAddAddress = async () => {
		isSavingAddress = true;
		const response = await fetch(`/api/v1/customer/address`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(AddAddressValue)
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch(`/api/v1/customer/address`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(AddAddressValue)
			});
			if (response.ok) {
				triggerToast('Address added successfully', 'variant-filled-primary');
				modalStore.close();
			}
			if (response.status === 409) {
				const data = await response.json();
				triggerToast(data.message, 'variant-filled-error');
			} else if (response.status === 400) {
				triggerToast('Fill all the info!', 'variant-filled-error');
			}
		} else if (response.ok) {
			triggerToast('Address added successfully', 'variant-filled-primary');
			modalStore.close();
		}
		if (response.status === 409) {
			const data = await response.json();
			triggerToast(data.message, 'variant-filled-error');
		} else if (response.status === 400) {
			triggerToast('Fill all the info!', 'variant-filled-error');
		}
		isSavingAddress = false;
	};
	let timeoutId: ReturnType<typeof setTimeout>;
	let searchLocation: string = '';
	let closeSearch: boolean = false;
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

{#if $modalStore[0]}
	<div class="card w-full max-w-3xl h-full border border-black max-h-[98%] overflow-y-auto">
		<div class=" px-10 py-6">
			<div class="font-bold text-xl sticky top-0">Add Address</div>
			<div class="h-6" />
			<hr class="-mx-10" />
			<div class="h-6" />
			<label class="label">
				<span class="text-sm"
					>Recipient Name <span class="badge variant-soft">Required</span>
				</span>
				<input
					type="text"
					placeholder="Name"
					class="input"
					bind:value={AddAddressValue.recipient_name}
					required
				/>
			</label>
			<div class="h-4" />
			<label class="label">
				<span class="text-sm">Phone Number <span class="badge variant-soft">Required</span> </span>
				<input
					type="text"
					placeholder="Phone/Mobile number"
					required
					class="input"
					bind:value={AddAddressValue.phone_number}
				/>
			</label>
		</div>
		<hr class="!border-t-8" />
		<div class="px-10 py-6">
			<label class="label">
				<span class="text-sm">Address Label </span>
				<input
					type="text"
					placeholder="Label your address"
					required
					class="input"
					bind:value={AddAddressValue.label}
				/>
			</label>
			<div class="h-4" />
			<label class="label">
				<span class="text-sm"
					>City & Subdistrict <span class="badge variant-soft">Required</span>
				</span>
				<textarea
					placeholder="City & Subdistrict"
					class="input resize-y"
					required
					bind:value={searchLocation}
					on:focus={() => {
						closeSearch = false;
					}}
				/>
			</label>
			{#if searchLocation && !closeSearch}
				<div class="card p-4">
					{#await handleSearchLocation(searchLocation)}
						<div class="space-y-2">
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse w-1/2" />
							<hr class="!border-t-2" />
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse w-1/2" />
						</div>
					{:then data}
						<div class="space-y-2">
							{#each data as location}
								<button
									type="button"
									class="text-start"
									on:click={() => {
										AddAddressValue.shipping_area = location.id;
										searchLocation = location.name;
										closeSearch = true;
									}}>{location.name}</button
								>
								<hr class="last:hidden !border-t-2" />
							{/each}
						</div>
					{/await}
				</div>
			{/if}
			<div class="h-4" />

			<label class="label">
				<span class="text-sm">Full Address <span class="badge variant-soft">Required</span> </span>
				<input
					type="text"
					placeholder="Your full, detailed address"
					required
					class="input"
					bind:value={AddAddressValue.full_address}
				/>
			</label>
			<div class="h-4" />
			<label class="label">
				<span class="text-sm">Postal Code <span class="badge variant-soft">Required</span> </span>
				<input
					type="text"
					placeholder="Your postal code"
					required
					class="input"
					bind:value={AddAddressValue.postal_code}
				/>
			</label>
			<div class="h-4" />
			<label class="label">
				<span class="text-sm">Note</span>
				<input
					type="text"
					placeholder="Note to the courier"
					required
					class="input"
					bind:value={AddAddressValue.note}
				/>
			</label>

			<button
				class="btn w-full variant-soft-primary font-bold mt-6"
				disabled={isSavingAddress}
				on:click={handlePostAddAddress}
			>
				{#if isSavingAddress}
					<span><ProgressRadial width="w-6 " /></span>
				{/if}

				<span>Save Address</span>
			</button>
		</div>
	</div>
{/if}
