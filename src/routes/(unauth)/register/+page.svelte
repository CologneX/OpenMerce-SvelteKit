<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Google from '$lib/icons/Google.svelte';
	import Facebook from '$lib/icons/Facebook.svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';

	interface PageData {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}
	const form: PageData = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	export const snapshot = {
		capture: () => form,
		restore: (data: PageData) => {
			form.name = data.name;
			form.email = data.email;
		}
	};

	$: lockEmail =
		!form.email || !(form.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))
			? true
			: false;
	$: lockPassword =
		form.password && form.password.length >= 8 && form.password === form.confirmPassword
			? false
			: true;
	$: lockName = !form.name ? true : false;

	$: errors = {
		name: lockName ? 'Name must be at least 3 characters' : '',
		email: lockEmail ? 'Please enter a valid email' : '',
		password: lockPassword ? 'Password must be at least 8 characters' : '',
		confirmPassword: lockPassword ? 'Passwords do not match' : ''
	};

	const formSubmit = (e: any) => {
		e.preventDefault();
		console.log(form);
	};
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
<main class="flex justify-center items-center h-full w-full">
	<div>
		<form method="POST">
			<div class="block card p-4 w-screen max-w-2xl space-y-10">
				<header class="card-header">
					<span class="flex justify-center"><Logo /></span>
					<!-- <h2>Register</h2> -->
				</header>
				<section>
					<Stepper
						buttonFinishLabel="Register"
						buttonCompleteType="submit"
						buttonComplete="variant-ghost-primary"
						on:complete={formSubmit}
					>
						<Step locked={lockEmail}>
							<svelte:fragment slot="header">E-mail</svelte:fragment>
							<input
								class="input"
								type="email"
								name="email"
								placeholder="example@email.com"
								bind:value={form.email}
							/>
							<small class="text-error-500">{errors.email}</small>
							<div class="grid grid-rows-1">
								<!-- <div class="flex justify-center items-center">
									<div class="border-b border-current w-1/4" />
									<div class="mx-4">Or With</div>
									<div class="border-b border-current w-1/4" />
								</div> -->
								<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
									<button class="btn variant-ghost-primary">
										<span><Google /></span>
										<span>Google</span>
									</button>
									<button class="btn variant-ghost-primary">
										<span><Facebook /></span>
										<span>Facebook</span>
									</button>
								</div>
							</div>
						</Step>
						<Step locked={lockPassword}>
							<svelte:fragment slot="header">Password</svelte:fragment>
							<input
								class="input"
								type="password"
								name="password"
								placeholder="Password"
								bind:value={form.password}
							/>
							<input
								class="input"
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password"
								bind:value={form.confirmPassword}
							/>
							<small class="text-error-500">{errors.password}</small><br />
							<small class="text-error-500">{errors.confirmPassword}</small>
						</Step>
						<Step locked={lockName}>
							<svelte:fragment slot="header">Name</svelte:fragment>
							<input
								class="input"
								type="text"
								name="name"
								placeholder="John Doe"
								bind:value={form.name}
							/>
							<small class="text-error-500">{errors.name}</small>
						</Step>
						<Step>
							<svelte:fragment slot="header">Confirm Register?</svelte:fragment>
							<!-- {#if $errors.email}<small class="text-red-500">E-mail must be </small>{/if}
					<br />
					{#if $errors.name}<small class="text-red-500">{$errors.name}</small>{/if}
					<br />
					{#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if}
					<br />
					{#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if} -->
						</Step>
					</Stepper>
				</section>
			</div>
		</form>
	</div>
</main>
<!-- <header class="card-header">
				<span class="flex justify-center"><Logo /></span>
				<h2>Register</h2>
			</header> -->
<!-- <footer class="p-4 space-y-3">
				<div class="flex justify-center">OR</div>
				<button class="btn variant-ghost w-full" type="button">Google <Google /></button>
				<button class="btn variant-ghost w-full" type="button">Facebook <Facebook /></button>
			</footer>
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
					{#if $errors.confirmPassword}<small class="text-red-500">{$errors.confirmPassword}</small
						>{/if}
				</label>
			</section>
			<div class="divide-y-2 space-y-3 divide-current grid">
				{#if $delayed}
					<button class="btn variant-ghost-primary w-full" disabled>Registering..</button>
				{:else}
					<button class="btn variant-ghost-primary w-full" type="submit">Register</button>
				{/if}
			</div> -->
