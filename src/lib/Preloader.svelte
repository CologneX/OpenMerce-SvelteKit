<script>
	import Logo from '$lib/icons/Logo.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg" transition:fade>
	<div class="text-center animate-pulse">
		<Logo height={"28"}/>
	</div>
</div>
