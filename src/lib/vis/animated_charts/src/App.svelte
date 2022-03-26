<script>
	import Axis from './Axis.svelte'
  import Path from './Path.svelte'
	import Text from "./Text.svelte"
  import { tweened } from 'svelte/motion'
	import { cubicInOut } from 'svelte/easing'
  import { interpolate } from "$lib/vis/animated_charts/node_modules/flubber/index.js"
  console.log("interpolate",interpolate)
  import { geoAlbers, geoPath, geoProjection, geoMercator } from 'd3-geo'
  import { extent } from 'd3-array'
  import { onMount } from 'svelte'
  import { feature } from 'topojson'
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
  import { all_data } from '../../../stores.js';
  export let country;
  let key=true
  let chart_key=false
  //$: country=$all_data.CODE[0]
export let progress, animation, width, height, padding
console.log ("ALL DATA", $all_data)
	//const padding = 80
  import {dims} from '$lib/background_dimensions' 

//$: {width=$dims.w, height=dims.h} 

  const mercator = geoMercator()
    //.rotate([4.4, 0.8])
    .center(country=="E"?[-2, 52.5]:[-3.9, 52.3])
   // .scale(height*3.5)
    .scale(country=="E"?width<height?width*7:height*5:width<height?width*15:height*15)
    .translate([width / 2, height / 2])
  const easing = cubicInOut
	let axes
	let loaded
	let spacing
  let values=[]
	//$: console.log($zm)
  let data = []
	let timeline	
  let currentProj = mercator
 
	let path = geoPath().projection(currentProj)

var geoJsonPoint = {
    type: "Point",
    coordinates: [0,0],
} 

let Greenwich = +path({
    type: "Point",
    coordinates: [0,0],
} ).split(",")[0].slice(1);
	
let FirstMeridian = +path({
    type: "Point",
    coordinates: [10,0],
} ).split(",")[0].slice(1);
	
  let bar = {
    left: 85,
    height: 1.5,
    scale: 0.18,
  }
  let newData
  //let current = 0
	let metric
	let selected = writable();//="E09000002"
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
		console.log("axes", axes)
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
        mouseover: mouseover,
        mouseout: mouseout,
				pop:arr[i].pop,
				y:writable(arr[i].centroid[1]),
				selected:arr[i].properties.AREACD==$selected,
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
  let mouseover = function (d) {
    let title = d.target.getAttribute('title')
    let value = d.target.getAttribute('value').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
		let pop = d.target.getAttribute('pop')
		let metric = d.target.getAttribute('metric')
    select('.tooltip').style('opacity', 1)
    select('.tooltip')
      .html(title + '<br>' + value + metric)
      .style('left', d.clientX + 10+ 'px')
      .style('top', d.clientY - 28 + 'px')
  }
	
  let mouseout = function (d) { select('.tooltip').style('opacity', 0) }
	
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

