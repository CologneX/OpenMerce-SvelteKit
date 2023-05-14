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
		LightSwitch,
		popup,
		ListBox,
		ListBoxItem,
		Toast,
		Drawer,
		drawerStore,
		Avatar
	} from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import Logo from '$lib/icons/Logo.svelte';
	import type { PopupSettings, DrawerSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Settings from '$lib/icons/Settings.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import Exit from '$lib/icons/Exit.svelte';
	import ShoppingCart from '$lib/icons/ShoppingCart.svelte';
	import Bell from '$lib/icons/Bell.svelte';
	import Back from '$lib/icons/Back.svelte';
	import { page } from '$app/stores';
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
		placement: 'bottom'
	};

	// for settings (mobile) drawer
	const drawerMobile: DrawerSettings = {
		bgDrawer: 'w-full h-full card md:hidden sm:block',
		position: 'bottom',
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
	import { isLoggedInStore, isStaffLoggedInStore, screenWidthStore } from '$lib/stores';

	let last_name: string | null;
	let username: string | null;
	let first_name: string | null;

	onMount(() => {
		isLoading = false;
		if (localStorage.getItem('first_name') !== null) {
			isLoggedInStore.set(true);
		} else if (localStorage.getItem('username') !== null) {
			isStaffLoggedInStore.set(true);
		}
	});
	// end for isLoggedin
	let isLoggedIn: boolean;
	isLoggedInStore.subscribe((value) => {
		isLoggedIn = value;
		if (value) {
			first_name = localStorage.getItem('first_name');
			last_name = localStorage.getItem('last_name');
		}
	});
	let isStaffLoggedIn: boolean;
	isStaffLoggedInStore.subscribe((value) => {
		isStaffLoggedIn = value;
		if (value) {
			username = localStorage.getItem('username');
		}
	});
	// for handling shopping cart click
	function handleShoppingCartClick() {
		if (!isLoggedIn || !isStaffLoggedIn) {
			goto('/login');
		}
	}
	// end for handling shopping cart click

	//for handling bell click
	function handleBellClick() {
		if (!isLoggedIn || !isStaffLoggedIn) {
			goto('/login');
		}
	}
	// end for handling bell click

	// for screenwidth
	let screenWidth: number = 0;
	$: screenWidthStore.set(screenWidth);
	// end for screenwidth

	// for logout
	let isLoggingOut: boolean = false;
	import { error } from '@sveltejs/kit';
	const handleLogout = () => {
		if (isLoggedIn) {
			const logoutUser = async () => {
				isLoggingOut = true;
				const response = await fetch('/api/v1/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const data = await response.json();
				console.log(data);
				if (data.success) {
					localStorage.removeItem('first_name');
					localStorage.removeItem('last_name');
					isLoggedInStore.set(false);
					goto('/login');
				} else {
					throw error(response.status, {
						message: data.message
					});
				}

				isLoggingOut = false;
			};
			logoutUser();
		} else if (isStaffLoggedIn) {
			const logoutStaff = async () => {
				isLoggingOut = true;
				const response = await fetch('/api/v1/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const data = await response.json();
				if (data.success) {
					localStorage.removeItem('username');
					localStorage.removeItem('inv_user');
					localStorage.removeItem('sys_admin');
					localStorage.removeItem('fin_user');
					isStaffLoggedInStore.set(false);
					goto('/staff/login');
				} else {
					throw error(response.status, {
						message: data.message
					});
				}

				isLoggingOut = false;
			};
			logoutStaff();
		}

		if (screenWidth < 768) {
			drawerStore.close();
		}
	};
	// end for logout

	// for scrollY value
	export let Y = writable(0);
	function scrollHandler(event: any) {
		Y = event.target.scrollTop;
	}
	// end for scrollY value

	// handle search
	let search: string;
	// end handle search

	// handle cart hover
	const cartHover: PopupSettings = {
		event: 'hover',
		target: 'cartHover',
		placement: 'bottom'
	};
	// for search bar
	const searchBar: PopupSettings = {
		event: 'focus-click',
		target: 'searchBar',
		placement: 'bottom-start'
	};
	// end for search bar
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if isLoading || $navigating}
	<Preloader />
{/if}

<AppShell on:scroll={scrollHandler} slotHeader="z-20">
	<Toast position="br" />
	{#if screenWidth < 768}
		<Drawer>
			<div class="flex flex-col p-4 gap-2 card h-full border-2">
				<header class="w-full flex justify-end place-items-center card-header">
					<h4 class="font-bold">Main Menu</h4>
					<button on:click={() => drawerStore.close()} class="btn">
						<span>
							<Exit />
						</span>
					</button>
				</header>
				<hr class="!border !border-current" />
				<section class="gap-2 grid">
					{#if !isLoggedIn}
						<div>
							<a
								href="/login"
								class="btn h-fit variant-ringed-primary w-full"
								on:click={() => drawerStore.close()}><span class="font-semibold">Login</span></a
							>
							<a
								href="/register"
								class="btn h-fit variant-glass-primary w-full"
								on:click={() => drawerStore.close()}><span class="font-semibold">Register</span></a
							>
						</div>
					{:else}
						<div class="card p-4 border-2 grid place-items-center">
							<span>
								<Avatar
									initials="{first_name?.charAt(0)}{last_name?.charAt(0)}"
									background="bg-primary-500"
									width="w-12"
								/>
							</span>
							<span>{first_name} {last_name}</span>
						</div>
					{/if}
					<footer class="card-footer">
						<div>
							{#if isLoggedIn || isStaffLoggedIn}
								<button
									class="btn variant-filled w-full"
									disabled={isLoggingOut}
									on:click={handleLogout}>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</button
								>
							{/if}
						</div>
					</footer>
				</section>
			</div>
		</Drawer>
	{/if}
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="lg:grid-cols-5 grid-cols-3"
			slotLead="w-auto hidden lg:block"
			slotDefault="place-self-center w-full col-span-2 lg:col-span-3 max-w-4xl"
			slotTrail="place-content-end col-span-1"
			gap="gap-8"
			background="bg-primary-500"
			padding="p-2"
			regionRowHeadline=""
		>
			{#if screenWidth < 768 && $page.url.pathname !== '/'}
				<button class="btn-icon btn-icon-sm" on:click={() => history.back()}>
					<span>
						<Back />
					</span>
				</button>
			{/if}
			<svelte:fragment slot="headline">
				<div class="text-end">
					<small
						>Location <button class="font-semibold btn btn-sm">Universitas Ciputra</button></small
					>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="lead">
				<a href="/" aria-label="Logo that redirects to home page" class="lg:block hidden w-full">
					<Logo height={'6'} />
				</a>
			</svelte:fragment>
			<form action="/search/{search}" class="w-full h-8">
				<input
					type="search"
					placeholder="Search Openmerce"
					class="w-full h-full max-w-4xl text-sm md:text-base md:placeholder:text-base placeholder:text-sm input"
					bind:value={search}
					use:popup={searchBar}
				/>
			</form>
			<div class="card w-full max-w-4xl h-fit" data-popup="searchBar">
				<div class="card-body">
					<div class="p-4 space-y-4">
						<div class="placeholder animate-pulse" />
						<div class="grid grid-cols-3 gap-8">
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse" />
						</div>
						<div class="grid grid-cols-4 gap-4">
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse" />
						</div>
					</div>
				</div>
			</div>

			<svelte:fragment slot="trail">
				{#if screenWidth > 768}
					<div class="flex gap-2">
						<button
							type="button"
							class="btn-sm"
							on:click={handleShoppingCartClick}
							use:popup={cartHover}
						>
							<span>
								<ShoppingCart />
							</span>
						</button>
						{#if isLoggedIn || isStaffLoggedIn}
							<button type="button" class="btn-icon btn-icon-sm" on:click={handleBellClick}>
								<span>
									<Bell />
								</span>
							</button>
						{/if}
						<span class="divider-vertical !border-current" />
						<div
							class="card p-2 bg-filled [&>*]:pointer-events-none w-full max-w-md"
							data-popup="cartHover"
						>
							<header class="card-header grid grid-cols-2">
								<p class="text-start">Your Cart</p>
								<p class="font-semibold text-end">Cart</p>
							</header>
							<section class="p-2" />
						</div>

						{#if !isLoggedIn && !isStaffLoggedIn}
							<a href="/login" class="btn btn-sm variant-ringed-primary"
								><span class="font-semibold">Login</span></a
							>
							<a href="/register" class="btn btn-sm variant-glass-primary"
								><span class="font-semibold">Register</span></a
							>
						{/if}
						<button
							type="button"
							class="btn btn-sm"
							use:popup={popupSettings}
							aria-labelledby="setting button"
						>
							{#if isLoggedIn}
								<div>
									<Avatar initials="{first_name?.charAt(0)}{last_name?.charAt(0)}" width="w-6" />
								</div>
								<div>{first_name}</div>
							{:else if isStaffLoggedIn}
								<div>
									<Avatar initials={username?.charAt(0)} width="w-6" />
								</div>
								<div>{username}</div>
							{:else}
								<span>
									<Settings />
								</span>
							{/if}
						</button>
					</div>
				{:else}
					<div class="flex">
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
				{/if}
				<div class="card variant-primary p-4 w-72 z-30" data-popup="settingPopup">
					<div class="card-body space-y-3">
						<h4>Settings</h4>
						<LightSwitch />
						<button class="btn variant-filled w-full" use:popup={popupCombobox}>
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
						{#if isLoggedIn || isStaffLoggedIn}
							<button
								class="btn variant-filled w-full"
								disabled={isLoggingOut}
								on:click={handleLogout}>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</button
							>
						{/if}
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<main class="h-full w-full grid place-items-center mx-0 mb:px-10 z-0">
		<div class="h-full w-full max-w-6xl">
			<slot />
		</div>
	</main>
</AppShell>
