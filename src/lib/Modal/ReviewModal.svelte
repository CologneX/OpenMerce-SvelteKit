<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';
	import { modalStore } from '@skeletonlabs/skeleton';

	const handlePostReview = async () => {
		const response = await fetch(`/api/v1/customer/order-review`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				order_id: $modalStore[0].meta?.orderID,
				rating: rating,
				review: reviewText
			})
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const responseAgain = await fetch(`/api/v1/customer/order-review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					order_id: $modalStore[0].meta?.orderID,
					rating: rating,
					review: reviewText
				})
			});
			if (responseAgain.ok) {
				triggerToast('Review posted', 'variant-soft');
				modalStore.close();
			} else {
				triggerToast('Error posting review', 'variant-soft-error');
			}
		} else if (response.ok) {
			triggerToast('Review posted', 'variant-soft');
			modalStore.close();
		} else {
			triggerToast('Error posting review', 'variant-soft-error');
		}
	};
	let rating = 1;
	let reviewText = '';
	let ratingDesc = '';
	$: if (rating == 1) {
		ratingDesc = 'Very Bad';
	} else if (rating == 2) {
		ratingDesc = 'Bad';
	} else if (rating == 3) {
		ratingDesc = 'Good';
	} else if (rating == 4) {
		ratingDesc = 'Very Good';
	} else if (rating == 5) {
		ratingDesc = 'Excellent';
	}
	const handleClick = (value: number) => {
		rating = value;
	};
</script>

{#if $modalStore[0]}
	<div class="card w-modal">
		<h4 class="p-4 font-semibold">Review a Product</h4>
		<hr class=" !border" />
		<div class="p-4">
			<div class="flex flex-row gap-4">
				<div class="placeholder w-full h-full aspect-square basis-1/6" />
				<div class="basis-5/6 space-y-4">
					<div class="flex items-center">
						{#each [1, 2, 3, 4, 5] as value}
							<button
								class={value <= rating ? 'text-primary-500' : ''}
								on:click={() => handleClick(value)}
							>
								<Star />
							</button>
						{/each}
						<p>{ratingDesc}</p>
					</div>
					<label class="label">
						<span>Your Review <span class="badge variant-ghost-primary">Required</span></span>
						<textarea rows="5" bind:value={reviewText} class="input resize-y" required />
					</label>
					<div class="text-end">
						<button
							class="btn text-error-500 font-semibold"
							on:click={() => {
								modalStore.close();
							}}>Cancel</button
						>
						<button
							class="btn variant-filled-primary font-semibold"
							on:click={() => {
								handlePostReview();
							}}>Send</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