//% FREQUENCY BELL
let frequencyBell = function(){
    values=[]
    let minX=+frequency[country][0].growth, maxX=+frequency[country][frequency[country].length-1].growth, rangeX=maxX-minX, maxY=frequency[country].map(e=>e.lads.length).sort((a,b)=>b-a)[0]
    for(let i=minX; i<maxX+1; i++)values.push(i)
          let guidingDim=[width-(padding),height-(padding*2)].sort((a,b)=>b-a).pop()
          let square = {x:(guidingDim-(padding*2))/rangeX,
              y:(guidingDim-(padding*2))/rangeX}
              spacing = square.y
data.forEach((e, i) => {


  let pos = frequency[country].find(el=>el.lads.includes(e.properties.AREACD))
  e.bell = `M${0} ${0}, ${
          0} ${0}, ${0} ${0},${0} ${0}Z`



  if(pos){
    //(height-(padding*2 ))/frequency[country].map(e=>e.lads.length).sort((a,b)=>b-a)[0]}
  let x = ((pos.growth - frequency[country][0].growth ) * square.x)+padding
  let y = (height-(padding*2))-(pos.lads.indexOf(e.properties.AREACD)*square.y)
  let gap = Math.abs((square.y/2) - (square.x/2))
  //e.bell = `M${x} ${y}, ${x} ${y+square.y}, ${x+square.x} ${y+square.y},${x+square.x} ${y}Z`//SQUARES
  let cx=(x+square.x/2), r=Math.min(square.y/2,square.x/2), cy=(y+square.y/2-(r*2))
  e.bell=`M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${r * -2},0Z`//CIRCLES
  let chart=charts.find(e=>e.chart=="bell")
    chart.axis.x.origin=-10
		chart.axis.x.spacing=2000
		chart.axis.y.origin=height-(padding*2)+(gap*2)
		chart.axis.y.spacing=5000//(square.y*5)-gap
  //  for(let i=0; i<frequency[country].length; e++)bell_key.push(frequency[country][i])
}
  //console.log("svg",e.bell)
  if(e.bell==undefined)console.log("x",x,"y",y)
  })
}()
//% FREQUENCY BELL REGION
let frequencyBellRegion = function(){
  let region_codes = JSON.parse(JSON.stringify(growth))
  region_codes=region_codes.filter(e=>e.REGION==$all_data.REGION_CODE).sort((a,b)=>b.GROWTH-a.GROWTH).map(e=>e.LAD17CD)
  let region_data=JSON.parse(JSON.stringify(frequency))
  region_data[country].forEach(e=>e.lads=e.lads.filter(el=>region_codes.includes(el)))
  region_data[country]=region_data[country].filter(e=>e.lads.length)
  console.log("region_codes",region_codes,"region_data",region_data)
values=[]
    let minX=+region_data[country][0].growth, maxX=+region_data[country][region_data[country].length-1].growth, rangeX=maxX-minX, maxY=region_data[country].map(e=>e.lads.length).sort((a,b)=>b-a)[0]
    for(let i=minX; i<maxX+1; i++)values.push(i)
          let guidingDim=[width-(padding),height-(padding*2)].sort((a,b)=>b-a).pop()
          let square = {x:(guidingDim-(padding*2))/rangeX,
              y:(guidingDim-(padding*2))/rangeX}
              spacing = square.y

data.forEach((e, i) => {


  let pos = region_data[country].find(el=>el.lads.includes(e.properties.AREACD))
  e.bell_region = `M${0} ${0}, ${
          0} ${0}, ${0} ${0},${0} ${0}Z`



  if(pos){
    //(height-(padding*2 ))/region_data[country].map(e=>e.lads.length).sort((a,b)=>b-a)[0]}
  let x = ((pos.growth - region_data[country][0].growth ) * square.x)+padding
  let y = (height-(padding*2))-(pos.lads.indexOf(e.properties.AREACD)*square.y)
  let gap = Math.abs((square.y/2) - (square.x/2))
  //e.bell_region = `M${x} ${y}, ${x} ${y+square.y}, ${x+square.x} ${y+square.y},${x+square.x} ${y}Z`//SQUARES
  let cx=(x+square.x/2), r=Math.min(square.y/2,square.x/2), cy=(y+square.y/2-(r*2))
  e.bell_region=`M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${r * -2},0Z`//CIRCLES
  let chart=charts.find(e=>e.chart=="bell")
    chart.axis.x.origin=-10
		chart.axis.x.spacing=2000
		chart.axis.y.origin=height-(padding*2)+(gap*2)
		chart.axis.y.spacing=5000//(square.y*5)-gap
  //  for(let i=0; i<region_data[country].length; e++)bell_key.push(region_data[country][i])
}
  //console.log("svg",e.bell_region)
  if(e.bell_region==undefined)console.log("x",x,"y",y)
  })
}()
    //% GROWTH BAR CHART

    let bar_data = JSON.parse(JSON.stringify(growth)).filter(e=>e.REGION==$all_data.REGION_CODE).sort((a,b)=>b.GROWTH-a.GROWTH)
    //console.log("BAR_DATA",bar_data)
    let bar_extents = {
      growth: extent(bar_data.map((e) => e.GROWTH)),
    }
    //console.log("barExtents",bar_extents)
		bar.height=(height-(padding*3))/bar_data.length
		bar.left=padding+(Math.abs(bar_extents.growth[0])/(bar_extents.growth[1]-bar_extents.growth[0]))*(width-(padding*2))
		bar.scale=(1/(bar_extents.growth[1]-bar_extents.growth[0]))*(width-(padding*2))

		let chart=charts.find(e=>e.chart=="bar")
		chart.axis.x.origin=bar.left
		chart.axis.x.spacing=width/10
		chart.axis.y.origin=height+padding
		chart.axis.y.spacing=height/10

    data.forEach((e, i) => {
      e.bar = `M${0} ${0}, ${
          0} ${0}, ${0} ${0},${0} ${0}Z`
    })

    bar_data.forEach((e, i) =>{
      let bar_id=e.LAD17CD;
      let data_point=data.findIndex(el=>el.properties.AREACD==bar_id)
      if(data[data_point]){
        //console.log(data[data_point])
        data[data_point].bar=
        (`M${bar.left} ${i * bar.height + padding + 3}, ${
          bar.left + e.GROWTH * bar.scale 
        } ${i * bar.height + padding + 3}, ${bar.left + e.GROWTH *  bar.scale } ${
          bar.height + i * bar.height
        + padding},${bar.left} ${bar.height + i * bar.height+ padding }Z`)
        }}
        
    )
