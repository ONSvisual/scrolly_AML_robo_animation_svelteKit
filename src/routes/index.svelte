<script>
  import lookup from "$lib/lookup.js"
  </script>

  {#each Object.keys(lookup) as place}
  <a href="{place}">{lookup[place]}</a>
  {/each}