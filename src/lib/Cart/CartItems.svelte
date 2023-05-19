<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { getCart, handleDeleteItem } from '$lib/utils/cart';
	import { lazyLoad } from '$lib/utils/lazyLoad';
</script>

<div class="grid grid-flow-row gap-y-2">
	{#await getCart()}
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
	{:then products}
		{#each products as item}
			<div class="card flex flex-row gap-x-2 p-3">
				<label class="flex items-center space-x-2">
					<input
						class="checkbox"
						type="checkbox"
						on:change={() => {
							console.log(item.checked);
						}}
						aria-label="Check item"
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
						{item.price.toLocaleString('id-ID', {
							style: 'currency',
							currency: 'IDR',
							minimumFractionDigits: 0
						})}
					</h6>
					<div class="flex justify-end gap-x-5">
						<button
							class="btn-icon btn-icon-sm h-full"
							type="button"
							aria-label="Delete Product"
							on:click={() => handleDeleteItem(item.id)}
						>
							<Trash />
						</button>
						<div><span class=" divider-vertical h-full !border-2" /></div>
						<button class="btn-icon btn-icon-sm h-full" type="button" aria-label="Delete product">
							<MinusCircle />
						</button>
						<input
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							class="input w-8 p-0 text-center h-full"
							value={item.quantity}
							aria-label="Quantity"
						/>
						<button class="btn-icon btn-icon-sm h-full" type="button" aria-label="Add product">
							<PlusCircle />
						</button>
					</div>
				</div>
			</div>
		{/each}
	{:catch error}
		<h2 class="text-center">{error.message}</h2>
	{/await}
</div>
