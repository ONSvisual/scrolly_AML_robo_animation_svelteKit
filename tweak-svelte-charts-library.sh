#!/bin/bash

sed -i.bak '1s/^import html2canvas.*$//' node_modules/@onsvisual/svelte-charts/src/js/utils.js

# sed -i.bak 's/width > 80/true/' node_modules/@onsvisual/svelte-charts/src/charts/*Chart.svelte
