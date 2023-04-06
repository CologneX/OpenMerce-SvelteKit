<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		ProgressBar,
		LightSwitch,
		popup,
		ListBox,
		ListBoxItem
	} from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import Logo from '$lib/icons/Logo.svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let popupSettings: PopupSettings = {
		event: 'click',
		target: 'settingPopup',
		placement: 'bottom-end'
	};

	let comboboxValue: string;
	let popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'combobox',
		placement: 'bottom',
		// Close the popup when the item is clicked
		closeQuery: '.listbox-item'
	};
</script>

<title>TOMK Commerce | Main</title>
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><Logo /></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="btn-group gap-2 [&>*+*]:border-none">
					<a href="login" class="btn variant-ghost-primary">Login</a>
					<a href="register" class="btn">Register</a>
					<button class="btn" use:popup={popupSettings}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</button>
				</div>
				<div class="card variant-primary p-3 w-auto z-10" data-popup="settingPopup">
					<div class="card-body space-y-3">
						<h4>Settings</h4>
						<LightSwitch />
						<button class="btn variant-filled w-48" use:popup={popupCombobox}>
							{comboboxValue ?? 'Bahasa'}
						</button>

						<div class="card w-48 shadow-xl py-2" data-popup="combobox">
							<!-- Listbox -->
							<ListBox rounded="rounded-none">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="ID_id">
									Bahasa Indonesia
								</ListBoxItem>
								<ListBoxItem bind:group={comboboxValue} name="medium" value="EN_id">
									English
								</ListBoxItem>
							</ListBox>
							<!-- Arrow -->
							<div class="arrow bg-surface-100-800-token" />
						</div>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
		{#if $navigating}
			<ProgressBar />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
