<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';

	interface PageData {
		email: string;
		password: string;
	}

	const form: PageData = {
		email: '',
		password: ''
	};

	export const snapshot = {
		capture: () => form,
		restore: (data: PageData) => {
			form.email = data.email;
		}
	};

	$: lockEmail =
		!form.email || !(form.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))
			? true
			: false;

	$: lockPassword = form.password && form.password.length >= 8 ? false : true;

	$: errors = {
		email: lockEmail ? 'Please enter a valid email' : '',
		password: lockPassword ? 'Invalid credentials' : ''
	};

	const formSubmit = (e: any) => {
		e.preventDefault();
		console.log(form);
	};
</script>

<title>OpenMerce | Login</title>

<div class="flex justify-center items-center h-full w-full">
	<form method="POST">
		<div class="card p-4 w-screen max-w-xl">
			<!-- <SuperDebug data={$form} /> -->
			<header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<h2>Login</h2>
			</header>
			<section class="p-4">
				<label class="label">
					<label for="email">E-Mail</label>
					<input class="input" type="text" name="email" bind:value={form.email} />
					<!-- {#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if} -->

					<label for="password">Password</label>
					<input class="input" type="password" name="password" bind:value={form.password} />
					<!-- {#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if} -->
				</label>
			</section>
			<footer class="p-4">
				<!-- {#if $delayed}
					<button class="btn variant-ghost-primary w-full" disabled>Logging in..</button>
				{:else} -->
					<button class="btn variant-ghost-primary w-full" type="submit">Login</button>
				<!-- {/if} -->
			</footer>
		</div>
	</form>
</div>
