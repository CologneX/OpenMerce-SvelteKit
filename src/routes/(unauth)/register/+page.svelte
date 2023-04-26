<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import type { Snapshot } from './$types';

	interface FormValues {
		email: string;
		password: string;
		confirmPassword: string;
		name: string;
		pin: string;
	}

	export const snapshot: Snapshot<FormValues> = {
		capture: () => values,
		restore: (data: FormValues) => {
			values.email = data.email;
			values.name = data.name;
		}
	};

	interface FormErrors {
		email?: string;
		password?: string;
		confirmPassword?: string;
		name?: string;
		pin?: string;
	}

	const values: FormValues = {
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		pin: ''
	};

	const errors: FormErrors = {};

	const isValid = writable(false);

	function handleSubmit() {
		if ($isValid) {
			console.log(values);
		} else {
			// display error message
		}
	}

	function validateEmail() {
		if (values.email === '') {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Invalid email';
		} else {
			delete errors.email;
		}
	}

	function validatePassword() {
		if (values.password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		} else {
			delete errors.password;
		}
	}

	function validateConfirmPassword() {
		if (values.confirmPassword !== values.password) {
			errors.confirmPassword = 'Passwords do not match';
		} else {
			delete errors.confirmPassword;
		}
	}
</script>

<svelte:head>
	<title>OpenMerce | Register</title>
	<meta name="description" content="OpenMerce Register" />
	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Register, Register"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<div class="flex items-center justify-center h-full w-full">
	<form class="w-full h-full md:h-fit max-w-3xl">
		<div class="card p-4 gap-y-12 h-full w-full grid">
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
			</header>
			<section>
				<Stepper
					buttonFinishLabel="Register"
					buttonCompleteType="submit"
					buttonComplete="variant-ghost-primary"
					on:complete={handleSubmit}
				>
					<Step locked={values.email == '' || errors.email ? true : false}>
						<svelte:fragment slot="header">E-mail</svelte:fragment>
						<input
							class="input variant-form-material"
							type="email"
							name="email"
							placeholder="example@email.com"
							bind:value={values.email}
							on:input={validateEmail}
						/>
						{#if errors.email}<small class="text-error-500" transition:fade={{ duration: 500 }}
								>{errors.email}</small
							>{/if}
						<hr class="!border-t-2 !border-current" />
						<div class="grid grid-rows-1">
							<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
								<button class="btn variant-ghost-primary">
									<span><Google /></span>
									<span>Google</span>
								</button>
								<button class="btn variant-ghost-primary">
									<span><Facebook /></span>
									<span>Facebook</span>
								</button>
							</div>
						</div>
					</Step>
					<Step>
						<svelte:fragment slot="header">PIN</svelte:fragment>
						<span>Enter the verification PIN that we have sent to your E-Mail</span>
						<input
							class="input variant-form-material text-center text-xl"
							type="text"
							name="pin"
							maxlength="6"
							placeholder="123456"
							bind:value={values.pin}
						/>
						{#if errors.pin}<small class="text-error-500">{errors.pin}</small>{/if}
					</Step>
					<Step locked={!errors.password && !errors.confirmPassword}>
						<svelte:fragment slot="header">Password</svelte:fragment>
						<input
							class="input variant-form-material"
							type="password"
							name="password"
							placeholder="Password"
							bind:value={values.password}
							on:input={validatePassword}
						/>
						<input
							class="input variant-form-material"
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							bind:value={values.confirmPassword}
							on:input={validateConfirmPassword}
						/>
						{#if errors.password}<small class="text-error-500">{errors.password}</small>{/if}<br />
						{#if errors.confirmPassword}<small class="text-error-500"
								>{errors.confirmPassword}</small
							>{/if}
					</Step>
					<Step locked={!values.name}>
						<svelte:fragment slot="header">Name</svelte:fragment>
						<input
							class="input variant-form-material"
							type="text"
							name="name"
							placeholder="John Doe"
							bind:value={values.name}
						/>
						{#if errors.name}<small class="text-error-500">{errors.name}</small>{/if}
					</Step>
					<Step>
						<svelte:fragment slot="header">Confirm Register?</svelte:fragment>
					</Step>
				</Stepper>
			</section>
		</div>
	</form>
</div>
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
