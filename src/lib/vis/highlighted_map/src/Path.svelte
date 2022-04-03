<script>

	
	export let d,centroid,fill,fillOpacity,title,value,pop,metric,y,area_cd,label_opacity,zoom


	
</script>
 <path
			id={null}
      d={$d}
			centroid={centroid}
      class="shape"
      fill={$fill} 
			title={$title}
			fill-opacity={$fillOpacity}
			stroke-width={0}
			style="vector-effect: non-scaling-stroke;"
			value={$value}
			pop={pop}
			metric={$metric}
			y={$y}
			area_cd={$area_cd}
			zoom={zoom}
			 >
</path>
<!--<text class="titles" x={centroid[0]} y={centroid[1]} text-anchor=middle font-size=4 opacity={$label_opacity} style="pointer-events: none;">
	{$title}
</text>-->