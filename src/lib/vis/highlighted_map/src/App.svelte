<script>

	import Axis from './Axis.svelte'
  import Path from './Path.svelte'
	import Text from "./Text.svelte"
  import { tweened } from 'svelte/motion'
	import { cubicInOut } from 'svelte/easing'
  import { interpolate } from "$lib/flubber/index.js"
  //console.log("interpolate",interpolate)
  import { geoAlbers, geoPath, geoProjection, geoMercator } from 'd3-geo'
  import { extent } from 'd3-array'
  import { onMount } from 'svelte'
  import * as topojson from 'topojson'
  const { feature } = topojson
  import { interpolateViridis } from 'd3-scale-chromatic'
  import { select, selectAll } from 'd3-selection'
  import { zm } from '$lib/zm'
  import growth from './growth.js'
  import ZoomSvg from './ZoomSvg.svelte'
  import charts from './charts'
  import { writable } from 'svelte/store';
  import frequency from './frequency.js'
  import {step} from '$lib/step'
  import Key from './Key.svelte'
 // import { all_data } from '../../../stores.js';
  export let country, all_data;
  let key=true
  let chart_key=false
  //$: country=all_data.CODE[0]
export let progress, animation, width, height, padding
//console.log ("ALL DATA", all_data)
	//const padding = 80
  import { afterNavigate, goto } from '$app/navigation';



//$: {width=$dims.w, height=dims.h} 

let  currentProj, path, Greenwich, FirstMeridian

  const easing = cubicInOut
	let axes
	let loaded
	let spacing
  let values=[]
	//$: console.log($zm)
  let data = []
	let timeline	


	
  let bar = {
    left: 85,
    height: 1.5,
    scale: 0.18,
  }
  let newData
  //let current = 0
	let metric
	

 // console.log("SELECTED",selected)
	let x=0,y=0,k=1
//console.log(path().projection([0,0]))

	function neighbourBounds(bounds){
    let min_x=bounds.sort((a,b)=>a[0][0]-b[0][0])[0][0][0]
    let max_x=bounds.sort((a,b)=>b[1][0]-a[1][0])[0][1][0]
    let min_y=bounds.sort((a,b)=>a[0][1]-b[0][1])[0][0][1]
    let max_y=bounds.sort((a,b)=>b[1][1]-a[1][1])[0][1][1]
    let neighbour_bounds=[[min_x,min_y],[max_x,max_y]]
    return neighbour_bounds
  }

  //TIMELINE ... INITIAL SETTINGS
  let timelineMaker = (arr) => {
	let y_labels=[],x_length=800,x_labels=[],y_length=500

			axes={			
						x_origin : tweened(Greenwich),
						y_origin : tweened(height+padding+(height/10)),
						x_length : width,
						y_length : height,
						hoz_bar:[y_labels.map(e=>e.length)],
						vert_bar:[],//x_labels.map(e=>e.length),
						x_offset : tweened((Greenwich-FirstMeridian)/10),
						y_offset: tweened((Greenwich-FirstMeridian)/10),
						labelRotation:0,
						x_zero:0,
						y_zero:0,
						xTicks:true,
						yTicks:true,
						xAxis:1,
						yAxis:1,
						verticalStrokes:false,
						horizontalStrokes:true
			}
	//	console.log("axes", axes)
    let x = []
    arr.forEach((e, i) => {
      x.push({
        d: tweened(arr[i].xys, { duration: 50, interpolate }),
        centroid: arr[i].centroid,
        fill: writable(arr[i].colour),
        fillOpacity: tweened(1, { duration: 0, interpolate }),
        title: writable(arr[i].properties.AREANM),
				area_cd: writable(arr[i].properties.AREACD),
        value: writable(arr[i].growth),
				metric: writable("% change"),
				pop:arr[i].pop,
				y:writable(arr[i].centroid[1]),
				label_opacity:tweened(0),
        zoom:arr[i].zoom
      })
    })
    return x
  }

	let zoomState={
x:tweened(x, {duration:200}),
y:tweened(y, {duration:200}),
k:tweened(k, {duration:200})
}
	
  function redrawData(datas, zm) {
		//console.log("PATH",path.centroid({lat:0,long:0}))

data=data.filter(e=>e.properties.AREACD[0]==country)

    data.forEach(
      (e) =>
        (e.growth = growth.find((el) => el.LAD17CD == e.properties.AREACD) || {
          GROWTH: 0,
          TOTAL11: 0,
        }),
    )
    data.forEach((e) => {
      let obj = e.growth
      e.growth = +obj.GROWTH
			e.pop = +obj.TOTAL11
			e.abs = Math.round((+obj.GROWTH)*(+obj.TOTAL11)/100)
    })
    data.forEach((e) => (e.centroid = path.centroid(e)))
		data.forEach((e) => (e.y = path.centroid(e)[1] *-1))
    data.forEach((e) => (e.xys = path(e)))

    let map_charts=charts.filter(e=>e.chart=="xys")
    map_charts.forEach(e=>{
		e.axis.x.origin=Greenwich
	  e.axis.x.spacing=(Greenwich-FirstMeridian)/10
		e.axis.y.origin=height+padding+(height/10)
		e.axis.y.spacing=(Greenwich-FirstMeridian)/10
    })

    data.forEach((e, i) => {

    })

    data.forEach((e) => (e.bounds = path.bounds(e)))



    data.forEach((e)=>e.zoom=Math.sqrt(1/(Math.max(...[e.bounds[1][0]-e.bounds[0][0],e.bounds[1][1]-e.bounds[0][1]])/width)))
		data.forEach((e) => (e.colour= interpolateViridis(1-scaleColor(e.growth,datas,"growth"))))
		
		//console.log(data)
    let extents = {
      pop: extent(datas.map((e) => e.pop)),
      growth: extent(datas.map((e) => e.growth)),
			abs:	extent(datas.map((e) => e.abs)),
    }
    data = data.filter((e) => e.growth !== null)//REMOVE ANY DUD DATA
    data = data.sort((a, b) => b.growth - a.growth)//SORT BY GROWTH TO ALLOW VISIBILITY


    timeline = timelineMaker(data)
    setTimeout(function(){loaded=true},1000)
    return data
  }

