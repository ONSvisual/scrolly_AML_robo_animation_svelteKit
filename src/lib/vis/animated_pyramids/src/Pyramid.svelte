<script>
  import { interpolateViridis } from 'd3-scale-chromatic'
  import { extent } from 'd3-array'
  let bars,newBars,newKey
  //let extent
  import pyramidStore from './pyramid'
  import comparisonStore from './comparison'
 
console.log("PYRAMID_STORE",$pyramidStore)
console.log("COMPARISON_STORE",$comparisonStore)  
import { all_data } from '../../../stores.js'
//import AgeComparison from '../../age_growth_comparison/src/App.svelte'
import { step } from '../../animated_charts/src/step'
import { writable } from 'svelte/store';
let trigger=writable()
trigger.set("bars")
export let request, height, width, padding, w, w_change, la_change_blended, country_change_blended, country_change_divided, la_change_divided;

let f = height>width?(height-(padding*1.5))/18:(height-(padding*2))/18

/*
let comparisons={
c1: $all_data.COUNTRY.OVER65.ABS.Y11-COUNTRY.OVER65.ABS.Y01/COUNTRY.OVER65.ABS.Y01*100,
c2: $all_data.COUNTRY.WORKING.ABS.Y11-COUNTRY.WORKING.ABS.Y01/COUNTRY.WORKING.ABS.Y01*100,
c3: $all_data.COUNTRY.UNDER20.ABS.Y11-COUNTRY.UNDER20.ABS.Y01/COUNTRY.UNDER20.ABS.Y01*100,
l1: $all_data.COUNTRY.OVER65.ABS.Y11-COUNTRY.OVER65.ABS.Y01/COUNTRY.OVER65.ABS.Y01*100,
l2: $all_data.COUNTRY.WORKING.ABS.Y11-COUNTRY.WORKING.ABS.Y01/COUNTRY.WORKING.ABS.Y01*100,
l3: $all_data.COUNTRY.UNDER20.ABS.Y11-COUNTRY.UNDER20.ABS.Y01/COUNTRY.UNDER20.ABS.Y01*100
}*/

  $: {




    bars = []
    newBars = []
    let ext = extent($pyramidStore[0].concat($pyramidStore[1]))

    for (let i in $pyramidStore[0]) {
      let e = $pyramidStore[0][i]
      bars.push({
        x: (width/2)-(e * w) - (f/2),
        y: f + i * f,
        width: e * w,
        height: f - 4,
        sex: 'f',
        value: e,
        agegroup: '',
        fill: interpolateViridis(1 - (e - ext[0]) / (ext[1] - ext[0])),
      })
    }
    for (let i in $pyramidStore[1]) {
      let e = ($pyramidStore[0][i] + $pyramidStore[0][i]) / 2
      bars.push({
        x: width/2 + 4 - (f/2),
        y: f + i * f,
        width: 2 * f,
        height: f - 4,
        sex: 'm',
        value: 0,
        agegroup: `${(18 - i) * 5} ${
          i == 0 ? '+' : 'to ' + ((18 - i) * 5 + 4)
        }`,
        fill: 'slategrey',
      })
    }
    for (let i in $pyramidStore[1]) {
      let e = $pyramidStore[1][i]
      bars.push({
        x: width/2 + (2*f) + 8 - (f/2),
        y: f + i * f,
        width: e * w,
        height: f - 4,
        sex: 'm',
        value: e,
        agegroup: '',
        fill: interpolateViridis(1 - (e - ext[0]) / (ext[1] - ext[0])),
      })
    }
    newKey=[
    {x:4 + f * 15, y:f, height:(f*6) - 4, width:2 * f, fill: 'slategrey', agegroup:'65 and over' },
    {x:4 + f * 15, y:f + (f*6), height:(f*9) - 4, width:2 * f, fill: 'slategrey', agegroup:'20 to 64' }, 
    {x:4 + f * 15, y:f+ (f*15), height:(f*4) - 4, width:2 * f, fill: 'slategrey', agegroup:'under 20' }
  ]
  }

</script>

{#if request=="bars"}
<g transform="scale({(f*18)/height}) translate(0,{padding/2})">
    {#each bars as props}
      <rect {...props} rx="6" />
      <text
        x={props.x + f}
        y={props.y + f / 2 + 2}
        text-anchor="middle"
        fill="white"
        font-size="18">
        {props.agegroup}
      </text>
    {/each}
    <text
      x={width/2 -20 - (f/2)}
      y={18.5 * f + 2 + f}
      fill="white"
      text-anchor="end"
      font-size="18"
      font-weight="bold">
      female
    </text>
    <text
      x={width/2 +(2 * f) +28 - (f/2) }
      y={18.5 * f + 2 + f}
      fill="white"
      text-anchor="start"
      font-size="18"
      font-weight="bold">
      male
    </text>
</g>
{/if}
{#if request=="comparison1" || request=="comparison2"}
<!--<AgeComparison place_vis={request=="comparison1"?0:1}/>-->
{/if}