<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedInStore } from '$lib/utils/stores';
	import { onMount } from 'svelte';
	// onMount(() => {
	// 	if ($isLoggedInStore == false) {
	// 		goto('/login');
	// 	}
	// });
</script>

<slot />
