<script>
import { interpolateViridis } from 'd3-scale-chromatic'
export let percent, key, uk, place, max, min, step, width,height,name
let arr=Array.from({length: max-min+1}, (_, i) => i + min);
let range=max-min
let place_position=1-(max-place)/range
let uk_position=1-(max-uk)/range

</script>

<g transform=" scale(0.5) translate({width-300},{height*2-320})">
<rect x=-1200 y=25 width={width*3} height={300} fill=white fill-opacity=0.7></rect>
<text y=60 x={300} text-anchor=middle  font-size=24pt fill=grey>{key}</text>    
{#each arr as clr,i}
<rect height=50 width={500/arr.length} y=100 x={50 + (500/arr.length) * i} fill={interpolateViridis(1-(i/(arr.length-1)))} />
{#if clr%10==0  || i==0 || i==arr.length-1}<text y=90 x={63 + ((500/arr.length) * i)} fill=grey text-anchor=end>{clr}{percent?"%":""}</text>{/if}
{/each}
<line y1={100} y2={210} x1={50 + (500 * place_position)} x2={50+ (place_position*(500))} stroke=#666 stroke-width=8 stroke-linecap="round" ></line>
<text y=210 x={60 + (place_position*(500))} fill=#666 font-size=24pt>{name}</text>
{#if step==1}<line y1={100} y2={180} x1={50 + (uk_position*(500))} x2={50 + (uk_position*(500))} stroke=#666 stroke-width=8 stroke-linecap="round" ></line>
<text y=175 x={40 + (uk_position*(500))} text-anchor=end  fill=#666 font-size=24pt>average</text>{/if}
<text y=250 x={40} fill=grey font-size=24pt>Greatest</text>
<text y=290 x={40} fill=grey font-size=24pt>decrease</text>
<text y=250 x={555} text-anchor=end fill=grey font-size=24pt>Greatest</text>
<text y=290 x={555} text-anchor=end fill=grey font-size=24pt>increase</text>
</g>
