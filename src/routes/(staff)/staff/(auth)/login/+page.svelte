<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import type { Snapshot } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { triggerToast } from '$lib/utils/toast';
	import { goto } from '$app/navigation';
	import { isLoggedInStore, isStaffLoggedInStore } from '$lib/utils/stores';

	interface FormValues {
		username: string;
		password: string;
		remember_me: boolean;
	}

	const form: FormValues = {
		username: '',
		password: '',
		remember_me: false
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
			triggerToast(`Welcome back, ${data.username}!`, 'variant-filled-success');
			isStaffLoggedInStore.set(true);
			goto('/staff', {
				replaceState: true
			});
		} else if (response.status === 401) {
			triggerToast('Invalid credentials', 'variant-filled-error');
			error = true;
		} else if (response.status === 500) {
			triggerToast('Server Error', 'variant-filled-error');
			error = true;
		} else {
			triggerToast(response.statusText, 'variant-filled-error');
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
				<span class="flex justify-center"><Logo height="10" /></span>
				<!-- <h2>Staff Login</h2> -->
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
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:checked={form.remember_me} />
						<p>Remember Me</p>
					</label>
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
