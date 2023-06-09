<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	import { each } from 'svelte/internal';

	export let productId: string;

	const handleGetReviewProduct = async () => {
		const response = await fetch(`/api/v1/product-review?id=${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else if (response.status === 404) {
			return null;
		} else {
			throw new Error('Something went wrong');
		}
	};
</script>

{#await handleGetReviewProduct()}
	<div class="p-4 rounded-md border border-primary-500 space-y-2">
		<div class="placeholder animate-pulse" />
		<div class="placeholder animate-pulse w-1/3" />
		<div class="placeholder animate-pulse w-2/4" />
	</div>
{:then data}
	{#if data}
		{#each data as item}
			<div class="p-4 rounded-md border border-primary-500 space-y-2 flex flex-row">
				<div class="basis-1/5 sticky top-4">
					<img
						src="/placeholder.png"
						alt="avatar"
						class="rounded-full aspect-square w-full h-full"
					/>
				</div>
				<div class="w-full space-y-2">
					<div class="inline-flex">
						<!-- foreach <Star/> on item.rating -->
						{#each Array.from({ length: item.rating }, (_, i) => i) as _, i}
							<Star />
						{/each}
					</div>
					<p class="font-semibold text-ellipsis">{item.customer}</p>
					<p class="text-sm text-ellipsis">
						{item.review}
					</p>
				</div>
			</div>
		{/each}
	{:else}
		<div class="p-4 rounded-md border border-primary-500 space-y-2">
			<p class="text-center font-semibold text-lg">No review yet, be the first one :)</p>
		</div>
	{/if}
{/await}
