<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';
	import { Stepper, Step, ProgressRadial } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import type { Snapshot } from './$types';
	import Toast from '$lib/Toast.svelte';
	import Back from '$lib/icons/Back.svelte';
	import { DateInput } from 'date-picker-svelte';
	let date = new Date();

	// for toast
	function triggerToast(type: string, message: string) {
		const toast = new Toast({
			target: document.body,
			props: {
				messageText: message,
				type: type
			}
		});
		toast.triggerToast();
	}
	// -- end for toast

	interface FormValues {
		email: string;
		password: string;
		confirmPassword: string;
		firstname: string;
		lastname: string;
		pin: string;
	}

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
		firstname: '',
		lastname: '',
		pin: ''
	};

	const errors: FormErrors = {};

	const isValid = writable(false);

	function handleSubmit() {
		if ($isValid) {
			console.log(values);
		} else {
		}
	}

	let lockPassword: boolean = true;
	function validateConfirmPassword() {
		if (values.confirmPassword !== values.password) {
			errors.password = 'Passwords do not match';
			lockPassword = true;
		} else if (values.password.length < 8) {
			errors.confirmPassword = '';
			errors.password = 'Password must be at least 8 characters';
			lockPassword = true;
		} else {
			delete errors.password;
			lockPassword = false;
		}
	}

	let lockEmail: boolean = true;
	function validateEmail() {
		if (values.email === '') {
			errors.email = 'Email is required';
			lockEmail = true;
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Invalid email';
			lockEmail = true;
		} else {
			delete errors.email;
			lockEmail = false;
		}
	}
	let lockSubmit: boolean = false;

	async function sendEmail() {
		const res = await fetch('/api/v1/auth/register-1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: values.email })
		});
		if (res.ok) {
			triggerToast('success', 'An verification E-Mail has been sent!');
		} else {
			triggerToast('error', res.statusText);
		}
	}
	async function sendPin() {
		const res = await fetch('/api/v1/auth/register-1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: values.email, code: values.pin })
		});
		if (res.ok) {
			triggerToast('success', 'An verification E-Mail has been sent!');
		} else {
			triggerToast('error', res.statusText);
		}
	}
	let emailSent: boolean = false;
	let PINSent: boolean = false;
	let passwordSent: boolean = false;
	let nameSent: boolean = false;

	let processing: boolean = false;
	function onNextHandler(e: {
		detail: { step: number; state: { current: number; total: number } };
	}): void {
		console.log(e.detail.step);
		if (e.detail.step === 0 && !emailSent) {
			processing = true;
			sendEmail();
			emailSent = true;
			processing = false;
		}
	}

	let lockPIN: boolean = true;
	const sendPIN = async () => {
		const res = await fetch('/api/v1/auth/register-2', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: values.email, pin: values.pin })
		});
		if (res.ok) {
			triggerToast('success', 'PIN verified!');
			lockPIN = false;
		} else {
			triggerToast('error', res.statusText);
		}
	};
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
	<form class="w-full h-full md:h-fit max-w-3xl" on:submit|preventDefault>
		<div class="card p-4 gap-y-12 h-full w-full grid">
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
			</header>
			<section>
				<Stepper
					buttonFinishLabel="Register"
					buttonCompleteType="submit"
					buttonComplete="variant-ghost-primary"
					buttonNextLabel={processing ? 'Processing' : 'Next →'}
					on:complete={handleSubmit}
					on:next={onNextHandler}
				>
					<Step locked={lockEmail}>
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
					<Step locked={lockPassword}>
						<svelte:fragment slot="header">Password</svelte:fragment>
						<input
							class="input variant-form-material"
							type="password"
							name="password"
							placeholder="Password"
							bind:value={values.password}
							on:input={validateConfirmPassword}
						/>
						<input
							class="input variant-form-material"
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							bind:value={values.confirmPassword}
							on:input={validateConfirmPassword}
						/>
						{#if errors.password}<small class="text-error-500">{errors.password}</small>{/if}
					</Step>
					<Step locked={!values.firstname}>
						<svelte:fragment slot="header">Name</svelte:fragment>

						<div class="grid grid-cols-2 gap-4">
							<label class="label">
								<span>First Name</span>
								<input
									class="input variant-form-material"
									type="text"
									name="name"
									placeholder="Yves"
									bind:value={values.firstname}
								/>
							</label>

							<label class="label">
								<span>Last Name</span>
								<input
									class="input variant-form-material"
									type="text"
									name="name"
									title="Last Name"
									placeholder="Queen"
									bind:value={values.lastname}
								/>
							</label>
						</div>
						<DateInput bind:value={date} class="input variant-form-material bg-current" />

						<div class="flex space-x-2">
							<span class="font-semibold">Gender</span>
							<label class="flex items-center space-x-2">
								<input class="radio" type="radio" checked name="radio-direct" value="male" />
								<p>Male</p>
							</label>
							<label class="flex items-center space-x-2">
								<input class="radio" type="radio" name="radio-direct" value="female" />
								<p>Female</p>
							</label>
							<label class="flex items-center space-x-2">
								<input class="radio" type="radio" name="radio-direct" value="walmart bag" />
								<p>Walmart Bag</p>
							</label>
						</div>

						{#if errors.name}<small class="text-error-500">{errors.name}</small>{/if}
					</Step>
					<Step locked={!lockSubmit}>
						<svelte:fragment slot="header">Register Confirmation</svelte:fragment>
						<p>Are you sure you want to register?</p>
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={lockSubmit} />
							<p>*I Agree with the Terms & Condition</p>
						</label>
						<a href="t&c">Terms & Condition</a>
					</Step>
				</Stepper>
			</section>
		</div>
	</form>
</div>
