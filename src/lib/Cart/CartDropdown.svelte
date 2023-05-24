<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import { getCart } from '$lib/utils/cart';
	import { isLoggedInStore } from '$lib/utils/stores';
</script>

<header class=" grid grid-cols-2">
	<p class="text-start">Your Cart</p>
	<p class="font-semibold text-end">Cart</p>
</header>
<section class="flex items-center justify-center">
	{#if !$isLoggedInStore}
		<p>Please log in to start purchasing :)</p>
	{:else}
		<div class="flex flex-col gap-y-2 w-full overflow-y-auto">
			{#await getCart() then cartProducts}
				{#each cartProducts as cartProduct}
					<a class="card w-full h-24 flex p-2 space-x-4 shadow-xl" href="/product/{cartProduct.id}">
						<picture class="aspect-square h-full grid place-content-center">
							{#if cartProduct.image}
								<img src="/usercontent/{cartProduct.image}" alt={cartProduct.name} />
							{:else}
								<Logo />
								<small class="text-center">No Image Found</small>
							{/if}
						</picture>
						<div class="self-center">
							{cartProduct.name}
						</div>
					</a>
				{/each}
			{:catch error}
				<div class="card w-full h-24 flex p-2 space-x-4 justify-center items-center">
					<h3>{error.message}</h3>
				</div>
			{/await}
		</div>
	{/if}
</section>
