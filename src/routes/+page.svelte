<script lang="ts">
	import Toast from '$lib/Toast.svelte';
	import Star from '$lib/icons/Star.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	function triggerToast(type: string, message: string) {
		const toast = new Toast({
			target: document.body,
			props: {
				messageText: message,
				type: type
			}
		});
		toast.triggerToast();
	}
	// -- toast settings and trigger function
	export let data;
	const { productsList, isLoggedIn } = data;

	const source = productsList;
	let page = {
		offset: 0,
		limit: 8,
		size: source.length,
		amounts: [8, 10]
	};

	$: paginatedSource = source.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);
</script>

<svelte:head>
	<title>OpenMerce | Main</title>
	<meta name="description" content="OpenMerce - Open Source E-Commerce" />
	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Main, Main"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<!-- <Toast position='br' /> -->
<main class="justify-start md:mx-32 space-y-3 mt-4">
	<div class="container">
		<h3>Bayi Mario | Pagination</h3>
		<div class="flex gap-3">
			{#each paginatedSource as item}
				<a class="card p-4 w-40 grid" href="products/{item.id}">
					<div class="placeholder animate-pulse w-32 h-32 place-self-center" />
					<h5>{item.name}</h5>
					<h6>
						{item.price.toLocaleString('en-US', {
							style: 'currency',
							currency: 'IDR',
							minimumFractionDigits: 0
						})}
					</h6>
					<hr class="!border-t-2 border-current" />
					<div class="flex">
						<Star />
						<span>{item.rating}</span>
					</div>
				</a>
			{/each}
		</div>
		<Paginator
			bind:settings={page}
			text="hidden"
			select="hidden"
			buttonClasses="btn variant-ghost-secondary"
		/>
	</div>
	<div class="container">
		<h3>Alat Mario | Scrollbar</h3>
		<div class="flex gap-3 overflow-x-auto">
			{#each productsList as item}
				<a class="card p-4 w-40 grid" href="products/{item.id}">
					<div class="placeholder animate-pulse w-32 h-32 place-self-center" />
					<h5>{item.name}</h5>
					<h6>
						{item.price.toLocaleString('en-US', {
							style: 'currency',
							currency: 'IDR',
							minimumFractionDigits: 0
						})}
					</h6>
					<hr class="!border-t-2 border-current" />
					<div class="flex">
						<Star />
						<span>{item.rating}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</main>
