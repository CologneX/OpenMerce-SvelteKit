<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let lockEmail: boolean = true;
	let lockName: boolean = true;
	let lockPassword: boolean = true;

	// Client API:
	const { form, errors, enhance, delayed, restore, capture } = superForm(data.form, {
		applyAction: true,
		invalidateAll: true,
		resetForm: false
	});
	export const snapshot = { capture, restore };

	form.subscribe((form) => {
		if (form.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
			lockEmail = false;
		} else lockEmail = true;
		if (form.name) {
			lockName = false;
		} else lockName = true;
		if (
			form.password &&
			form.confirmPassword &&
			form.password === form.confirmPassword &&
			form.password.length > 5
		) {
			lockPassword = false;
		} else lockPassword = true;
	});
	function storeInput(data: any) {
		console.log(data);
	}
</script>

<title>OpenMerce | Register</title>
<div class="flex justify-center items-center h-full w-full">
	<form use:enhance method="POST">
		<div class="block card p-4 w-screen max-w-xl">
			<div class="flex justify-center items-center mb-4">
				<Logo />
			</div>
			<Stepper
				buttonFinishLabel="Register"
				buttonCompleteType="submit"
				on:complete={() => storeInput($form)}
				buttonComplete="variant-ghost-primary"
			>
				<Step locked={lockEmail}>
					<svelte:fragment slot="header">E-mail</svelte:fragment>

					<input
						class="input"
						type="text"
						name="email"
						placeholder="example@email.com"
						bind:value={$form.email}
						data-invalid={$errors.email}
					/>
				</Step>
				<Step locked={lockPassword}>
					<svelte:fragment slot="header">Password</svelte:fragment>
					<input
						class="input"
						type="password"
						name="password"
						placeholder="Password"
						bind:value={$form.password}
						data-invalid={$errors.password}
					/>
					<input
						class="input"
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						bind:value={$form.confirmPassword}
						data-invalid={$errors.confirmPassword}
					/>
					{#if $form.password !== $form.confirmPassword}<small class="text-red-500"
							>Passwords do not match</small
						>
					{:else if $form.password.length < 6}<small class="text-red-500"
							>Your password must be at least 6 characters long</small
						>{/if}
				</Step>
				<Step locked={lockName}>
					<svelte:fragment slot="header">Name</svelte:fragment>
					<input
						class="input"
						type="text"
						name="name"
						placeholder="John Doe"
						bind:value={$form.name}
						data-invalid={$errors.name}
					/>
				</Step>
				<Step>
					<svelte:fragment slot="header">Confirm Register?</svelte:fragment>
					{#if $errors.email}<small class="text-red-500">E-mail must be </small>{/if}
					<br />
					{#if $errors.name}<small class="text-red-500">{$errors.name}</small>{/if}
					<br />
					{#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if}
					<br />
					{#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if}
				</Step>
			</Stepper>
			<SuperDebug data={$form} />
			<!-- <header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<h2>Register</h2>
			</header> -->
			<!-- <footer class="p-4 space-y-3">
				<div class="flex justify-center">OR</div>
				<button class="btn variant-ghost w-full" type="button">Google <Google /></button>
				<button class="btn variant-ghost w-full" type="button">Facebook <Facebook /></button>
			</footer>
			<section class="p-4">
				<label class="label">
					<label for="name">Name</label>
					<input
						class="input"
						type="text"
						name="name"
						bind:value={$form.name}
						data-invalid={$errors.name}
					/>
					{#if $errors.name}<small class="text-red-500">{$errors.name}</small>{/if}
					<label for="email">E-Mail</label>
					<input
						class="input"
						type="text"
						name="email"
						bind:value={$form.email}
						data-invalid={$errors.email}
					/>
					{#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if}
					<label for="password">Password</label>
					<input
						class="input"
						type="password"
						name="password"
						bind:value={$form.password}
						data-invalid={$errors.password}
					/>
					{#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if}
					<label for="confirmPassword">Confirm Password</label>
					<input
						class="input"
						type="password"
						name="confirmPassword"
						bind:value={$form.confirmPassword}
						data-invalid={$errors.confirmPassword}
					/>
					{#if $errors.confirmPassword}<small class="text-red-500">{$errors.confirmPassword}</small
						>{/if}
				</label>
			</section>
			<div class="divide-y-2 space-y-3 divide-current grid">
				{#if $delayed}
					<button class="btn variant-ghost-primary w-full" disabled>Registering..</button>
				{:else}
					<button class="btn variant-ghost-primary w-full" type="submit">Register</button>
				{/if}
			</div> -->
		</div>
	</form>
</div>
