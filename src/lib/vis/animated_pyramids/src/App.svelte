<script>
  import age_sex from './age_sex.js'
  import rankings from './rankings.js'
  import { tweened } from 'svelte/motion'
  import { sineInOut } from 'svelte/easing'
  import { interpolate } from 'flubber'
  import Pyramid from './Pyramid.svelte'
  import pyramidStore from './pyramid'
  let order = rankings.map((e) => e[0])
  import { all_data } from '../../../stores.js'
  import { step } from '../../animated_charts/src/step'
  export let animation, data, height, padding, width

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  const buildPercentages = (d) => {
    let totalM = Object.values(d.M).reduce((a, b) => a + b)
    let totalF = Object.values(d.F).reduce((a, b) => a + b)
    for (let age in d.M) d.M[age] = (d.M[age] / totalM) * 100
    for (let age in d.F) d.F[age] = (d.F[age] / totalF) * 100
    return d
  }

  const buildPlace = (age_sex) => {
    let sexGroup = groupBy(age_sex, [1])
    let ageSexGroup = {
      M: groupBy(sexGroup.M, [0]),
      F: groupBy(sexGroup.F, [0]),
    }
    return ageSexGroup
  }


  const myPlace = (code, year) => {
    let asg = buildPlace(
      age_sex.filter((e) => e[3] == code).filter((e) => e[2] == year),
    )
    for (let age in asg.M) asg.M[age] = asg.M[age].map((e) => e[4])[0]
    for (let age in asg.F) asg.F[age] = asg.F[age].map((e) => e[4])[0]
    return buildPercentages(asg)
  }

  let makePyramid = (d) => {
    let bars = [[],[]]
    let f = d.F,
      m = d.M

    for (let i in f) {
      bars[0].push(f[i])
    }

    for (let i in m) {
      bars[1].push(m[i])
    }
	bars[0].reverse()
	bars[1].reverse()
    return bars
  }

  let makeDataPyramid = (d) => {
    let bars = [[],[]]
    let f = d[1],
      m = d[0]

    for (let i in f) {
      bars[0].push(+f[i])
    }

    for (let i in m) {
      bars[1].push(+m[i])
    }
	bars[0].reverse()
	bars[1].reverse()
    return bars
  }

  pyramidStore.set(makeDataPyramid(data.LA.PYRAMID01))

let changePyramid = details => console.log("do something"+details)
let la_change=data.LA.PYRAMID11.map((e,i)=>e.map((el,ii)=>el-data.LA.PYRAMID01[i][ii]))
let la_change_blended=la_change[0].map((e,i)=>e+la_change[1][i])

let arr=[data.LA.PYRAMID01.flat(),data.LA.PYRAMID11.flat(),data.COUNTRY.PYRAMID01.flat(),data.COUNTRY.PYRAMID01.flat()]
let w=((width-(padding*2))/2)/(Math.max(...arr.flat()))

let country_change=data.COUNTRY.PYRAMID11.map((e,i)=>e.map((el,ii)=>el-data.COUNTRY.PYRAMID01[i][ii]))
let country_change_blended=country_change[0].map((e,i)=>e+country_change[1][i])

let arr_blended=[la_change_blended,country_change_blended]
let w_change=((width-(padding*2))/2)/(Math.max(...arr_blended.flat()))

let la_change_divided=[[],[]]
la_change_blended.forEach((e,i)=>{
  if(e>=0){la_change_divided[0][i]=e;la_change_divided[1][i]=0 }
  else{la_change_divided[0][i]=0;la_change_divided[1][i]=Math.abs(e) }
  })
la_change_divided[0]=la_change_divided[0].map(e=>(e/w)*w_change)
la_change_divided[1]=la_change_divided[1].map(e=>(e/w_change)*w)
  console.log("LA_CHANGE_DIVIDED",w, w_change,la_change_divided)

let country_change_divided=[[],[]]
country_change_blended.forEach((e,i)=>{
  if(e>=0){country_change_divided[0][i]=e;country_change_divided[1][i]=0 }
  else{country_change_divided[0][i]=0;country_change_divided[1][i]=Math.abs(e) }
  })
country_change_divided[0]=country_change_divided[0].map(e=>(e/w)*w_change)
country_change_divided[1]=country_change_divided[1].map(e=>(e/w_change)*w)
  console.log("COUNTRY_CHANGE_DIVIDED",w, w_change,country_change_divided)

data.LA.PYRAMID01
data.COUNTRY.PYRAMID01
data.COUNTRY.PYRAMID11

let stepPrev;
let request;
    function change(stp) {
      if (stp != stepPrev) {
     //   if (stp <= 11) {request="bars";pyramidStore.set(makeDataPyramid(data.LA.PYRAMID11))}
        if (stp == 12) {request="bars";pyramidStore.set(makeDataPyramid(data.LA.PYRAMID01),{easing:sineInOut})}    
        if (stp == 13) {request="bars";pyramidStore.set(makeDataPyramid(data.LA.PYRAMID11),{easing:sineInOut})}
        if (stp == 14) {request="bars";pyramidStore.set(makeDataPyramid(data.COUNTRY.PYRAMID11),{easing:sineInOut})}
        if (stp == 15) {request="bars";pyramidStore.set(makeDataPyramid(country_change_divided),{easing:sineInOut})}
        if (stp == 16) {request="bars";pyramidStore.set(makeDataPyramid(la_change_divided),{easing:sineInOut})}
        if (stp >= 17) {request="comparison2"}
        else{request="bars"}
        stepPrev = stp
       // timeline(step)
      }
    }



console.log("COUNTRY_CHANGE",country_change)

  $: animation && change(animation)
</script>

{#if animation}

<Pyramid bind:pyramid={$pyramidStore} {height} {padding} {width} {w} {w_change} {la_change_blended} {country_change_blended} {country_change_divided} {la_change_divided} request={request}/>

{/if}
