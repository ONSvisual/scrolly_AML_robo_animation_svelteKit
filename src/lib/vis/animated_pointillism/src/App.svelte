<script>
import {writable} from 'svelte/store'
import {cubicInOut}from 'svelte/easing'

export let progress, animation, width, height, padding, selected, all_data
console.log(all_data)

let box_width=(width/2)-padding, box_height=(width/2)- padding + height/3
let females=all_data.LA.OVER65.ABS.F
let factor = females>50000?100:females>10000?10:1
let numbers=[all_data.LA.OVER65.ABS.F/factor,all_data.LA.OVER65.ABS.M/factor].sort((a,b)=>b-a)
let [number1, number2] = [numbers[0], numbers[1]]

let base = Math.floor(Math.sqrt(number1))
let radius = box_width/3/base
let extras1 = number1-(base*base)
let arr1= new Array(base).fill(new Array(base).fill(0))
if (extras1>base){arr1.push(new Array(base).fill(0)); extras1-=base}
arr1.push(new Array(extras1).fill(0))
arr1=arr1.map(e=>e.map(el=>([(radius/2)-(Math.random()*radius),(radius/2)-(Math.random()*radius)])))

let currentJitter=JSON.parse(JSON.stringify(arr1))
.map(e=>e
		 .map(el=>([
					el[0]-(0.5-(Math.random())),
				 	el[1]-(0.5-(Math.random()))
								 ])
							)
				 )

let jitter1=[]

for(let i=0; i<10; i++){
jitter1.push(currentJitter);
currentJitter=JSON.parse(JSON.stringify(currentJitter))
.map(e=>e
		 .map(el=>([
					el[0]-(0.5-(Math.random())),
				 	el[1]-(0.5-(Math.random()))
								 ])
							)
				 )
}


let jitter2=JSON.parse(JSON.stringify(jitter1)).slice(1)
jitter2=jitter2.reverse()
let jitter=jitter1.concat(jitter2)


	//console.log(jitter)

let height2 = Math.floor(number2/base)
let extras2 = number2-(height2 * base)
let arr2= new Array(height2).fill(new Array(base).fill(0))
if (extras2>base){arr2.push(new Array(base).fill(0)); extras1-=base}
arr2.push(new Array(extras2).fill(0))
arr2=arr2.map(e=>e.map(el=>({x:(radius/2)-(Math.random()*radius),y:(radius/2)-(Math.random()*radius)})))



let jitterBug1=writable(jitter[0])
let jitterBug2=writable(jitter[0])


let count =0
setInterval(function(){
	count++;
	jitterBug1.set(jitter[count%19]);
	jitterBug2.set(jitter[count%19])
},300
					 )
	
</script>

<svg width={box_width*2+20} height={box_height}>
<g>
{#each arr1 as a, y}
{#each a as offset, x}
<circle cx={(x*(box_width/base)) + (box_width + 20) + 200/base + $jitterBug1[y][x][1]} cy={box_height-100-(y*(box_width/base)) + $jitterBug1[y][x][0]} r={radius} fill=slategrey fill-opacity={1-Math.random()/3}/>
{/each}{/each}
	
{#each arr2 as a, y}
{#each a as offset, x}
<circle cx={x*(box_width/base) + 200/base + $jitterBug2[y][x][1] +5} cy={box_height-100-(y*(box_width/base)) + $jitterBug2[y][x][0]}  r={radius} fill=slategrey fill-opacity={1-Math.random()/3}/>
{/each}{/each}
</g>
<text x={box_width+20} y={box_height-60} fill=#666 font-size=22px>{(number1*factor).toLocaleString("en-US")} females</text>
<text x={box_width} y={box_height-60} text-anchor=end fill=#666 font-size=22px>{(number2*factor).toLocaleString("en-US")} males</text>
</svg>
