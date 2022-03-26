<script>
  import { onMount } from 'svelte'
  //import {dims} from '$lib/backgroud_dimensions'   
  export let height, width, count=0, index=0, offset=0, progress=0, family="", component, animation="",padding=50, country, data
  import { step } from '$lib/step.js'
  import { tracker } from '$lib/tracker.js'  
  import {story_json} from "$lib/story"
  import Animated_charts from '$lib/vis/animated_charts/src/App.svelte'
  import Football  from '$lib/vis/football/src/App.svelte'
  import Pyramids  from '$lib/vis/animated_pyramids/src/App.svelte' 
  import robojournalist from '$lib/robojournalist'
  import { all_data } from '$lib/stores.js'
  let story =$story_json
//console.log("STORY",story)
  //$: $dims && height=$dims.h, width=$dims.w

  let components = {
    Animated_charts: Animated_charts,
    Football:Football,
    Pyramids:Pyramids
  }

    function updateStep(stp){
      tracker.set(stp)
        return $tracker
    }

    function getStep(){
      return $tracker
    }
function getPadding(){padding=Math.min(...[height/10, width/10]);  return padding}
if(height)getPadding()

</script>

<div class="container" bind:clientHeight={height} bind:clientWidth={width} family={family} component={component}>

{#if height}
{#if animation}<h3 class= "title_over" x={getPadding()} y={padding/2}  >{ robojournalist(animation.section.actions['data-title'],$all_data) }</h3>{/if}
  <svg {height} {width} {count} {index} {offset} {progress} {animation}>
    
<!--  <rect
      x="2"
      y="2"
      width={width -4}
      height={height -4}
      stroke-width="5"
      stroke="black"
      stroke-dasharray="50,50"
      fill="white" />
      <text x="200" y="150">padding: {getPadding()}</text>  
    <text x="200" y="200">height: {height}</text>
    <text x="200" y="250">width: {width}</text>
    <text x="200" y="300">count: {count || 0}</text>
    <text x="200" y="350">index: {index || 0}</text>
    <text x="200" y="400">offset: {offset || 0}</text>
    <text x="200" y="450">progress: {progress || 0}</text>
    <text x="200" y="500">family: {family}</text> 
    <text x="200" y="550">component: {component}</text>

    {#if animation}
    <text x="200" y="600">animation: { updateStep(animation.section.actions['data-id'])}</text>
    <text x="200" y="650">step: {getStep(animation.section.actions['data-id'])}</text>
    <text x="200" y="700">step_change:{$tracker}</text> 
    {/if}  -->
 {#if animation && $all_data}
  <!--<slot step={getStep(animation.section.actions['data-id'])}></slot>-->
  <svelte:component
  this={components[component]}
  {progress}
  {offset}
  {index}
  {count}
  {height}
  {width}
  {padding}
  {country}
  {data}
  family={family}
  component={component}    
  animation={updateStep(animation.section.actions['data-id'])} />
 
  {/if}

  
  </svg>
{/if}
<div class="tooltip" style="opacity:0" ></div>
</div>

<style>

    .container{
        width:100%;
        height:100vh;
    }
    .tooltip {
    position: fixed;
    text-align: center;
    width: fit-content;
    height: fit-content;
    padding: 4px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
  }
  .title_over{
    z-index:10000;
    position:fixed;
    margin:0 5% 0 5% 
  }
</style>