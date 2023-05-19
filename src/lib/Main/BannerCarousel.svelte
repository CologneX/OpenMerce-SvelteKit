<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import { getBannerMain } from '$lib/utils/banner';
	import { lazyLoad } from '$lib/utils/lazyLoad';
</script>

<div class="w-full space-y-2">
	<div class="aspect-[21/5]">
		{#await getBannerMain()}
			<div class="placeholder h-full w-full animate-pulse" />
		{:then banner}
			<swiper-container
				navigation={true}
				slides-per-group={1}
				autoplay={true}
				delay={2000}
				grab-cursor={true}
				class="h-full w-full"
			>
				{#each banner as item}
					<swiper-slide class="shadow-lg flex justify-center items-center">
						<picture>
							{#if item}
								<img
									alt={item.image_url}
									height="100%"
									width="100%"
									src="/usercontent/{item.image_url}"
									loading="eager"
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
			<div class="flex justify-center items-center h-screen">
				<p class="text-2xl text-gray-500">{error}</p>
			</div>
		{/await}
	</div>
</div>
