<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import Next from '$lib/icons/Next.svelte';
	import Prev from '$lib/icons/Prev.svelte';
	import { getBannerMain } from '$lib/utils/banner';
</script>

<div class="shadow-lg">
	{#await getBannerMain()}
		<div class="placeholder h-full w-full animate-pulse aspect-[21/5]" />
	{:then banner}
		<div class="relative group">
			<button
				type="button"
				class="btn-icon absolute variant-filled top-1/2 transform -translate-y-1/2 z-10 -right-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 next"
				on:click={() => {
					const swiper = document.querySelector('.swiper-container')['swiper'];
					swiper.slideNext();
				}}
			>
				<span><Next /></span>
			</button>
			<button
				type="button"
				class="btn-icon variant-filled z-10 absolute top-1/2 transform -translate-y-1/2 -left-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				on:click={() => {
					const swiper = document.querySelector('.swiper-container')['swiper'];
					swiper.slidePrev();
				}}
			>
				<span><Prev /></span>
			</button>
			<swiper-container
				slides-per-group={1}
				slides-per-view={1}
				autoplay={true}
				delay={3000}
				class="rounded-md swiper-container"
				loop={true}
			>
				{#each banner as item}
					<swiper-slide class="flex justify-center items-center">
						<picture class="w-full">
							{#if item}
								<img
									alt={item.image_url}
									height="100%"
									width="100%"
									src="/usercontent/{item.image_url}"
									loading="eager"
									class="object-cover aspect-[21/5] rounded-md w-full"
								/>
							{:else}
								<div class="grid place-items-center">
									<Logo />
									<p class="text-center">No Image Found</p>
								</div>
							{/if}
						</picture>
					</swiper-slide>
				{/each}
			</swiper-container>
		</div>
	{:catch error}
		<div class="flex justify-center items-center h-full">
			<p class="text-2xl text-gray-500">{error.message}</p>
		</div>
	{/await}
</div>
