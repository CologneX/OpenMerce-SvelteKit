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
		drawerStore,
		Avatar
	} from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import Logo from '$lib/icons/Logo.svelte';
	import Search from '$lib/icons/Search.svelte';
	import type { PopupSettings, DrawerSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import SearchCard from '$lib/SearchCard.svelte';
	import Settings from '$lib/icons/Settings.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import Exit from '$lib/icons/Exit.svelte';
	import ShoppingCart from '$lib/icons/ShoppingCart.svelte';
	import Bell from '$lib/icons/Bell.svelte';
	import Back from '$lib/icons/Back.svelte';
	import Home from '$lib/icons/Home.svelte';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let popupSettings: PopupSettings = {
		event: 'click',
		target: 'settingPopup',
		placement: 'bottom-end'
	};

	let comboboxValue: string;
	import type { Writable, get } from 'svelte/store';
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

	/// for search bar
	// end search bar

	// for settings (mobile) drawer
	const drawerMobile: DrawerSettings = {
		bgDrawer: 'w-full card md:hidden sm:block',
		position: 'right',
		blur: 'backdrop-blur-xl',
		duration: 500
	};
	// end settings (mobile) drawer

	// for preloader
	import Preloader from '$lib/Preloader.svelte';
	let isLoading: boolean = true;
	// end for preloader

	// for isLoggedin
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export const isLoggedIn = writable(false);
	let first_name: string | null;
	let last_name: string | null;
	onMount(() => {
		first_name = localStorage.getItem('first_name');
		last_name = localStorage.getItem('last_name');
		if (first_name && last_name) {
			isLoggedIn.set(true);
		}
		isLoading = false;
	});
	// end for isLoggedin

	// for handling shopping cart click
	function handleShoppingCartClick() {
		if (!$isLoggedIn) {
			goto('/login');
		}
	}
	// end for handling shopping cart click

	//for handling bell click
	function handleBellClick() {
		if (!$isLoggedIn) {
			goto('/login');
		}
	}
	// end for handling bell click

	// for screenwidth
	let screenWidth: number;
	// end for screenwidth

	// for logout
	const handleLogout = () => {
		localStorage.removeItem('first_name');
		localStorage.removeItem('last_name');
		if (screenWidth < 768) {
			drawerStore.close();
		}
		isLoggedIn.set(false);
	};
	// end for logout
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if isLoading}
	<Preloader />
{/if}
<AppShell>
	<Toast position="br" />
	{#if searchFocus}
		<SearchCard />
	{/if}
	{#if screenWidth < 768}
		<Drawer>
			<div class="flex flex-col p-4 gap-2">
				<div class="h-auto w-full flex justify-end place-items-center">
					<h4 class="font-bold">Main Menu</h4>
					<button on:click={() => drawerStore.close()} class="btn">
						<span>
							<Exit />
						</span>
					</button>
				</div>
				<hr class="!border !border-current" />
				<div class="grid justify-items-center gap-2">
					<Logo />
					{#if !$isLoggedIn}
						<a
							href="login"
							class="btn h-fit variant-ringed-primary w-full"
							on:click={() => drawerStore.close()}>Login</a
						>
						<a
							href="register"
							class="btn h-fit variant-glass-primary w-full"
							on:click={() => drawerStore.close()}>Register</a
						>
					{:else}
						<span>
							<Avatar
								initials="{first_name?.charAt(0)}{last_name?.charAt(0)}"
								background="bg-primary-500"
								width="w-12"
							/>
						</span>
						<span>{first_name} {last_name}</span>
					{/if}
					<div class="grid grid-cols-2 gap-2 justify-items-center w-full">
						<div>
							<p>Theme</p>
							<LightSwitch />
						</div>
						<div>
							{#if $isLoggedIn}
								<button class="btn variant-filled w-full" on:click={handleLogout}>Logout</button>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</Drawer>
	{/if}
	<svelte:fragment slot="header">
		<span>
			{#if $navigating}
				<ProgressBar height="h-1" />
			{/if}
		</span>
		<AppBar padding="py-1 md:px-4" slotDefault="flex justify-center">
			<svelte:fragment slot="lead">
				<a href="/" aria-label="Logo that redirects to home page" class="md:block hidden"
					><Logo /></a
				>
				{#if screenWidth < 768 && $page.url.pathname !== '/'}
					<button class="btn-icon btn-icon-sm" on:click={() => history.back()}>
						<span>
							<Back />
						</span>
					</button>
				{/if}
			</svelte:fragment>
			<div class="input-group input-group-divider h-8 max-w-4xl flex">
				<div class="input-group-shim bg-transparent">
					<Search />
				</div>
				<input
					type="search"
					placeholder="Search Openmerce"
					class="h-full w-full max-w-4xl text-sm md:text-base focus:w-max md:placeholder:text-base placeholder:text-sm"
					on:focus={onSearchFocus}
					on:blur={onSearchBlur}
				/>
			</div>

			<svelte:fragment slot="trail">
				{#if !searchFocus || screenWidth > 768}
					<div class="btn-group md:flex hidden [&>*+*]:border-transparent">
						<button type="button" class="btn-icon btn-icon-sm" on:click={handleShoppingCartClick}>
							<span>
								<ShoppingCart />
							</span>
						</button>
						<button type="button" class="btn-icon btn-icon-sm" on:click={handleBellClick}>
							<span>
								<Bell />
							</span>
						</button>
						<button
							type="button"
							class="btn-icon btn-icon-sm"
							use:popup={popupSettings}
							aria-labelledby="setting button"
						>
							{#if !$isLoggedIn}
								<span>
									<Settings />
								</span>
							{:else}
								<span>
									<Avatar initials="{first_name?.charAt(0)}{last_name?.charAt(0)}" width="w-6" />
								</span>
								<span>{first_name} {last_name}</span>
							{/if}
						</button>
					</div>
					<div class="md:hidden sm:block btn-group">
						<button type="button" class="btn-icon btn-icon-sm" on:click={handleShoppingCartClick}>
							<span>
								<ShoppingCart />
							</span>
						</button>
						<button type="button" class="btn-icon btn-icon-sm" on:click={handleBellClick}>
							<span>
								<Bell />
							</span>
						</button>
						<button
							class="btn-icon btn-icon-sm"
							type="button"
							on:click={() => drawerStore.open(drawerMobile)}
						>
							<span>
								<Hamburger />
							</span>
						</button>
					</div>
					<div class="card variant-primary p-3 w-72 z-10" data-popup="settingPopup">
						<div class="card-body space-y-3">
							<h4>Settings</h4>
							<LightSwitch />
							<button class="btn variant-filled w-full" use:popup={popupCombobox}>
								{comboboxValue ?? 'Language'}
							</button>
							{#if !$isLoggedIn}
								<a href="login" class="btn btn-sm h-fit variant-ringed-primary">Login</a>
								<a href="register" class="btn btn-sm h-fit variant-glass-primary">Register</a>
							{/if}
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
							{#if $isLoggedIn}
								<button class="btn variant-filled w-full" on:click={handleLogout}>Logout</button>
							{/if}
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<main class="h-full w-full grid place-items-center">
		<div class="max-w-7xl border-2 h-full w-full">
			<slot />
		</div>
	</main>
</AppShell>
