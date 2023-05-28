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
		Modal,
		Avatar
	} from '@skeletonlabs/skeleton';
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
	import { logoutUser, isLoggedIn, getUserNames } from '$lib/utils/auth';
	let isLoggingOut: boolean = false;
	import MapPin from '$lib/icons/MapPin.svelte';
	import { triggerModal } from '$lib/utils/modal';
	import ShoppingCartCount from '$lib/Navbar/ShoppingCart.svelte';
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
	let isLoading: boolean = true;
	// end for preloader

	// for isLoggedin
	import { goto } from '$app/navigation';
	import { isLoggedInStore, screenWidthStore, scrollYStore } from '$lib/utils/stores';
	import SearchDropdown from '$lib/Navbar/SearchDropdown.svelte';
	import CartDropdown from '$lib/Cart/CartDropdown.svelte';

	let last_name: string | null;
	let username: string | null;
	let first_name: string | null;
	let selectedLanguage: string | null;

	isLoggedIn();
	selectedLanguage = localStorage.getItem('prefLang');

	// end for isLoggedin

	$: if ($isLoggedInStore) {
		[first_name, last_name] = getUserNames();
	}
	// isLoading = false;
	// for handling shopping cart click
	function handleShoppingCartClick() {
		if ($isLoggedInStore) {
			goto('/cart');
		} else {
			goto('/login');
		}
	}
	// end for handling shopping cart click

	//for handling bell click
	function handleBellClick() {
		if ($isLoggedInStore) {
			goto('/login');
		}
	}
	// end for handling bell click
	// for setting lang
	function setLanguage(lang: string) {
		localStorage.setItem('prefLang', lang);
		selectedLanguage = localStorage.getItem('prefLang');
	}
	// for setting lang
	// for logout
	const handleLogout = () => {
		if ($isLoggedInStore) {
			const logout = async () => {
				isLoggingOut = true;
				await logoutUser();
				isLoggingOut = false;
			};
			logout();
		}
		if ($screenWidthStore < 1024) {
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
		placement: 'bottom',
		middleware: {
			offset: 1
		}
	};
	// end for search bar

	// import favicon
	import favicon from '$lib/favicon.ico';
	import AdminSettings from '$lib/icons/Truck.svelte';
	import { fade } from 'svelte/transition';
	// end import favicon
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<svelte:window bind:innerWidth={$screenWidthStore} />
<!-- {#if $navigating}
	<Preloader />
{/if} -->

<AppShell slotHeader="z-20" slotPageContent="flex justify-center">
	<Modal class="w-full h-full" shadow="shadow-xl" />

	<Toast
		position="t"
		zIndex="z-50"
		buttonDismiss="btn-icon btn-icon-small"
		width="md:w-96 w-80"
		shadow="shadow-2xl"
	/>
	{#if $screenWidthStore < 1024}
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
						{#if $isLoggedInStore}
							<div class="card p-4 grid place-items-center w-full" transition:fade>
								<span>
									<Avatar
										initials="{first_name}{last_name}"
										background="bg-primary-500"
										width="w-12"
									/>
								</span>
								<span>{first_name} {last_name}</span>
							</div>
						{:else}
							<span transition:fade
								><a
									href="/login"
									class="btn h-fit variant-ringed-primary w-full"
									on:click={() => drawerStore.close()}><span class="font-semibold">Login</span></a
								>
								<a
									href="/register"
									class="btn h-fit variant-glass-primary w-full"
									on:click={() => drawerStore.close()}
									><span class="font-semibold">Register</span></a
								></span
							>
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

				{#if $isLoggedInStore}
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
			slotDefault="place-self-center w-full max-w-4xl"
			slotTrail="place-content-end"
			gap="gap-4"
			background="bg-primary-500 drop-shadow-xl"
			padding="p-2"
		>
			<svelte:fragment slot="headline">
				{#if $isLoggedInStore}
					<div class="text-end">
						<small>
							<button
								type="button"
								class="btn btn-sm py-0"
								on:click={() => triggerModal()}
							>
								<span><MapPin /></span> <span> Location </span>
								<span class="font-bold"> Universitas Ciputra</span>
							</button>
						</small>
					</div>
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="lead">
				{#if $screenWidthStore < 1024 && $page.url.pathname !== '/'}
					<button class="btn-icon btn-icon-sm" aria-label="back" on:click={() => history.back()}>
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
				<SearchDropdown searchQuery={search} />
			</div>
			<svelte:fragment slot="trail">
				<div class="flex gap-x-1">
					{#if $isLoggedInStore}
						<button
							type="button"
							class="btn-icon btn-icon-sm"
							on:click={handleShoppingCartClick}
							use:popup={cartHover}
							aria-label="your cart"
							transition:fade
						>
							<ShoppingCartCount />
						</button>
					{/if}
					<button
						type="button"
						class="btn-icon btn-icon-sm"
						on:click={handleBellClick}
						aria-label="notification"
					>
						<span>
							<Bell />
						</span>
					</button>

					<span class="divider-vertical !border-current" />
					<div class="card p-4 w-full max-w-md h-fit max-h-96" data-popup="cartHover">
						<CartDropdown />
					</div>

					{#if !$isLoggedInStore && $screenWidthStore > 1024}
						<a href="/login" class="btn btn-sm"><span class="font-semibold">Login</span></a>
						<a href="/register" class="btn btn-sm variant-ringed"
							><span class="font-semibold">Register</span></a
						>
					{/if}
					{#if $screenWidthStore > 1024}
						<button
							type="button"
							class="btn btn-sm"
							aria-label="setting button"
							use:popup={popupSettings}
							aria-labelledby="setting button"
						>
							{#if $isLoggedInStore}
								<div>
									<Avatar initials="{first_name?.charAt(0)}{last_name?.charAt(0)}" width="w-6" />
								</div>
								<div>{first_name}</div>
							{:else}
								<span>
									<Settings />
								</span>
							{/if}
						</button>
					{:else}
						<button
							class="btn-icon btn-icon-sm"
							type="button"
							on:click={() => drawerStore.open(drawerMobile)}
							aria-label="mobile menu"
						>
							<span>
								<Hamburger />
							</span>
						</button>
					{/if}
				</div>

				<div class="card variant-primary p-4 w-72 z-30" data-popup="settingPopup">
					<div class="card-body space-y-3">
						<h4>Settings</h4>
						<LightSwitch />
						{#if $isLoggedInStore}
							<div class="card p-4 grid place-items-center w-full">
								<span>
									<Avatar
										initials="{first_name}{last_name}"
										background="bg-primary-500"
										width="w-12"
									/>
								</span>
								<span>{first_name} {last_name}</span>
							</div>
						{/if}
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
						{#if $isLoggedInStore}
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
	<main class="z-0 max-w-7xl w-full h-full">
		<slot />
	</main>
</AppShell>
