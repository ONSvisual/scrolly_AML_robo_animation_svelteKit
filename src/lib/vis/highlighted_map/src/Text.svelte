<script>
	import {zm} from '$lib/zm'
	export let d,centroid,fill,fillOpacity,title,mouseover,mouseout,value,pop,metric,selected,area_cd,label_opacity,zoom,x,y,k

	let labels=document.getElementsByClassName("labels")

</script>

<g class="label">
<text class="titles" x={centroid[0]} y={centroid[1]} text-anchor=middle font-size={15/$k} opacity={$label_opacity} style="pointer-events: none;" id={selected?"selectedText":null}>
	{$title}
</text>
<text class="titles" x={centroid[0]} y={centroid[1] + (20/$k)} text-anchor=middle font-size={15/$k} opacity={$label_opacity} style="pointer-events: none;" id={selected?"selectedValue":null}>
	{$value +" "+ $metric}
</text>
</g>