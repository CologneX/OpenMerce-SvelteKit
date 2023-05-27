<script lang="ts">
	import { goto } from '$app/navigation';
	import { isStaffLoggedInStore } from '$lib/utils/stores';
	if ($isStaffLoggedInStore) {
		goto('/staff');
	} else {
		goto('/staff/login');
	}
</script>

<slot />
