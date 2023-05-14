<script lang="ts">
	interface cartProduct {
		id: string;
		name: string;
		price: number;
		image: string;
		quantityInCart: number;
	}

	const cartProducts: cartProduct[] = [
		{
			id: '1',
			name: 'Product 1',
			price: 100,
			image: 'https://picsum.photos/200',
			quantityInCart: 1
		}
	];
</script>

<svelte:head>
	<title>Cart | OpenMerce</title>
</svelte:head>

<div class="w-full h-full border-2 grid grid-flow-row gap-3">
	{#each cartProducts as item}
		<div class="card">
            
        </div>
	{/each}
</div>
