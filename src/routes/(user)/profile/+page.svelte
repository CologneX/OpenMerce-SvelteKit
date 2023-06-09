<script lang="ts">
	import { handleLoadAddress, handleLoginSetLocation } from '$lib/utils/address';
	import { getUserNames } from '$lib/utils/auth';
	import { Avatar, ProgressRadial, modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { FileButton } from '@skeletonlabs/skeleton';
	import type { AddressType, GetProfile } from '../../../app';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import { AddAddressModal, ChangePasswordModal } from '$lib/utils/modal';
	import Trash from '$lib/icons/Trash.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';
	import PencilSquare from '$lib/icons/PencilSquare.svelte';
	let tabSet: number = 0;
	let isSettingDefaultLocation: boolean = false;
	let searchAddress: string;
	let addressList: AddressType[];
	const handleGetAddressList = async () => {
		addressList = await handleLoadAddress();
	};

	let filteredData: any[] = [];

	$: {
		if (searchAddress) {
			filteredData = addressList.filter((address) =>
				address.label.toLowerCase().includes(searchAddress.toLowerCase())
			);
		} else {
			filteredData = addressList;
		}
	}

	const handleDeleteAddress = async (addressID: string) => {
		const response = await fetch(`/api/v1/customer/address?id=${addressID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch(`/api/v1/customer/address?id=${addressID}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				await handleGetAddressList();
				triggerToast('Successfully deleted address', 'variant-filled-success');
			} else {
				triggerToast('Failed to delete address', 'variant-filled-error');
			}
		} else if (response.ok) {
			await handleGetAddressList();
			triggerToast('Successfully deleted address', 'variant-filled-success');
		} else {
			triggerToast('Failed to delete address', 'variant-filled-error');
		}
	};

	let GetProfile: GetProfile;
	const handleGetProfile = async () => {
		const response = await fetch('/api/v1/customer/profile', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/customer/profile', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				GetProfile = await response.json();
				fullName = `${GetProfile.first_name} ${GetProfile.last_name}`;
			} else {
				triggerToast('Failed to get profile', 'variant-filled-error');
			}
		} else if (response.ok) {
			GetProfile = await response.json();
			fullName = `${GetProfile.first_name} ${GetProfile.last_name}`;
		} else {
			triggerToast('Failed to get profile', 'variant-filled-error');
		}
	};

	let fullName: string;
	const handlePatchProfile = async () => {
		const [firstName, lastName] = fullName.split(' ');
		const birthDateRFC3339 = new Date(GetProfile.birth_date).toISOString();

		const response = await fetch('/api/v1/customer/profile', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: GetProfile.email,
				phone_number: GetProfile.phone_number,
				birth_date: birthDateRFC3339,
				gender: GetProfile.gender
			})
		});

		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/customer/profile', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					first_name: firstName,
					last_name: lastName,
					email: GetProfile.email,
					phone_number: GetProfile.phone_number,
					birth_date: birthDateRFC3339,
					gender: GetProfile.gender
				})
			});
			if (response.ok) {
				await handleGetProfile();
				localStorage.setItem('first_name', GetProfile.first_name);
				localStorage.setItem('last_name', GetProfile.last_name);
				triggerToast('Successfully updated profile', 'variant-filled-success');
			} else {
				triggerToast('Failed to update profile', 'variant-filled-error');
			}
		} else if (response.ok) {
			await handleGetProfile();
			localStorage.setItem('first_name', GetProfile.first_name);
			localStorage.setItem('last_name', GetProfile.last_name);
			triggerToast('Successfully updated profile', 'variant-filled-success');
		} else {
			triggerToast('Failed to update profile', 'variant-filled-error');
		}
	};

	const handleOpenEditAddressModal = async (addressID: string) => {
		const EditAddressModal: ModalSettings = {
			type: 'component',
			component: 'EditAddress',
			meta: {
				addressID: addressID
			}
		};
		modalStore.trigger(EditAddressModal);
	};
</script>

<svelte:head>
	<title>Profile | OpenMerce</title>
