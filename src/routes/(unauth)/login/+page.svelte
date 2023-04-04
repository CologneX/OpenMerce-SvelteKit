<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Logo from '$lib/Logo.svelte';
	export let data: PageData;

	// Client API:
	const { form, errors, enhance, delayed } = superForm(data.form);
</script>

<title>TOMK Commerce | Login</title>

<div class="flex justify-center items-center h-full w-full">
	<form method="POST" use:enhance>
		<div class="card p-4 w-screen max-w-xl">
			<SuperDebug data={$form} />
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<h2>Login</h2>
			</header>
			<section class="p-4">
				<label class="label">
					<label for="email">E-Mail</label>
					<input
						class="input"
						type="text"
						placeholder="Input"
						name="email"
						bind:value={$form.email}
					/>
					<label for="password">Password</label>
					<input
						class="input"
						type="text"
						placeholder="Input"
						name="password"
						bind:value={$form.password}
					/>
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
