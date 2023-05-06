<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';
	import type { Snapshot } from './$types';
	import Toast from '$lib/Toast.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

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
	}

	const form: FormValues = {
		email: '',
		password: ''
	};

	export const snapshot: Snapshot<FormValues> = {
		capture: () => form,
		restore: (data: FormValues) => {
			form.email = data.email;
		}
	};

	// $: lockEmail =
	// 	!form.email || !(form.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))
	// 		? true
	// 		: false;

	// $: lockPassword = form.password && form.password.length >= 8 ? false : true;

	// $: errors = {
	// 	email: lockEmail ? 'Please enter a valid email' : '',
	// 	password: lockPassword ? 'Invalid credentials' : ''
	// };
	let loggingIn: boolean = false;
	let error: boolean = false;
	const handleLoginSubmit = async () => {
		loggingIn = true;
		const response = await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: form.email,
				password: form.password
			})
		});

		console.log(document.cookie);

		if (response.ok) {
			const data = await response.json();
			triggerToast('variant-ghost-success', 'Login successful');
			localStorage.setItem('first_name', data.first_name);
			localStorage.setItem('last_name', data.last_name);
			goto('/');
		} else if (response.status === 401) {
			triggerToast('variant-ghost-error', 'Invalid credentials');
			error = true;
		} else if (response.status === 500) {
			triggerToast('variant-ghost-error', 'Server Error');
			error = true;
		} else {
			triggerToast('variant-ghost-error', 'Something went wrong');
			error = true;
		}
		loggingIn = false;
	};
</script>

<svelte:head>
	<title>OpenMerce | Login</title>
	<meta name="description" content="OpenMerce Login" />
	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Login, Login"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>

<div class="flex items-center justify-center h-full w-full">
	<form on:submit|preventDefault={handleLoginSubmit} class="w-full h-full md:h-fit max-w-3xl">
		<div class="card p-4 gap-y-12 h-full w-full grid">
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<!-- <h2>Login</h2> -->
			</header>
			<section>
				<label class="label">
					<label for="email">E-Mail</label>
					<input
						class="input variant-form-material {error ? 'input-error' : ''}"
						type="text"
						name="email"
						bind:value={form.email}
						disabled={loggingIn}
						on:keypress={() => (error = false)}
					/>
					<!-- {#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if} -->
					<!-- <small class="text-error-500">{errors.email}</small> -->

					<label for="password">Password</label>
					<input
						class="input variant-form-material {error ? 'input-error' : ''}"
						type="password"
						name="password"
						bind:value={form.password}
						disabled={loggingIn}
						on:keypress={() => (error = false)}
					/>
					<!-- {#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if} -->
					<!-- <small class="text-error-500">{errors.password}</small> -->
				</label>
			</section>
			<footer class="grid content-end">
				<button class="btn variant-ghost-primary w-full" type="submit" disabled={loggingIn}
					><span
						>{#if loggingIn}<ProgressRadial class="w-6" />{/if}</span
					>
					<span>{loggingIn ? 'Logging In ...' : 'Log In'}</span></button
				>
			</footer>
		</div>
	</form>
</div>
