<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell, ProgressBar } from '@skeletonlabs/skeleton';
	import Logo from '$lib/logo.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><Logo /></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="btn-group">
					<a href="/login">Login</a>
					<a href="/register">Register</a>
				</div>
			</svelte:fragment>
		</AppBar>
		<ProgressBar />
	</svelte:fragment>
	<slot />
</AppShell>
