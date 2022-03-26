<script>
	import { themes } from '$lib/config.js';
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
</script>

<section style="color: {theme['text']}; ">
	<div class="col-medium">
		<slot></slot>
	</div>
</section>
