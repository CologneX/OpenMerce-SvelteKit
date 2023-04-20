<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="flex justify-center" transition:fly={{ y: 200, duration: 300 }}>
	<div class="card absolute shadow-lg h-fit w-full max-w-4xl">
		<div class="card-body">
			<div class="p-4 space-y-4">
				<div class="placeholder animate-pulse" />
				<div class="grid grid-cols-3 gap-8">
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
				</div>
				<div class="grid grid-cols-4 gap-4">
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
					<div class="placeholder animate-pulse" />
				</div>
			</div>
		</div>
	</div>
</div>
