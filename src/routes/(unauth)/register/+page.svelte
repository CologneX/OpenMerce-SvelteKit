<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Logo from '$lib/Logo.svelte';
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
					<input class="input" type="text" name="name" bind:value={$form.name} />
					<label for="email">E-Mail</label>
					<input class="input" type="text" name="email" bind:value={$form.email} />
					<label for="password">Password</label>
					<input class="input" type="text" name="password" bind:value={$form.password} />
					<label for="confirmPassword">Confirm Password</label>
					<input
						class="input"
						type="text"
						name="confirmPassword"
						bind:value={$form.confirmPassword}
					/>
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
