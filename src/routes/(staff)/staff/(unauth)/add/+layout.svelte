<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<a href="/staff/add-product" class="btn w-full">Add Product</a>
	</svelte:fragment>
	<slot />
</AppShell>