</svelte:head>
<div class="p-4 md:p-6 flex flex-col md:flex-row gap-4 h-full">
	<div class="rounded-md card drop-shadow-lg w-full md:w-56 flex-initial">
		<div class="m-2 space-y-2">
			<div class="flex items-center">
				<Avatar initials="{getUserNames()[0]} {getUserNames()[1]}" />
				<div class="font-semibold">&nbsp; {getUserNames()[0]} {getUserNames()[1]}</div>
			</div>
			<hr class="!border -mx-2" />
			<div class="card p-2 drop-shadow-md border dark:border-primary-500">
				<div class="font-bold text-primary-500">OMPLUS</div>
				<p class="text-sm">Cheaper delivery, just for you!</p>
				<p class="text-xs">
					Subscription starts from <span class="font-semibold"> Rp 29.999/month</span>
				</p>
			</div>
		</div>
	</div>
	<div class="rounded-md card drop-shadow-lg w-full">
		<TabGroup active="border-b-2 border-primary-500">
			<Tab bind:group={tabSet} name="tab1" value={0}>Personal Profile</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Address</Tab>

			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="p-4 md:p-6 flex flex-col md:flex-row gap-4">
						<div class="space-y-4">
							<div class="card p-4 drop-shadow-md w-full md:w-56 flex-initial space-y-2">
								<img src="placeholder.png" alt="profile" title="profile photo" class="m-auto" />
								<FileButton
									name="files"
									button=" variant-ringed-primary"
									width="w-full"
									class="font-semibold text-primary-500"
								/>
								<p class="text-xs">
									File size: 10,000,000 bytes (10 Megabytes) maximum. Allowed file extensions: .JPG
									.JPEG .PNG
								</p>
							</div>
							<button
								class="btn variant-filled-primary w-full font-semibold"
								on:click={() => {
									modalStore.trigger(ChangePasswordModal);
								}}>Change Password</button
							>
						</div>
						<div class="w-full p-4 space-y-4">
							<h5 class="font-semibold">Change Profile</h5>
							{#await handleGetProfile() then}
								<div class="flex flex-col gap-4">
									<div class="flex flex-row w-full items-center">
										<label for="first-name" class="text-sm w-1/4 flex-none">Full Name</label>
										<input type="text" class="input w-44 shrink text-sm" bind:value={fullName} />
									</div>
									<div class="flex flex-row w-full items-center">
										<label for="first-name" class="text-sm w-1/4 flex-none">Date of Birth</label>
										<input
											type="date"
											class="input w-44 text-sm"
											bind:value={GetProfile.birth_date}
										/>
									</div>
									<div class="flex flex-row w-full items-center">
										<label for="first-name" class="text-sm w-1/4 flex-none">Gender</label>
										<select class="select w-44 border-2 text-sm" bind:value={GetProfile.gender}>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
								</div>
								<h5 class="font-semibold">Change Contact</h5>
								<div class="flex flex-col gap-4">
									<div class="flex flex-row w-full items-center">
										<label for="first-name" class="text-sm w-1/4 flex-none">Email</label>
										<input type="email" class="input w-44 text-sm" bind:value={GetProfile.email} />
									</div>
									<div class="flex flex-row w-full items-center">
										<label for="first-name" class="text-sm w-1/4 flex-none"
											>Phone Number
											<!-- {#if !GetProfile.phone_number}
												<span class="badge variant-ghost-warning">Not Verivied</span>
											{/if
											} -->
										</label>
										<input
											type="text"
											class="input w-44 shrink text-sm"
											bind:value={GetProfile.phone_number}
										/>
									</div>
								</div>
								<button
									class="btn variant-filled-primary w-full md:w-1/2 font-semibold"
									on:click={handlePatchProfile}>Save Changes</button
								>
							{/await}
						</div>
					</div>
				{:else if tabSet === 1}
					<!-- <div class="p-4 md:p-6 flex flex-col md:flex-row gap-4">
						<div class="space-y-4">
							<div class="card p-4 drop-shadow-md w-full md:w-56 flex-initial space-y-2">
								<img src="placeholder.png" alt="profile" title="profile photo" />
								<FileButton
									name="files"
									button=" variant-ringed-primary"
									width="w-full"
									class="font-semibold text-primary-500"
								/>
								<p class="text-xs">
									File size: 10,000,000 bytes (10 Megabytes) maximum. Allowed file extensions: .JPG
									.JPEG .PNG
								</p>
							</div>
							<button class="btn variant-filled-primary w-full font-semibold"
								>Change Password</button
							>
						</div>
						<div class="w-full p-4 space-y-4">
							<h5 class="font-semibold">Change Profile</h5>
							<div class="flex flex-col gap-4">
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Full Name</label>
									<input
										type="text"
										class="input w-fit shrink text-sm"
										value="{getUserNames()[0]} {getUserNames()[1]}"
									/>
									<button type="button" class="btn btn-sm">Change</button>
								</div>
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Date of Birth</label>
									<input type="text" class="input w-fit shrink text-sm" />
									<button type="button" class="btn btn-sm">Change</button>
								</div>
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Gender</label>
									<input type="text" class="input w-fit shrink text-sm" />
									<button type="button" class="btn btn-sm">Change</button>
								</div>
							</div>
							<h5 class="font-semibold">Change Contact</h5>
							<div class="flex flex-col gap-4">
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Email</label>
									<input type="email" class="input w-fit shrink text-sm" />
									<button type="button" class="btn btn-sm">Change</button>
								</div>
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Phone Number</label>
									<input type="text" class="input w-fit shrink text-sm" />
									<button type="button" class="btn btn-sm">Change</button>
								</div>
							</div>
						</div>
					</div> -->
					<div class="p-4 md:p-6 flex flex-col gap-4">
						<div class="flex gap-2">
							<input
								type="text"
								class="input w-full"
								placeholder="Search address"
								bind:value={searchAddress}
							/>
							<button
								class="btn variant-filled-primary font-semibold"
								on:click={() => modalStore.trigger(AddAddressModal)}
							>
								<span> <PlusSmall /></span>
								<span>Add Address</span></button
							>
						</div>
						{#await handleGetAddressList()}
							<div class=" card drop-shadow-md space-y-2 h-fit">
								<p
									class="font-semibold text-lg border-l-4 pl-4 placeholder animate-pulse border-primary-500"
								/>
								<div class="p-5 space-y-1">
									<p class="font-semibold text-xl placeholder animate-pulse" />
									<p class="text-sm placeholder animate-pulse" />
									<p class="text-sm placeholder animate-pulse" />
								</div>
							</div>
						{:then}
							<span class="overflow-y-auto space-y-2">
								{#each filteredData as address}
									<div class="card drop-shadow-md py-2 flex flex-row items-center">
										<div class="basis-3/4">
											<p
												class="font-semibold text-base md:text-xl border-l-4 pl-4 border-primary-500"
											>
												{address.label}
											</p>
											<div class="pl-5">
												<p class="font-semibold text-base md:text-xl">{address.recipient_name}</p>
												<p class="text-xs md:text-sm">{address.phone_number}</p>
												<p class="text-xs md:text-sm">{address.full_address}</p>
											</div>
										</div>
										<div class="flex items-center space-x-2">
											<button
												type="button"
												class="btn btn-sm variant-soft-primary w-fit font-bold"
												on:click={async () => {
													isSettingDefaultLocation = true;
													await handleLoginSetLocation(address.id);
													isSettingDefaultLocation = false;
												}}
											>
												{#if isSettingDefaultLocation}
													<span><ProgressRadial width="w-5" /></span>
												{/if}
												<span>Select</span>
											</button>
											<button
												class="btn btn-sm variant-soft-warning w-fit mr-4 md:mr-0 font-bold"
												on:click|preventDefault={() => handleDeleteAddress(address.id)}
											>
												<span><Trash /></span>
											</button>
											<button
												class="btn btn-sm variant-soft-warning w-fit mr-4 md:mr-0 font-bold"
												on:click|preventDefault={() => handleOpenEditAddressModal(address.id)}
											>
												<span>
													<span><PencilSquare /> </span>
												</span>
											</button>
										</div>
									</div>
								{/each}
							</span>
							{#if filteredData.length == 0}
								<div class="border border-primary-500 h-full w-full p-4 rounded-md">
									<h2 class="text-center">You don't have any address yet</h2>
								</div>
							{/if}
						{/await}
					</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
