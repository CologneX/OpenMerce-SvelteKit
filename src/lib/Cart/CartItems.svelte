<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import MinusSmall from '$lib/icons/MinusSmall.svelte';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { getCart, handleCheckItem, handleDeleteItem, handleEditItem } from '$lib/utils/cart';
	import { lazyLoad } from '$lib/utils/lazyLoad';
	import { screenWidthStore, subTotalStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';
	import type { CartProducts } from '../../app';
	// export let checkAll: boolean;
	let cartContent: CartProducts[];
	let timeoutId: ReturnType<typeof setTimeout>;

	const loadProducts = async () => {
		cartContent = await getCart();
		return cartContent;
	};
	const updateSubTotal = () => {
		$subTotalStore = cartContent.reduce((acc, cur) => {
			if (cur.checked) {
				return acc + cur.price * cur.quantity;
			}
			return acc;
		}, 0);
	};

	const updateCartContent = (id: string, quantity: number) => {
		const itemIndex = cartContent.findIndex((item) => item.id === id);
		if (itemIndex !== -1) {
			cartContent[itemIndex].quantity = quantity;
		}
	};

	const handleItem = async (id: string, quantity: number) => {
		updateCartContent(id, quantity);
		clearTimeout(timeoutId);
		timeoutId = setTimeout(async () => {
			await handleEditItem(id, quantity);
			cartContent = await getCart();
		}, 1500);
	};

	const handleItemDelete = async (id: string) => {
		await handleDeleteItem(id);
		await loadProducts();
		updateSubTotal();
	};

	const handleItemCheck = async (id: string, state: boolean) => {
		await handleCheckItem(id, state);
		updateSubTotal();
	};
</script>

<div class="grid grid-flow-row gap-y-2">
	{#await loadProducts()}
		<div class="card flex flex-row gap-x-2 p-3">
			<div class="flex items-center space-x-2">
				<div class="placeholder aspect-square animate-pulse" />
			</div>
			<div class="aspect-square shadow-xl placeholder h-32 rounded animate-pulse" />
			<div class="w-full grid grid-rows-3">
				<div class="placeholder w-3/4 animate-pulse" />
				<div class="placeholder w-1/4 animate-pulse" />
				<div class="flex justify-end gap-x-5">
					<div class="placeholder h-full aspect-square animate-pulse" />
					<div><span class=" divider-vertical h-full !border-2 animate-pulse" /></div>
					<div class="placeholder h-full aspect-square animate-pulse" />
					<div class="placeholder h-full aspect-square animate-pulse" />
					<div class="placeholder h-full aspect-square animate-pulse" />
				</div>
			</div>
		</div>
	{:then}
		{#if cartContent}
			{#each cartContent as item}
				<div class="card flex flex-row gap-x-2 p-3">
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							aria-label="Check item"
							bind:checked={item.checked}
							on:click={() => handleItemCheck(item.id, !item.checked)}
						/>
					</label>
					<picture class="aspect-square shadow-xl flex justify-center items-center h-32 rounded">
						{#if item.image}
							<a href="/product/{item.id}" class="unstyled"
								><img
									loading="lazy"
									use:lazyLoad={`/usercontent/${item.image}`}
									alt="{item.name}'s image"
									class="rounded"
									width="100%"
									height="100%"
									title={item.name}
								/></a
							>
						{:else}
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						{/if}
					</picture>
					<div class="w-full grid grid-rows-3">
						<a href="/product/{item.id}" class="unstyled"><h5>{item.name}</h5></a>
						<h6 class="font-semibold">
							{rupiahCurrency(item.price)}
						</h6>
						<div class="flex justify-end {$screenWidthStore > 1024 ? 'gap-x-5' : 'gap-x-2'}">
							<button
								class="btn-icon btn-icon-sm {$screenWidthStore > 1024 ? 'w-8' : 'w-6'}"
								type="button"
								aria-label="Delete Product"
								on:click|preventDefault={() => handleItemDelete(item.id)}
							>
								<Trash />
							</button>
							{#if $screenWidthStore > 1024}
								<div><span class=" divider-vertical h-full !border-2" /></div>
							{/if}
							<div class="input-group grid-cols-[auto_1fr_auto] w-fit">
								<button
									class="btn btn-sm text-primary-500"
									disabled={item.quantity < 1}
									on:click|preventDefault={() => handleItem(item.id, item.quantity - 1)}
								>
									<span><MinusSmall /></span>
								</button>
								<input
									type="number"
									class="input w-8 p-0 text-center"
									bind:value={item.quantity}
									on:change|preventDefault={() => handleItem(item.id, item.quantity)}
									on:input|preventDefault={() => {
										if (item.quantity < 0) {
											item.quantity = 0;
										} else if (item.quantity > item.curr_stock) {
											item.quantity = item.curr_stock;
										}
									}}
									on:keypress={(e) => {
										if (e.key.match(/[^0-9]/g)) {
											e.preventDefault();
										}
									}}
								/>
								<button
									class="btn btn-sm text-primary-500"
									on:click|preventDefault={() => handleItem(item.id, item.quantity + 1)}
									disabled={item.quantity >= item.curr_stock}
								>
									<span><PlusSmall /></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}{/if}
	{:catch error}
		<h2 class="text-center">{error.message}</h2>
	{/await}
</div>
