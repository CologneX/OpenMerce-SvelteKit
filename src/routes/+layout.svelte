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
		Avatar,
		modalStore
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
	import ShoppingCartCount from '$lib/Navbar/ShoppingCart.svelte';
	import { register } from 'swiper/element/bundle';
	import { getModeAutoPrefers } from '@skeletonlabs/skeleton';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import { setInitialClassState } from '@skeletonlabs/skeleton';
	register();
	isLoggedIn();
	setModeCurrent(getModeAutoPrefers());
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
	import { defaultLocationStore, isLoggedInStore, screenWidthStore } from '$lib/utils/stores';
	import SearchDropdown from '$lib/Navbar/SearchDropdown.svelte';
	import CartDropdown from '$lib/Cart/CartDropdown.svelte';

	let last_name: string | null;
	let first_name: string | null;
	let selectedLanguage: string | null;

	// onMount(async () => {
	// });

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
		if (!$isLoggedInStore) {
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
	const handleLogout = async () => {
		if (get(isLoggedInStore)) {
			isLoggingOut = true;
			await logoutUser();
			isLoggingOut = false;
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
	import Heart from '$lib/icons/Heart.svelte';
	import { AddressModal, modalComponentRegistry } from '$lib/utils/modal';
	import { get } from 'svelte/store';
	// end import favicon

	// modal settings
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html `<script>(${setInitialClassState.toString()})();</script>`}
</svelte:head>
<svelte:window bind:innerWidth={$screenWidthStore} />
<!-- {#if $navigating}
	<Preloader />
{/if} -->

<AppShell slotHeader="z-20" slotPageContent="flex justify-center">
	<Modal
		class="w-full h-full"
		shadow="shadow-xl"
		components={modalComponentRegistry}
		zIndex="z-40"
	/>

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
				<hr class="!border-t" />
				<section class="gap-2 grid w-full h-full overflow-y-auto hide-scrollbar">
					<div class="h-fit space-y-2">
						{#if $isLoggedInStore}
							<button
								class="card p-4 grid place-items-center w-full"
								on:click={() => goto('/profile')}
							>
								<span>
									<Avatar
										initials="{first_name}{last_name}"
										background="bg-primary-500"
										width="w-12"
									/>
								</span>
								<span>{first_name} {last_name}</span>
							</button>
						{:else}
							<div class="flex gap-x-2 py-2">
								<button
									class="btn btn-sm h-fit variant-ringed-primary w-full text-primary-500"
									on:click={() => {
										drawerStore.close();
										goto('/login');
									}}><span class="font-bold">Login</span></button
								>
								<button
									class="btn btn-sm h-fit variant-filled-primary w-full"
									on:click={() => {
										drawerStore.close();
										goto('/register');
									}}><span class="font-bold text-white">Register</span></button
								>
							</div>
						{/if}
						<hr class="!border-t" />
						<div class="space-y-6">
							<h4 class="font-semibold">My Activity</h4>
							<div>
								<button
									class="btn btn-sm p-0"
									on:click={() => {
										goto('/transaction-list');
										drawerStore.close();
									}}><span> <Heart /> </span> <span>Transaction List</span></button
								>
							</div>
							<div>
								<button
									class="btn btn-sm p-0"
									on:click={() => {
										goto('/wishlist');
										drawerStore.close();
									}}><span> <Heart /> </span> <span>Wishlist</span></button
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
			padding="p-2"
			regionRowHeadline="truncate"
			shadow="shadow-xl"
		>
			<svelte:fragment slot="headline">
				<div class="md:text-end truncate">
					<button
						type="button"
						class="btn btn-sm p-0"
						on:click={() => modalStore.trigger(AddressModal)}
					>
						<span><MapPin /></span>
						<span class="text-xs md:text-sm">
							Location <span class="font-bold truncate">{$defaultLocationStore.name}</span>
						</span>
					</button>
				</div>
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
						>
							<ShoppingCartCount />
						</button>
						<button
							type="button"
							class="btn-icon btn-icon-sm"
							on:click={() => {
								goto('/wishlist');
							}}
							aria-label="wishlist"
						>
							<span>
								<Heart />
							</span>
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

					{#if $screenWidthStore > 1024 && $isLoggedInStore}
						<div data-popup="cartHover" class="card p-4 w-full max-w-md h-fit max-h-96">
							<CartDropdown />
						</div>
					{/if}

					{#if !$isLoggedInStore && $screenWidthStore > 1024}
						<button
							class="btn btn-sm variant-ringed-primary w-full text-primary-500 h-fit"
							on:click={() => goto('/login')}><span class="font-semibold">Login</span></button
						>
						<button
							class="btn btn-sm variant-filled-primary w-full h-fit"
							on:click={() => goto('/register')}><span class="font-semibold">Register</span></button
						>
					{/if}
					{#if $screenWidthStore > 1024}
						<span class="divider-vertical" />
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
						{#if $isLoggedInStore}
							<button
								class="card p-4 grid place-items-center w-full drop-shadow-md dark:border dark:border-primary-500"
								on:click={() => goto('/profile')}
							>
								<span>
									<Avatar
										initials="{first_name}{last_name}"
										background="bg-primary-500"
										width="w-12"
									/>
								</span>
								<span class="font-semibold">{first_name} {last_name}</span>
							</button>
						{/if}
						<div class="flex flex-row gap-x-2">
							<button
								class="card p-2 drop-shadow-md border dark:border-primary-500 flex-1"
								on:click={() => {
									goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
								}}
							>
								<div class="font-bold text-primary-500">OMPLUS</div>
								<p class="text-sm">Cheaper delivery, just for you!</p>
								<p class="text-xs">
									Subscription starts from <span class="font-semibold"> Rp 29.999/month</span>
								</p>
							</button>
							<span class="divider-vertical" />
							<div class="flex-1 h-full space-y-2">
								<button type="button" class="btn btn-sm py-0" on:click={() => goto('/profile')}
									>Profile</button
								>
								<button
									type="button"
									class="btn btn-sm py-0"
									on:click={() => goto('/transaction-list')}>Transaction List</button
								>
								<button type="button" class="btn btn-sm py-0" on:click={() => goto('/wishlist')}
									>Wishlist</button
								>
								<button type="button" class="btn btn-sm py-0" on:click={() => goto('/cart')}
									>Cart</button
								>
								<!-- <button
									type="button"
									class="btn btn-sm pl-0"
									on:click={() => goto('/transaction-list')}>Transaction List</button
								>
								<button type="button" class="btn btn-sm pl-0" on:click={() => goto('/wishlist')}
									>Wishlist</button
								> -->
								<!-- <button type="button" class="btn btn-sm pl-0" on:click={() => goto('/wishlist')}
									>Cart</button
								> -->
							</div>
						</div>
						<div class="w-full drop-shadow-md py-2 flex">
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
						<div class="flex items-center">
							<LightSwitch />
							{#if $isLoggedInStore}
								<button
									class="btn btn-sm variant-filled w-full"
									disabled={isLoggingOut}
									on:click={handleLogout}>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</button
								>
							{/if}
						</div>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<main class="z-0 max-w-7xl w-full h-full">
		<slot />
	</main>
</AppShell>
