<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import type { Snapshot } from './$types';
	import Toast from '$lib/Toast.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { isLoggedInStore, isStaffLoggedInStore } from '$lib/stores';

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
		username: string;
		password: string;
	}

	const form: FormValues = {
		username: '',
		password: ''
	};

	export const snapshot: Snapshot<FormValues> = {
		capture: () => form,
		restore: (data: FormValues) => {
			form.username = data.username;
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
		const response = await fetch('/api/v1/staff/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: form.username,
				password: form.password
			})
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('fin_user', data.fin_user);
			localStorage.setItem('sys_admin', data.sys_admin);
			localStorage.setItem('inv_user', data.inv_user);
			localStorage.setItem('username', data.username);
			triggerToast('success', `Welcome back, ${data.username}!`);
			isStaffLoggedInStore.set(true);
			goto('/staff', {
				replaceState: true
			});
		} else if (response.status === 401) {
			triggerToast('error', 'Invalid credentials');
			error = true;
		} else if (response.status === 500) {
			triggerToast('error', 'Server Error');
			error = true;
		} else {
			triggerToast('error', response.statusText);
			error = true;
		}
		loggingIn = false;
	};
</script>

<svelte:head>
	<title>Staff | OpenMerce - Login</title>
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
				<h2>Staff Login</h2>
			</header>
			<section>
				<label class="label">
					<label for="email">Username</label>
					<input
						class="input variant-form-material {error ? 'input-error' : ''}"
						type="text"
						name="email"
						bind:value={form.username}
						disabled={loggingIn}
						on:keypress={() => (error = false)}
					/>
					<label for="password">Password</label>
					<input
						class="input variant-form-material {error ? 'input-error' : ''}"
						type="password"
						name="password"
						bind:value={form.password}
						disabled={loggingIn}
						on:keypress={() => (error = false)}
					/>
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
