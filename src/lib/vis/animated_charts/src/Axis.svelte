<script>


export let	x_origin,
						y_origin,
						x_offset,
						y_offset,
						width,
						height,
						padding,
						spacing,
						values,
						x_length = width,
						y_length = height,
						hoz_bar=[y_labels.map(e=>e.length)],
						vert_bar=[],//x_labels.map(e=>e.length),
						labelRotation=0,
						x_zero=0,
						y_zero=0,
						xTicks=true,
						yTicks=true,
						xAxis=1,
						yAxis=1,
						verticalStrokes=false,
						horizontalStrokes=true,
						chart_key
	
</script>


{#each Array(50) as item,i}
{#if $x_origin}
<!--verticals -->
  <g transform="translate({$x_origin + ($x_offset * (i-25)) },0 )">
		<line x1=0  x2=0 y1=5000 y2=-5000 stroke={i==25?"purple":"lightblue"}/>
		</g>

<!--horizontals -->
  <g transform="translate({$x_origin},
{($y_origin) - ($y_offset * (i-25))} )">
		<line x1=-5000  x2=2000 y1=-0 y2=0 stroke={i==25?"purple":"lightblue"}/>
  </g>
  {/if}
{/each}
{#if chart_key}
<g transform="translate({padding},{height - (padding*2) + 25})">
	{#if values.length}
	{#each values as value,i}
	{#if value%5==0 || i==0 || i==values.length-1}
<text text-align="center" x={(spacing*i)} y=0 fill=black stroke=black>{i==values.length-1?value + "% growth":value}</text>
{/if}
{/each}
{/if}
</g>
{/if}
<style>
	line{vector-effect: non-scaling-stroke;}
</style>