data = data.sort((a, b) => b.growth - a.growth)
    //console.log("bar_data",data)

    //regionMap
console.log("BAR_DATA",bar_data)
let region_codes=bar_data.map(e=>e.LAD17CD)
    data.forEach((e, i) => {
      e.xys_region = `M${0} ${0}, ${
          0} ${0}, ${0} ${0},${0} ${0}Z`
      if (region_codes.includes(e.properties.AREACD))e.xys_region = e.xys
      
    })

//% NATIONAL GROWTH BAR CHART

let national_bar_data = JSON.parse(JSON.stringify(growth)).filter(e=>e.LAD17CD[0]==$selected[0]).sort((a,b)=>b.GROWTH-a.GROWTH)
   // console.log("BAR_DATA",national_bar_data)
    let national_bar_extents = {
      growth: extent(national_bar_data.map((e) => e.GROWTH)),
    }
    //console.log("barExtents",national_bar_extents)
		bar.height=(height-(padding*2))/national_bar_data.length
		bar.left=padding+(Math.abs(national_bar_extents.growth[0])/(national_bar_extents.growth[1]-national_bar_extents.growth[0]))*width
		bar.scale=(1/(national_bar_extents.growth[1]-national_bar_extents.growth[0]))*width

		let national_chart=charts.find(e=>e.chart=="national_bar")
		national_chart.axis.x.origin=bar.left
		national_chart.axis.x.spacing=width/10
		national_chart.axis.y.origin=height+padding
		national_chart.axis.y.spacing=height/10

    data.forEach((e, i) => {
      e.national_bar = `M${0} ${0}, ${
          0} ${0}, ${0} ${0},${0} ${0}Z`
    })

    national_bar_data.forEach((e, i) =>{
      let bar_id=e.LAD17CD;
      let data_point=data.findIndex(el=>el.properties.AREACD==bar_id)
      if(data[data_point]){
        //console.log(data[data_point])
        data[data_point].national_bar=
        (`M${bar.left} ${i * bar.height + padding}, ${
          bar.left + e.GROWTH * bar.scale 
        } ${i * bar.height + padding}, ${bar.left + e.GROWTH *  bar.scale } ${
          bar.height + i * bar.height
        + padding},${bar.left} ${bar.height + i * bar.height+ padding }Z`)
        }}
        
    )
data = data.sort((a, b) => b.growth - a.growth)
    //console.log("bar_data",data)

