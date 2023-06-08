<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import { Stepper, Step, ProgressRadial } from '@skeletonlabs/skeleton';
	import { triggerToast } from '$lib/utils/toast';
	import { goto } from '$app/navigation';

	interface FormValues {
		email: string;
		password: string;
		confirmPassword: string;
		firstname: string;
		lastname: string;
		pin: string;
		birth_date: string;
		gender: string;
	}
	interface FormErrors {
		email?: string;
		password?: string;
		confirmPassword?: string;
		name?: string;
		pin?: string;
	}
	interface FormLock {
		email: boolean;
		password: boolean;
		confirmPassword: boolean;
		name: boolean;
		pin: boolean;
	}
	const values: FormValues = {
		email: '',
		password: '',
		confirmPassword: '',
		firstname: '',
		lastname: '',
		pin: '',
		birth_date: '',
		gender: 'male' //default
	};
	const errors: FormErrors = {};

	const lock: FormLock = {
		email: true,
		password: true,
		confirmPassword: true,
		name: true,
		pin: true
	};

	$: if (values.password !== values.confirmPassword) {
		lock.password = true;
		errors.password = 'Passwords do not match';
	} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/.test(values.password)) {
		lock.password = true;
		errors.password =
			'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
	} else {
		lock.password = false;
		delete errors.password;
	}

	function validatePin() {
		if (values.pin === '') {
			errors.pin = 'PIN is required';
		} else {
			delete errors.pin;
		}
	}

	function validateEmail() {
		if (values.email === '') {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Enter invalid email!';
		} else {
			delete errors.email;
		}
	}

	const validateName = () => {
		if (values.firstname === '') {
			errors.name = 'First Name is required';
		} else if (values.lastname === '') {
			errors.name = 'Last Name is required';
		} else {
			delete errors.name;
		}
	};

	let lockSubmit: boolean = false;
	async function sendEmail() {
		processing = true;
		const res = await fetch('/api/v1/auth/register-1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: values.email })
		});
		if (res.ok) {
			lock.email = false;
			triggerToast('An verification E-Mail has been sent!', 'variant-filled-success');
		} else if (res.status === 409) {
			const data = await res.json();
			errors.email = data.error;
			triggerToast(data.error, 'variant-filled-error');
		}
		processing = false;
	}

	async function sendPin() {
		processing = true;
		const res = await fetch('/api/v1/auth/register-2', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: values.email, code: Number(values.pin) })
		});
		if (res.ok) {
			lock.pin = false;
		} else {
			const data = await res.json();
			errors.pin = data.error;
			triggerToast(data.error, 'variant-filled-error');
		}
		processing = false;
	}

	const handlePostRegisterThird = async () => {
		processing = true;
		const response = await fetch('/api/v1/auth/register-3', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password,
				first_name: values.firstname,
				last_name: values.lastname,
				birth_date: birthDateRFC3339,
				gender: values.gender
			})
		});
		if (response.ok) {
			triggerToast('Successfully registered!', 'variant-filled-success');
			goto('/login');
		} else {
			const data = await response.json();
			triggerToast(data.error, 'variant-filled-error');
		}
		processing = false;
	};
	let processing: boolean = false;
	let birthDateRFC3339 = '';

	$: {
		if (values.birth_date) {
			const date = new Date(values.birth_date);
			birthDateRFC3339 = date.toISOString();
		} else {
			birthDateRFC3339 = '';
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
<div class="flex justify-center h-full w-full">
	<div class="w-full h-fit max-w-xs">
		<div class="h-14" />
		<span class="flex justify-center"><Logo height="8" /></span>
		<div class="h-14" />
		<div class=" border border-primary-500 h-full card p-4">
			<Stepper
				buttonComplete="variant-ghost-primary"
				buttonNextLabel={processing ? 'Processing' : 'Next →'}
			>
				<Step locked={lock.email}>
					<svelte:fragment slot="header">E-mail</svelte:fragment>

					<input
						class="input variant-form-material"
						type="email"
						name="email"
						placeholder="example@email.com"
						bind:value={values.email}
						on:input={validateEmail}
						on:change={validateEmail}
					/>
					{#if errors.email}<small class="text-error-500">{errors.email}</small>{/if}
					<button
						class="btn w-full variant-soft-primary font-semibold"
						on:click={sendEmail}
						disabled={errors.email != undefined || values.email == ''}
					>
						{#if processing}
							<span><ProgressRadial width="w-6" /></span>
						{/if}
						<span> Confirm </span>
					</button>
					<hr class=" my-4" />
				</Step>
				<Step locked={lock.pin}>
					<svelte:fragment slot="header">PIN</svelte:fragment>
					<span>Enter the verification PIN that we have sent to your E-Mail</span>
					<input
						class="input text-center text-xl"
						type="text"
						placeholder="Enter your PIN here"
						bind:value={values.pin}
						on:keypress={(e) => {
							if (e.key.match(/[^0-9]/g)) {
								e.preventDefault();
							}
						}}
						on:input={validatePin}
						on:change={validatePin}
					/>
					{#if errors.pin}<small class="text-error-500">{errors.pin}</small>{/if}
					<button
						class="btn w-full variant-soft-primary font-semibold"
						on:click={sendPin}
						disabled={errors.pin != undefined || values.pin == ''}
					>
						{#if processing}
							<span><ProgressRadial width="w-6" /></span>
						{/if}
						<span> Confirm </span>
					</button>
					<hr class="my-4" />
				</Step>
				<Step locked={lock.password}>
					<svelte:fragment slot="header">Password</svelte:fragment>
					<input
						class="input"
						type="password"
						placeholder="Password"
						bind:value={values.password}
					/>
					<input
						class="input"
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						bind:value={values.confirmPassword}
					/>
					{#if errors.password}<small class="text-error-500">{errors.password}</small>{/if}
					<hr class=" my-4" />
				</Step>
				<Step locked={lock.password && lock.confirmPassword && lockSubmit}>
					<svelte:fragment slot="header">Name</svelte:fragment>
					<div class="grid grid-cols-2 gap-4">
						<label class="label">
							<span>First Name</span>
							<input
								class="input"
								type="text"
								placeholder="Yves"
								bind:value={values.firstname}
								on:change={validateName}
								on:input={validateName}
							/>
						</label>

						<label class="label">
							<span>Last Name</span>
							<input
								class="input"
								type="text"
								title="Last Name"
								placeholder="Queen"
								bind:value={values.lastname}
								on:change={validateName}
								on:input={validateName}
							/>
						</label>
					</div>
					<input type="date" class="input w-full" bind:value={values.birth_date} />
					<div class="flex space-x-2">
						<span class="font-semibold">Gender</span>
						<label class="flex items-center space-x-2">
							<input class="radio" type="radio" value="male" bind:group={values.gender} />
							<p>Male</p>
						</label>
						<label class="flex items-center space-x-2">
							<input class="radio" type="radio" value="female" bind:group={values.gender} />
							<p>Female</p>
						</label>
					</div>

					<p>Are you sure you want to register?</p>
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:checked={lockSubmit} />
						<p>*I Agree with the Terms & Condition</p>
					</label>
					<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Terms & Condition</a>
					{#if errors.name}<small class="text-error-500">{errors.name}</small>{/if}
					<button
						class="btn w-full variant-soft-primary font-semibold"
						on:click={handlePostRegisterThird}
						disabled={errors.name != undefined ||
							lockSubmit == false ||
							(values.firstname == '' && values.lastname == '') ||
							values.birth_date == null}
					>
						{#if processing}
							<span><ProgressRadial width="w-6" /></span>
						{/if}
						<span> Confirm </span>
					</button>
					<hr class=" my-4" />
				</Step>
			</Stepper>
		</div>
	</div>
</div>
