<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import MinusSmall from '$lib/icons/MinusSmall.svelte';
	import PlusSmall from '$lib/icons/PlusSmall.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { getCart, handleCheckItem, handleDeleteItem, handleEditItemStock } from '$lib/utils/cart';
	import { lazyLoad } from '$lib/utils/lazyLoad';
	import { screenWidthStore, subTotalStore, totalItemsStore } from '$lib/utils/stores';
	import { rupiahCurrency } from '$lib/utils/units';
	import type { CartProducts } from '../../app';

	let cartContent: CartProducts[];
	let timeoutId: ReturnType<typeof setTimeout>;

	const loadProducts = async () => {
		cartContent = await getCart();
		updateSubTotal();
	};
	const updateSubTotal = () => {
		$subTotalStore = cartContent.reduce((acc, cur) => {
			if (cur.checked) {
				return acc + cur.price * cur.quantity;
			}
			return acc;
		}, 0);
		$totalItemsStore = cartContent.reduce((acc, cur) => {
			if (cur.checked) {
				return acc + cur.quantity;
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

	const handleItemStock = async (id: string, quantity: number) => {
		if (quantity > 0) {
			updateCartContent(id, quantity);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				await handleEditItemStock(id, quantity);
				cartContent = await getCart();
				updateSubTotal();
			}, 500);
		}
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

<div class="grid grid-flow-row gap-y-2 overflow-hidden">
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
				<div class="flex flex-row {$screenWidthStore > 1024 ? 'gap-x-6' : 'gap-x-2'} p-3">
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							aria-label="Check item"
							bind:checked={item.checked}
							on:click={() => handleItemCheck(item.id, !item.checked)}
						/>
					</label>
					<picture class="flex justify-center items-center rounded">
						{#if item.image}
							<a href="/product/{item.id}" class="unstyled"
								><img
									loading="lazy"
									use:lazyLoad={`/usercontent/${item.image}`}
									alt="{item.name}'s image"
									class="rounded object-cover aspect-square w-full max-w-32 h-full max-h-32"
									width="100%"
									height="100%"
									title={item.name}
								/>
							</a>
						{:else}
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						{/if}
					</picture>
					<div class=" w-full flex flex-col">
						<a href="/product/{item.id}" class="text-ellipsis unstyled">{item.name}</a>
						<h6 class="font-semibold">
							{rupiahCurrency(item.price)}
						</h6>
					</div>
				</div>
				<div class="flex">
					<button class="text-sm flex-1 text-start">Move to Wishlist</button>
					<div class="justify-end flex {$screenWidthStore > 1024 ? 'gap-x-5' : 'gap-x-2'}">
						<button
							class="btn-icon btn-icon-sm {$screenWidthStore > 1024 ? 'w-8' : 'w-6'}"
							type="button"
							aria-label="Delete Product"
							on:click|preventDefault={() => handleItemDelete(item.id)}
						>
							<Trash />
						</button>
						{#if $screenWidthStore > 1024}
							<div><span class=" divider-vertical h-full !border" /></div>
						{/if}
						<div class="input-group grid-cols-[auto_1fr_auto] w-fit">
							<button
								class="btn btn-sm text-primary-500 p-0"
								disabled={item.quantity < 1}
								on:click|preventDefault={() => handleItemStock(item.id, item.quantity - 1)}
							>
								<span><MinusSmall /></span>
							</button>
							<input
								type="number"
								class="input w-8 p-0 text-center"
								bind:value={item.quantity}
								on:change|preventDefault={() => handleItemStock(item.id, item.quantity)}
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
								class="btn btn-sm text-primary-500 p-0"
								on:click|preventDefault={() => handleItemStock(item.id, item.quantity + 1)}
								disabled={item.quantity >= item.curr_stock}
							>
								<span><PlusSmall /></span>
							</button>
						</div>
					</div>
				</div>
				<hr class="!border-t-4" />
			{/each}{/if}
	{:catch error}
		<h2 class="text-center">{error.message}</h2>
	{/await}
</div>
