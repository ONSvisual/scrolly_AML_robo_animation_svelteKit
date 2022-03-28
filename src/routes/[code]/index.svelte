<script context="module">
    export const prerender = true
	import {writable} from 'svelte/store'
	import { base, assets } from "$app/paths";
	//import data from "$lib/allData.js"

	import { all_data } from '$lib/stores.js' //the data store for hydrating robojournalism and charts
	//all_data.set(data)
	import { page } from '$app/stores';
	export let selected,test
	//import neighbours from '$lib/neighbours.js'
	let a
	let b

 export async function load({ params, fetch, session, stuff }) {
   const response = await fetch(`${assets}/data/place_data/${params.code}.json`);
   	test=params.code
   	a = await import ('$lib/neighbours.json');
  	b = a.default;


   //console.log("code",b)
   selected=params.code
  
   let data = await response.json()
   //console.log(data)
   let myNeighbours={};
   Object.keys(b).forEach(e=>myNeighbours[e]=b[e].flat().slice(0,9))

   return {props:{data,myNeighbours,test}}
  }
  //console.log(page)


</script>

  <script>

	let selection
	import { afterNavigate, goto } from '$app/navigation';
	import lookup from '$lib/lookup.js'

	$: selected //&& console.log(`${base}/${selected}`)
 	export let data, myNeighbours
	 //console.log("myNeighbours",myNeighbours)
	all_data.set(data)


	const country = data.CODE[0] 
	//console.log("countrty", country)

	import { getContext } from 'svelte'
	//COMPONENTS
	import Component from '$lib/vis/Component.svelte'
	import Section from '$lib/layout/Section.svelte'
	import Header from '$lib/layout/Header.svelte'
	import Filler from '$lib/layout/Filler.svelte'
	import Divider from '$lib/layout/Divider.svelte'
	import Toggle from '$lib/ui/Toggle.svelte'
	import Arrow from '$lib/ui/Arrow.svelte'
	import Scroller from '$lib/layout/Scroller.svelte'
	import Dropdown from '$lib/vis/dropdown/src/App.svelte'
	// ARCHIEML AND ROBO
	import robojournalist from '$lib/robojournalist' //for parsing robojournalism from ArchieML
	import { story_json } from '$lib/story'
	let story
	story = $story_json
	//console.log(story)
	//console.log($all_data)
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

	$: selection && goto(`/${selection}`)
  </script>
  

  
  {#if data && country && story}
  {story}
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
		<Dropdown bind:selection={selection}/>
	  </div>
	<div style="margin-top: 90px;">
	  <Arrow color="white" {animation}>Scroll to begin</Arrow>
	</div>
  </Header>

  
  
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
			  {data}
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
					  {@html robojournalist(section.section.content, $all_data)}
					</p>
					{#if section.section.actions["data-description"]}
					<p style="color:blue" class="screen-reader-only">
						{@html robojournalist(section.section.actions["data-description"], $all_data)}
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
			{@html robojournalist(chunk.content, $all_data)}
		  </p>
		</Filler>
	  {/if}
	{/each}
  {/if}
  
  