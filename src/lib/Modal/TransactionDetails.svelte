<script lang="ts">
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { OrderDetail } from '../../app';
	import { rupiahCurrency } from '$lib/utils/units';
	const handleGetTransactionDetails = async () => {
		const response = await fetch(`/api/v1/customer/order?id=${$modalStore[0].meta?.orderID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const responseAgain = await fetch(
				`/api/v1/customer/order?id=${$modalStore[0].meta?.orderID}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			if (responseAgain.ok) {
				const data: OrderDetail = await response.json();
				return data;
			} else {
				throw new Error('Cannot load data, sorry :)');
			}
		} else if (response.ok) {
			const data: OrderDetail = await response.json();
			return data;
		} else {
			throw new Error('Cannot load data, sorry :)');
		}
	};
</script>

{#if $modalStore[0]}
	<div
		class="flex flex-col m-4 md:m-10 card w-full max-w-3xl gap-y-6 h-fit max-h-[98%] overflow-auto"
	>
		<h4 class="font-bold px-4 pt-4 md:p-10">Transaction Detail</h4>
		<hr class="!border-2" />

		{#await handleGetTransactionDetails()}
			<div class="px-4 md:px-10 space-y-2">
				<div class="placeholder animate-pulse" />
				<hr />
				<div class="flex">
					<div class="flex-1 text-xs md:text-base">Order date:</div>
					<div class="placeholder animate-pulse flex-1" />
				</div>
			</div>
			<hr class="!border-2" />
			<div class="px-4 md:px-10">
				<h5 class="font-semibold pb-2">Product Detail</h5>
				<div class="card drop-shadow-lg rounded p-2 md:p-4">
					<div class="flex flex-row h-full space-x-2">
						<div class="placeholder animate-pulse aspect-square basis-1/5 h-full w-full" />
						<div class=" flex flex-col w-full basis-4/5">
							<div class="space-y-2">
								<div class="placeholder animate-pulse w-1/3" />
								<div class="placeholder animate-pulse w-2/3" />
								<div class="placeholder animate-pulse w-1/4" />
							</div>
						</div>
					</div>
					<hr class="my-2" />
					<div class="w-full flex h-full mt-2 justify-end">
						<div class="placeholder animate-pulse w-1/3" />
						<div class="space-x-2 md:space-x-4 flex justify-end w-full">
							<button class="btn btn-sm md:btn variant-filled-primary font-bold md:px-20" disabled
								>Review</button
							>
						</div>
					</div>
				</div>
			</div>
			<hr class="!border-2" />
			<div class="px-4 md:px-10">
				<h5 class="font-semibold pb-2">Delivery Info</h5>
				<div class="y-2 md:y-4 flex">
					<div class="basis-1/4 space-y-2">
						<div class="text-xs md:text-base">Courier</div>
						<div class="text-xs md:text-base">Tracking Code</div>
						<div class="text-xs md:text-base">Address</div>
					</div>
					<div class="basis-3/4 space-y-2">
						<div class="placeholder animate-pulse w-2/3" />
						<div class="placeholder animate-pulse" />
						<div class="space-y-1">
							<div class="placeholder animate-pulse w-1/2" />
							<div class="placeholder animate-pulse" />
							<div class="placeholder animate-pulse" />
						</div>
					</div>
				</div>
			</div>
			<hr class="!border-2" />
			<div class="px-4 md:px-10 pb-4">
				<h5 class="font-semibold pb-2">Payment Info</h5>
				<div class="y-2 md:y-4 flex">
					<div class="basis-1/4 space-y-2 text-xs md:text-base">Payment Method</div>
					<div class="basis-3/4 space-y-1">
						<div class="placeholder animate-pulse w-1/2" />
						<div class="placeholder animate-pulse" />
					</div>
				</div>
				<hr class="my-2" />
				<div class="y-2 md:y-4 flex">
					<div class="basis-3/5 space-y-2">
						<div class="text-xs md:text-base">Total Price</div>
						<div class="text-xs md:text-base">Total Shipping</div>
					</div>
					<div class="basis-2/5 space-y-2">
						<div class="placeholder animate-pulse" />
						<div class="placeholder animate-pulse" />
					</div>
				</div>
				<hr class="my-2" />
				<div class="y-2 md:y-4 flex">
					<div class="basis-1/2">
						<h5 class="font-semibold pb-2">Grand Total</h5>
					</div>
					<div class="basis-1/2">
						<div class="placeholder animate-pulse" />
					</div>
				</div>
				<p class="text-xs md:text-base">
					Not including application service fees and other costs.
					<a
						href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
						class="font-bold text-primary-500 unstyled">See T&C</a
					>
				</p>
			</div>
		{:then data}
			<div class="px-4 md:px-10 space-y-2">
				<div class="font-semibold">
					{data.status.charAt(0).toUpperCase() + data.status.slice(1)}
				</div>
				<hr />
				<div class="flex">
					<div class="flex-1 text-xs md:text-base">Order date:</div>
					<div class="text-sm md:text-base">{data.created_at}</div>
				</div>
			</div>
			<hr class="!border-2" />
			<div class="px-4 md:px-10">
				<h5 class="font-semibold pb-2">Product Detail</h5>
				<div class="space-y-2">
					{#each data.item_list as item}
						<div class="card drop-shadow-lg rounded p-2 md:p-4">
							<div class="flex flex-row h-full space-x-2">
								{#if item.image}
									<img
										src="/usercontent/{item.image}"
										alt={item.image}
										class="aspect-square basis-1/5 flex-initial w-20 rounded-md"
									/>
								{:else}
									<img
										src="placeholder.png"
										alt={item.image}
										class="aspect-square basis-1/5 flex-initial w-20 rounded-md"
									/>
								{/if}
								<div class=" flex flex-col w-full basis-4/5">
									<div class="space-y-2">
										<div class="text-xs md:text-base font-semibold">{item.name}</div>
										<div class="text-xs md:text-base">
											{item.quantity} x {rupiahCurrency(item.price)}
										</div>
									</div>
								</div>
							</div>
							<hr class="my-2" />
							<div class="w-full flex h-full mt-2 justify-end">
								<div class="text-xs md:text-base font-thin">
									Total: <div class="text-xs md:text-base font-semibold">
										{rupiahCurrency(item.price * item.quantity)}
									</div>
								</div>

								<div class="space-x-2 md:space-x-4 flex justify-end w-full">
									<button
										class="btn btn-sm md:btn variant-filled-primary font-bold md:px-20"
										disabled={item.reviewed}>Review</button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<hr class="!border-2" />
			<div class="px-4 md:px-10">
				<h5 class="font-semibold pb-2">Delivery Info</h5>
				<div class="y-2 md:y-4 flex">
					<div class="basis-1/4 space-y-2">
						<div class="text-xs md:text-base">Courier</div>
						{#if data.tracking_code}
							<div class="text-xs md:text-base">Tracking Code</div>
						{/if}
						<div class="text-xs md:text-base">Address</div>
					</div>
					<div class="basis-3/4 space-y-2">
						<div class="text-xs md:text-base">{data.courier}</div>
						{#if data.tracking_code}
							<div class="text-xs md:text-base">{data.tracking_code}</div>
						{/if}
						<div class="text-xs md:text-base">
							<div class="font-semibold">{data.address_detail.recipient_name}</div>
							<div>{data.address_detail.phone_number}</div>
							<div>{data.address_detail.full_address}</div>
							<div>{data.address_detail.shipping_area}</div>
						</div>
					</div>
				</div>
			</div>
			<hr class="!border-2" />
			<div class="px-4 md:px-10 pb-4">
				<h5 class="font-semibold pb-2">Payment Info</h5>
				<div class="y-2 md:y-4 flex">
					<div class="basis-1/4 space-y-2 text-xs md:text-base">Payment Method</div>
					<div class="basis-3/4 space-y-1">
						<div class="text-xs md:text-base">{data.payment_type.replace('_', ' ')}</div>
					</div>
				</div>
				<hr class="my-2" />
				<div class="y-2 md:y-4 flex">
					<div class="basis-3/5 space-y-2">
						<div class="text-xs md:text-base">Total Price</div>
						<div class="text-xs md:text-base">Total Shipping</div>
					</div>
					<div class="basis-2/5 space-y-2 text-end">
						<div class="text-xs md:text-base">{rupiahCurrency(data.item_cost)}</div>
						<div class="text-xs md:text-base">{rupiahCurrency(data.shipping_cost)}</div>
					</div>
				</div>
				<hr class="my-2" />
				<div class="md:y-4 flex pb-2">
					<div class="basis-1/2">
						<h5 class="font-semibold">Grand Total</h5>
					</div>
					<div class="basis-1/2 text-end">
						<div class="text-xs md:text-base font-semibold">
							{rupiahCurrency(data.total_cost)}
						</div>
					</div>
				</div>
				<p class="text-xs md:text-base">
					Not including application service fees and other costs.
					<a
						href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
						class="font-bold text-primary-500 unstyled">See T&C</a
					>
				</p>
			</div>
		{/await}
	</div>
{/if}
