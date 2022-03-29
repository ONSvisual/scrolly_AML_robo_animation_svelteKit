<script context="module">
	
	

    export const prerender = true
	import { base, assets } from "$app/paths";


 export async function load({ params, fetch, session, stuff }) {
   const response = await fetch(`${assets}/data/place_data/${params.code}.json`);
   
	let all_data = await response.json()
	
	return {props:{all_data}}
  }
</script>

  <script>
import Component from '$lib/vis/Component.svelte'	  
export let all_data, myNeighbours
let selected
let currentSelect
import items from "$lib/vis/dropdown/src/items.json"
if (all_data){selected =items.find(e=>e.areacd==all_data.CODE); currentSelect=selected}

import neighbours from '$lib/neighbours.js'
myNeighbours={}
Object.keys(neighbours).forEach(e=>myNeighbours[e]=neighbours[e].flat().slice(0,9))

import { afterNavigate, goto } from '$app/navigation';

afterNavigate(
 
)

	import { getContext } from 'svelte'
	//COMPONENTS
	
	import Section from '$lib/layout/Section.svelte'
	import Header from '$lib/layout/Header.svelte'
	import Filler from '$lib/layout/Filler.svelte'
	import Divider from '$lib/layout/Divider.svelte'
	import Toggle from '$lib/ui/Toggle.svelte'
	import Arrow from '$lib/ui/Arrow.svelte'
	import Scroller from '$lib/layout/Scroller.svelte'
	import Dropdown from '$lib/vis/dropdown/src/App.svelte'
	// ARCHIEML AND ROBO
	import robojournalist from '$lib/robojournalist/index.js' //for parsing robojournalism from ArchieML

	import { story_json } from '$lib/story'
	let story
	story = $story_json
	//console.log(story)
	console.log(all_data)
	// SCROLLY IMPORTS
  
	let theme = getContext('theme')
  
	import { step } from '$lib/step.js' //a variable store that tells animated charts when to change
	let count
	let index
	let offset
	let progress
	let top = 0
	let threshold = 0.5
	let bottom = 1
	let components = {}
	let props = {
	  SC1: {},
	  Map1: {},
	}
  
	// CONFIG FOR SCROLLER COMPONENTS
	let id = {} // Object to hold visible section IDs of Scroller components
	let idPrev = {} // Object to keep track of previous IDs, to compare for changes
	let animation
	//$: offset && (offset > 0.5) && disableScroll()// && setTimeout(enableScroll,500)

  
	//$: index && runActions(Object.keys(id)) // Run above code when 'id' object changes
	$: props = {
	  SC1: {},
	  Map1: {},
	}

	let country

$: {country=all_data.CODE[0]; if (country=="E"){all_data.WALES=0} else all_data.WALES=1}



	$: selected!=currentSelect && goto(`/${selected.areacd}`) && function(){currentSelect=selected}
$: console.log("all_data",all_data)

  </script>
  
  {#if all_data && country && story}

  <Header
	bgcolor="#206095"
	bgfixed={true}
	theme={theme}
	center={false}
	short={true}>
	<h1>

	  {@html story[0].headline}
	</h1>
	<p style="margin-top: 20px">09 February 2021</p>
	<br />
	<p class="text-big" style="margin-top: 5px">
	  {@html story[0].lede}
	</p>
	<br />
    
	<div class="ons-field">
		<Dropdown bind:selected={selected} />
	  </div>
	{#if selected}  
	<div style="margin-top: 90px;">
	  <Arrow color="white" {animation}>Scroll to read about {selected.areanm}</Arrow>
	</div>
	{/if}
  </Header>

  {#if selected}  
  
	{#each story as chunk, i}
	  {#if chunk.type === 'Scroller'}
		<Scroller
		  {top}
		  {threshold}
		  {bottom}
		  bind:count
		  bind:index
		  bind:offset
		  bind:progress
		  splitscreen={1}>

		  <div slot="background">


			  <Component 
			  {progress}
			  {offset}
			  {index}
			  {count}
			  family={chunk.family}
			  component={chunk.background}
			  animation={chunk.foreground[index]}
			  {country}
			  {all_data}
			  selected={selected.areacd}
			  >


	</Component>	  

</div>
 
		  <div slot="foreground">
			{#each chunk.foreground as section}
			  <section id={section['data-id']}>
				{#if section.content && typeof section.content == 'object'}
				  <div>
					{#each Object.keys(section.section.content) as type}
					  <svelte:component
						this={components[type]}
						content={section.section.content[type]} 
						/>
					{/each}
				  </div>
				{:else}
				  <div data-id={section['data-id']}>
					<p>
					  {@html robojournalist(section.section.content, all_data)}
					</p>
					{#if section.section.actions["data-description"]}
					<p style="color:blue" class="screen-reader-only">
						{@html robojournalist(section.section.actions["data-description"], all_data)}
					  </p>
					  {/if}
					  {#if section.section.actions["data-title"]}
				<!--	  <p style="color:red">
						  chart title: {@html robojournalist(section.section.actions["data-title"], $all_data)}
						</p>-->
						{/if}
				  </div>

				{/if}
			  </section>
			{/each}
		  </div>
		</Scroller>
	  {/if}
	  {#if chunk.type === 'Filler'}
		<Filler theme="lightblue" short={true} wide={true} center={false}>
		  <p class="text-big">
			{@html robojournalist(chunk.content, all_data)}
		  </p>
		</Filler>
	  {/if}
	{/each}
  {/if}
  
  {/if}