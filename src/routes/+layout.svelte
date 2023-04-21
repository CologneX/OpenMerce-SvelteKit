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
		ListBoxItem,
		localStorageStore,
		Toast,
		Drawer,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import Logo from '$lib/icons/Logo.svelte';
	import type { PopupSettings, DrawerSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import SearchCard from '$lib/SearchCard.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let popupSettings: PopupSettings = {
		event: 'click',
		target: 'settingPopup',
		placement: 'bottom-end'
	};

	let comboboxValue: string;
	import type { Writable } from 'svelte/store';
	const storeLang: Writable<string> = localStorageStore('storeLang', 'English');
	let popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'combobox',
		placement: 'bottom',
		// Close the popup when the item is clicked
		closeQuery: '.listbox-item'
	};

	// for search bar
	/// for search bar behavior
	let searchFocus: boolean = false;
	const onSearchFocus = () => (searchFocus = true);
	const onSearchBlur = () => (searchFocus = false);

	///for search bar
	// -- end search bar
	const drawerMobile: DrawerSettings = {
		bgDrawer: 'w-full card',
		position: 'right'
	};
	// for settings (mobile) drawer
</script>

<AppShell>
	<Toast position="br" />
	{#if searchFocus}
		<SearchCard />
	{/if}
	<Drawer>
		<div class="flex flex-col p-4 gap-4">
			<div class="h-auto w-full flex justify-end">
				<button on:click={() => drawerStore.close()} class="btn btn-sm bg-error-500">
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</span>
				</button>
			</div>
			<div class="grid justify-items-center gap-2">
				<Logo />
				<a href="login" class="btn h-fit variant-ringed-primary w-full">Login</a>
				<a href="register" class="btn h-fit variant-glass-primary w-full">Register</a>
				<div class="grid grid-cols-2 gap-2 justify-items-center w-full">
					<div>
						<p>Theme</p>
						<LightSwitch />
					</div>
					<div>COL 2</div>
				</div>
			</div>
		</div>
	</Drawer>
	<svelte:fragment slot="header">
		<span>
			{#if $navigating}
				<ProgressBar height="h-1" />
			{/if}
		</span>
		<AppBar padding="pl-4 py-1" slotDefault="flex justify-center">
			<svelte:fragment slot="lead">
				<a href="/" aria-label="Logo that redirects to home page"><Logo /></a>
			</svelte:fragment>
			<div class="input-group input-group-divider h-8 w-3/4 flex">
				<div class="input-group-shim">
					<svg
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
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</div>
				<input
					type="search"
					placeholder="Search..."
					class="h-full w-full"
					on:focus={onSearchFocus}
					on:blur={onSearchBlur}
				/>
			</div>
			<!-- <div class="relative min-w-1/2 w-3/4" >
					<input type="text" class="input h-9 pr-10 pl-2" placeholder="Search Items" />
					<div class="absolute top-0 right-0 h-full flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
				</div> -->
			<svelte:fragment slot="trail">
				<div class="md:grid grid-cols-3 gap-2 items-center hidden">
					<a href="login" class="btn btn-sm h-fit variant-ringed-primary">Login</a>
					<a href="register" class="btn btn-sm h-fit variant-glass-primary">Register</a>
					<button
						type="button"
						class="btn-icon"
						use:popup={popupSettings}
						aria-labelledby="setting button"
					>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
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
						</span>
					</button>
				</div>
				<div class="md:hidden sm:block">
					<button class="btn-icon" type="button" on:click={() => drawerStore.open(drawerMobile)}>
						<span
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
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</span>
					</button>
				</div>
				<div class="card variant-primary p-3 w-auto z-10" data-popup="settingPopup">
					<div class="card-body space-y-3">
						<h4>Settings</h4>
						<LightSwitch />
						<button class="btn variant-filled w-48" use:popup={popupCombobox}>
							{comboboxValue ?? 'Language'}
						</button>

						<div class="card w-48 shadow-xl py-2" data-popup="combobox">
							<!-- Listbox -->
							<ListBox rounded="rounded-none">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Bahasa Indonesia">
									Bahasa Indonesia
								</ListBoxItem>
								<ListBoxItem bind:group={comboboxValue} name="medium" value="English">
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
	</svelte:fragment>
	<slot />
</AppShell>
