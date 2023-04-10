<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	export let data: PageData;
	// Client API:
	const { form, errors, enhance, delayed } = superForm(data.form);

	// get if url contains email "/login?email=" , if so, prefill email field
	const urlParams = (new URLSearchParams(window.location.search)).get('email');
	if (urlParams) {
		$form.email = urlParams;
		window.history.replaceState({}, document.title, '/login');
	}

</script>

<title>OpenMerce | Login</title>

<div class="flex justify-center items-center h-full w-full">
	<form method="POST" use:enhance>
		<div class="card p-4 w-screen max-w-xl">
			<!-- <SuperDebug data={$form} /> -->
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<h2>Login</h2>
			</header>
			<section class="p-4">
				<label class="label">
					<label for="email">E-Mail</label>
					<input class="input" type="text" name="email" bind:value={$form.email} />
					{#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if}

					<label for="password">Password</label>
					<input class="input" type="password" name="password" bind:value={$form.password} />
					{#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if}
				</label>
			</section>
			<footer class="p-4">
				{#if $delayed}
					<button class="btn variant-ghost-primary w-full" disabled>Logging in..</button>
				{:else}
					<button class="btn variant-ghost-primary w-full" type="submit">Login</button>
				{/if}
			</footer>
		</div>
	</form>
</div>
