<script lang="ts">
	import { searchDropdown } from '$lib/utils/search';
	import Logo from '$lib/icons/Logo.svelte';
	export let searchQuery: string = '';
</script>

<div class="card-body p-2 h-full max-h-96 overflow-y-auto">
	<div class="flex flex-col gap-y-2">
		{#if searchQuery !== ''}
			{#await searchDropdown(searchQuery)}
				<div class="card w-full h-24 flex p-2 space-x-4">
					<div class="placeholder aspect-square h-full" />
					<div class="self-center w-full placeholder animate-pulse" />
				</div>
			{:then productsData}
				{#each productsData as items}
					<a class="card w-full h-24 flex p-2 space-x-4" href="/product/{items.id}">
						<picture class="aspect-square h-full">
							{#if items.image}
								<img src="/usercontent/{items.image}" alt={items.name} />
							{:else}
								<div>
									<Logo />
									<p class="text-center">No Image Found</p>
								</div>
							{/if}
						</picture>
						<div class="self-center">
							{#each items.name.split('') as char}
								<span
									class={searchQuery.toLowerCase().includes(char.toLowerCase()) ? 'font-bold' : ''}
									>{char}</span
								>
							{/each}
						</div>
					</a>
				{/each}
			{:catch error}
				<div class="card w-full h-24 flex p-2 space-x-4 justify-center items-center">
					<h3>{error.message}</h3>
				</div>
			{/await}
		{/if}
	</div>
</div>
