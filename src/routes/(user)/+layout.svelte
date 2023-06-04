<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedInStore } from '$lib/utils/stores';
	if (!$isLoggedInStore) {
		goto('/login');
	}
</script>

<slot />
