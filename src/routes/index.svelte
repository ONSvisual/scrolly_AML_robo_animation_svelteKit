<!--<script context="module">
  export const prerender = true
  import { assets } from '$app/paths'
  import data from "$lib/allData.js"
  import { all_data } from '$lib/stores.js' //the data store for hydrating robojournalism and charts
  all_data.set(data)

</script>

<script>
  //DATA

  import { getContext } from 'svelte'
  //COMPONENTS
  import Component from '$lib/vis/Component.svelte'
  import Section from '$lib/layout/Section.svelte'
  import Header from '$lib/layout/Header.svelte'
  import Filler from '$lib/layout/Filler.svelte'
  import Divider from '$lib/layout/Divider.svelte'
  import Toggle from '$lib//ui/Toggle.svelte'
  import Arrow from '$lib/ui/Arrow.svelte'
  import Scroller from '$lib/layout/Scroller.svelte'
  import Lookup from '$lib/vis/Lookup/App.svelte'
  // ARCHIEML AND ROBO
  import robojournalist from '$lib/robojournalist' //for parsing robojournalism from ArchieML
  import { story_json } from '$lib/story'
  let story
  story = $story_json
  console.log(story)
  console.log($all_data)

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
let height,width
  // CONFIG FOR SCROLLER COMPONENTS
  let id = {} // Object to hold visible section IDs of Scroller components
  let idPrev = {} // Object to keep track of previous IDs, to compare for changes
  let animation
  //$: offset && (offset > 0.5) && disableScroll()// && setTimeout(enableScroll,500)
  function runActions(codes = []) {
    codes.forEach((code) => {
      if (id[code] != idPrev[code]) {
        step.set(id[code])
        console.log(code)
        idPrev[code] = id[code]
      }
    })
    //console.log("CODES",codes)
  }


  $: index && runActions(Object.keys(id)) // Run above code when 'id' object changes
  $: props = {
    SC1: {},
    Map1: {},
  }
</script>



{#if data}
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

  <p>
    <Toggle
      label="Animation {animation ? 'on' : 'off'}"
      mono={true}
      bind:checked={animation} />
  </p>
  <div style="margin-top: 90px;">
    <Arrow color="white" {animation}>Scroll to begin</Arrow>
  </div>
</Header>
<Filler
  className="nutgraf"
  style="height:100vh"
  theme="lightblue"
  short={true}
  wide={true}
  center={false}>
  <p class="text-big">
    {@html story[0].nutgraf}
  </p>

</Filler>


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
          <svelte:component
            this={Component}
            {progress}
            {offset}
            {index}
            {count}
            family={chunk.family}
            component={chunk.background}
            animation={chunk.foreground[index]} 
            bind:clientHeight={height} 
            bind:clientWidth={width}
            {height}
            {width}
            />
        </div>

        <div slot="foreground">
          {#each chunk.foreground as section}
            <Section id={section['data-id']}>
              {#if section.content && typeof section.content == 'object'}
                <div class="col-medium">
                  {#each Object.keys(section.section.content) as type}
                    <svelte:component
                      this={components[type]}
                      content={section.section.content[type]} />
                  {/each}
                </div>
              {:else}
                <div class="col-medium" data-id={section['data-id']}>
                  <p>
                    {@html robojournalist(section.section.content, $all_data)}
                  </p>
                </div>
              {/if}
            </Section>
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

    -->