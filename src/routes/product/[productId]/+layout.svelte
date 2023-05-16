<script lang="ts">
	let tabSet: number = 0;
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
</script>

<div class="hidden md:grid sticky top-0 variant-glass card w-full z-10 grid-cols-2">
	<ol class="breadcrumb">
		<li class="crumb"><a class="anchor" href="/elements/breadcrumbs">Skeleton</a></li>
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<li class="crumb"><a class="anchor" href="/elements/breadcrumbs">Elements</a></li>
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<li>Breadcrumbs</li>
	</ol>

	<TabGroup flex="flex-auto grow w-full" justify="justify-around">
		<Tab bind:group={tabSet} name="productDetail" value={0}>Product Detail</Tab>
		<Tab bind:group={tabSet} name="description" value={1}>Description</Tab>
		<Tab bind:group={tabSet} name="review" value={2}>Review</Tab>
	</TabGroup>
</div>
<slot />