//ABSOLUTE SPIKES ON MAP

		chart=charts.find(e=>e.chart=="absolute")
		chart.axis.x.origin=Greenwich
		chart.axis.x.spacing=(Greenwich-FirstMeridian)/10
		chart.axis.y.origin=height+padding+(height/10)
		chart.axis.y.spacing=(Greenwich-FirstMeridian)/10	
		
	data=data.sort((a,b)=>b.abs-a.abs)
	    data.forEach((e, i) => {
      let peak = e.pop>e.growth/10?e.pop * (e.growth/60000):1

      e.absolute = peak!==1?`M${e.centroid[0]},${e.centroid[1]} ${e.centroid[0]-4},${e.centroid[1]} ${e.centroid[0]},${e.centroid[1]-(peak)} ${e.centroid[0]+4},${e.centroid[1]}z`:`M${e.centroid[0]-4}, ${e.centroid[1]} a${4},${4} 0 1,0 ${4 * 2},0 a${4},${4} 0 1,0 ${(4 * -2)},0`
    })	

	//ABSOLUTE BAR
		
		bar.height=(height)/data.length
		bar.left=padding+(Math.abs(extents.abs[0])/(extents.abs[1]-extents.abs[0]))*width
		bar.scale=(1/(extents.abs[1]-extents.abs[0]))*width
	
		chart=charts.find(e=>e.chart=="absoluteBar")
		chart.axis.x.origin=bar.left
		chart.axis.x.spacing=width/10
		chart.axis.y.origin=height+padding
		chart.axis.y.spacing=height/10	
		
		data.forEach((e, i) => {
      let absolute = e.abs
      e.absoluteBar = `M${bar.left} ${i * bar.height+ padding}, ${
          bar.left + absolute * bar.scale} ${i * bar.height+ padding}, ${bar.left + absolute * bar.scale} ${
          bar.height + i * bar.height+ padding
        },${bar.left} ${bar.height + i * bar.height+ padding}Z`
    })		
	    data = data.sort((a, b) => b.growth - a.growth)//SORT BY GROWTH TO ALLOW VISIBILITY			

    
 	//CURRENT POPULATION BAR
		
   bar.height=(height)/data.length
		bar.left=padding+(Math.abs(extents.pop[0])/(extents.pop[1]-extents.pop[0]))*width
		bar.scale=(1/(extents.pop[1]-extents.pop[0]))*width
	
		chart=charts.find(e=>e.chart=="popBar")
		chart.axis.x.origin=bar.left+width/10
		chart.axis.x.spacing=width/10
		chart.axis.y.origin=height+padding
		chart.axis.y.spacing=height/10	

    let Data=JSON.parse(JSON.stringify(data)).sort((a,b)=>b.pop-a.pop)
      Data.forEach((e, i) => {
      let absolute = e.pop
      data.find(el=>el.y-e.y==0).popBar = `M${bar.left} ${i * bar.height+ padding}, ${
          bar.left + absolute * bar.scale} ${i * bar.height+ padding}, ${bar.left + absolute * bar.scale} ${
          bar.height + i * bar.height+ padding
        },${bar.left} ${bar.height + i * bar.height+ padding}Z`
    })		
	    data = data.sort((a, b) => b.growth - a.growth)//SORT BY GROWTH TO ALLOW VISIBILITY			

	//POPULATION CIRCLES ON MAP	
		chart=charts.find(e=>e.chart=="circle")
		chart.axis.x.origin=Greenwich
		chart.axis.x.spacing=(Greenwich-FirstMeridian)/10
		chart.axis.y.origin=height+padding+(height/10)
		chart.axis.y.spacing=(Greenwich-FirstMeridian)/10	
		

		
    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / (8000))
      e.circle = `M${e.centroid[0] - radius},${
        e.centroid[1]
      } a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${
        radius * -2
      },0Z`
    })

  
    	//COMPARATIVE POPULATION CIRCLES
		chart=charts.find(e=>e.chart=="comparative_circle")
		chart.axis.x.origin=Greenwich
		chart.axis.x.spacing=(Greenwich-FirstMeridian)/10
		chart.axis.y.origin=height+padding+(height/10)
		chart.axis.y.spacing=(Greenwich-FirstMeridian)/10	
		

		let radius_prev=0
    Data=JSON.parse(JSON.stringify(data)).sort((a,b)=>b.pop-a.pop)
    Data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / (8000))
      data.find(el=>el.y-e.y==0).comparative_circle = `M${padding},${padding + radius_prev} a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${
        radius * -2
      },0Z`
      radius_prev+=radius/2.3
    })

//SMALL POPULATION CIRCLES FOR ZOOMING
		
    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 80000)
      e.small_circle = `M${e.centroid[0] - radius},${
        e.centroid[1]
      } a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${
        radius * -2
      },0Z`
    })
