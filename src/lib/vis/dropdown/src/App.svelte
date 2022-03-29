<script>
	import Select from "./Select.svelte";
	import lookup from "$lib/lookup.js"
	let items=[]
	Object.keys(lookup).forEach((e,i)=>items[i]=( {
    "areacd": e,
    "areanm": lookup[e]
  }))
	export let selected=null

	function doSelect(event) {
		selected = event.detail
	}

	function doClear() {
		selected = null;
	}
	

</script>


<form>
	<label for="single">Select one local authority:</label>
	<Select id="single" idKey="areacd" labelKey="areanm" {items} on:select="{doSelect}" on:clear="{doClear}"/>
</form>

<h1> {selected ? selected.areanm : 'None'}</h1>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
	:global(body) {
		font-family: 'Open Sans', sans-serif;
	}
	label {
		margin: 20px 0 4px 0;
		font-weight: bold;
	}
	p {
		margin: 4px 0 20px 0;
	}
</style>