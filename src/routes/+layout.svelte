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

	// for settings (mobile) drawer
	const drawerMobile: DrawerSettings = {
		bgDrawer: 'w-full h-full card',
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
	import { isLoggedInStore, isStaffLoggedInStore, screenWidthStore } from '$lib/utils/stores';

	let last_name: string | null;
	let username: string | null;
	let first_name: string | null;
	let selectedLanguage: string | null;
	function setLanguage(lang: string) {
		localStorage.setItem('prefLang', lang);
		selectedLanguage = localStorage.getItem('prefLang');
	}

	let isLoggedIn = isUserLoggedIn();
	onMount(() => {
		isLoading = false;
		if (getUserFirstName() !== null) {
			isLoggedInStore.set(true);
		} else if (getUserLastName !== null) {
			isStaffLoggedInStore.set(true);
		}
		selectedLanguage = localStorage.getItem('prefLang');
	});
	// end for isLoggedin

	isLoggedInStore.subscribe((value) => {
		isLoggedIn = value;
		if (value) {
			first_name = localStorage.getItem('first_name');
			last_name = localStorage.getItem('last_name');
		}
	});
	let isStaffLoggedIn: boolean;

	// for handling shopping cart click
	function handleShoppingCartClick() {
		if (isLoggedIn || isStaffLoggedIn) {
			goto('/cart');
		} else {
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
	let screenWidth: number;
	$: screenWidthStore.set(screenWidth);
	// end for screenwidth
	import {
		logoutStaff,
		logoutUser,
		isUserLoggedIn,
		getUserFirstName,
		getUserLastName
	} from '$lib/utils/auth';
	// for logout
	let isLoggingOut: boolean = false;
	import { error, type HttpError } from '@sveltejs/kit';
	import MapPin from '$lib/icons/MapPin.svelte';
	const handleLogout = () => {
		if (isLoggedIn) {
			const logoutUserAPI = async () => {
				isLoggingOut = true;
				const response = await fetch('/api/v1/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					logoutUser();
				} else {
					throw error(response.status, {
						message: response.statusText
					});
				}

				isLoggingOut = false;
			};
			logoutUserAPI();
		} else if (isStaffLoggedIn) {
			const logoutStaffAPI = async () => {
				isLoggingOut = true;
				const response = await fetch('/api/v1/staff/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					logoutStaff();
				} else {
					throw error(response.status, {
						message: response.statusText
					});
				}

				isLoggingOut = false;
			};
			logoutStaffAPI();
		}

		if (screenWidth < 1024) {
			drawerStore.close();
		}
	};
	// end for logout

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
		placement: 'bottom'
	};
	// end for search bar
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if $navigating}
	<Preloader />
{/if}

<AppShell slotHeader="z-20">
	<Toast
		position="t"
		zIndex="z-50"
		buttonDismiss="btn-icon btn-icon-small"
		width="md:w-96 w-80"
		shadow="shadow-2xl"
	/>
	{#if screenWidth < 1024}
		<Drawer>
			<div class="flex flex-col p-3 gap-2 card h-full w-full">
				<header class="w-full flex place-items-center">
					<LightSwitch class="flex-none" />

					<div class="flex-1" />
					<h4 class="font-bold">Main Menu</h4>
					<button on:click={() => drawerStore.close()} class="btn">
						<span>
							<Exit />
						</span>
					</button>
				</header>
				<hr class="!border !border-current" />
				<section class="gap-2 grid w-full h-full overflow-y-auto hide-scrollbar">
					<div class="h-fit space-y-2">
						{#if !isLoggedIn}
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
						{:else}
							<div class="card p-4 grid place-items-center w-full">
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
						<div class="space-y-6">
							<h4 class="font-semibold">My Activity</h4>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>Transaction List</span></a
								>
							</div>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>Wish List</span></a
								>
							</div>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>Reviews</span></a
								>
							</div>

							<h4 class="font-semibold">All Categories</h4>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>Categories</span></a
								>
							</div>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>Others</span></a
								>
							</div>
							<h4 class="font-semibold">Help Center</h4>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>Complaints</span></a
								>
							</div>
							<div>
								<a href="/blmada" class="btn btn-sm p-0"
									><span> <ShoppingCart /> </span> <span>OpenMerce Care Helpdesk</span></a
								>
							</div>
						</div>
					</div>
				</section>

				{#if isLoggedIn}
					<footer class="w-full space-y-2">
						<div>
							<div class="flex">
								{#each ['Indonesia', 'English'] as c}
									<span
										class="chip w-1/2 {selectedLanguage === c ? 'variant-filled' : 'variant-soft'}"
										on:click={() => setLanguage(c)}
										on:keypress
									>
										<span>{c}</span>
									</span>
								{/each}
							</div>
						</div>
						<button
							class="btn btn-sm variant-filled w-full"
							disabled={isLoggingOut}
							on:click={handleLogout}>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</button
						>
					</footer>
				{/if}
			</div>
		</Drawer>
	{/if}
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-[auto_1fr_auto]"
			slotLead=""
			slotDefault="place-self-center w-full max-w-4xl"
			slotTrail="place-content-end"
			gap="gap-4"
			background="bg-primary-500 drop-shadow-xl"
			padding="p-2"
			regionRowHeadline=""
		>
			<svelte:fragment slot="headline">
				<div class="text-end">
					<small>
						<div class="btn btn-sm py-0">
							<span><MapPin /></span> <span> Location </span>
							<span class="font-bold"> Universitas Ciputra</span>
						</div>
					</small>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="lead">
				{#if screenWidth < 1024 && $page.url.pathname !== '/'}
					<button class="btn-icon btn-icon-sm" on:click={() => history.back()}>
						<span>
							<Back />
						</span>
					</button>
				{/if}
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
				{#if screenWidth > 1024}
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
						<div class="card p-6 bg-filled w-full max-w-md min-h-64 h-full" data-popup="cartHover">
							<header class=" grid grid-cols-2">
								<p class="text-start">Your Cart</p>
								<p class="font-semibold text-end">Cart</p>
							</header>
							<section class="flex items-center justify-center">
								{#if !isLoggedIn}
									<p>Please log in to start purchasing :)</p>
								{:else}
									<div class="flex flex-row gap-x-2 w-full">
										<div class="card">
											<div class="placeholder" />
										</div>
									</div>
								{/if}
							</section>
						</div>

						{#if !isLoggedIn && !isStaffLoggedIn}
							<a href="/login" class="btn btn-sm"><span class="font-semibold">Login</span></a>
							<a href="/register" class="btn btn-sm variant-ringed"
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

						<div class="w-full shadow-xl py-2 flex">
							{#each ['Indonesia', 'English'] as c}
								<span
									class="chip w-full {selectedLanguage === c ? 'variant-filled' : 'variant-soft'}"
									on:click={() => setLanguage(c)}
									on:keypress
								>
									<span>{c}</span>
								</span>
							{/each}
						</div>
						{#if isLoggedIn || isStaffLoggedIn}
							<button
								class="btn btn-sm variant-filled w-full"
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
		<div class="h-full w-full max-w-7xl overflow-y-auto hide-scrollbar lg:overflow-y-hidden">
			<slot />
		</div>
	</main>
</AppShell>
