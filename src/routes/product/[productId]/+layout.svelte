<script lang="ts">
	let tabSet: number = 0;
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	// scroll to id
	$: if (tabSet == 1) {
		const element = document.getElementById('detail');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	} else if (tabSet == 2) {
		const element = document.getElementById('description');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	} else if (tabSet == 3) {
		const element = document.getElementById('reviews');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- <div class="glass border-2">
    <div class="flex">
        <ol class="flex-1 text-center"><button type="button" class="">Detail</button></ol>
        <ol class="flex-1 text-center"><button type="button" class="">Detail</button></ol>
    </div>
</div> -->
<div class="w-full sticky top-0 z-10 hidden md:flex backdrop-blur">
	<TabGroup flex="flex-1" padding="px-10 py-2">
		<Tab bind:group={tabSet} name="tab1" value={1}>Detail</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>Description</Tab>
		<Tab bind:group={tabSet} name="tab2" value={3}>Reviews</Tab>
	</TabGroup>
</div>

<slot />
