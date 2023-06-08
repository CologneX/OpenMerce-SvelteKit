<script lang="ts">
	import { handleLoadAddress, handleLoginSetLocation } from '$lib/utils/address';
	import { getUserNames } from '$lib/utils/auth';
	import { Avatar, ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { FileButton } from '@skeletonlabs/skeleton';
	import type { Address } from '../../../app';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import { AddAddressModal } from '$lib/utils/modal';
	let tabSet: number = 0;
	let isSettingDefaultLocation: boolean = false;
	let searchAddress: string;
	let addressList: Address[];
	const handleGetAddressList = async () => {
		addressList = await handleLoadAddress();
	};

	let filteredData: any[] = [];

	$: {
		if (searchAddress) {
			filteredData = addressList.filter((address) => address.label.includes(searchAddress));
		} else {
			filteredData = addressList;
		}
	}
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
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>Personal Profile</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Address</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>Payment</Tab>

			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="p-4 md:p-6 flex flex-col md:flex-row gap-4">
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
									<button type="button" class="btn btn-sm block">Change</button>
								</div>
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Date of Birth</label>
									<input type="text" class="input w-fit shrink text-sm" />
									<button type="button" class="btn btn-sm">Change</button>
								</div>
								<div class="flex flex-row w-full items-center">
									<label for="first-name" class="text-sm w-1/4 flex-none">Gender</label>
									<select class="select w-48 border-2">
										<option value="Males">Male</option>
										<option value="Female">Female</option>
										<option value="Walmart">Walmart</option>
									</select>
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
								<span> Add Address</span></button
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
											<p class="font-semibold text-lg border-l-4 pl-4 border-primary-500">
												{address.label}
											</p>
											<div class="pl-5">
												<p class="font-semibold text-xl">{address.recipient_name}</p>
												<p class="text-sm">{address.phone_number}</p>
												<p class="text-sm">{address.full_address}</p>
											</div>
										</div>
										<button
											type="button"
											class="btn btn-sm variant-soft-primary basis-1/4 h-fit w-full mr-5 font-bold"
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
					</div>
				{:else if tabSet === 2}
					<div class="card p-4 m-4 drop-shadow-md">NOT YET IMPLEMENTED</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