//SCATTER CHART X=POPULATION SIZE, Y=GROWTH
	
		
		chart=charts.find(e=>e.chart=="scatter")
		chart.axis.x.origin=bar.left
		chart.axis.x.spacing=width/10
		chart.axis.y.origin=height-((Math.abs(extents.growth[0])/(extents.growth[1]-extents.growth[0]))*height)+(padding*2)
		chart.axis.y.spacing=height/10	
		
    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8000)
      let p = (((width-(padding*2))*e.pop) / extents.pop[1]-extents.pop[0]) //e.pop/1000
      let g = (height-(padding*2))-((height*e.growth)/(extents.growth[1]-extents.growth[0]))
      e.scatter = `M${bar.left + p - radius}, ${g+radius} a${radius},${radius} 0 1,0 ${
        radius * 2
      },0 a${radius},${radius} 0 1,0 ${radius * -2},0Z`
    })
    timeline = timelineMaker(data)
    setTimeout(function(){loaded=true},1000)
    return data
  }


  onMount(async function () {
		
    const response = await fetch( 'https://raw.githubusercontent.com/ONSvisual/topojson_boundaries/master/geogLA2021EW.json',
    )
    const json = await response.json()
    const topoData = feature(json, json.objects.geog)
    const land = {
      ...topoData,
      features: topoData.features,
    }
    data = land.features.filter(e=>e.properties.AREACD[0]==country)
    console.log(data)
    //newData = redrawData(data, 1)
  })

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
		console.log("axes",axes)
		//newData = newData.sort((a, b) => (b[charts[current].sort_by])-(a[charts[current].sort_by]))
    let triggerZoom=0
   // let zoomFactor=charts[current].zoom
    let item=select(document.getElementById("selected"))
    let itemScale=item.attr("zoom")
    let zoomFactor=charts[current].zoom*itemScale
    let neighbours_zoom=charts[current].neighbours_zoom
    if(neighbours_zoom){
  let nb=neighbourBounds(data.filter(e=>$all_data.NEIGHBOURS.CODES.includes(e.properties.AREACD)).map(e=>e.bounds))
  zoomFactor=1/(Math.max(...[nb[1][0]-nb[0][0],nb[1][1]-nb[0][1]])/width)
}
let region_zoom=charts[current].region_zoom
    if(region_zoom){
      let region_codes = JSON.parse(JSON.stringify(growth)).filter(e=>e.REGION==$all_data.REGION_CODE).sort((a,b)=>b.GROWTH-a.GROWTH).map(e=>e.LAD17CD)
  let nb=neighbourBounds(data.filter(e=>region_codes.includes(e.properties.AREACD)).map(e=>e.bounds))
  zoomFactor=1/(Math.max(...[nb[1][0]-nb[0][0],nb[1][1]-nb[0][1]])/width)
}
		let focus = select(document.getElementById("selected")).attr("centroid").split(',').map((e,i)=>i==0?(width/2)-(zoomFactor*e):(-zoomFactor*e)+(height/2))
    let highlighted=charts[current].highlight
    let labels=charts[current].region_zoom



if (zoomFactor){
  zm.set(zoomFactor)
	if(labels)timeline.forEach((step, i) => step.label_opacity.set(1,{duration:charts[current].duration, easing}))
	zoomState.x.set(focus[0],{ duration:charts[current].duration, easing})
	zoomState.y.set(focus[1],{ duration:charts[current].duration, easing})
	zoomState.k.set(zoomFactor,{ duration:charts[current].duration, easing})
}		else {
  zm.set(1)
	timeline.forEach((step, i) => step.label_opacity.set(0,{duration:10, easing}))
	zoomState.x.set(0,{ duration:charts[current].duration, easing})
	zoomState.y.set(0,{ duration:charts[current].duration, easing})
	zoomState.k.set(1,{ duration:charts[current].duration, easing})
}
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
        if (charts[current].highlight==1 && Object.values($all_data.NEIGHBOURS.PC_CHANGE).map(e=>e.CODE).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==$selected){step.fillOpacity.set(1);step.label_opacity.set(1,{duration:10, easing}); console.log("BOUNDS",newData.filter(e=>$all_data.NEIGHBOURS.CODES.includes(e.properties.AREACD)).map(e=>e.bounds))}
        if (charts[current].highlight==2 && Object.values($all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_UP).map(e=>e.LAD17CD).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==$selected)step.fillOpacity.set(1)
        if (charts[current].highlight==3 && ($all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.LAD17CD==newData[i].properties.AREACD)||newData[i].properties.AREACD==$selected)step.fillOpacity.set(1)
        if (charts[current].highlight==4 && Object.values($all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP).map(e=>e.LAD17CD).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==$selected)step.fillOpacity.set(1)
        if (charts[current].highlight==5 && Object.values($all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN).map(e=>e.LAD17CD).includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==$selected)step.fillOpacity.set(1)
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
//$: $step && forward($step)
//$: $step && console.log("STEP",$step)
$: { selected.set($all_data.CODE); newData=redrawData(data) }
$: width && function(){newData=redrawData(data)}

</script>

<style>



</style>

<ZoomSvg id="charts1" zm={$zm} {...zoomState} {width} {height} {key} viewBox="0 0 {width} {height}">
  {#if timeline && width && height}
<g id="wrapper">
    {#each timeline as feature, i}
      <Path {...feature} />
	{/each}
    {#each timeline as feature, i}
   <Text {...feature} {...zoomState} zm={$zm}></Text>
	{/each}
</g>
	<use xlink:href="#selected"/>
	<use xlink:href="#selectedText"/>	
  <use xlink:href="#selectedValue"/>	
  <Axis {...axes} {width} {height} {padding} {spacing} {values} {chart_key}/>
  {/if}

    

 </ZoomSvg>


 