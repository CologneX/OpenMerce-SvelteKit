<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	// check in localstorage if "inv_user" true or not
	// if true, then show the page

	// else, redirect to login page
    onMount(() => {
        if (localStorage.getItem('username')) {
            // do nothing
        } else {
            goto('/staff/login');
        }
    });
</script>

<slot />

