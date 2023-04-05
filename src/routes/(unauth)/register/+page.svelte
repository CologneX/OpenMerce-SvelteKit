<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Logo from '$lib/logo.svelte';
	export let data: PageData;

	// Client API:
	const { form, errors, enhance, delayed } = superForm(data.form);
</script>

<title>TOMK Commerce | Register</title>
<div class="flex justify-center items-center h-full w-full">
	<form method="POST" use:enhance>
		<div class="block card p-4 w-screen max-w-xl">
			<SuperDebug data={$form} />
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<h2>Register</h2>
			</header>
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
					{#if $errors.confirmPassword}<small class="text-red-500">{$errors.confirmPassword}</small>{/if}
				</label>
			</section>
			<footer class="p-4 space-y-2">
				{#if $delayed}
					<button class="btn variant-ghost-primary w-full" disabled>Registering..</button>
				{:else}
					<button class="btn variant-ghost-primary w-full" type="submit">Register</button>
				{/if}
				<button class="btn variant-ghost w-full">Google</button>
				<button class="btn variant-ghost w-full">Facebook</button>
			</footer>
		</div>
	</form>
</div>
