<script lang="ts">
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
	{#each data as item}
		<div class="p-4 rounded-md border border-primary-500 space-y-2">
			<p class="font-semibold text-ellipsis">{item.name}</p>
		</div>
	{/each}
{/await}
