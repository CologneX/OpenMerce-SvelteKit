<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';
	import { modalStore } from '@skeletonlabs/skeleton';

	const handlePostReview = async (rating: number, review: string) => {
		const response = await fetch(`/api/v1/customer/order-review`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				order_id: $modalStore[0].meta?.orderID,
				rating: rating,
				review: review
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
					review: review
				})
			});
			if (responseAgain.ok) {
				triggerToast('Review posted', 'variant-soft');
				modalStore.close();
			} else {
				triggerToast('Error posting review', 'variant-soft-error');
			}
		}
	};
</script>

{#if $modalStore[0]}
	<div
		class="flex flex-col m-4 md:m-10 card w-full max-w-3xl gap-y-6 h-fit max-h-[98%] overflow-auto"
	>
		<h3 class="p-4">Review a Product</h3>
		<hr class="-mx-4 !border"/>
        
	</div>
{/if}
