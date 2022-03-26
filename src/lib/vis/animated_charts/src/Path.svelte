<script>

	
	export let d,centroid,fill,fillOpacity,title,mouseover,mouseout,value,pop,metric,y,selected,area_cd,label_opacity,zoom


	
</script>
 <path
			id={selected?"selected":null}
      d={$d}
			centroid={centroid}
      class="shape"
      fill={$fill} 
			title={$title}
			fill-opacity={$fillOpacity}
			on:mouseover= {mouseover}
			on:focus={mouseover}
      on:mouseout= {mouseout}
			on:blur={mouseout}
			stroke-width={selected?"1pt":"0.5pt"}
			stroke={selected?"black":""}
			style="vector-effect: non-scaling-stroke;"
			value={$value}
			pop={pop}
			metric={$metric}
			y={$y}
			area_cd={$area_cd}
			zoom={zoom}
			 >
	{#if selected}
<animate attributeName="stroke-width" values="0;4;0" dur="2s" begin="0s" repeatCount="indefinite"/>

	 {/if}
</path>
<!--<text class="titles" x={centroid[0]} y={centroid[1]} text-anchor=middle font-size=4 opacity={$label_opacity} style="pointer-events: none;">
	{$title}
</text>-->