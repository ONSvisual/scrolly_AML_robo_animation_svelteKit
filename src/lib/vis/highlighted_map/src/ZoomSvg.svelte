<script>
  import { onMount } from 'svelte'
	import {zm} from "$lib/zm"
  import {step} from '$lib/step'  
  import Key from './Key.svelte'
  export let viewBox = `0 0 {width} {height}`, height, width, key=true, all_data
	export let svg,x,y,k

</script>
{#if width && all_data}
<svg id="canvas" viewBox={viewBox} height={height} width={width} bind:this={svg} zm={$zm}>

  <g transform="translate({$x}, {$y}) scale({$k})" id="zoomable">
    <slot></slot>
  </g>
  {#if key}
  <Key percent={true} width={width} height={height} key='percentage growth' uk=7.9 place={all_data.LA.PC_CHANGE.FROM01TO11} name={all_data.NAME} max=30 min={-5} step={$step}></Key>  
  {/if}
</svg>
{/if}
<style>
  #canvas {
position: absolute;
right:0;
height:100vh;
width:100vh;
  }
</style>