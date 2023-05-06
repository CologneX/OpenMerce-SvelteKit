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
	const { productsList } = data;

	// -- pagination settings
	const source = productsList;
	let Page = {
		offset: 0,
		limit: 6,
		size: source.length,
		amounts: [6]
	};

	$: paginatedSource = source.slice(
		Page.offset * Page.limit, // start
		Page.offset * Page.limit + Page.limit // end
	);
	// -- end of pagination settings
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
<div class="space-y-3 mt-4">
	<!-- <div class="container">
		<h3>Bayi Mario | Pagination</h3>
		<div class="flex gap-3">
			{#each paginatedSource as item}
				<a class="card p-4 grid" href="products/{item.id}">
					<div class="placeholder  place-self-center" />
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
			bind:settings={Page}
			text="hidden"
			select="hidden"
			buttonClasses="btn variant-ghost-secondary"
		/>
	</div> -->
	<div class="container">
		<h3>Alat Mario | Scrollbar</h3>
		<div class="flex gap-3 overflow-x-auto">
			{#each productsList as item}
				<a class="card p-4 grid" href="product/{item.id}">
					<div class="placeholder place-self-center" />
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
</div>
