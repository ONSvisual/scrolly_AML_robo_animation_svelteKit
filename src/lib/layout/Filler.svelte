<script>
	import { themes } from '$lib/config.js';
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
	export let center = true;
	export let wide = true;

</script>

<style>
	section {
		padding: 36px 0;
	}
	.short {
		min-height: 70vh;
	}
</style>

<section style="color: {theme['text']}; background-color: {theme['background']};">
	<div class="middle" class:center class:col-medium={!wide} class:col-wide={wide} >
		<slot></slot>
	</div>
</section>