async function reload(){
		
    const response = await fetch( 'https://raw.githubusercontent.com/ONSvisual/topojson_boundaries/master/geogLA2021EW.json',
    )
    const json = await response.json()
    const topoData = feature(json, json.objects.geog)
    const land = {
      ...topoData,
      features: topoData.features,
    }
    data = land.features.filter(e=>e.properties.AREACD[0]==country)
currentProj = geoMercator()
    //.rotate([4.4, 0.8])
    .center(country=="E"?[-2, 52.5]:[-3.9, 52.3])
   // .scale(height*3.5)
    .scale(country=="E"?width<height?width*7:height*5:width<height?width*15:height*15)
    .translate([width / 2, height / 2])
path = geoPath().projection(currentProj)

Greenwich = +path({
    type: "Point",
    coordinates: [0,0],
} ).split(",")[0].slice(1);
	
FirstMeridian = +path({
    type: "Point",
    coordinates: [10,0],
} ).split(",")[0].slice(1);
}
  onMount(reload)

  //const scaleExtent = extent(growth.map((e) => e.GROWTH))
  const scaleColor = (val, dataSet, data) =>{
  	let scaleExtent = extent(dataSet.map((e) => e[data]))
		return  val == null
      ? 0.5
      : (val - scaleExtent[0]) / (scaleExtent[1] - scaleExtent[0])
}

//console.log(Object.keys(new_charts[0]))
  function forward(current) {
//console.log("SHAPES",selectAll('.shape').sort((a,b) => ascending(a.y, b.y)))
if (charts.length>current){
		axes.x_origin.set(charts[current].axis.x.origin,{duration:charts[current].duration, easing})
		axes.x_offset.set(charts[current].axis.x.spacing,{duration:charts[current].duration, easing})
		axes.y_origin.set(charts[current].axis.y.origin,{duration:charts[current].duration, easing})
		axes.y_offset.set(charts[current].axis.y.spacing,{duration:charts[current].duration, easing})
	//	console.log("axes",axes)

    let count = 0

    timeline.forEach((step, i) => {
      count++
      step.d.set(newData[i][charts[current].chart], {
        duration: charts[current].duration,
        delay: charts[current].delay * i,
        interpolate
      })
			 	//step.value= arr[i].growth/100
				step.metric.set(charts[current].tooltip_metric)
				step.value.set(newData[i][charts[current].value])
				step.title.set(newData[i].properties.AREANM)
        if(charts[current].key){key=1}else{key=0}
        if(charts[current].chart_key){chart_key=1}else{chart_key=0}
				if(charts[current].highlight){
          step.fillOpacity.set(0.4);
          step.label_opacity.set(0,{duration:10, easing})
        if (charts[current].highlight==1 && Object.values(all_data.NEIGHBOURS.PC_CHANGE).map(e=>e.CODE).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==selected){step.fillOpacity.set(1);step.label_opacity.set(1,{duration:10, easing}); console.log("BOUNDS",newData.filter(e=>all_data.NEIGHBOURS.CODES.includes(e.properties.AREACD)).map(e=>e.bounds))}
        if (charts[current].highlight==2 && Object.values(all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_UP).map(e=>e.LAD17CD).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==selected)step.fillOpacity.set(1)
        if (charts[current].highlight==3 && (all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.LAD17CD==newData[i].properties.AREACD)||newData[i].properties.AREACD==selected)step.fillOpacity.set(1)
        if (charts[current].highlight==4 && Object.values(all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP).map(e=>e.LAD17CD).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==selected)step.fillOpacity.set(1)
        if (charts[current].highlight==5 && Object.values(all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN).map(e=>e.LAD17CD).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==selected)step.fillOpacity.set(1)
      }
    
    
    else step.fillOpacity.set(1)
      //	console.log(count,newData[i].xys)
    })
    //current = (current + 1) % charts.length
  }
  }
	
	function back() {current = (current + charts.length - 2) % charts.length;
									 forward()
									}
                  //forward(0)               
$: axes && loaded && country && forward(animation)

$: { newData=redrawData(data) }

$: width && function(){newData=redrawData(data)}

afterNavigate(function(){reload; window.scrollTo({ top: 0, behavior: 'smooth' })})
</script>

<style>



</style>
{#if all_data && timeline && width && height}

<ZoomSvg id="charts2" zm={$zm} {...zoomState} {width} {height} {key} viewBox="0 0 {width} {height}" {all_data}>

<g id="wrapper2">
    {#each timeline as feature, i}
      <Path {...feature} />
	{/each}

</g>


</ZoomSvg>
 {/if}

 