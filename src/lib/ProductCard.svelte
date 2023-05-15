<script lang="ts">
	export let products: Products = {
		id: '',
		name: '',
		price: 0,
		quantity: 0,
		image: '',
		rating: 0
	};
    import Logo from "./icons/Logo.svelte";
    import Star from "./icons/Star.svelte";
</script>

<div class="card">
    <picture class="aspect-square shadow-xl flex justify-center items-center w-full">
        {#if products.image}
            <img src="/usercontent/{products.image}" alt="{products.name}'s image" />
        {:else}
            <div>
                <Logo />
                <p class="text-center">No Image Found</p>
            </div>
        {/if}
    </picture>

    <section class="p-4">
        <h6>{products.name}</h6>
        <h6 class="font-semibold">
            {products.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            })}
        </h6>
    </section>

    <footer class="p-4">
        <hr class="!border-t-2 border-current" />
        <div class="flex items-center">
            <Star />
            <h6>{products.rating}</h6>
        </div>
    </footer>
</div>
