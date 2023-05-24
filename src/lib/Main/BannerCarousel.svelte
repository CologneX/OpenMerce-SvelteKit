<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import { getBannerMain } from '$lib/utils/banner';
</script>

<div class="w-full space-y-2 shadow-lg">
	{#await getBannerMain()}
		<div class="placeholder h-full w-full animate-pulse" />
	{:then banner}
		<swiper-container
			navigation={true}
			slides-per-group={1}
			autoplay={true}
			delay={3000}
			grab-cursor={true}
			class="h-full w-full"
			loop={true}
		>
			{#each banner as item}
				<swiper-slide class=" flex justify-center items-center object-cover aspect-[21/5]">
					<picture>
						{#if item}
							<img
								alt={item.image_url}
								height="100%"
								width="100%"
								src="/usercontent/{item.image_url}"
								loading="eager"
								class="object-cover"
							/>
						{:else}
							<div>
								<Logo />
								<p class="text-center">No Image Found</p>
							</div>
						{/if}
					</picture>
				</swiper-slide>
			{/each}
		</swiper-container>
	{:catch error}
		<div class="flex justify-center items-center h-full">
			<p class="text-2xl text-gray-500">{error.message}</p>
		</div>
	{/await}
</div>
