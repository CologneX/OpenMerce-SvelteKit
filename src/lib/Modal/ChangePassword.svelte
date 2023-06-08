<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';
	import { modalStore } from '@skeletonlabs/skeleton';
	let old_password: string;
	let new_password: string;
	const HandleChangePassword = async () => {
		const response = await fetch(`/api/v1/customer/creds`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				old_password: old_password,
				new_password: new_password
			})
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch(`/api/v1/customer/creds`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					old_password: old_password,
					new_password: new_password
				})
			});
			if (response.ok) {
				triggerToast('Change password success!', 'variant-filled-success');
				modalStore.close();
			} else {
				triggerToast(response.statusText, 'variant-filled-warning');
			}
		}
		if (response.ok) {
			triggerToast('Change password success!', 'variant-filled-success');
			modalStore.close();
		} else {
			triggerToast(response.statusText, 'variant-filled-warning');
		}
	};
</script>

{#if $modalStore[0]}
	<div class="w-modal p-4 md:p-6 card">
		<h4 class="font-bold">Change Password</h4>
		<div class="h-4 md:h-6" />
		<hr class="-mx-4 md:-mx-6" />
		<div class="h-4 md:h-6" />
		<label class="label">
			<span class="text-sm">Old Password</span>
			<input
				type="password"
				placeholder="Your old password here"
				class="input"
				required
				bind:value={old_password}
			/>
		</label>
		<label class="label">
			<span class="text-sm">New Password</span>
			<input
				type="password"
				placeholder="Your new password here"
				class="input"
				required
				bind:value={new_password}
			/>
		</label>
		<div class="text-end mt-4 md:mt-6">
			<button
				type="button"
				class="btn btn-sm variant-filled-primary"
				on:click={HandleChangePassword}>Save Password</button
			>
		</div>
	</div>
{/if}
