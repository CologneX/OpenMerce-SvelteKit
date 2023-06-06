<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';
	import { triggerToast } from '$lib/utils/toast';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { LoginForm } from '../../../app';

	let form: LoginForm = {
		email: '',
		password: '',
		remember_me: false
	};
	let loggingIn: boolean = false;
	let error: boolean = false;
	import { isLoggedInStore } from '$lib/utils/stores';
	const handleLoginSubmit = async () => {
		loggingIn = true;
		const response = await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: form.email,
				password: form.password,
				remember_me: form.remember_me
			})
		});

		const data = await response.json();
		if (response.ok) {
			localStorage.setItem('first_name', data.first_name);
			localStorage.setItem('last_name', data.last_name);
			isLoggedInStore.set(true);
			triggerToast(`Welcome back, ${data.first_name} ${data.last_name}!`, 'variant-filled-success');
			// goto('/') or go back to previous page if exist

			if (window.history.length > 1) {
				window.history.back();
			} else {
				goto('/');
			}
		} else if (response.status === 401) {
			triggerToast(`Invalid credentials`, 'variant-filled-error');
			error = true;
		} else if (response.status === 500) {
			triggerToast(`Server Error`, 'variant-filled-error');
			error = true;
		} else {
			triggerToast(response.statusText, 'variant-filled-error');
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

<div class="flex justify-center h-full w-full">
	<form on:submit|preventDefault={handleLoginSubmit} class="w-full h-fit max-w-xs">
		<div class="h-14" />
		<span class="flex justify-center"><Logo height="8" /></span>
		<div class="h-14" />
		<div class="card p-4 gap-y-12 h-full w-full grid shadow-xl">
			<section>
				<label class="label">
					<span class="font-bold">E-mail</span>
					<input
						class="input {error ? 'input-error' : ''}"
						type="text"
						bind:value={form.email}
						disabled={loggingIn}
						on:keypress={() => (error = false)}
					/>
					<div class="h-4" />
					<span class="font-bold">Password</span>
					<input
						class="input {error ? 'input-error' : ''}"
						type="password"
						name="password"
						bind:value={form.password}
						disabled={loggingIn}
						on:keypress={() => (error = false)}
					/>
					<div class="h-4" />
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:checked={form.remember_me} />
						<p>Remember Me</p>
					</label>
				</label>
			</section>
			<footer class="grid content-end gap-y-4">
				<button class="btn variant-ghost-primary w-full" type="submit" disabled={loggingIn}
					><span
						>{#if loggingIn}<ProgressRadial class="w-6" />{/if}</span
					>
					<span>{loggingIn ? 'Logging In ...' : 'Log In'}</span></button
				>
				<hr class="!border-t-2" />
				<small class="text-center"
					>Need help? <a
						href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
						target="_blank"
						class="font-semibold no-underline">Contact OpenMerce Help!</a
					></small
				>
			</footer>
		</div>
	</form>
</div>
