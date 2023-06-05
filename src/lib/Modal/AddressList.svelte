<script lang="ts">
	import { isLoggedInStore } from '$lib/utils/stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { handleLoadAddress, handleLoginSetLocation } from '$lib/utils/address';
	import { AddAddressModal } from '$lib/utils/modal';
	let isSettingDefaultLocation: boolean = false;
</script>

{#if $modalStore[0]}
	<div class="flex flex-col card p-10 w-full max-w-3xl gap-y-6 h-fit max-h-[98%]">
		<span>
			<h3 class="font-bold">Your Addresses</h3>
			<small class="text-surface-600-300-token"
				>Please choose where your product will be sent :)</small
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
		<button
			class="btn variant-soft-primary font-bold"
			on:click={() => {
				modalStore.close();
				modalStore.trigger(AddAddressModal);
			}}>Add new address</button
		>
	</div>
{/if}
