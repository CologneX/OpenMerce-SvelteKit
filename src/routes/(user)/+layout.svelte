<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedInStore } from '$lib/utils/stores';
	import { get } from 'svelte/store';
	if (!get(isLoggedInStore)) {
		goto('/login');
	}
</script>

<slot />
