var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => U5Bcodeu5D,
  dogs: () => dogs,
  load: () => load,
  prerender: () => prerender,
  selected: () => selected,
  test: () => test,
  title: () => title
});
var import_index_cf0e86af = __toModule(require("../../../chunks/index-cf0e86af.js"));
var import_paths_6758d194 = __toModule(require("../../../chunks/paths-6758d194.js"));
var import_archieml = __toModule(require("archieml"));
var import_d3_polygon = __toModule(require("d3-polygon"));
var import_svgpath = __toModule(require("svgpath"));
var import_svg_path_properties = __toModule(require("svg-path-properties"));
var import_earcut = __toModule(require("earcut"));
var import_topojson_client = __toModule(require("topojson-client"));
var import_d3_array = __toModule(require("d3-array"));
var import_d3_geo = __toModule(require("d3-geo"));
var import_topojson = __toModule(require("topojson"));
var import_d3_scale_chromatic = __toModule(require("d3-scale-chromatic"));
var import_d3_selection = __toModule(require("d3-selection"));
var import_line_intersect = __toModule(require("line-intersect"));
const getStores = () => {
  const stores = (0, import_index_cf0e86af.g)("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const subscriber_queue = [];
function writable(value, start = import_index_cf0e86af.n) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if ((0, import_index_cf0e86af.b)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_cf0e86af.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_cf0e86af.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const all_data = writable();
const step = writable(1);
const tracker = writable(1);
const txt = `
[ScrollY]
{.Part}
type:Static
headline:<br>Fastest-growing places
lede:The population of England and Wales has increased by 3.7 million in the 10 years leading up to the 2011 Census. Using the first results from this census, we look at which places have seen the biggest changes, which populations are ageing fastest, and how your area compares to other areas.
nutgraf:The census is a survey that happens every 10 years. The latest one gives us a picture of all the people and households in England and Wales on one day in March 2011. <br><br>Select your area below to see how the population has changed where you live and how it compares with others.
datavis: LA_selector_map
{}****** POPULATION CHANGE ******
{.Part}
type:Scroller
background:Animated_charts
family:animated
[.foreground]
{.section}
{.actions}
data-id:0
data-xKey:area
data-description:A map of local authority districts in {COUNTRY_NAME} is coloured to indicate the percentage change in population of each district. The map zooms to centre on {NAME} and show neighbouring areas. This table summarises the main statistics displayed. {TABLE}
data-title:Ten year population growth in {COUNTRY_NAME} by local authority district
{}
content:In {NAME}, the population has <b> {LA.ABS_CHANGE.FROM01TO11 0 >? increased : decreased } </b> from {LA.ABS.Y01 .-2 ,} in 2001 to {LA.ABS.Y11 .-2 ,} in 2011, {LA.ABS_CHANGE.FROM01TO11 0 >? a rise of {LA.PC_CHANGE.FROM01TO11 ~abs .1}%.:a fall of {LA.PC_CHANGE.FROM01TO11 ~abs .0}%.}{LA.ABS_CHANGE.FROM01TO11 0 >? This is {LA.PC_CHANGE.FROM01TO11 COUNTRY.PC_CHANGE.FROM01TO11 - COUNTRY.PC_CHANGE.FROM01TO11 2 / >? a lot : slightly } {LA.PC_CHANGE.FROM01TO11 COUNTRY.PC_CHANGE.FROM01TO11 >? higher : lower } than the average for {COUNTRY_NAME} ({COUNTRY.PC_CHANGE.FROM01TO11 .1}%). :This is the opposite to the national trend.}
{}
{.section}
{.actions}
data-id:1
data-highlighted:
data-description:The local authorities displayed on the map change form and position to create a bar chart, ordering neighbouring neighbouring districts from highest to lowest. {TABLE}
data-title:Ten year population growth in local authority districts near {NAME}
{}
content:Some nearby areas like {NEIGHBOURS.PC_CHANGE.top.NAME} and {NEIGHBOURS.PC_CHANGE.second.NAME} have seen their populations increase by {NEIGHBOURS.PC_CHANGE.top.VAL .0}% and {NEIGHBOURS.PC_CHANGE.second.VAL .0}% respectively, while others such as {NEIGHBOURS.PC_CHANGE.last.NAME} ({NEIGHBOURS.PC_CHANGE.last.VAL .0}%) and {NEIGHBOURS.PC_CHANGE.penultimate.NAME} ({NEIGHBOURS.PC_CHANGE.penultimate.VAL .0}%) have seen smaller changes.
{}
{.section}
{.actions}
data-id:2
data-bounds:ew
data-mapKey:null
mapHighlighted:[]
data-explore:false
data-description:More bars are added to the bar chart, to display all of the local authority districts in {REGION}. The two fastest growing places are highlighted. {TABLE}
data-title:Ten year population growth of local authority districts in {REGION_NAME}
{}
content:The sharpest population increases in {REGION_NAME} have been seen in {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME} and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME}, where the populations have grown by {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE}% and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE}% respectively.
{}
{.section}
{.actions}
data-id:3
data-description:On the same bar chart,  The district that has recorded the slowest growth is  highlighted. {TABLE}
data-title:Ten year population growth of local authority districts in {REGION_NAME}
{}
content:At the other end of the scale, {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.NAME} has seen {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE 0 <?a fall of {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE ~abs}%.:}{REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE 0 >?an increase of just {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE}%.:}{REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE?:no notable change.}
{}
{.section}
{.actions}
data-id:4
data-description:The bar chart changes back into a map of the whole of {REGION_NAME}. The districts on the map then turn into equally sized squares and are stacked to form a bell curve, with number of places on the y-axis and percentage change on the x-axis. {Name} is highlighted.{TABLE}
data-title:Local authority districts grouped by population growth in {REGION_NAME}
{}
content:At {LA.PC_CHANGE.FROM01TO11 ~abs .1}%, {LA.ABS_CHANGE.FROM01TO11 0 >?{NAME '} population change is {LA.PC_CHANGE.FROM01TO11 REGION.PC_CHANGE.FROM01TO11 - REGION.PC_CHANGE.FROM01TO11 2 / >? a lot : slightly } {LA.PC_CHANGE.FROM01TO11 REGION.PC_CHANGE.FROM01TO11 >? higher : lower } than the average for {REGION_NAME} ({REGION.PC_CHANGE.FROM01TO11 .1}%). :This is the opposite to the national trend.}
{}

{.section}
{.actions}
data-id:5
data-description:The two fastest growing places in the country are highlighted on the bell curve.{TABLE}
data-title:Local authority districts grouped by population growth in {COUNTRY_NAME}
{}
content:{COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME} saw the largest percentage growth in population in {COUNTRY_NAME}, increasing {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE}% between 2001 and 2011. {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME} was second, increasing {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE}%.
{}
{.section}
{.actions}
data-id:6
data-description:The district that has seen the greatest fall in population is highlighted on the bell curve.{TABLE}
data-title:Local authority districts grouped by population growth in {COUNTRY_NAME}
{}
content:A few places have seen their populations decline. {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.NAME} in the {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.GOR10NM} had an estimated population of {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP11 ,} in 2011, which was {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP01 COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP11 - ,} fewer than in 2001, and a decrease of {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE ~abs}%.
{}
{.section}
{.actions}
data-id:7
data-description:The bell curve changes into circles located at the centre of each district on a map. The area of each circle indicates the total population.{TABLE}
data-title:Population size of local authority districts in {COUNTRY_NAME}
{}
content:The total population of local authority areas varies a lot, from {COUNTRY.HEADLINES.BIGGEST_POP.top.NAME} with over {COUNTRY.HEADLINES.BIGGEST_POP.top.POP11 ,} people to {COUNTRY.HEADLINES.SMALLEST_POP.lowest.NAME} with just over {COUNTRY.HEADLINES.SMALLEST_POP.lowest.NAME} people. The area of these circles indicates total population.
{}
{.section}
{.actions}
data-id:8
data-description:The circles are stacked, one above another, ordered according to their size. {NAME} is highlighted. They are then duplicated into a second column to the left of the first which is reordered to show 2011 values. They are linked to form a ranking chart. {NAME} is highlighted.{TABLE}
data-title: Ten year changes in ranking of local authority districts by population size
{}
content:In 2011, {NAME} ranked {LA.COUNTRY_RANK.Y11.here ~ord} for total population out of {LA.COUNTRY_RANK.Y11.all} local authority areas in {COUNTRY_NAME}, {LA.COUNTRY_RANK.Y11.here LA.COUNTRY_RANK.Y01.here >?a fall of {LA.COUNTRY_RANK.Y11.here LA.COUNTRY_RANK.Y01.here -} places in a decade.:}{LA.COUNTRY_RANK.Y11.here LA.COUNTRY_RANK.Y01.here <? moving up {LA.COUNTRY_RANK.Y01.here LA.COUNTRY_RANK.Y11.here -} places in a decade.:}{LA.COUNTRY_RANK.Y11.here LA.COUNTRY_RANK.Y01.here -?:maintaining the same position it held a decade ago.}
{}
:skip UNTIL CLASS RANK IS RESOLVED
{.section}
{.actions}
data-id:1
{}
content:The Office for National Statistics (ONS) classifies areas according to their demographic characteristics. {NAME} is in the group "{CLASS}", which also applies to {LA.CLASS_RANK.DENSITY.Y11.all 1 -} other local authority districts in {COUNTRY_NAME}, such as {TWINS.first.NAME}, {TWINS.second.NAME}, or {TWINS.third.NAME}. This kind of place has grown more than the average.
{}
:endskip
[]
{}//end of first Scroller
:skip
{.Part}
type:Scroller
background:Map1
family:map
[.foreground]
[]
{}//end of second Scroller
:endskip
****** DENSITY ******
{.Part}
type:Filler
content:While the population has increased, the amount of land in {COUNTRY_NAME} has not. Some areas have seen their population density increase much more than others.
{}//end of Filler
{.Part}
type:Scroller
background:Football
family:football
[.foreground]
{.section}
{.actions}
data-id:9
data-description:A drawing football pitch is displayed. The number of people on the pitch, or the number of pitches for one person change as described in the text content.{TABLE}
data-title: Population density of {NAME}
{}
content:{LA.REGION_RANK.DENSITY.Y11.here LA.REGION_RANK.DENSITY.Y11.all 2 / >?As of 2011, {NAME} is the {LA.REGION_RANK.DENSITY.Y11.here LA.REGION_RANK.DENSITY.Y11.here - ~ord} most sparsely populated of {REGION_NAME '} {LA.REGION_RANK.DENSITY.Y11.all} districts, {187 LA.DENSITY.DENSITY11 / 1 >?with an area equivalent to around {187 LA.DENSITY.DENSITY11 / .0} football pitches per resident: with around {LA.DENSITY.DENSITY11 187 / .0} people living on each football-pitch-sized area of land}:As of 2011, {NAME} is the {LA.REGION_RANK.DENSITY.Y11.here ~ord} most densely populated of {REGION_NAME '} {LA.REGION_RANK.DENSITY.Y11.all} districts, with around {LA.DENSITY.DENSITY11 187 / .0} people living on each football-pitch-sized area of land}.
{}
{.section}
{.actions}
data-id:10
data-title: Population density of {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.highest.NAME}
{}
content:In {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.highest.NAME}, the population works out at around {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.highest.PEOPLE_PER_FOOOTY_PITCH .0} per pitch.
{}
{.section}
{.actions}
data-id:11
data-title: Population density of {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.NAME}
{}
content:At the other end of the population density scale, the amount of land in the rural district of {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.NAME} works out at nearly {1 COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.PEOPLE_PER_FOOOTY_PITCH / .0} pitches per resident.
{}
:skip
{.section}
{.actions}
data-id:1
{}
content:The population growth seen in {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME} is equivalent to an additional {COUNTRY.HEADLINES.NEW_PLAYERS_BY_CLASS.first.ADDITIONAL_PLAYERS .0} players being drafted onto each pitch in the 10 years to 2011.
{}
:endskip
[]
{}//end of third Scroller****** AGE ******
{.Part}
type:Filler
content:The proportion of people in different age groups across {COUNTRY_NAME} changes from census to census
{}//end of Filler
{.Part}
type:Scroller
background:Pyramids
family:pp
[.foreground]
{.section}
{.actions}
data-id:12
data-description:A population pyramid is displayed. It shows the proportion of males and females in each age group for {NAME} in 2001. The age-group with the largest number of people is highlighted.{TABLE}
data-title: The age and sex distribution of the population of {NAME} in 2001
{}
content:This population pyramid shows the population of males and females in each five-year age group at the time of the 2001 Census.<br>the largest age group in {NAME} was people aged {LA.LARGEST_AGEGROUP01.AGEBAND} to {LA.LARGEST_AGEGROUP01.AGEBAND 4 +}.
{}
{.section}
{.actions}
data-id:13
data-description:A population pyramid is displayed. It shows the proportion of males and females in each age group for {NAME} in 2001. The age-group with the largest number of people is highlighted.{TABLE}
data-title: The age and sex distribution of the population of {NAME} in 2011
{}
content:More recently, in 2011, the largest age group in {NAME} was people aged {LA.LARGEST_AGEGROUP11.AGEBAND} to {LA.LARGEST_AGEGROUP11.AGEBAND 4 +}.
{}
{.section}
{.actions}
data-id:14
data-description:The population pyramid changes to show the proportion of males and females in each age group for {COUNTRY_NAME}. The age-group with the largest number of people is highlighted.{TABLE}
data-title:The age and sex distribution of the population in {COUNTRY_NAME}
{}
content:In {COUNTRY_NAME}, the largest age group in 2011 was people in their late forties.
{}
{.section}
{.actions}
data-id:15
data-description: The population pyramid turns into a horizontal bar chart with bars representing the change in proportion of people of any sex in  {COUNTRY_NAME}.{TABLE}
data-title: Population change by age group in {COUNTRY_NAME}
{}
content:Overall in {COUNTRY_NAME}, there has been {COUNTRY.OVER65.ABS.Y11 COUNTRY.OVER65.ABS.Y01 >?an increase: a decrease} of {COUNTRY.OVER65.ABS.Y11 COUNTRY.OVER65.ABS.Y01 - COUNTRY.OVER65.ABS.Y01 / 100 * .0 ~abs}%  in people aged 65 years and over, {COUNTRY.WORKING.ABS.Y11 COUNTRY.WORKING.ABS.Y01 >?an increase:a decrease} of {COUNTRY.WORKING.ABS.Y11 COUNTRY.WORKING.ABS.Y01 - COUNTRY.WORKING.ABS.Y01 / 100 * .0 ~abs}% in people aged 20 to 65 years, and {COUNTRY.UNDER20.ABS.Y11 COUNTRY.UNDER20.ABS.Y01 >?an increase: a decrease} of {COUNTRY.UNDER20.ABS.Y11 COUNTRY.UNDER20.ABS.Y01 - COUNTRY.UNDER20.ABS.Y01 / 100 * .0 ~abs}% in people aged under 20 years.
{}
{.section}
{.actions}
data-id:16
data-description: Three new bars are added to the bar chart representing the proportion of people aged 65 and over, people aged from 20 to 64 years, and people aged under 20 in {NAME}.{TABLE}
data-title: Population change by age group in {NAME}
{}
content:This is how {NAME} compares. There has been {LA.OVER65.ABS.Y11 LA.OVER65.ABS.Y01 >?an increase: a decrease} of {LA.OVER65.ABS.Y11 LA.OVER65.ABS.Y01 - LA.OVER65.ABS.Y01 / 100 * .0 ~abs}% in people aged 65 years and over, {LA.WORKING.ABS.Y11 LA.WORKING.ABS.Y01 >?an increase:a decrease} of {LA.WORKING.ABS.Y11 LA.WORKING.ABS.Y01 - LA.WORKING.ABS.Y01 / 100 * .0 ~abs}% in people aged 20 to 65 years, and {LA.UNDER20.ABS.Y11 LA.UNDER20.ABS.Y01 >?an increase:a decrease} of {LA.UNDER20.ABS.Y11 LA.UNDER20.ABS.Y01 - LA.UNDER20.ABS.Y01 / 100 * .0 ~abs}% in people aged under 20 years.
{}



{.section}
{.actions}
data-id:17
data-description: A map of {COUNTRY_NAME} appears, highlighting the 10 districts with the greatest increase in people aged 65 and over.{TABLE}
data-title: Top ten districts for population increase in over-65\u2019s 
{}
content:The places that have seen the largest increases in the proportion of people aged 65 years and over are Monmouthshire (25% increase) and Isle of Anglesey (23%).
{}




****** AGE_CHARACTERISTICS ******
{.section}
{.actions}
data-id:18
data-description: The map now highlights the 10 districts with the greatest increase in people aged under 15.{TABLE}
data-title: Top ten districts for population increase in under-15\u2019s
{}
content: The number of children in every local authority district of Wales has decreased, with the exception of Wrexham, which has seen a 1% increase in people aged under 15.
{}
[]
{}//end of 4th Scroller*** SEX ***
{.Part}
type:Filler
content:Around 51% of the population of {COUNTRY_NAME} is female and 49% is male. However, women tend to live longer than men, so areas with an older population typically have more females than males.
{}//end of Filler
{.Part}
type:Scroller
background:Pyramids
family:verticalBar
[.foreground]
{.section}
{.actions}
data-id:19
data-description: A bar chart is displayed with two bars showing the number of males and females aged 65 years and over in {NAME}.{TABLE}
data-title:The split of males and females in the over-65\u2019s age group in {NAME}
{}
content:In the 65 years and over age group, {NAME} has a split of 14,500 females to 9,600 males.
{}
{.section}
{.actions}
data-id:20
data-description: A map of {COUNTRY_NAME} highlights the 5 places with the highest ratio of males to females and the highest ratio of female to males. {TABLE} 
data-title:The most male and female places in {COUNTRY_NAME}

{}
content:Every local authority district in Wales has more females than males, with the most balanced place being Wrexham. The places with the highest ratio of females to males in {COUNTRY_NAME} is Conwy, which has 106 females for every 100 males. 
{}
[]
{}//end of fifth Scroller
{.Part}
type:Filler
content:We are publishing more insights from Census 2021. These first results are from the more <u>detailed bulletin</u>.<br><br>You can find out more about what has changed in your area since 2011 with our <u>local page</u>.<br><br>And you can test your population knowledge with this <u>online game</u>. <br><br><br>Future census topics to be released include<br><ul><li>Households and their characteristics</li><li>Ethnicity, identity, language and religion</li></ul><br>Explore more census content <u>here</u>.{}
[]//end of ScrollY

`;
const { load: load$1 } = import_archieml.default;
const story_json = writable(load$1(txt).ScrollY.map((e) => e.Part));
var Axis_svelte_svelte_type_style_lang = "";
const css$e = {
  code: "line.svelte-1ma9czi{vector-effect:non-scaling-stroke}",
  map: null
};
const Axis = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $x_origin, $$unsubscribe_x_origin;
  let $x_offset, $$unsubscribe_x_offset;
  let $y_origin, $$unsubscribe_y_origin;
  let $y_offset, $$unsubscribe_y_offset;
  let { x_origin, y_origin, x_offset, y_offset, width: width2, height, padding, spacing, values, x_length = width2, y_length = height, hoz_bar = [y_labels.map((e) => e.length)], vert_bar = [], labelRotation = 0, x_zero = 0, y_zero = 0, xTicks = true, yTicks = true, xAxis = 1, yAxis = 1, verticalStrokes = false, horizontalStrokes = true, chart_key } = $$props;
  $$unsubscribe_x_origin = (0, import_index_cf0e86af.d)(x_origin, (value) => $x_origin = value);
  $$unsubscribe_y_origin = (0, import_index_cf0e86af.d)(y_origin, (value) => $y_origin = value);
  $$unsubscribe_x_offset = (0, import_index_cf0e86af.d)(x_offset, (value) => $x_offset = value);
  $$unsubscribe_y_offset = (0, import_index_cf0e86af.d)(y_offset, (value) => $y_offset = value);
  if ($$props.x_origin === void 0 && $$bindings.x_origin && x_origin !== void 0)
    $$bindings.x_origin(x_origin);
  if ($$props.y_origin === void 0 && $$bindings.y_origin && y_origin !== void 0)
    $$bindings.y_origin(y_origin);
  if ($$props.x_offset === void 0 && $$bindings.x_offset && x_offset !== void 0)
    $$bindings.x_offset(x_offset);
  if ($$props.y_offset === void 0 && $$bindings.y_offset && y_offset !== void 0)
    $$bindings.y_offset(y_offset);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  if ($$props.x_length === void 0 && $$bindings.x_length && x_length !== void 0)
    $$bindings.x_length(x_length);
  if ($$props.y_length === void 0 && $$bindings.y_length && y_length !== void 0)
    $$bindings.y_length(y_length);
  if ($$props.hoz_bar === void 0 && $$bindings.hoz_bar && hoz_bar !== void 0)
    $$bindings.hoz_bar(hoz_bar);
  if ($$props.vert_bar === void 0 && $$bindings.vert_bar && vert_bar !== void 0)
    $$bindings.vert_bar(vert_bar);
  if ($$props.labelRotation === void 0 && $$bindings.labelRotation && labelRotation !== void 0)
    $$bindings.labelRotation(labelRotation);
  if ($$props.x_zero === void 0 && $$bindings.x_zero && x_zero !== void 0)
    $$bindings.x_zero(x_zero);
  if ($$props.y_zero === void 0 && $$bindings.y_zero && y_zero !== void 0)
    $$bindings.y_zero(y_zero);
  if ($$props.xTicks === void 0 && $$bindings.xTicks && xTicks !== void 0)
    $$bindings.xTicks(xTicks);
  if ($$props.yTicks === void 0 && $$bindings.yTicks && yTicks !== void 0)
    $$bindings.yTicks(yTicks);
  if ($$props.xAxis === void 0 && $$bindings.xAxis && xAxis !== void 0)
    $$bindings.xAxis(xAxis);
  if ($$props.yAxis === void 0 && $$bindings.yAxis && yAxis !== void 0)
    $$bindings.yAxis(yAxis);
  if ($$props.verticalStrokes === void 0 && $$bindings.verticalStrokes && verticalStrokes !== void 0)
    $$bindings.verticalStrokes(verticalStrokes);
  if ($$props.horizontalStrokes === void 0 && $$bindings.horizontalStrokes && horizontalStrokes !== void 0)
    $$bindings.horizontalStrokes(horizontalStrokes);
  if ($$props.chart_key === void 0 && $$bindings.chart_key && chart_key !== void 0)
    $$bindings.chart_key(chart_key);
  $$result.css.add(css$e);
  $$unsubscribe_x_origin();
  $$unsubscribe_x_offset();
  $$unsubscribe_y_origin();
  $$unsubscribe_y_offset();
  return `${(0, import_index_cf0e86af.f)(Array(50), (item, i) => {
    return `${$x_origin ? `
  <g transform="${"translate(" + (0, import_index_cf0e86af.e)($x_origin + $x_offset * (i - 25)) + ",0 )"}"><line x1="${"0"}" x2="${"0"}" y1="${"5000"}" y2="${"-5000"}"${(0, import_index_cf0e86af.a)("stroke", i == 25 ? "purple" : "lightblue", 0)} class="${"svelte-1ma9czi"}"></line></g>


  <g transform="${"translate(" + (0, import_index_cf0e86af.e)($x_origin) + ",\n" + (0, import_index_cf0e86af.e)($y_origin - $y_offset * (i - 25)) + " )"}"><line x1="${"-5000"}" x2="${"2000"}" y1="${"-0"}" y2="${"0"}"${(0, import_index_cf0e86af.a)("stroke", i == 25 ? "purple" : "lightblue", 0)} class="${"svelte-1ma9czi"}"></line></g>` : ``}`;
  })}
${chart_key ? `<g transform="${"translate(" + (0, import_index_cf0e86af.e)(padding) + "," + (0, import_index_cf0e86af.e)(height - padding * 2 + 25) + ")"}">${values.length ? `${(0, import_index_cf0e86af.f)(values, (value, i) => {
    return `${value % 5 == 0 || i == 0 || i == values.length - 1 ? `<text text-align="${"center"}"${(0, import_index_cf0e86af.a)("x", spacing * i, 0)} y="${"0"}" fill="${"black"}" stroke="${"black"}">${(0, import_index_cf0e86af.e)(i == values.length - 1 ? value + "% growth" : value)}</text>` : ``}`;
  })}` : ``}</g>` : ``}`;
});
const Path = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $d, $$unsubscribe_d;
  let $fill, $$unsubscribe_fill;
  let $title, $$unsubscribe_title;
  let $fillOpacity, $$unsubscribe_fillOpacity;
  let $value, $$unsubscribe_value;
  let $metric, $$unsubscribe_metric;
  let $y, $$unsubscribe_y;
  let $area_cd, $$unsubscribe_area_cd;
  let { d, centroid, fill, fillOpacity, title: title2, mouseover, mouseout, value, pop, metric, y: y2, selected: selected2, area_cd, label_opacity, zoom } = $$props;
  $$unsubscribe_d = (0, import_index_cf0e86af.d)(d, (value2) => $d = value2);
  $$unsubscribe_fill = (0, import_index_cf0e86af.d)(fill, (value2) => $fill = value2);
  $$unsubscribe_fillOpacity = (0, import_index_cf0e86af.d)(fillOpacity, (value2) => $fillOpacity = value2);
  $$unsubscribe_title = (0, import_index_cf0e86af.d)(title2, (value2) => $title = value2);
  $$unsubscribe_value = (0, import_index_cf0e86af.d)(value, (value2) => $value = value2);
  $$unsubscribe_metric = (0, import_index_cf0e86af.d)(metric, (value2) => $metric = value2);
  $$unsubscribe_y = (0, import_index_cf0e86af.d)(y2, (value2) => $y = value2);
  $$unsubscribe_area_cd = (0, import_index_cf0e86af.d)(area_cd, (value2) => $area_cd = value2);
  if ($$props.d === void 0 && $$bindings.d && d !== void 0)
    $$bindings.d(d);
  if ($$props.centroid === void 0 && $$bindings.centroid && centroid !== void 0)
    $$bindings.centroid(centroid);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  if ($$props.fillOpacity === void 0 && $$bindings.fillOpacity && fillOpacity !== void 0)
    $$bindings.fillOpacity(fillOpacity);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.mouseover === void 0 && $$bindings.mouseover && mouseover !== void 0)
    $$bindings.mouseover(mouseover);
  if ($$props.mouseout === void 0 && $$bindings.mouseout && mouseout !== void 0)
    $$bindings.mouseout(mouseout);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.pop === void 0 && $$bindings.pop && pop !== void 0)
    $$bindings.pop(pop);
  if ($$props.metric === void 0 && $$bindings.metric && metric !== void 0)
    $$bindings.metric(metric);
  if ($$props.y === void 0 && $$bindings.y && y2 !== void 0)
    $$bindings.y(y2);
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  if ($$props.area_cd === void 0 && $$bindings.area_cd && area_cd !== void 0)
    $$bindings.area_cd(area_cd);
  if ($$props.label_opacity === void 0 && $$bindings.label_opacity && label_opacity !== void 0)
    $$bindings.label_opacity(label_opacity);
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  $$unsubscribe_d();
  $$unsubscribe_fill();
  $$unsubscribe_title();
  $$unsubscribe_fillOpacity();
  $$unsubscribe_value();
  $$unsubscribe_metric();
  $$unsubscribe_y();
  $$unsubscribe_area_cd();
  return `<path${(0, import_index_cf0e86af.a)("id", selected2 ? "selected" : null, 0)}${(0, import_index_cf0e86af.a)("d", $d, 0)}${(0, import_index_cf0e86af.a)("centroid", centroid, 0)} class="${"shape"}"${(0, import_index_cf0e86af.a)("fill", $fill, 0)}${(0, import_index_cf0e86af.a)("title", $title, 0)}${(0, import_index_cf0e86af.a)("fill-opacity", $fillOpacity, 0)}${(0, import_index_cf0e86af.a)("stroke-width", selected2 ? "1pt" : "0.5pt", 0)}${(0, import_index_cf0e86af.a)("stroke", selected2 ? "black" : "", 0)} style="${"vector-effect: non-scaling-stroke;"}"${(0, import_index_cf0e86af.a)("value", $value, 0)}${(0, import_index_cf0e86af.a)("pop", pop, 0)}${(0, import_index_cf0e86af.a)("metric", $metric, 0)}${(0, import_index_cf0e86af.a)("y", $y, 0)}${(0, import_index_cf0e86af.a)("area_cd", $area_cd, 0)}${(0, import_index_cf0e86af.a)("zoom", zoom, 0)}>${selected2 ? `<animate attributeName="${"stroke-width"}" values="${"0;4;0"}" dur="${"2s"}" begin="${"0s"}" repeatCount="${"indefinite"}"></animate>` : ``}</path>
`;
});
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a2, b2) {
  if (a2 === b2 || a2 !== a2)
    return () => a2;
  const type = typeof a2;
  if (type !== typeof b2 || Array.isArray(a2) !== Array.isArray(b2)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a2)) {
    const arr = b2.map((bi, i) => {
      return get_interpolator(a2[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a2 || !b2)
      throw new Error("Object cannot be null");
    if (is_date(a2) && is_date(b2)) {
      a2 = a2.getTime();
      b2 = b2.getTime();
      const delta = b2 - a2;
      return (t) => new Date(a2 + t * delta);
    }
    const keys = Object.keys(b2);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a2[key], b2[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b2 - a2;
    return (t) => a2 + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = import_index_cf0e86af.j, interpolate: interpolate2 = get_interpolator } = (0, import_index_cf0e86af.h)((0, import_index_cf0e86af.h)({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = (0, import_index_cf0e86af.i)() + delay;
    let fn;
    task = (0, import_index_cf0e86af.l)((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate2(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const zm = tweened(1);
const Text = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $k, $$unsubscribe_k;
  let $label_opacity, $$unsubscribe_label_opacity;
  let $title, $$unsubscribe_title;
  let $value, $$unsubscribe_value;
  let $metric, $$unsubscribe_metric;
  let { d, centroid, fill, fillOpacity, title: title2, mouseover, mouseout, value, pop, metric, selected: selected2, area_cd, label_opacity, zoom, x: x2, y: y2, k: k2 } = $$props;
  $$unsubscribe_title = (0, import_index_cf0e86af.d)(title2, (value2) => $title = value2);
  $$unsubscribe_value = (0, import_index_cf0e86af.d)(value, (value2) => $value = value2);
  $$unsubscribe_metric = (0, import_index_cf0e86af.d)(metric, (value2) => $metric = value2);
  $$unsubscribe_label_opacity = (0, import_index_cf0e86af.d)(label_opacity, (value2) => $label_opacity = value2);
  $$unsubscribe_k = (0, import_index_cf0e86af.d)(k2, (value2) => $k = value2);
  let labels = document.getElementsByClassName("labels");
  console.log("labels", labels);
  if ($$props.d === void 0 && $$bindings.d && d !== void 0)
    $$bindings.d(d);
  if ($$props.centroid === void 0 && $$bindings.centroid && centroid !== void 0)
    $$bindings.centroid(centroid);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  if ($$props.fillOpacity === void 0 && $$bindings.fillOpacity && fillOpacity !== void 0)
    $$bindings.fillOpacity(fillOpacity);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.mouseover === void 0 && $$bindings.mouseover && mouseover !== void 0)
    $$bindings.mouseover(mouseover);
  if ($$props.mouseout === void 0 && $$bindings.mouseout && mouseout !== void 0)
    $$bindings.mouseout(mouseout);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.pop === void 0 && $$bindings.pop && pop !== void 0)
    $$bindings.pop(pop);
  if ($$props.metric === void 0 && $$bindings.metric && metric !== void 0)
    $$bindings.metric(metric);
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  if ($$props.area_cd === void 0 && $$bindings.area_cd && area_cd !== void 0)
    $$bindings.area_cd(area_cd);
  if ($$props.label_opacity === void 0 && $$bindings.label_opacity && label_opacity !== void 0)
    $$bindings.label_opacity(label_opacity);
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.x === void 0 && $$bindings.x && x2 !== void 0)
    $$bindings.x(x2);
  if ($$props.y === void 0 && $$bindings.y && y2 !== void 0)
    $$bindings.y(y2);
  if ($$props.k === void 0 && $$bindings.k && k2 !== void 0)
    $$bindings.k(k2);
  $$unsubscribe_k();
  $$unsubscribe_label_opacity();
  $$unsubscribe_title();
  $$unsubscribe_value();
  $$unsubscribe_metric();
  return `<g class="${"label"}"><text class="${"titles"}"${(0, import_index_cf0e86af.a)("x", centroid[0], 0)}${(0, import_index_cf0e86af.a)("y", centroid[1], 0)} text-anchor="${"middle"}"${(0, import_index_cf0e86af.a)("font-size", 15 / $k, 0)}${(0, import_index_cf0e86af.a)("opacity", $label_opacity, 0)} style="${"pointer-events: none;"}"${(0, import_index_cf0e86af.a)("id", selected2 ? "selectedText" : null, 0)}>${(0, import_index_cf0e86af.e)($title)}</text><text class="${"titles"}"${(0, import_index_cf0e86af.a)("x", centroid[0], 0)}${(0, import_index_cf0e86af.a)("y", centroid[1] + 20 / $k, 0)} text-anchor="${"middle"}"${(0, import_index_cf0e86af.a)("font-size", 15 / $k, 0)}${(0, import_index_cf0e86af.a)("opacity", $label_opacity, 0)} style="${"pointer-events: none;"}"${(0, import_index_cf0e86af.a)("id", selected2 ? "selectedValue" : null, 0)}>${(0, import_index_cf0e86af.e)($value + " " + $metric)}</text></g>`;
});
function distance(a2, b2) {
  return Math.sqrt((a2[0] - b2[0]) * (a2[0] - b2[0]) + (a2[1] - b2[1]) * (a2[1] - b2[1]));
}
function pointAlong(a2, b2, pct) {
  return [a2[0] + (b2[0] - a2[0]) * pct, a2[1] + (b2[1] - a2[1]) * pct];
}
function samePoint(a2, b2) {
  return distance(a2, b2) < 1e-9;
}
function interpolatePoints(a2, b2, string) {
  let interpolators = a2.map((d, i) => interpolatePoint(d, b2[i]));
  return function(t) {
    let values = interpolators.map((fn) => fn(t));
    return string ? toPathString(values) : values;
  };
}
function interpolatePoint(a2, b2) {
  return function(t) {
    return a2.map((d, i) => d + t * (b2[i] - d));
  };
}
function isFiniteNumber(number) {
  return typeof number === "number" && isFinite(number);
}
const INVALID_INPUT = `All shapes must be supplied as arrays of [x, y] points or an SVG path string (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).
Example valid ways of supplying a shape would be:
[[0, 0], [10, 0], [10, 10]]
"M0,0 L10,0 L10,10Z"
`;
function parse(str) {
  return new import_svgpath.default(str).abs();
}
function split(parsed) {
  return parsed.toString().split("M").map((d, i) => {
    d = d.trim();
    return i && d ? "M" + d : d;
  }).filter((d) => d);
}
function toPathString(ring) {
  return "M" + ring.join("L") + "Z";
}
function pathStringToRing(str, maxSegmentLength) {
  let parsed = parse(str);
  return exactRing(parsed) || approximateRing(parsed, maxSegmentLength);
}
function exactRing(parsed) {
  let segments = parsed.segments || [], ring = [];
  if (!segments.length || segments[0][0] !== "M") {
    return false;
  }
  for (let i = 0; i < segments.length; i++) {
    let [command, x2, y2] = segments[i];
    if (command === "M" && i || command === "Z") {
      break;
    } else if (command === "M" || command === "L") {
      ring.push([x2, y2]);
    } else if (command === "H") {
      ring.push([x2, ring[ring.length - 1][1]]);
    } else if (command === "V") {
      ring.push([ring[ring.length - 1][0], x2]);
    } else {
      return false;
    }
  }
  return ring.length ? { ring } : false;
}
function approximateRing(parsed, maxSegmentLength) {
  let ringPath = split(parsed)[0], ring = [], len, m, numPoints = 3;
  if (!ringPath) {
    throw new TypeError(INVALID_INPUT);
  }
  m = measure(ringPath);
  len = m.getTotalLength();
  if (maxSegmentLength && isFiniteNumber(maxSegmentLength) && maxSegmentLength > 0) {
    numPoints = Math.max(numPoints, Math.ceil(len / maxSegmentLength));
  }
  for (let i = 0; i < numPoints; i++) {
    let p = m.getPointAtLength(len * i / numPoints);
    ring.push([p.x, p.y]);
  }
  return {
    ring,
    skipBisect: true
  };
}
function measure(d) {
  if (typeof window !== "undefined" && window && window.document) {
    try {
      let path = window.document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttributeNS(null, "d", d);
      return path;
    } catch (e) {
    }
  }
  return (0, import_svg_path_properties.svgPathProperties)(d);
}
function addPoints(ring, numPoints) {
  const desiredLength = ring.length + numPoints, step2 = (0, import_d3_polygon.polygonLength)(ring) / numPoints;
  let i = 0, cursor = 0, insertAt = step2 / 2;
  while (ring.length < desiredLength) {
    let a2 = ring[i], b2 = ring[(i + 1) % ring.length], segment = distance(a2, b2);
    if (insertAt <= cursor + segment) {
      ring.splice(i + 1, 0, segment ? pointAlong(a2, b2, (insertAt - cursor) / segment) : a2.slice(0));
      insertAt += step2;
      continue;
    }
    cursor += segment;
    i++;
  }
}
function bisect(ring, maxSegmentLength = Infinity) {
  for (let i = 0; i < ring.length; i++) {
    let a2 = ring[i], b2 = i === ring.length - 1 ? ring[0] : ring[i + 1];
    while (distance(a2, b2) > maxSegmentLength) {
      b2 = pointAlong(a2, b2, 0.5);
      ring.splice(i + 1, 0, b2);
    }
  }
}
function normalizeRing(ring, maxSegmentLength) {
  let points, area, skipBisect;
  if (typeof ring === "string") {
    let converted = pathStringToRing(ring, maxSegmentLength);
    ring = converted.ring;
    skipBisect = converted.skipBisect;
  } else if (!Array.isArray(ring)) {
    throw new TypeError(INVALID_INPUT);
  }
  points = ring.slice(0);
  if (!validRing(points)) {
    throw new TypeError(INVALID_INPUT);
  }
  if (points.length > 1 && samePoint(points[0], points[points.length - 1])) {
    points.pop();
  }
  area = (0, import_d3_polygon.polygonArea)(points);
  if (area > 0) {
    points.reverse();
  }
  if (!skipBisect && maxSegmentLength && isFiniteNumber(maxSegmentLength) && maxSegmentLength > 0) {
    bisect(points, maxSegmentLength);
  }
  return points;
}
function validRing(ring) {
  return ring.every(function(point) {
    return Array.isArray(point) && point.length >= 2 && isFiniteNumber(point[0]) && isFiniteNumber(point[1]);
  });
}
function rotate(ring, vs) {
  let len = ring.length, min = Infinity, bestOffset, sumOfSquares, spliced;
  for (let offset = 0; offset < len; offset++) {
    sumOfSquares = 0;
    vs.forEach(function(p, i) {
      let d = distance(ring[(offset + i) % len], p);
      sumOfSquares += d * d;
    });
    if (sumOfSquares < min) {
      min = sumOfSquares;
      bestOffset = offset;
    }
  }
  if (bestOffset) {
    spliced = ring.splice(0, bestOffset);
    ring.splice(ring.length, 0, ...spliced);
  }
}
function interpolate(fromShape, toShape, { maxSegmentLength = 10, string = true } = {}) {
  let fromRing = normalizeRing(fromShape, maxSegmentLength), toRing = normalizeRing(toShape, maxSegmentLength), interpolator = interpolateRing(fromRing, toRing, string);
  if (!string || typeof fromShape !== "string" && typeof toShape !== "string") {
    return interpolator;
  }
  return (t) => {
    if (t < 1e-4 && typeof fromShape === "string") {
      return fromShape;
    }
    if (1 - t < 1e-4 && typeof toShape === "string") {
      return toShape;
    }
    return interpolator(t);
  };
}
function interpolateRing(fromRing, toRing, string) {
  let diff;
  diff = fromRing.length - toRing.length;
  addPoints(fromRing, diff < 0 ? diff * -1 : 0);
  addPoints(toRing, diff > 0 ? diff : 0);
  rotate(fromRing, toRing);
  return interpolatePoints(fromRing, toRing, string);
}
var growth = [
  {
    "LAD17CD": "E06000001",
    "GROWTH": 4,
    "TOTAL11": 92100,
    "UTLA": "E06000001",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000002",
    "GROWTH": 2,
    "TOTAL11": 138600,
    "UTLA": "E06000002",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000003",
    "GROWTH": -2,
    "TOTAL11": 135500,
    "UTLA": "E06000003",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000004",
    "GROWTH": 7,
    "TOTAL11": 191600,
    "UTLA": "E06000004",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000005",
    "GROWTH": 7,
    "TOTAL11": 105800,
    "UTLA": "E06000005",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000006",
    "GROWTH": 6,
    "TOTAL11": 125900,
    "UTLA": "E06000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E06000007",
    "GROWTH": 5,
    "TOTAL11": 202400,
    "UTLA": "E06000007",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E06000008",
    "GROWTH": 7,
    "TOTAL11": 147400,
    "UTLA": "E06000008",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E06000009",
    "GROWTH": 0,
    "TOTAL11": 142e3,
    "UTLA": "E06000009",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E06000010",
    "GROWTH": 5,
    "TOTAL11": 256300,
    "UTLA": "E06000010",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E06000011",
    "GROWTH": 6,
    "TOTAL11": 334500,
    "UTLA": "E06000011",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E06000012",
    "GROWTH": 1,
    "TOTAL11": 159900,
    "UTLA": "E06000012",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E06000013",
    "GROWTH": 9,
    "TOTAL11": 167100,
    "UTLA": "E06000013",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E06000014",
    "GROWTH": 9,
    "TOTAL11": 198100,
    "UTLA": "E06000014",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E06000015",
    "GROWTH": 12,
    "TOTAL11": 248800,
    "UTLA": "E06000015",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E06000016",
    "GROWTH": 17,
    "TOTAL11": 329500,
    "UTLA": "E06000016",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E06000017",
    "GROWTH": 7,
    "TOTAL11": 37200,
    "UTLA": "E06000017",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E06000018",
    "GROWTH": 14,
    "TOTAL11": 305800,
    "UTLA": "E06000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E06000019",
    "GROWTH": 4,
    "TOTAL11": 183200,
    "UTLA": "E06000019",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E06000020",
    "GROWTH": 5,
    "TOTAL11": 166800,
    "UTLA": "E06000020",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E06000021",
    "GROWTH": 3,
    "TOTAL11": 249100,
    "UTLA": "E06000021",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E06000022",
    "GROWTH": 4,
    "TOTAL11": 176100,
    "UTLA": "E06000022",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000023",
    "GROWTH": 12,
    "TOTAL11": 428100,
    "UTLA": "E06000023",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000024",
    "GROWTH": 7,
    "TOTAL11": 202600,
    "UTLA": "E06000024",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000025",
    "GROWTH": 6,
    "TOTAL11": 262700,
    "UTLA": "E06000025",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000026",
    "GROWTH": 6,
    "TOTAL11": 256600,
    "UTLA": "E06000026",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000027",
    "GROWTH": 0,
    "TOTAL11": 130700,
    "UTLA": "E06000027",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000030",
    "GROWTH": 15,
    "TOTAL11": 209200,
    "UTLA": "E06000030",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000031",
    "GROWTH": 17,
    "TOTAL11": 183800,
    "UTLA": "E06000031",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E06000032",
    "GROWTH": 10,
    "TOTAL11": 203100,
    "UTLA": "E06000032",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E06000033",
    "GROWTH": 8,
    "TOTAL11": 174e3,
    "UTLA": "E06000033",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E06000034",
    "GROWTH": 10,
    "TOTAL11": 157800,
    "UTLA": "E06000034",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E06000035",
    "GROWTH": 5,
    "TOTAL11": 263800,
    "UTLA": "E06000035",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000036",
    "GROWTH": 3,
    "TOTAL11": 113100,
    "UTLA": "E06000036",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000037",
    "GROWTH": 6,
    "TOTAL11": 153800,
    "UTLA": "E06000037",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000038",
    "GROWTH": 8,
    "TOTAL11": 156100,
    "UTLA": "E06000038",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000039",
    "GROWTH": 17,
    "TOTAL11": 140300,
    "UTLA": "E06000039",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000040",
    "GROWTH": 8,
    "TOTAL11": 144600,
    "UTLA": "E06000040",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000041",
    "GROWTH": 2,
    "TOTAL11": 154300,
    "UTLA": "E06000041",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000042",
    "GROWTH": 20,
    "TOTAL11": 248700,
    "UTLA": "E06000042",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000043",
    "GROWTH": 10,
    "TOTAL11": 273500,
    "UTLA": "E06000043",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000044",
    "GROWTH": 9,
    "TOTAL11": 205200,
    "UTLA": "E06000044",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000045",
    "GROWTH": 9,
    "TOTAL11": 237e3,
    "UTLA": "E06000045",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000046",
    "GROWTH": 4,
    "TOTAL11": 138400,
    "UTLA": "E06000046",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000047",
    "GROWTH": 4,
    "TOTAL11": 513600,
    "UTLA": "E06000047",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000049",
    "GROWTH": 5,
    "TOTAL11": 370500,
    "UTLA": "E06000049",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E06000050",
    "GROWTH": 2,
    "TOTAL11": 329500,
    "UTLA": "E06000050",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E06000051",
    "GROWTH": 8,
    "TOTAL11": 306100,
    "UTLA": "E06000051",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E06000052",
    "GROWTH": 6,
    "TOTAL11": 532300,
    "UTLA": "E06000052",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000053",
    "GROWTH": -7,
    "TOTAL11": 2600,
    "UTLA": "E06000053",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000054",
    "GROWTH": 8,
    "TOTAL11": 471e3,
    "UTLA": "E06000054",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000055",
    "GROWTH": 6,
    "TOTAL11": 157500,
    "UTLA": "E06000055",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E06000056",
    "GROWTH": 8,
    "TOTAL11": 254500,
    "UTLA": "E06000056",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E06000057",
    "GROWTH": 2,
    "TOTAL11": 316100,
    "UTLA": "E06000057",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E06000058",
    "GROWTH": 9,
    "TOTAL11": 378900,
    "UTLA": "E06000058",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000059",
    "GROWTH": 5,
    "TOTAL11": 365100,
    "UTLA": "E06000059",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E06000060",
    "GROWTH": 5,
    "TOTAL11": 505100,
    "UTLA": "E06000060",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E06000061",
    "GROWTH": 11,
    "TOTAL11": 316700,
    "UTLA": "E06000061",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E06000062",
    "GROWTH": 8,
    "TOTAL11": 375300,
    "UTLA": "E06000062",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000008",
    "GROWTH": 13,
    "TOTAL11": 124100,
    "UTLA": "E10000003",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000009",
    "GROWTH": 14,
    "TOTAL11": 84100,
    "UTLA": "E10000003",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000010",
    "GROWTH": 14,
    "TOTAL11": 95300,
    "UTLA": "E10000003",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000011",
    "GROWTH": 7,
    "TOTAL11": 169500,
    "UTLA": "E10000003",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000012",
    "GROWTH": 14,
    "TOTAL11": 148700,
    "UTLA": "E10000003",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000026",
    "GROWTH": 2,
    "TOTAL11": 96400,
    "UTLA": "E10000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000027",
    "GROWTH": -4,
    "TOTAL11": 69e3,
    "UTLA": "E10000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000028",
    "GROWTH": 6,
    "TOTAL11": 107700,
    "UTLA": "E10000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000029",
    "GROWTH": 2,
    "TOTAL11": 70700,
    "UTLA": "E10000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000030",
    "GROWTH": 5,
    "TOTAL11": 52400,
    "UTLA": "E10000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000031",
    "GROWTH": 1,
    "TOTAL11": 103600,
    "UTLA": "E10000006",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000032",
    "GROWTH": 4,
    "TOTAL11": 122400,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000033",
    "GROWTH": 5,
    "TOTAL11": 75900,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000034",
    "GROWTH": 4,
    "TOTAL11": 103800,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000035",
    "GROWTH": 2,
    "TOTAL11": 71e3,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000036",
    "GROWTH": 1,
    "TOTAL11": 112100,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000037",
    "GROWTH": 1,
    "TOTAL11": 90900,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000038",
    "GROWTH": 1,
    "TOTAL11": 98800,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000039",
    "GROWTH": 16,
    "TOTAL11": 94600,
    "UTLA": "E10000007",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000040",
    "GROWTH": 5,
    "TOTAL11": 132200,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000041",
    "GROWTH": 5,
    "TOTAL11": 117800,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000042",
    "GROWTH": 10,
    "TOTAL11": 77400,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000043",
    "GROWTH": 7,
    "TOTAL11": 93700,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000044",
    "GROWTH": 2,
    "TOTAL11": 83300,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000045",
    "GROWTH": 2,
    "TOTAL11": 124400,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000046",
    "GROWTH": 8,
    "TOTAL11": 63500,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000047",
    "GROWTH": 9,
    "TOTAL11": 53600,
    "UTLA": "E10000008",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000061",
    "GROWTH": 10,
    "TOTAL11": 99300,
    "UTLA": "E10000011",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000062",
    "GROWTH": 6,
    "TOTAL11": 90400,
    "UTLA": "E10000011",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000063",
    "GROWTH": 5,
    "TOTAL11": 97400,
    "UTLA": "E10000011",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000064",
    "GROWTH": 5,
    "TOTAL11": 90500,
    "UTLA": "E10000011",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000065",
    "GROWTH": 6,
    "TOTAL11": 148900,
    "UTLA": "E10000011",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000066",
    "GROWTH": 5,
    "TOTAL11": 174400,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000067",
    "GROWTH": 11,
    "TOTAL11": 146800,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000068",
    "GROWTH": 7,
    "TOTAL11": 73700,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000069",
    "GROWTH": 1,
    "TOTAL11": 87900,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000070",
    "GROWTH": 7,
    "TOTAL11": 168100,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000071",
    "GROWTH": 11,
    "TOTAL11": 173e3,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000072",
    "GROWTH": 3,
    "TOTAL11": 124700,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000073",
    "GROWTH": 4,
    "TOTAL11": 82100,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000074",
    "GROWTH": 4,
    "TOTAL11": 61600,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000075",
    "GROWTH": 6,
    "TOTAL11": 83200,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000076",
    "GROWTH": 0,
    "TOTAL11": 138100,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000077",
    "GROWTH": 15,
    "TOTAL11": 79500,
    "UTLA": "E10000012",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000078",
    "GROWTH": 5,
    "TOTAL11": 116200,
    "UTLA": "E10000013",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000079",
    "GROWTH": 2,
    "TOTAL11": 82900,
    "UTLA": "E10000013",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000080",
    "GROWTH": 2,
    "TOTAL11": 81800,
    "UTLA": "E10000013",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000081",
    "GROWTH": 10,
    "TOTAL11": 121600,
    "UTLA": "E10000013",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000082",
    "GROWTH": 4,
    "TOTAL11": 112600,
    "UTLA": "E10000013",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000083",
    "GROWTH": 7,
    "TOTAL11": 81900,
    "UTLA": "E10000013",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000084",
    "GROWTH": 9,
    "TOTAL11": 167400,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000085",
    "GROWTH": 5,
    "TOTAL11": 115500,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000086",
    "GROWTH": 7,
    "TOTAL11": 125e3,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000087",
    "GROWTH": 3,
    "TOTAL11": 111500,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000088",
    "GROWTH": 8,
    "TOTAL11": 82800,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000089",
    "GROWTH": 9,
    "TOTAL11": 91500,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000090",
    "GROWTH": 3,
    "TOTAL11": 120600,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000091",
    "GROWTH": 4,
    "TOTAL11": 176800,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000092",
    "GROWTH": 2,
    "TOTAL11": 93500,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000093",
    "GROWTH": 6,
    "TOTAL11": 116500,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000094",
    "GROWTH": 8,
    "TOTAL11": 116400,
    "UTLA": "E10000014",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000095",
    "GROWTH": 6,
    "TOTAL11": 93300,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000096",
    "GROWTH": 5,
    "TOTAL11": 144900,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000098",
    "GROWTH": 6,
    "TOTAL11": 100200,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000099",
    "GROWTH": 8,
    "TOTAL11": 127400,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000102",
    "GROWTH": 5,
    "TOTAL11": 87600,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000103",
    "GROWTH": 13,
    "TOTAL11": 90300,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000105",
    "GROWTH": 15,
    "TOTAL11": 117900,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000106",
    "GROWTH": 11,
    "TOTAL11": 151100,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000107",
    "GROWTH": 13,
    "TOTAL11": 97400,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000108",
    "GROWTH": 6,
    "TOTAL11": 111600,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000109",
    "GROWTH": 6,
    "TOTAL11": 101900,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000110",
    "GROWTH": 11,
    "TOTAL11": 155100,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000111",
    "GROWTH": 5,
    "TOTAL11": 115100,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000112",
    "GROWTH": 11,
    "TOTAL11": 107600,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000113",
    "GROWTH": 10,
    "TOTAL11": 135900,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000114",
    "GROWTH": 5,
    "TOTAL11": 134200,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000115",
    "GROWTH": 12,
    "TOTAL11": 120900,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000116",
    "GROWTH": 10,
    "TOTAL11": 114900,
    "UTLA": "E10000016",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000117",
    "GROWTH": -2,
    "TOTAL11": 87400,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000118",
    "GROWTH": 6,
    "TOTAL11": 107200,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000119",
    "GROWTH": 3,
    "TOTAL11": 76e3,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000120",
    "GROWTH": 0,
    "TOTAL11": 81e3,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000121",
    "GROWTH": 3,
    "TOTAL11": 138400,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000122",
    "GROWTH": 0,
    "TOTAL11": 89600,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000123",
    "GROWTH": 8,
    "TOTAL11": 140200,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000124",
    "GROWTH": 5,
    "TOTAL11": 57e3,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000125",
    "GROWTH": 3,
    "TOTAL11": 67900,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000126",
    "GROWTH": 5,
    "TOTAL11": 109100,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000127",
    "GROWTH": 2,
    "TOTAL11": 110600,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000128",
    "GROWTH": 2,
    "TOTAL11": 107900,
    "UTLA": "E10000017",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E07000129",
    "GROWTH": 4,
    "TOTAL11": 94e3,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000130",
    "GROWTH": 8,
    "TOTAL11": 166e3,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000131",
    "GROWTH": 11,
    "TOTAL11": 85400,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000132",
    "GROWTH": 4,
    "TOTAL11": 105e3,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000133",
    "GROWTH": 4,
    "TOTAL11": 5e4,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000134",
    "GROWTH": 9,
    "TOTAL11": 93600,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000135",
    "GROWTH": 0,
    "TOTAL11": 56400,
    "UTLA": "E10000018",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000136",
    "GROWTH": 16,
    "TOTAL11": 64700,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000137",
    "GROWTH": 4,
    "TOTAL11": 136300,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000138",
    "GROWTH": 9,
    "TOTAL11": 93700,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000139",
    "GROWTH": 15,
    "TOTAL11": 108e3,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000140",
    "GROWTH": 15,
    "TOTAL11": 88500,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000141",
    "GROWTH": 7,
    "TOTAL11": 133900,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000142",
    "GROWTH": 11,
    "TOTAL11": 89e3,
    "UTLA": "E10000019",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000143",
    "GROWTH": 7,
    "TOTAL11": 130400,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000144",
    "GROWTH": 4,
    "TOTAL11": 124700,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000145",
    "GROWTH": 7,
    "TOTAL11": 97200,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000146",
    "GROWTH": 8,
    "TOTAL11": 147200,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000147",
    "GROWTH": 3,
    "TOTAL11": 101500,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000148",
    "GROWTH": 8,
    "TOTAL11": 132500,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000149",
    "GROWTH": 11,
    "TOTAL11": 124e3,
    "UTLA": "E10000020",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000163",
    "GROWTH": 2,
    "TOTAL11": 55400,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000164",
    "GROWTH": 6,
    "TOTAL11": 89200,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000165",
    "GROWTH": 4,
    "TOTAL11": 157900,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000166",
    "GROWTH": 11,
    "TOTAL11": 52100,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000167",
    "GROWTH": 2,
    "TOTAL11": 52200,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000168",
    "GROWTH": 2,
    "TOTAL11": 108600,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000169",
    "GROWTH": 9,
    "TOTAL11": 83700,
    "UTLA": "E10000023",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E07000170",
    "GROWTH": 7,
    "TOTAL11": 119600,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000171",
    "GROWTH": 4,
    "TOTAL11": 112800,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000172",
    "GROWTH": 2,
    "TOTAL11": 109900,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000173",
    "GROWTH": 1,
    "TOTAL11": 113600,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000174",
    "GROWTH": 6,
    "TOTAL11": 104700,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000175",
    "GROWTH": 7,
    "TOTAL11": 114700,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000176",
    "GROWTH": 4,
    "TOTAL11": 110800,
    "UTLA": "E10000024",
    "REGION": "E12000004"
  },
  {
    "LAD17CD": "E07000177",
    "GROWTH": 7,
    "TOTAL11": 141700,
    "UTLA": "E10000025",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000178",
    "GROWTH": 12,
    "TOTAL11": 151800,
    "UTLA": "E10000025",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000179",
    "GROWTH": 4,
    "TOTAL11": 134200,
    "UTLA": "E10000025",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000180",
    "GROWTH": 4,
    "TOTAL11": 121200,
    "UTLA": "E10000025",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000181",
    "GROWTH": 9,
    "TOTAL11": 104600,
    "UTLA": "E10000025",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000187",
    "GROWTH": 4,
    "TOTAL11": 109200,
    "UTLA": "E10000027",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000188",
    "GROWTH": 8,
    "TOTAL11": 114600,
    "UTLA": "E10000027",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000189",
    "GROWTH": 6,
    "TOTAL11": 161200,
    "UTLA": "E10000027",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E07000192",
    "GROWTH": 5,
    "TOTAL11": 97300,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000193",
    "GROWTH": 9,
    "TOTAL11": 113500,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000194",
    "GROWTH": 7,
    "TOTAL11": 100600,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000195",
    "GROWTH": 1,
    "TOTAL11": 123700,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000196",
    "GROWTH": 1,
    "TOTAL11": 108e3,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000197",
    "GROWTH": 8,
    "TOTAL11": 130900,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000198",
    "GROWTH": 3,
    "TOTAL11": 97300,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000199",
    "GROWTH": 2,
    "TOTAL11": 77e3,
    "UTLA": "E10000028",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000200",
    "GROWTH": 4,
    "TOTAL11": 87600,
    "UTLA": "E10000029",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000202",
    "GROWTH": 13,
    "TOTAL11": 133300,
    "UTLA": "E10000029",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000203",
    "GROWTH": 11,
    "TOTAL11": 96900,
    "UTLA": "E10000029",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000207",
    "GROWTH": 7,
    "TOTAL11": 130900,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000208",
    "GROWTH": 12,
    "TOTAL11": 75200,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000209",
    "GROWTH": 5,
    "TOTAL11": 137e3,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000210",
    "GROWTH": 6,
    "TOTAL11": 85400,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000211",
    "GROWTH": 8,
    "TOTAL11": 137600,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000212",
    "GROWTH": 3,
    "TOTAL11": 80500,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000213",
    "GROWTH": 5,
    "TOTAL11": 95800,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000214",
    "GROWTH": 7,
    "TOTAL11": 86200,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000215",
    "GROWTH": 4,
    "TOTAL11": 82900,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000216",
    "GROWTH": 5,
    "TOTAL11": 121900,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000217",
    "GROWTH": 10,
    "TOTAL11": 99e3,
    "UTLA": "E10000030",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000218",
    "GROWTH": 0,
    "TOTAL11": 62e3,
    "UTLA": "E10000031",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000219",
    "GROWTH": 5,
    "TOTAL11": 125200,
    "UTLA": "E10000031",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000220",
    "GROWTH": 14,
    "TOTAL11": 100100,
    "UTLA": "E10000031",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000221",
    "GROWTH": 8,
    "TOTAL11": 120500,
    "UTLA": "E10000031",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000222",
    "GROWTH": 9,
    "TOTAL11": 137700,
    "UTLA": "E10000031",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000223",
    "GROWTH": 2,
    "TOTAL11": 61300,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000224",
    "GROWTH": 5,
    "TOTAL11": 149300,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000225",
    "GROWTH": 6,
    "TOTAL11": 113700,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000226",
    "GROWTH": 7,
    "TOTAL11": 106900,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000227",
    "GROWTH": 7,
    "TOTAL11": 131600,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000228",
    "GROWTH": 9,
    "TOTAL11": 139800,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000229",
    "GROWTH": 6,
    "TOTAL11": 104500,
    "UTLA": "E10000032",
    "REGION": "E12000008"
  },
  {
    "LAD17CD": "E07000234",
    "GROWTH": 6,
    "TOTAL11": 93800,
    "UTLA": "E10000034",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000235",
    "GROWTH": 3,
    "TOTAL11": 74600,
    "UTLA": "E10000034",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000236",
    "GROWTH": 6,
    "TOTAL11": 84400,
    "UTLA": "E10000034",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000237",
    "GROWTH": 5,
    "TOTAL11": 98800,
    "UTLA": "E10000034",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000238",
    "GROWTH": 3,
    "TOTAL11": 116500,
    "UTLA": "E10000034",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000239",
    "GROWTH": 1,
    "TOTAL11": 98e3,
    "UTLA": "E10000034",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E07000240",
    "GROWTH": 8,
    "TOTAL11": 140800,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000241",
    "GROWTH": 13,
    "TOTAL11": 110300,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000242",
    "GROWTH": 6,
    "TOTAL11": 137400,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000243",
    "GROWTH": 5,
    "TOTAL11": 84e3,
    "UTLA": "E10000015",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000244",
    "GROWTH": 5,
    "TOTAL11": 239700,
    "UTLA": "E10000029",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000245",
    "GROWTH": 11,
    "TOTAL11": 170700,
    "UTLA": "E10000029",
    "REGION": "E12000006"
  },
  {
    "LAD17CD": "E07000246",
    "GROWTH": 5,
    "TOTAL11": 144600,
    "UTLA": "E10000027",
    "REGION": "E12000009"
  },
  {
    "LAD17CD": "E08000001",
    "GROWTH": 5,
    "TOTAL11": 276700,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000002",
    "GROWTH": 2,
    "TOTAL11": 185100,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000003",
    "GROWTH": 28,
    "TOTAL11": 503200,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000004",
    "GROWTH": 3,
    "TOTAL11": 225100,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000005",
    "GROWTH": 3,
    "TOTAL11": 212100,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000006",
    "GROWTH": 8,
    "TOTAL11": 233900,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000007",
    "GROWTH": 0,
    "TOTAL11": 283300,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000008",
    "GROWTH": 2,
    "TOTAL11": 219100,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000009",
    "GROWTH": 7,
    "TOTAL11": 226500,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000010",
    "GROWTH": 5,
    "TOTAL11": 317600,
    "UTLA": "E11000001",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000011",
    "GROWTH": -3,
    "TOTAL11": 145600,
    "UTLA": "E11000002",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000012",
    "GROWTH": 6,
    "TOTAL11": 466600,
    "UTLA": "E11000002",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000013",
    "GROWTH": 0,
    "TOTAL11": 175400,
    "UTLA": "E11000002",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000014",
    "GROWTH": -3,
    "TOTAL11": 273800,
    "UTLA": "E11000002",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000015",
    "GROWTH": 2,
    "TOTAL11": 319600,
    "UTLA": "E11000002",
    "REGION": "E12000002"
  },
  {
    "LAD17CD": "E08000016",
    "GROWTH": 6,
    "TOTAL11": 231200,
    "UTLA": "E11000003",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000017",
    "GROWTH": 5,
    "TOTAL11": 302400,
    "UTLA": "E11000003",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000018",
    "GROWTH": 3,
    "TOTAL11": 257400,
    "UTLA": "E11000003",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000019",
    "GROWTH": 7,
    "TOTAL11": 552700,
    "UTLA": "E11000003",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000021",
    "GROWTH": 8,
    "TOTAL11": 280300,
    "UTLA": "E11000007",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E08000022",
    "GROWTH": 4,
    "TOTAL11": 201e3,
    "UTLA": "E11000007",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E08000023",
    "GROWTH": -3,
    "TOTAL11": 147900,
    "UTLA": "E11000007",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E08000024",
    "GROWTH": -1,
    "TOTAL11": 275400,
    "UTLA": "E11000007",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E08000025",
    "GROWTH": 9,
    "TOTAL11": 1073200,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000026",
    "GROWTH": 5,
    "TOTAL11": 316900,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000027",
    "GROWTH": 2,
    "TOTAL11": 312800,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000028",
    "GROWTH": 8,
    "TOTAL11": 307900,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000029",
    "GROWTH": 3,
    "TOTAL11": 206900,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000030",
    "GROWTH": 6,
    "TOTAL11": 269300,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000031",
    "GROWTH": 5,
    "TOTAL11": 249300,
    "UTLA": "E11000005",
    "REGION": "E12000005"
  },
  {
    "LAD17CD": "E08000032",
    "GROWTH": 11,
    "TOTAL11": 522500,
    "UTLA": "E11000006",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000033",
    "GROWTH": 5,
    "TOTAL11": 203700,
    "UTLA": "E11000006",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000034",
    "GROWTH": 8,
    "TOTAL11": 422300,
    "UTLA": "E11000006",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000035",
    "GROWTH": 5,
    "TOTAL11": 751600,
    "UTLA": "E11000006",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000036",
    "GROWTH": 3,
    "TOTAL11": 325800,
    "UTLA": "E11000006",
    "REGION": "E12000003"
  },
  {
    "LAD17CD": "E08000037",
    "GROWTH": 4,
    "TOTAL11": 2e5,
    "UTLA": "E11000007",
    "REGION": "E12000001"
  },
  {
    "LAD17CD": "E09000001",
    "GROWTH": 0,
    "TOTAL11": 7300,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000002",
    "GROWTH": 13,
    "TOTAL11": 185600,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000003",
    "GROWTH": 13,
    "TOTAL11": 356400,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000004",
    "GROWTH": 6,
    "TOTAL11": 232e3,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000005",
    "GROWTH": 18,
    "TOTAL11": 311200,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000006",
    "GROWTH": 4,
    "TOTAL11": 309300,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000007",
    "GROWTH": 11,
    "TOTAL11": 220200,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000008",
    "GROWTH": 9,
    "TOTAL11": 363500,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000009",
    "GROWTH": 12,
    "TOTAL11": 338400,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000010",
    "GROWTH": 14,
    "TOTAL11": 312500,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000011",
    "GROWTH": 18,
    "TOTAL11": 254300,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000012",
    "GROWTH": 21,
    "TOTAL11": 245700,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000013",
    "GROWTH": 10,
    "TOTAL11": 182500,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000014",
    "GROWTH": 17,
    "TOTAL11": 255200,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000015",
    "GROWTH": 15,
    "TOTAL11": 239400,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000016",
    "GROWTH": 5,
    "TOTAL11": 237100,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000017",
    "GROWTH": 12,
    "TOTAL11": 274e3,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000018",
    "GROWTH": 19,
    "TOTAL11": 253900,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000019",
    "GROWTH": 17,
    "TOTAL11": 206200,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000020",
    "GROWTH": 0,
    "TOTAL11": 158800,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000021",
    "GROWTH": 8,
    "TOTAL11": 160200,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000022",
    "GROWTH": 13,
    "TOTAL11": 302800,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000023",
    "GROWTH": 10,
    "TOTAL11": 276e3,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000024",
    "GROWTH": 6,
    "TOTAL11": 199900,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000025",
    "GROWTH": 26,
    "TOTAL11": 307900,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000026",
    "GROWTH": 16,
    "TOTAL11": 278900,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000027",
    "GROWTH": 8,
    "TOTAL11": 186900,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000028",
    "GROWTH": 17,
    "TOTAL11": 288200,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000029",
    "GROWTH": 5,
    "TOTAL11": 190100,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000030",
    "GROWTH": 29,
    "TOTAL11": 254100,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000031",
    "GROWTH": 18,
    "TOTAL11": 258300,
    "UTLA": "E13000002",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000032",
    "GROWTH": 17,
    "TOTAL11": 307300,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "E09000033",
    "GROWTH": 21,
    "TOTAL11": 219400,
    "UTLA": "E13000001",
    "REGION": "E12000007"
  },
  {
    "LAD17CD": "W06000001",
    "GROWTH": 3,
    "TOTAL11": 69500,
    "UTLA": "W06000001",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000002",
    "GROWTH": 4,
    "TOTAL11": 122e3,
    "UTLA": "W06000002",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000003",
    "GROWTH": 4,
    "TOTAL11": 115300,
    "UTLA": "W06000003",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000004",
    "GROWTH": 0,
    "TOTAL11": 93800,
    "UTLA": "W06000004",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000005",
    "GROWTH": 2,
    "TOTAL11": 152600,
    "UTLA": "W06000005",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000006",
    "GROWTH": 5,
    "TOTAL11": 135e3,
    "UTLA": "W06000006",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000008",
    "GROWTH": 1,
    "TOTAL11": 76200,
    "UTLA": "W06000008",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000009",
    "GROWTH": 7,
    "TOTAL11": 122700,
    "UTLA": "W06000009",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000010",
    "GROWTH": 6,
    "TOTAL11": 184100,
    "UTLA": "W06000010",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000011",
    "GROWTH": 6,
    "TOTAL11": 239e3,
    "UTLA": "W06000011",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000012",
    "GROWTH": 3,
    "TOTAL11": 139700,
    "UTLA": "W06000012",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000013",
    "GROWTH": 7,
    "TOTAL11": 139100,
    "UTLA": "W06000013",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000014",
    "GROWTH": 6,
    "TOTAL11": 126400,
    "UTLA": "W06000014",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000015",
    "GROWTH": 13,
    "TOTAL11": 346100,
    "UTLA": "W06000015",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000016",
    "GROWTH": 1,
    "TOTAL11": 234600,
    "UTLA": "W06000016",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000018",
    "GROWTH": 5,
    "TOTAL11": 178600,
    "UTLA": "W06000018",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000019",
    "GROWTH": 0,
    "TOTAL11": 69600,
    "UTLA": "W06000019",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000020",
    "GROWTH": 0,
    "TOTAL11": 91200,
    "UTLA": "W06000020",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000021",
    "GROWTH": 7,
    "TOTAL11": 91100,
    "UTLA": "W06000021",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000022",
    "GROWTH": 6,
    "TOTAL11": 145900,
    "UTLA": "W06000022",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000023",
    "GROWTH": 5,
    "TOTAL11": 132900,
    "UTLA": "W06000023",
    "REGION": "W92000004"
  },
  {
    "LAD17CD": "W06000024",
    "GROWTH": 4,
    "TOTAL11": 58900,
    "UTLA": "W06000024",
    "REGION": "W92000004"
  }
];
const Key = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { percent, key, uk, place, max, min, step: step2, width: width2, height, name } = $$props;
  let arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  let range = max - min;
  let place_position = 1 - (max - place) / range;
  let uk_position = 1 - (max - uk) / range;
  if ($$props.percent === void 0 && $$bindings.percent && percent !== void 0)
    $$bindings.percent(percent);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.uk === void 0 && $$bindings.uk && uk !== void 0)
    $$bindings.uk(uk);
  if ($$props.place === void 0 && $$bindings.place && place !== void 0)
    $$bindings.place(place);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.step === void 0 && $$bindings.step && step2 !== void 0)
    $$bindings.step(step2);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<g transform="${" scale(0.5) translate(" + (0, import_index_cf0e86af.e)(width2 - 300) + "," + (0, import_index_cf0e86af.e)(height * 2 - 320) + ")"}"><rect x="${"-1200"}" y="${"25"}"${(0, import_index_cf0e86af.a)("width", width2 * 3, 0)}${(0, import_index_cf0e86af.a)("height", 300, 0)} fill="${"white"}" fill-opacity="${"0.7"}"></rect><text y="${"60"}"${(0, import_index_cf0e86af.a)("x", 300, 0)} text-anchor="${"middle"}" font-size="${"24pt"}" fill="${"grey"}">${(0, import_index_cf0e86af.e)(key)}</text>${(0, import_index_cf0e86af.f)(arr, (clr, i) => {
    return `<rect height="${"50"}"${(0, import_index_cf0e86af.a)("width", 500 / arr.length, 0)} y="${"100"}"${(0, import_index_cf0e86af.a)("x", 50 + 500 / arr.length * i, 0)}${(0, import_index_cf0e86af.a)("fill", (0, import_d3_scale_chromatic.interpolateViridis)(1 - i / (arr.length - 1)), 0)}></rect>
${clr % 10 == 0 || i == 0 || i == arr.length - 1 ? `<text y="${"90"}"${(0, import_index_cf0e86af.a)("x", 63 + 500 / arr.length * i, 0)} fill="${"grey"}" text-anchor="${"end"}">${(0, import_index_cf0e86af.e)(clr)}${(0, import_index_cf0e86af.e)(percent ? "%" : "")}</text>` : ``}`;
  })}<line${(0, import_index_cf0e86af.a)("y1", 100, 0)}${(0, import_index_cf0e86af.a)("y2", 210, 0)}${(0, import_index_cf0e86af.a)("x1", 50 + 500 * place_position, 0)}${(0, import_index_cf0e86af.a)("x2", 50 + place_position * 500, 0)} stroke="${"#666"}" stroke-width="${"8"}" stroke-linecap="${"round"}"></line><text y="${"210"}"${(0, import_index_cf0e86af.a)("x", 60 + place_position * 500, 0)} fill="${"#666"}" font-size="${"24pt"}">${(0, import_index_cf0e86af.e)(name)}</text>${step2 == 1 ? `<line${(0, import_index_cf0e86af.a)("y1", 100, 0)}${(0, import_index_cf0e86af.a)("y2", 180, 0)}${(0, import_index_cf0e86af.a)("x1", 50 + uk_position * 500, 0)}${(0, import_index_cf0e86af.a)("x2", 50 + uk_position * 500, 0)} stroke="${"#666"}" stroke-width="${"8"}" stroke-linecap="${"round"}"></line>
<text y="${"175"}"${(0, import_index_cf0e86af.a)("x", 40 + uk_position * 500, 0)} text-anchor="${"end"}" fill="${"#666"}" font-size="${"24pt"}">average</text>` : ``}<text y="${"250"}"${(0, import_index_cf0e86af.a)("x", 40, 0)} fill="${"grey"}" font-size="${"24pt"}">Greatest</text><text y="${"290"}"${(0, import_index_cf0e86af.a)("x", 40, 0)} fill="${"grey"}" font-size="${"24pt"}">decrease</text><text y="${"250"}"${(0, import_index_cf0e86af.a)("x", 555, 0)} text-anchor="${"end"}" fill="${"grey"}" font-size="${"24pt"}">Greatest</text><text y="${"290"}"${(0, import_index_cf0e86af.a)("x", 555, 0)} text-anchor="${"end"}" fill="${"grey"}" font-size="${"24pt"}">increase</text></g>`;
});
var ZoomSvg_svelte_svelte_type_style_lang = "";
const css$d = {
  code: "#canvas.svelte-1rh2i4z{position:absolute;right:0;height:100vh;width:100vh}",
  map: null
};
const ZoomSvg = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $zm, $$unsubscribe_zm;
  let $x, $$unsubscribe_x;
  let $y, $$unsubscribe_y;
  let $k, $$unsubscribe_k;
  let $all_data, $$unsubscribe_all_data;
  let $step, $$unsubscribe_step;
  $$unsubscribe_zm = (0, import_index_cf0e86af.d)(zm, (value) => $zm = value);
  $$unsubscribe_all_data = (0, import_index_cf0e86af.d)(all_data, (value) => $all_data = value);
  $$unsubscribe_step = (0, import_index_cf0e86af.d)(step, (value) => $step = value);
  let { viewBox = `0 0 {width} {height}`, height, width: width2, key = true } = $$props;
  let { svg, x: x2, y: y2, k: k2 } = $$props;
  $$unsubscribe_x = (0, import_index_cf0e86af.d)(x2, (value) => $x = value);
  $$unsubscribe_y = (0, import_index_cf0e86af.d)(y2, (value) => $y = value);
  $$unsubscribe_k = (0, import_index_cf0e86af.d)(k2, (value) => $k = value);
  if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
    $$bindings.viewBox(viewBox);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.svg === void 0 && $$bindings.svg && svg !== void 0)
    $$bindings.svg(svg);
  if ($$props.x === void 0 && $$bindings.x && x2 !== void 0)
    $$bindings.x(x2);
  if ($$props.y === void 0 && $$bindings.y && y2 !== void 0)
    $$bindings.y(y2);
  if ($$props.k === void 0 && $$bindings.k && k2 !== void 0)
    $$bindings.k(k2);
  $$result.css.add(css$d);
  $$unsubscribe_zm();
  $$unsubscribe_x();
  $$unsubscribe_y();
  $$unsubscribe_k();
  $$unsubscribe_all_data();
  $$unsubscribe_step();
  return `${width2 ? `<svg id="${"canvas"}"${(0, import_index_cf0e86af.a)("viewBox", viewBox, 0)}${(0, import_index_cf0e86af.a)("height", height, 0)}${(0, import_index_cf0e86af.a)("width", width2, 0)}${(0, import_index_cf0e86af.a)("zm", $zm, 0)} class="${"svelte-1rh2i4z"}"${(0, import_index_cf0e86af.a)("this", svg, 0)}><g transform="${"translate(" + (0, import_index_cf0e86af.e)($x) + ", " + (0, import_index_cf0e86af.e)($y) + ") scale(" + (0, import_index_cf0e86af.e)($k) + ")"}" id="${"zoomable"}">${slots.default ? slots.default({}) : ``}</g>${key ? `${(0, import_index_cf0e86af.v)(Key, "Key").$$render($$result, {
    percent: true,
    width: width2,
    height,
    key: "percentage growth",
    uk: "7.9",
    place: $all_data.LA.PC_CHANGE.FROM01TO11,
    name: $all_data.NAME,
    max: "30",
    min: -5,
    step: $step
  }, {}, {})}` : ``}</svg>` : ``}`;
});
let width;
var charts = [
  {
    chart: "xys",
    title: "Population growth in ",
    duration: 1e3,
    delay: 0,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 0,
    key: 1,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "xys",
    duration: 1e3,
    delay: 0,
    highlight: 1,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 0,
    neighbours_zoom: true,
    labels: true,
    key: 1,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "xys_region",
    duration: 500,
    delay: 0,
    highlight: 0,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 0,
    region_zoom: 0,
    neighbours_zoom: true,
    key: 1,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "bar",
    duration: 1e3,
    highlight: 0,
    chart_key: 1,
    delay: 10,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    filtered: "REGION",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "bell_region",
    duration: 100,
    delay: 5,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    chart_key: 1,
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "bell",
    duration: 100,
    delay: 5,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    chart_key: 1,
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "bell",
    duration: 100,
    delay: 5,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    chart_key: 1,
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "circle",
    duration: 1e3,
    highlight: 0,
    delay: 5,
    tooltip_metric: " people",
    value: "pop",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "comparative_circle",
    duration: 1e3,
    highlight: 0,
    delay: 5,
    tooltip_metric: " people",
    value: "pop",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "xys",
    duration: 2e3,
    highlight: 1,
    delay: 0,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 1,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "bar",
    duration: 3e3,
    highlight: 3,
    delay: 10,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    filtered: "REGION",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "national_bar",
    duration: 3e3,
    highlight: 3,
    delay: 10,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    filtered: "REGION",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "national_bar",
    duration: 3e3,
    highlight: 4,
    delay: 10,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    filtered: "REGION",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "national_bar",
    duration: 3e3,
    highlight: 5,
    delay: 10,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    filtered: "REGION",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "circle",
    duration: 1e3,
    highlight: 0,
    delay: 5,
    tooltip_metric: " people",
    value: "pop",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "circle",
    duration: 1e3,
    highlight: 0,
    delay: 5,
    tooltip_metric: " people",
    value: "pop",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "absoluteBar",
    duration: 500,
    highlight: 0,
    delay: 10,
    tooltip_metric: " more people",
    value: "abs",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "scatter",
    duration: 1e3,
    highlight: 0,
    delay: 20,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "circle",
    duration: 1e3,
    highlight: 0,
    delay: 5,
    tooltip_metric: " people",
    value: "pop",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "popBar",
    duration: 1e3,
    highlight: 0,
    delay: 20,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  },
  {
    chart: "absolute",
    duration: 2e3,
    highlight: 0,
    delay: 0,
    tooltip_metric: " more people",
    value: "abs",
    sort_by: "y",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: width / 10
      },
      y: {
        origin: 0,
        spacing: width / 10
      }
    }
  },
  {
    chart: "scatter",
    duration: 1e3,
    highlight: 0,
    delay: 20,
    tooltip_metric: "% growth",
    value: "growth",
    sort_by: "growth",
    zoom: 0,
    axis: {
      x: {
        origin: 0,
        spacing: 0
      },
      y: {
        origin: 0,
        spacing: 0
      }
    }
  }
];
var frequency = {
  "E": [
    {
      "growth": "-7",
      "lads": [
        "E06000053"
      ]
    },
    {
      "growth": "-4",
      "lads": [
        "E07000027"
      ]
    },
    {
      "growth": "-3",
      "lads": [
        "E08000011",
        "E08000014",
        "E08000023"
      ]
    },
    {
      "growth": "-2",
      "lads": [
        "E06000003",
        "E07000117"
      ]
    },
    {
      "growth": "-1",
      "lads": [
        "E08000024"
      ]
    },
    {
      "growth": "0",
      "lads": [
        "E06000009",
        "E06000027",
        "E07000076",
        "E07000120",
        "E07000122",
        "E07000135",
        "E07000218",
        "E08000007",
        "E08000013",
        "E09000001",
        "E09000020"
      ]
    },
    {
      "growth": "1",
      "lads": [
        "E06000012",
        "E07000031",
        "E07000036",
        "E07000037",
        "E07000038",
        "E07000069",
        "E07000173",
        "E07000195",
        "E07000196",
        "E07000239"
      ]
    },
    {
      "growth": "2",
      "lads": [
        "E06000002",
        "E06000041",
        "E06000050",
        "E06000057",
        "E07000026",
        "E07000029",
        "E07000035",
        "E07000044",
        "E07000045",
        "E07000079",
        "E07000080",
        "E07000092",
        "E07000127",
        "E07000128",
        "E07000163",
        "E07000167",
        "E07000168",
        "E07000172",
        "E07000199",
        "E07000223",
        "E08000002",
        "E08000008",
        "E08000015",
        "E08000027"
      ]
    },
    {
      "growth": "3",
      "lads": [
        "E06000021",
        "E06000036",
        "E07000072",
        "E07000087",
        "E07000090",
        "E07000119",
        "E07000121",
        "E07000125",
        "E07000147",
        "E07000198",
        "E07000212",
        "E07000235",
        "E07000238",
        "E08000004",
        "E08000005",
        "E08000018",
        "E08000029",
        "E08000036"
      ]
    },
    {
      "growth": "4",
      "lads": [
        "E06000001",
        "E06000019",
        "E06000022",
        "E06000046",
        "E06000047",
        "E07000032",
        "E07000034",
        "E07000073",
        "E07000074",
        "E07000082",
        "E07000091",
        "E07000129",
        "E07000132",
        "E07000133",
        "E07000137",
        "E07000144",
        "E07000165",
        "E07000171",
        "E07000176",
        "E07000179",
        "E07000180",
        "E07000187",
        "E07000200",
        "E07000215",
        "E08000022",
        "E08000037",
        "E09000006"
      ]
    },
    {
      "growth": "5",
      "lads": [
        "E06000007",
        "E06000010",
        "E06000020",
        "E06000035",
        "E06000049",
        "E06000059",
        "E06000060",
        "E07000030",
        "E07000033",
        "E07000040",
        "E07000041",
        "E07000063",
        "E07000064",
        "E07000066",
        "E07000078",
        "E07000085",
        "E07000096",
        "E07000102",
        "E07000111",
        "E07000114",
        "E07000124",
        "E07000126",
        "E07000192",
        "E07000209",
        "E07000213",
        "E07000216",
        "E07000219",
        "E07000224",
        "E07000237",
        "E07000243",
        "E07000244",
        "E07000246",
        "E08000001",
        "E08000010",
        "E08000017",
        "E08000026",
        "E08000031",
        "E08000033",
        "E08000035",
        "E09000016",
        "E09000029"
      ]
    },
    {
      "growth": "6",
      "lads": [
        "E06000006",
        "E06000011",
        "E06000025",
        "E06000026",
        "E06000037",
        "E06000052",
        "E06000055",
        "E07000028",
        "E07000062",
        "E07000065",
        "E07000075",
        "E07000093",
        "E07000095",
        "E07000098",
        "E07000108",
        "E07000109",
        "E07000118",
        "E07000164",
        "E07000174",
        "E07000189",
        "E07000210",
        "E07000225",
        "E07000229",
        "E07000234",
        "E07000236",
        "E07000242",
        "E08000012",
        "E08000016",
        "E08000030",
        "E09000004",
        "E09000024"
      ]
    },
    {
      "growth": "7",
      "lads": [
        "E06000004",
        "E06000005",
        "E06000008",
        "E06000017",
        "E06000024",
        "E07000011",
        "E07000043",
        "E07000068",
        "E07000070",
        "E07000083",
        "E07000086",
        "E07000141",
        "E07000143",
        "E07000145",
        "E07000170",
        "E07000175",
        "E07000177",
        "E07000194",
        "E07000207",
        "E07000214",
        "E07000226",
        "E07000227",
        "E08000009",
        "E08000019"
      ]
    },
    {
      "growth": "8",
      "lads": [
        "E06000033",
        "E06000038",
        "E06000040",
        "E06000051",
        "E06000054",
        "E06000056",
        "E06000062",
        "E07000046",
        "E07000088",
        "E07000094",
        "E07000099",
        "E07000123",
        "E07000130",
        "E07000146",
        "E07000148",
        "E07000188",
        "E07000197",
        "E07000211",
        "E07000221",
        "E07000240",
        "E08000006",
        "E08000021",
        "E08000028",
        "E08000034",
        "E09000021",
        "E09000027"
      ]
    },
    {
      "growth": "9",
      "lads": [
        "E06000013",
        "E06000014",
        "E06000044",
        "E06000045",
        "E06000058",
        "E07000047",
        "E07000084",
        "E07000089",
        "E07000134",
        "E07000138",
        "E07000169",
        "E07000181",
        "E07000193",
        "E07000222",
        "E07000228",
        "E08000025",
        "E09000008"
      ]
    },
    {
      "growth": "10",
      "lads": [
        "E06000032",
        "E06000034",
        "E06000043",
        "E07000042",
        "E07000061",
        "E07000081",
        "E07000113",
        "E07000116",
        "E07000217",
        "E09000013",
        "E09000023"
      ]
    },
    {
      "growth": "11",
      "lads": [
        "E06000061",
        "E07000067",
        "E07000071",
        "E07000106",
        "E07000110",
        "E07000112",
        "E07000131",
        "E07000142",
        "E07000149",
        "E07000166",
        "E07000203",
        "E07000245",
        "E08000032",
        "E09000007"
      ]
    },
    {
      "growth": "12",
      "lads": [
        "E06000015",
        "E06000023",
        "E07000115",
        "E07000178",
        "E07000208",
        "E09000009",
        "E09000017"
      ]
    },
    {
      "growth": "13",
      "lads": [
        "E07000008",
        "E07000103",
        "E07000107",
        "E07000202",
        "E07000241",
        "E09000002",
        "E09000003",
        "E09000022"
      ]
    },
    {
      "growth": "14",
      "lads": [
        "E06000018",
        "E07000009",
        "E07000010",
        "E07000012",
        "E07000220",
        "E09000010"
      ]
    },
    {
      "growth": "15",
      "lads": [
        "E06000030",
        "E07000077",
        "E07000105",
        "E07000139",
        "E07000140",
        "E09000015"
      ]
    },
    {
      "growth": "16",
      "lads": [
        "E07000039",
        "E07000136",
        "E09000026"
      ]
    },
    {
      "growth": "17",
      "lads": [
        "E06000016",
        "E06000031",
        "E06000039",
        "E09000014",
        "E09000019",
        "E09000028",
        "E09000032"
      ]
    },
    {
      "growth": "18",
      "lads": [
        "E09000005",
        "E09000011",
        "E09000031"
      ]
    },
    {
      "growth": "19",
      "lads": [
        "E09000018"
      ]
    },
    {
      "growth": "20",
      "lads": [
        "E06000042"
      ]
    },
    {
      "growth": "21",
      "lads": [
        "E09000012",
        "E09000033"
      ]
    },
    {
      "growth": "26",
      "lads": [
        "E09000025"
      ]
    },
    {
      "growth": "28",
      "lads": [
        "E08000003"
      ]
    },
    {
      "growth": "29",
      "lads": [
        "E09000030"
      ]
    }
  ],
  "W": [
    {
      "growth": "0",
      "lads": [
        "W06000004",
        "W06000019",
        "W06000020"
      ]
    },
    {
      "growth": "1",
      "lads": [
        "W06000008",
        "W06000016"
      ]
    },
    {
      "growth": "2",
      "lads": [
        "W06000005"
      ]
    },
    {
      "growth": "3",
      "lads": [
        "W06000001",
        "W06000012"
      ]
    },
    {
      "growth": "4",
      "lads": [
        "W06000002",
        "W06000003",
        "W06000024"
      ]
    },
    {
      "growth": "5",
      "lads": [
        "W06000006",
        "W06000018",
        "W06000023"
      ]
    },
    {
      "growth": "6",
      "lads": [
        "W06000010",
        "W06000011",
        "W06000014",
        "W06000022"
      ]
    },
    {
      "growth": "7",
      "lads": [
        "W06000009",
        "W06000013",
        "W06000021"
      ]
    },
    {
      "growth": "13",
      "lads": [
        "W06000015"
      ]
    }
  ]
};
const { Object: Object_1$1 } = import_index_cf0e86af.k;
let x = 0, y = 0, k = 1;
function neighbourBounds(bounds) {
  let min_x = bounds.sort((a2, b2) => a2[0][0] - b2[0][0])[0][0][0];
  let max_x = bounds.sort((a2, b2) => b2[1][0] - a2[1][0])[0][1][0];
  let min_y = bounds.sort((a2, b2) => a2[0][1] - b2[0][1])[0][0][1];
  let max_y = bounds.sort((a2, b2) => b2[1][1] - a2[1][1])[0][1][1];
  let neighbour_bounds = [[min_x, min_y], [max_x, max_y]];
  return neighbour_bounds;
}
const App$3 = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $all_data, $$unsubscribe_all_data;
  let $selected, $$unsubscribe_selected;
  let $zm, $$unsubscribe_zm;
  $$unsubscribe_all_data = (0, import_index_cf0e86af.d)(all_data, (value) => $all_data = value);
  $$unsubscribe_zm = (0, import_index_cf0e86af.d)(zm, (value) => $zm = value);
  console.log("interpolate", interpolate);
  let { country } = $$props;
  let key = true;
  let chart_key = false;
  let { progress, animation, width: width2, height, padding } = $$props;
  console.log("ALL DATA", $all_data);
  const mercator = (0, import_d3_geo.geoMercator)().center(country == "E" ? [-2, 52.5] : [-3.9, 52.3]).scale(country == "E" ? width2 < height ? width2 * 7 : height * 5 : width2 < height ? width2 * 15 : height * 15).translate([width2 / 2, height / 2]);
  const easing = cubicInOut;
  let axes;
  let loaded;
  let spacing;
  let values = [];
  let data = [];
  let timeline;
  let currentProj = mercator;
  let path = (0, import_d3_geo.geoPath)().projection(currentProj);
  let Greenwich = +path({ type: "Point", coordinates: [0, 0] }).split(",")[0].slice(1);
  let FirstMeridian = +path({ type: "Point", coordinates: [10, 0] }).split(",")[0].slice(1);
  let bar = { left: 85, height: 1.5, scale: 0.18 };
  let newData;
  let selected2 = writable();
  $$unsubscribe_selected = (0, import_index_cf0e86af.d)(selected2, (value) => $selected = value);
  let timelineMaker = (arr) => {
    let y_labels2 = [];
    axes = {
      x_origin: tweened(Greenwich),
      y_origin: tweened(height + padding + height / 10),
      x_length: width2,
      y_length: height,
      hoz_bar: [y_labels2.map((e) => e.length)],
      vert_bar: [],
      x_offset: tweened((Greenwich - FirstMeridian) / 10),
      y_offset: tweened((Greenwich - FirstMeridian) / 10),
      labelRotation: 0,
      x_zero: 0,
      y_zero: 0,
      xTicks: true,
      yTicks: true,
      xAxis: 1,
      yAxis: 1,
      verticalStrokes: false,
      horizontalStrokes: true
    };
    console.log("axes", axes);
    let x2 = [];
    arr.forEach((e, i) => {
      x2.push({
        d: tweened(arr[i].xys, { duration: 50, interpolate }),
        centroid: arr[i].centroid,
        fill: writable(arr[i].colour),
        fillOpacity: tweened(1, { duration: 0, interpolate }),
        title: writable(arr[i].properties.AREANM),
        area_cd: writable(arr[i].properties.AREACD),
        value: writable(arr[i].growth),
        metric: writable("% change"),
        mouseover,
        mouseout,
        pop: arr[i].pop,
        y: writable(arr[i].centroid[1]),
        selected: arr[i].properties.AREACD == $selected,
        label_opacity: tweened(0),
        zoom: arr[i].zoom
      });
    });
    return x2;
  };
  let zoomState = {
    x: tweened(x, { duration: 200 }),
    y: tweened(y, { duration: 200 }),
    k: tweened(k, { duration: 200 })
  };
  let mouseover = function(d) {
    let title2 = d.target.getAttribute("title");
    let value = d.target.getAttribute("value").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    d.target.getAttribute("pop");
    let metric = d.target.getAttribute("metric");
    (0, import_d3_selection.select)(".tooltip").style("opacity", 1);
    (0, import_d3_selection.select)(".tooltip").html(title2 + "<br>" + value + metric).style("left", d.clientX + 10 + "px").style("top", d.clientY - 28 + "px");
  };
  let mouseout = function(d) {
    (0, import_d3_selection.select)(".tooltip").style("opacity", 0);
  };
  function redrawData(datas, zm2) {
    data = data.filter((e) => e.properties.AREACD[0] == country);
    data.forEach((e) => e.growth = growth.find((el) => el.LAD17CD == e.properties.AREACD) || { GROWTH: 0, TOTAL11: 0 });
    data.forEach((e) => {
      let obj = e.growth;
      e.growth = +obj.GROWTH;
      e.pop = +obj.TOTAL11;
      e.abs = Math.round(+obj.GROWTH * +obj.TOTAL11 / 100);
    });
    data.forEach((e) => e.centroid = path.centroid(e));
    data.forEach((e) => e.y = path.centroid(e)[1] * -1);
    data.forEach((e) => e.xys = path(e));
    let map_charts = charts.filter((e) => e.chart == "xys");
    map_charts.forEach((e) => {
      e.axis.x.origin = Greenwich;
      e.axis.x.spacing = (Greenwich - FirstMeridian) / 10;
      e.axis.y.origin = height + padding + height / 10;
      e.axis.y.spacing = (Greenwich - FirstMeridian) / 10;
    });
    data.forEach((e, i) => {
    });
    data.forEach((e) => e.bounds = path.bounds(e));
    data.forEach((e) => e.zoom = Math.sqrt(1 / (Math.max(...[e.bounds[1][0] - e.bounds[0][0], e.bounds[1][1] - e.bounds[0][1]]) / width2)));
    data.forEach((e) => e.colour = (0, import_d3_scale_chromatic.interpolateViridis)(1 - scaleColor(e.growth, datas, "growth")));
    let extents = {
      pop: (0, import_d3_array.extent)(datas.map((e) => e.pop)),
      growth: (0, import_d3_array.extent)(datas.map((e) => e.growth)),
      abs: (0, import_d3_array.extent)(datas.map((e) => e.abs))
    };
    data = data.filter((e) => e.growth !== null);
    data = data.sort((a2, b2) => b2.growth - a2.growth);
    (function() {
      values = [];
      let minX = +frequency[country][0].growth, maxX = +frequency[country][frequency[country].length - 1].growth, rangeX = maxX - minX;
      frequency[country].map((e) => e.lads.length).sort((a2, b2) => b2 - a2)[0];
      for (let i = minX; i < maxX + 1; i++)
        values.push(i);
      let guidingDim = [width2 - padding, height - padding * 2].sort((a2, b2) => b2 - a2).pop();
      let square = {
        x: (guidingDim - padding * 2) / rangeX,
        y: (guidingDim - padding * 2) / rangeX
      };
      spacing = square.y;
      data.forEach((e, i) => {
        let pos = frequency[country].find((el) => el.lads.includes(e.properties.AREACD));
        e.bell = `M${0} ${0}, ${0} ${0}, ${0} ${0},${0} ${0}Z`;
        if (pos) {
          let x2 = (pos.growth - frequency[country][0].growth) * square.x + padding;
          let y2 = height - padding * 2 - pos.lads.indexOf(e.properties.AREACD) * square.y;
          let gap = Math.abs(square.y / 2 - square.x / 2);
          let cx = x2 + square.x / 2, r = Math.min(square.y / 2, square.x / 2), cy = y2 + square.y / 2 - r * 2;
          e.bell = `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${r * -2},0Z`;
          let chart2 = charts.find((e2) => e2.chart == "bell");
          chart2.axis.x.origin = -10;
          chart2.axis.x.spacing = 2e3;
          chart2.axis.y.origin = height - padding * 2 + gap * 2;
          chart2.axis.y.spacing = 5e3;
        }
        if (e.bell == void 0)
          console.log("x", x, "y", y);
      });
    })();
    (function() {
      let region_codes2 = JSON.parse(JSON.stringify(growth));
      region_codes2 = region_codes2.filter((e) => e.REGION == $all_data.REGION_CODE).sort((a2, b2) => b2.GROWTH - a2.GROWTH).map((e) => e.LAD17CD);
      let region_data = JSON.parse(JSON.stringify(frequency));
      region_data[country].forEach((e) => e.lads = e.lads.filter((el) => region_codes2.includes(el)));
      region_data[country] = region_data[country].filter((e) => e.lads.length);
      console.log("region_codes", region_codes2, "region_data", region_data);
      values = [];
      let minX = +region_data[country][0].growth, maxX = +region_data[country][region_data[country].length - 1].growth, rangeX = maxX - minX;
      region_data[country].map((e) => e.lads.length).sort((a2, b2) => b2 - a2)[0];
      for (let i = minX; i < maxX + 1; i++)
        values.push(i);
      let guidingDim = [width2 - padding, height - padding * 2].sort((a2, b2) => b2 - a2).pop();
      let square = {
        x: (guidingDim - padding * 2) / rangeX,
        y: (guidingDim - padding * 2) / rangeX
      };
      spacing = square.y;
      data.forEach((e, i) => {
        let pos = region_data[country].find((el) => el.lads.includes(e.properties.AREACD));
        e.bell_region = `M${0} ${0}, ${0} ${0}, ${0} ${0},${0} ${0}Z`;
        if (pos) {
          let x2 = (pos.growth - region_data[country][0].growth) * square.x + padding;
          let y2 = height - padding * 2 - pos.lads.indexOf(e.properties.AREACD) * square.y;
          let gap = Math.abs(square.y / 2 - square.x / 2);
          let cx = x2 + square.x / 2, r = Math.min(square.y / 2, square.x / 2), cy = y2 + square.y / 2 - r * 2;
          e.bell_region = `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${r * -2},0Z`;
          let chart2 = charts.find((e2) => e2.chart == "bell");
          chart2.axis.x.origin = -10;
          chart2.axis.x.spacing = 2e3;
          chart2.axis.y.origin = height - padding * 2 + gap * 2;
          chart2.axis.y.spacing = 5e3;
        }
        if (e.bell_region == void 0)
          console.log("x", x, "y", y);
      });
    })();
    let bar_data = JSON.parse(JSON.stringify(growth)).filter((e) => e.REGION == $all_data.REGION_CODE).sort((a2, b2) => b2.GROWTH - a2.GROWTH);
    let bar_extents = {
      growth: (0, import_d3_array.extent)(bar_data.map((e) => e.GROWTH))
    };
    bar.height = (height - padding * 3) / bar_data.length;
    bar.left = padding + Math.abs(bar_extents.growth[0]) / (bar_extents.growth[1] - bar_extents.growth[0]) * (width2 - padding * 2);
    bar.scale = 1 / (bar_extents.growth[1] - bar_extents.growth[0]) * (width2 - padding * 2);
    let chart = charts.find((e) => e.chart == "bar");
    chart.axis.x.origin = bar.left;
    chart.axis.x.spacing = width2 / 10;
    chart.axis.y.origin = height + padding;
    chart.axis.y.spacing = height / 10;
    data.forEach((e, i) => {
      e.bar = `M${0} ${0}, ${0} ${0}, ${0} ${0},${0} ${0}Z`;
    });
    bar_data.forEach((e, i) => {
      let bar_id = e.LAD17CD;
      let data_point = data.findIndex((el) => el.properties.AREACD == bar_id);
      if (data[data_point]) {
        data[data_point].bar = `M${bar.left} ${i * bar.height + padding + 3}, ${bar.left + e.GROWTH * bar.scale} ${i * bar.height + padding + 3}, ${bar.left + e.GROWTH * bar.scale} ${bar.height + i * bar.height + padding},${bar.left} ${bar.height + i * bar.height + padding}Z`;
      }
    });
    data = data.sort((a2, b2) => b2.growth - a2.growth);
    console.log("BAR_DATA", bar_data);
    let region_codes = bar_data.map((e) => e.LAD17CD);
    data.forEach((e, i) => {
      e.xys_region = `M${0} ${0}, ${0} ${0}, ${0} ${0},${0} ${0}Z`;
      if (region_codes.includes(e.properties.AREACD))
        e.xys_region = e.xys;
    });
    let national_bar_data = JSON.parse(JSON.stringify(growth)).filter((e) => e.LAD17CD[0] == $selected[0]).sort((a2, b2) => b2.GROWTH - a2.GROWTH);
    let national_bar_extents = {
      growth: (0, import_d3_array.extent)(national_bar_data.map((e) => e.GROWTH))
    };
    bar.height = (height - padding * 2) / national_bar_data.length;
    bar.left = padding + Math.abs(national_bar_extents.growth[0]) / (national_bar_extents.growth[1] - national_bar_extents.growth[0]) * width2;
    bar.scale = 1 / (national_bar_extents.growth[1] - national_bar_extents.growth[0]) * width2;
    let national_chart = charts.find((e) => e.chart == "national_bar");
    national_chart.axis.x.origin = bar.left;
    national_chart.axis.x.spacing = width2 / 10;
    national_chart.axis.y.origin = height + padding;
    national_chart.axis.y.spacing = height / 10;
    data.forEach((e, i) => {
      e.national_bar = `M${0} ${0}, ${0} ${0}, ${0} ${0},${0} ${0}Z`;
    });
    national_bar_data.forEach((e, i) => {
      let bar_id = e.LAD17CD;
      let data_point = data.findIndex((el) => el.properties.AREACD == bar_id);
      if (data[data_point]) {
        data[data_point].national_bar = `M${bar.left} ${i * bar.height + padding}, ${bar.left + e.GROWTH * bar.scale} ${i * bar.height + padding}, ${bar.left + e.GROWTH * bar.scale} ${bar.height + i * bar.height + padding},${bar.left} ${bar.height + i * bar.height + padding}Z`;
      }
    });
    data = data.sort((a2, b2) => b2.growth - a2.growth);
    chart = charts.find((e) => e.chart == "absolute");
    chart.axis.x.origin = Greenwich;
    chart.axis.x.spacing = (Greenwich - FirstMeridian) / 10;
    chart.axis.y.origin = height + padding + height / 10;
    chart.axis.y.spacing = (Greenwich - FirstMeridian) / 10;
    data = data.sort((a2, b2) => b2.abs - a2.abs);
    data.forEach((e, i) => {
      let peak = e.pop > e.growth / 10 ? e.pop * (e.growth / 6e4) : 1;
      e.absolute = peak !== 1 ? `M${e.centroid[0]},${e.centroid[1]} ${e.centroid[0] - 4},${e.centroid[1]} ${e.centroid[0]},${e.centroid[1] - peak} ${e.centroid[0] + 4},${e.centroid[1]}z` : `M${e.centroid[0] - 4}, ${e.centroid[1]} a${4},${4} 0 1,0 ${4 * 2},0 a${4},${4} 0 1,0 ${4 * -2},0`;
    });
    bar.height = height / data.length;
    bar.left = padding + Math.abs(extents.abs[0]) / (extents.abs[1] - extents.abs[0]) * width2;
    bar.scale = 1 / (extents.abs[1] - extents.abs[0]) * width2;
    chart = charts.find((e) => e.chart == "absoluteBar");
    chart.axis.x.origin = bar.left;
    chart.axis.x.spacing = width2 / 10;
    chart.axis.y.origin = height + padding;
    chart.axis.y.spacing = height / 10;
    data.forEach((e, i) => {
      let absolute = e.abs;
      e.absoluteBar = `M${bar.left} ${i * bar.height + padding}, ${bar.left + absolute * bar.scale} ${i * bar.height + padding}, ${bar.left + absolute * bar.scale} ${bar.height + i * bar.height + padding},${bar.left} ${bar.height + i * bar.height + padding}Z`;
    });
    data = data.sort((a2, b2) => b2.growth - a2.growth);
    bar.height = height / data.length;
    bar.left = padding + Math.abs(extents.pop[0]) / (extents.pop[1] - extents.pop[0]) * width2;
    bar.scale = 1 / (extents.pop[1] - extents.pop[0]) * width2;
    chart = charts.find((e) => e.chart == "popBar");
    chart.axis.x.origin = bar.left + width2 / 10;
    chart.axis.x.spacing = width2 / 10;
    chart.axis.y.origin = height + padding;
    chart.axis.y.spacing = height / 10;
    let Data = JSON.parse(JSON.stringify(data)).sort((a2, b2) => b2.pop - a2.pop);
    Data.forEach((e, i) => {
      let absolute = e.pop;
      data.find((el) => el.y - e.y == 0).popBar = `M${bar.left} ${i * bar.height + padding}, ${bar.left + absolute * bar.scale} ${i * bar.height + padding}, ${bar.left + absolute * bar.scale} ${bar.height + i * bar.height + padding},${bar.left} ${bar.height + i * bar.height + padding}Z`;
    });
    data = data.sort((a2, b2) => b2.growth - a2.growth);
    chart = charts.find((e) => e.chart == "circle");
    chart.axis.x.origin = Greenwich;
    chart.axis.x.spacing = (Greenwich - FirstMeridian) / 10;
    chart.axis.y.origin = height + padding + height / 10;
    chart.axis.y.spacing = (Greenwich - FirstMeridian) / 10;
    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8e3);
      e.circle = `M${e.centroid[0] - radius},${e.centroid[1]} a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${radius * -2},0Z`;
    });
    chart = charts.find((e) => e.chart == "comparative_circle");
    chart.axis.x.origin = Greenwich;
    chart.axis.x.spacing = (Greenwich - FirstMeridian) / 10;
    chart.axis.y.origin = height + padding + height / 10;
    chart.axis.y.spacing = (Greenwich - FirstMeridian) / 10;
    let radius_prev = 0;
    Data = JSON.parse(JSON.stringify(data)).sort((a2, b2) => b2.pop - a2.pop);
    Data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8e3);
      data.find((el) => el.y - e.y == 0).comparative_circle = `M${padding},${padding + radius_prev} a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${radius * -2},0Z`;
      radius_prev += radius / 2.3;
    });
    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8e4);
      e.small_circle = `M${e.centroid[0] - radius},${e.centroid[1]} a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${radius * -2},0Z`;
    });
    chart = charts.find((e) => e.chart == "scatter");
    chart.axis.x.origin = bar.left;
    chart.axis.x.spacing = width2 / 10;
    chart.axis.y.origin = height - Math.abs(extents.growth[0]) / (extents.growth[1] - extents.growth[0]) * height + padding * 2;
    chart.axis.y.spacing = height / 10;
    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8e3);
      let p = (width2 - padding * 2) * e.pop / extents.pop[1] - extents.pop[0];
      let g = height - padding * 2 - height * e.growth / (extents.growth[1] - extents.growth[0]);
      e.scatter = `M${bar.left + p - radius}, ${g + radius} a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${radius * -2},0Z`;
    });
    timeline = timelineMaker(data);
    setTimeout(function() {
      loaded = true;
    }, 1e3);
    return data;
  }
  const scaleColor = (val, dataSet, data2) => {
    let scaleExtent = (0, import_d3_array.extent)(dataSet.map((e) => e[data2]));
    return val == null ? 0.5 : (val - scaleExtent[0]) / (scaleExtent[1] - scaleExtent[0]);
  };
  function forward(current) {
    if (charts.length > current) {
      axes.x_origin.set(charts[current].axis.x.origin, {
        duration: charts[current].duration,
        easing
      });
      axes.x_offset.set(charts[current].axis.x.spacing, {
        duration: charts[current].duration,
        easing
      });
      axes.y_origin.set(charts[current].axis.y.origin, {
        duration: charts[current].duration,
        easing
      });
      axes.y_offset.set(charts[current].axis.y.spacing, {
        duration: charts[current].duration,
        easing
      });
      console.log("axes", axes);
      let item = (0, import_d3_selection.select)(document.getElementById("selected"));
      let itemScale = item.attr("zoom");
      let zoomFactor = charts[current].zoom * itemScale;
      let neighbours_zoom = charts[current].neighbours_zoom;
      if (neighbours_zoom) {
        let nb = neighbourBounds(data.filter((e) => $all_data.NEIGHBOURS.CODES.includes(e.properties.AREACD)).map((e) => e.bounds));
        zoomFactor = 1 / (Math.max(...[nb[1][0] - nb[0][0], nb[1][1] - nb[0][1]]) / width2);
      }
      let region_zoom = charts[current].region_zoom;
      if (region_zoom) {
        let region_codes = JSON.parse(JSON.stringify(growth)).filter((e) => e.REGION == $all_data.REGION_CODE).sort((a2, b2) => b2.GROWTH - a2.GROWTH).map((e) => e.LAD17CD);
        let nb = neighbourBounds(data.filter((e) => region_codes.includes(e.properties.AREACD)).map((e) => e.bounds));
        zoomFactor = 1 / (Math.max(...[nb[1][0] - nb[0][0], nb[1][1] - nb[0][1]]) / width2);
      }
      let focus = (0, import_d3_selection.select)(document.getElementById("selected")).attr("centroid").split(",").map((e, i) => i == 0 ? width2 / 2 - zoomFactor * e : -zoomFactor * e + height / 2);
      charts[current].highlight;
      let labels = charts[current].region_zoom;
      if (zoomFactor) {
        zm.set(zoomFactor);
        if (labels)
          timeline.forEach((step2, i) => step2.label_opacity.set(1, {
            duration: charts[current].duration,
            easing
          }));
        zoomState.x.set(focus[0], {
          duration: charts[current].duration,
          easing
        });
        zoomState.y.set(focus[1], {
          duration: charts[current].duration,
          easing
        });
        zoomState.k.set(zoomFactor, {
          duration: charts[current].duration,
          easing
        });
      } else {
        zm.set(1);
        timeline.forEach((step2, i) => step2.label_opacity.set(0, { duration: 10, easing }));
        zoomState.x.set(0, {
          duration: charts[current].duration,
          easing
        });
        zoomState.y.set(0, {
          duration: charts[current].duration,
          easing
        });
        zoomState.k.set(1, {
          duration: charts[current].duration,
          easing
        });
      }
      timeline.forEach((step2, i) => {
        step2.d.set(newData[i][charts[current].chart], {
          duration: charts[current].duration,
          delay: charts[current].delay * i,
          interpolate
        });
        step2.metric.set(charts[current].tooltip_metric);
        step2.value.set(newData[i][charts[current].value]);
        step2.title.set(newData[i].properties.AREANM);
        if (charts[current].key) {
          key = 1;
        } else {
          key = 0;
        }
        if (charts[current].chart_key) {
          chart_key = 1;
        } else {
          chart_key = 0;
        }
        if (charts[current].highlight) {
          step2.fillOpacity.set(0.4);
          step2.label_opacity.set(0, { duration: 10, easing });
          if (charts[current].highlight == 1 && Object.values($all_data.NEIGHBOURS.PC_CHANGE).map((e) => e.CODE).includes(newData[i].properties.AREACD) || newData[i].properties.AREACD == $selected) {
            step2.fillOpacity.set(1);
            step2.label_opacity.set(1, { duration: 10, easing });
            console.log("BOUNDS", newData.filter((e) => $all_data.NEIGHBOURS.CODES.includes(e.properties.AREACD)).map((e) => e.bounds));
          }
          if (charts[current].highlight == 2 && Object.values($all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_UP).map((e) => e.LAD17CD).includes(newData[i].properties.AREACD) || newData[i].properties.AREACD == $selected)
            step2.fillOpacity.set(1);
          if (charts[current].highlight == 3 && $all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.LAD17CD == newData[i].properties.AREACD || newData[i].properties.AREACD == $selected)
            step2.fillOpacity.set(1);
          if (charts[current].highlight == 4 && Object.values($all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP).map((e) => e.LAD17CD).includes(newData[i].properties.AREACD) || newData[i].properties.AREACD == $selected)
            step2.fillOpacity.set(1);
          if (charts[current].highlight == 5 && Object.values($all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN).map((e) => e.LAD17CD).includes(newData[i].properties.AREACD) || newData[i].properties.AREACD == $selected)
            step2.fillOpacity.set(1);
        } else
          step2.fillOpacity.set(1);
      });
    }
  }
  if ($$props.country === void 0 && $$bindings.country && country !== void 0)
    $$bindings.country(country);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  axes && loaded && country && forward(animation);
  {
    {
      selected2.set($all_data.CODE);
      newData = redrawData(data);
    }
  }
  $$unsubscribe_all_data();
  $$unsubscribe_selected();
  $$unsubscribe_zm();
  return `${(0, import_index_cf0e86af.v)(ZoomSvg, "ZoomSvg").$$render($$result, Object_1$1.assign({ id: "charts1" }, { zm: $zm }, zoomState, { width: width2 }, { height }, { key }, { viewBox: "0 0 " + width2 + " " + height }), {}, {
    default: () => {
      return `${timeline && width2 && height ? `<g id="${"wrapper"}">${(0, import_index_cf0e86af.f)(timeline, (feature, i) => {
        return `${(0, import_index_cf0e86af.v)(Path, "Path").$$render($$result, Object_1$1.assign(feature), {}, {})}`;
      })}${(0, import_index_cf0e86af.f)(timeline, (feature, i) => {
        return `${(0, import_index_cf0e86af.v)(Text, "Text").$$render($$result, Object_1$1.assign(feature, zoomState, { zm: $zm }), {}, {})}`;
      })}</g>
	<use xlink:href="${"#selected"}"></use>
	<use xlink:href="${"#selectedText"}"></use>	
  <use xlink:href="${"#selectedValue"}"></use>	
  ${(0, import_index_cf0e86af.v)(Axis, "Axis").$$render($$result, Object_1$1.assign(axes, { width: width2 }, { height }, { padding }, { spacing }, { values }, { chart_key }), {}, {})}` : ``}`;
    }
  })}`;
});
var pitch = [
  {
    "x1": 0,
    "y1": -680,
    "x2": 0,
    "y2": 0,
    "z": 0
  },
  {
    "x1": -344.2,
    "y1": -281.8,
    "x2": -359,
    "y2": -266.8,
    "z": 0
  },
  {
    "x1": -332.8,
    "y1": -299.7,
    "x2": -344.1,
    "y2": -281.9,
    "z": 0
  },
  {
    "x1": -326,
    "y1": -319.4,
    "x2": -332.8,
    "y2": -299.7,
    "z": 0
  },
  {
    "x1": -323.7,
    "y1": -340,
    "x2": -326,
    "y2": -319.4,
    "z": 0
  },
  {
    "x1": -326,
    "y1": -360.7,
    "x2": -323.7,
    "y2": -340.09999999999997,
    "z": 0
  },
  {
    "x1": -332.8,
    "y1": -380.4,
    "x2": -326,
    "y2": -360.7,
    "z": 0
  },
  {
    "x1": -344.1,
    "y1": -398.2,
    "x2": -332.79999999999995,
    "y2": -380.4,
    "z": 0
  },
  {
    "x1": -360,
    "y1": -413.1,
    "x2": -344.1,
    "y2": -398.1,
    "z": 0
  },
  {
    "x1": 344.20000000000005,
    "y1": -281.8,
    "x2": 360,
    "y2": -266.8,
    "z": 0
  },
  {
    "x1": 332.79999999999995,
    "y1": -299.7,
    "x2": 344.0999999999999,
    "y2": -281.9,
    "z": 0
  },
  {
    "x1": 326,
    "y1": -319.4,
    "x2": 332.79999999999995,
    "y2": -299.7,
    "z": 0
  },
  {
    "x1": 323.70000000000005,
    "y1": -340,
    "x2": 326,
    "y2": -319.4,
    "z": 0
  },
  {
    "x1": 326,
    "y1": -360.7,
    "x2": 323.70000000000005,
    "y2": -340.09999999999997,
    "z": 0
  },
  {
    "x1": 332.79999999999995,
    "y1": -380.4,
    "x2": 326,
    "y2": -360.7,
    "z": 0
  },
  {
    "x1": 344.1,
    "y1": -398.2,
    "x2": 332.80000000000007,
    "y2": -380.4,
    "z": 0
  },
  {
    "x1": 360,
    "y1": -413.1,
    "x2": 344.1,
    "y2": -398.1,
    "z": 0
  },
  {
    "x1": 525,
    "y1": -680,
    "x2": 0,
    "y2": -680,
    "z": 0
  },
  {
    "x1": 525,
    "y1": 0,
    "x2": 525,
    "y2": -680,
    "z": 0
  },
  {
    "x1": -525,
    "y1": 0,
    "x2": 525,
    "y2": 0,
    "z": 0
  },
  {
    "x1": -525,
    "y1": -680,
    "x2": -525,
    "y2": 0,
    "z": 0
  },
  {
    "x1": 0,
    "y1": -680,
    "x2": -525,
    "y2": -680,
    "z": 0
  },
  {
    "x1": 0,
    "y1": -431.5,
    "x2": 0,
    "y2": -431.5,
    "z": 0
  },
  {
    "x1": -21.100000000000023,
    "y1": -429.1,
    "x2": 0,
    "y2": -431.5,
    "z": 0
  },
  {
    "x1": -39.5,
    "y1": -423.1,
    "x2": -21.100000000000023,
    "y2": -429.1,
    "z": 0
  },
  {
    "x1": -55,
    "y1": -414,
    "x2": -39.5,
    "y2": -423.1,
    "z": 0
  },
  {
    "x1": -67.60000000000002,
    "y1": -402.3,
    "x2": -55,
    "y2": -414,
    "z": 0
  },
  {
    "x1": -77.5,
    "y1": -388.6,
    "x2": -67.60000000000002,
    "y2": -402.3,
    "z": 0
  },
  {
    "x1": -84.60000000000002,
    "y1": -373.2,
    "x2": -77.5,
    "y2": -388.6,
    "z": 0
  },
  {
    "x1": -88.80000000000001,
    "y1": -356.9,
    "x2": -84.60000000000002,
    "y2": -373.2,
    "z": 0
  },
  {
    "x1": -90.19999999999999,
    "y1": -340,
    "x2": -88.80000000000001,
    "y2": -356.9,
    "z": 0
  },
  {
    "x1": -88.80000000000001,
    "y1": -323.1,
    "x2": -90.19999999999999,
    "y2": -340,
    "z": 0
  },
  {
    "x1": -84.60000000000002,
    "y1": -306.8,
    "x2": -88.80000000000001,
    "y2": -323.1,
    "z": 0
  },
  {
    "x1": -77.5,
    "y1": -291.4,
    "x2": -84.60000000000002,
    "y2": -306.8,
    "z": 0
  },
  {
    "x1": -67.69999999999999,
    "y1": -277.7,
    "x2": -77.5,
    "y2": -291.4,
    "z": 0
  },
  {
    "x1": -55,
    "y1": -266,
    "x2": -67.69999999999999,
    "y2": -277.7,
    "z": 0
  },
  {
    "x1": -39.5,
    "y1": -256.9,
    "x2": -55,
    "y2": -266,
    "z": 0
  },
  {
    "x1": -21.100000000000023,
    "y1": -250.89999999999998,
    "x2": -39.5,
    "y2": -256.9,
    "z": 0
  },
  {
    "x1": 0,
    "y1": -248.5,
    "x2": -21.100000000000023,
    "y2": -250.89999999999998,
    "z": 0
  },
  {
    "x1": 21.100000000000023,
    "y1": -250.89999999999998,
    "x2": 0,
    "y2": -248.5,
    "z": 0
  },
  {
    "x1": 39.5,
    "y1": -256.9,
    "x2": 21.100000000000023,
    "y2": -250.89999999999998,
    "z": 0
  },
  {
    "x1": 55,
    "y1": -266,
    "x2": 39.5,
    "y2": -256.9,
    "z": 0
  },
  {
    "x1": 67.60000000000002,
    "y1": -277.7,
    "x2": 55,
    "y2": -266,
    "z": 0
  },
  {
    "x1": 77.5,
    "y1": -291.4,
    "x2": 67.60000000000002,
    "y2": -277.7,
    "z": 0
  },
  {
    "x1": 84.60000000000002,
    "y1": -306.8,
    "x2": 77.5,
    "y2": -291.4,
    "z": 0
  },
  {
    "x1": 88.79999999999995,
    "y1": -323.1,
    "x2": 84.60000000000002,
    "y2": -306.8,
    "z": 0
  },
  {
    "x1": 90.20000000000005,
    "y1": -340,
    "x2": 88.79999999999995,
    "y2": -323.1,
    "z": 0
  },
  {
    "x1": 88.79999999999995,
    "y1": -356.9,
    "x2": 90.20000000000005,
    "y2": -340,
    "z": 0
  },
  {
    "x1": 84.60000000000002,
    "y1": -373.2,
    "x2": 88.79999999999995,
    "y2": -356.9,
    "z": 0
  },
  {
    "x1": 77.5,
    "y1": -388.6,
    "x2": 84.60000000000002,
    "y2": -373.2,
    "z": 0
  },
  {
    "x1": 67.70000000000005,
    "y1": -402.3,
    "x2": 77.5,
    "y2": -388.6,
    "z": 0
  },
  {
    "x1": 55,
    "y1": -414,
    "x2": 67.70000000000005,
    "y2": -402.3,
    "z": 0
  },
  {
    "x1": 39.5,
    "y1": -423.1,
    "x2": 55,
    "y2": -414,
    "z": 0
  },
  {
    "x1": 21.100000000000023,
    "y1": -429.1,
    "x2": 39.5,
    "y2": -423.1,
    "z": 0
  },
  {
    "x1": 0,
    "y1": -431.5,
    "x2": 21.100000000000023,
    "y2": -429.1,
    "z": 0
  },
  {
    "x1": -470,
    "y1": -248.39999999999998,
    "x2": -525,
    "y2": -248.39999999999998,
    "z": 0
  },
  {
    "x1": -470,
    "y1": -430.6,
    "x2": -470,
    "y2": -248.39999999999998,
    "z": 0
  },
  {
    "x1": -525,
    "y1": -430.6,
    "x2": -470,
    "y2": -430.6,
    "z": 0
  },
  {
    "x1": 470,
    "y1": -248.39999999999998,
    "x2": 525,
    "y2": -248.39999999999998,
    "z": 0
  },
  {
    "x1": 470,
    "y1": -430.6,
    "x2": 470,
    "y2": -248.39999999999998,
    "z": 0
  },
  {
    "x1": 525,
    "y1": -430.6,
    "x2": 470,
    "y2": -430.6,
    "z": 0
  },
  {
    "x1": -360,
    "y1": -138.39999999999998,
    "x2": -525,
    "y2": -138.39999999999998,
    "z": 0
  },
  {
    "x1": -525,
    "y1": -540.6,
    "x2": -360,
    "y2": -540.6,
    "z": 0
  },
  {
    "x1": 360,
    "y1": -138.39999999999998,
    "x2": 525,
    "y2": -138.39999999999998,
    "z": 0
  },
  {
    "x1": 525,
    "y1": -540.6,
    "x2": 360,
    "y2": -540.6,
    "z": 0
  },
  {
    "x1": -360,
    "y1": -540.6,
    "x2": -360,
    "y2": -138.39999999999998,
    "z": 0
  },
  {
    "x1": 360,
    "y1": -540.6,
    "x2": 360,
    "y2": -138.39999999999998,
    "z": 0
  }
];
var folk = [
  {
    "man": "M0,2.7c-0.2-0.4,0.6-0.3,0.6,0c0,0.2,0.6,0,0.8,0.2c0,0-0.3,0-0.1-0.1c-0.1,0,0-0.1,0,0     c-0.3,0,0-0.1,0-0.1c0.1,0,0.2,0.1,0.3,0.2c0.4,0.3,0.1,0.3-0.3,0.2c0.1,0.2,0.7,0.7,0.9,1c0.3,0.2,0.4,0.4,0.7,0.5     c0.2,0,0.1,0.2-0.1,0.2C3.2,4.7,2.8,4.2,2.4,4c0,0.3,1,1,0.3,1.2C2.5,4.5,1.8,4,1.3,3.5c0,0.3-0.6,0.6-0.9,0.5     C0.1,4,0.6,3.9,0.5,3.8C0.2,3.7,0.8,3.9,1.1,3.5C0.7,2.8,1.2,3.3,0.8,2.7C0.8,2.8,0.7,2.8,0.8,2.7z",
    "shadow": "M3.4,0.8c0.3-0.7,0.8,0.1,0.4,0.5C4,1.4,4.2,1.5,4.3,1.8c0.1,0-0.2-0.2,0-0.2c-0.1-0.1,0-0.1,0.1,0     c-0.1-0.1-0.1-0.2,0-0.1c0.2,0,0.2,1-0.1,0.9C4.1,2.3,4.1,2.2,4,2.1c0,0.7-0.2,1.4-0.2,2.2c0,0.3-0.1,0.5,0,0.8     C4,5.2,3.8,5.4,3.7,5.2C3.4,4.7,3.6,3.9,3.4,3.5C3,3.9,3.3,5.3,2.5,5.2C3,4.3,2.9,3.1,3,2C3,2.3,2,2.5,1.9,2.3     c-0.2-0.2,0-0.1,0.2-0.1C2.2,2.1,2,2,2,2c0.1,0,0.2,0.2,0.3,0.2C2.8,2.1,2.9,1.9,3,1.4c0.4-0.2,0.1-0.1,0.3-0.5     C3.3,0.9,3.3,0.8,3.4,0.8z"
  },
  {
    "man": "M0.6,2.4c0.2-0.1,0.4,0,0.5,0.1c0.3,0.1,0.7-0.1,0.9,0.3C2.2,3,3,3.3,2.6,3.5c0,0.1,0.1,0.2,0.1,0.3     C2.8,4,3.9,4.3,3.8,4.7c0,0.2-0.5,0.3-0.4,0.1c0-0.2,0-0.2-0.1-0.1C3.2,4.8,2.7,4.8,3,4.7c0.5-0.2-1.3-0.9-1.4-1.2     C1.4,3.3,0.8,3.5,0.7,3.3C0.8,3,1.5,3.6,1.1,3C1.2,2.5,0.4,2.8,0.6,2.4z",
    "shadow": "M3.4,0.2c0.4-0.1,0.3,0.4,0.3,0.6C4.5,1,4,2,4.1,2.6C3.5,3.4,3.8,3.9,3.9,5c-0.1,0.4-1,0.4-0.4-0.1     C3.5,4.8,3.1,5,3,4.9C2.8,4.6,3.4,4.7,3.4,4.5C3.1,3.8,3.1,2.8,3.2,2C2.9,2.2,2.3,1.4,2.7,1.4C3,1.5,2.7,1.6,3,1.8     c0.3,0,0.2-0.6,0.5-0.7C3.3,0.8,3,0.4,3.4,0.2z"
  },
  {
    "man": "M0.4,3.3C0,2.6,1.4,2.5,1.9,2.6c0.3,0.4-0.6,0.1,0.6,0.9c0.1,0-0.1,0.1-0.1,0.1C3,3.9,3.2,4.6,3.8,4.5     c-0.3,0.4-1-0.2-1.3-0.4C2.6,4.5,2.9,4.7,3,4.9C3.1,5,3.4,5,3.2,5.1C2.2,5,1.6,3.5,0.4,3.3z M0.6,3.1c0,0.1,0.1,0,0.2,0     c0,0-0.1,0,0,0C1,3,0.5,2.7,0.6,3.1L0.6,3.1z M0.6,2.8C0.6,2.9,0.7,2.9,0.6,2.8C0.7,2.9,0.7,2.9,0.6,2.8L0.6,2.8z M1.3,2.9     c0.1,0,0.2-0.1,0.3-0.1C1.8,2.7,0.9,2.6,1.3,2.9L1.3,2.9z",
    "shadow": "M2.5,1.3c0.2-1,1.5-0.8,1.9,0C3.7,1.9,3.9,1.5,4,2.5c0,0.5-0.1,1-0.1,1.5c0.1,0.4-0.1,0.6,0.2,0.8     C3.5,5.2,3.5,3.9,3.4,3.5C3.2,4,3.2,4.5,3.1,4.9c0,0.1,0.2,0.4,0,0.4C2.3,5.1,3.3,2.3,2.5,1.3z M2.9,1.1C2.8,1.2,3,1.2,3,1.2     c0-0.1,0-0.1,0.1-0.1C3.3,1.1,3.1,0.5,2.9,1.1z M3.2,0.7c0,0,0,0.1,0,0.1C3.2,0.8,3.2,0.7,3.2,0.7z M3.6,1.2c0.1,0,0.4,0.1,0.5,0     C3.8,0.8,3.6,0.8,3.6,1.2z"
  },
  {
    "man": "M0.6,2.8C0.9,2.6,1,2.8,1.2,2.9c0,0,0,0,0,0c0.6,0,1.1,0.2,1.5,0.7C2.7,3.7,3,3.8,2.8,3.8     c0.1,0.3,2,1,0.9,1.1c0.1-0.3-0.7-0.6-1-0.7c0.2,0.3,1,0.9,0.2,1c0.2-0.4-0.5-0.6-0.7-0.9C1.9,4.3,1.8,4.1,1.6,3.9     c0,0.2,0.4,0.4,0.2,0.4c-0.1-0.1-0.1,0,0,0c0.1,0.3-1-0.9-0.8-1c-0.1,0,0-0.2-0.1-0.1C0.8,3.1,0.3,2.9,0.6,2.8z",
    "shadow": "M3.3,0.5c0.4-0.1,0.2,0.6,0.4,0.6C4.1,1.4,4.4,2,4.1,2.6c0,0.1,0.1,0.7-0.1,0.5C3.8,3.6,4.7,5.6,3.7,5.2     c0.3-0.4,0-1-0.2-1.5c-0.1,0.5,0,1.8-0.8,1.4C3.4,4.5,2.8,3.5,3,2.6C2.8,2.7,2.9,3.5,2.8,3.1c-0.1,0,0,0.1,0,0.1     C2.5,3.6,2.9,1.5,3.1,1.4C3,1.4,3.3,1.2,3.2,1.2C3.1,1,2.9,0.5,3.3,0.5z"
  },
  {
    "man": "M1.9,3C2,3.1,2.3,3.1,2.1,3.2c0.7,0.4,1,1.1,1.8,1.5C3.5,5.1,2.8,4.2,2.4,4C2.6,4.2,3.8,5.3,3.1,5     C2.6,4.6,2,4.2,1.6,3.7c0,0.2,0.5,0.4,0.5,0.5c-0.4,0.1-0.6-0.7-1-0.6C0.6,3,1.4,3.3,0.7,2.9c0-0.3,0.6-0.2,0.6,0     C1.4,3.1,1.7,2.8,1.9,3z M2,4.3C2,4.3,2,4.3,2,4.3L2,4.3C2,4.2,2,4.2,2,4.3z",
    "shadow": "M4,1.7c0.2,0.5-0.1,0.2,0,0.6C4,2.6,4.2,3.3,3.9,3.4c-0.1,0.6-0.1,1.2,0,1.9C3.4,5.6,3.5,3.6,3.5,3.4     C3.4,3.8,3.6,5.2,3.2,5.3c-0.3,0,0-0.3,0-0.4C3,4.1,3,3.3,3.1,2.5c-0.2,0.3,0,0.9-0.1,1c-0.2-0.4,0-0.9,0-1.3     C2.7,2.1,2.8,2,2.8,1.9c0-0.5,0.6-0.3,0.4-0.7c-0.4-0.6,0.7-0.7,0.4,0C3.5,1.5,4,1.3,4,1.7z M2.9,3.4C2.9,3.4,2.9,3.5,2.9,3.4     L2.9,3.4C2.9,3.4,2.9,3.4,2.9,3.4z"
  },
  {
    "man": "M2.2,3c0.1,0.1,0.6,0.4,0.3,0.5c-0.1,0,0-0.1-0.1-0.1c0,0.2-0.3-0.3-0.4-0.4C1.5,3.3,3.2,4.4,3.7,4.5     c0.5,0.7-1.9-1-1.5-0.3C2.4,4.6,2.6,5,2.9,5.2C2.3,5.5,1.7,4.1,1.1,3.7C0.9,3.8,0.5,3.9,0.6,3.5C0.5,3.2,0.6,3.1,0.8,3     C0.6,2.8,0.7,2.5,1,2.6C1.5,3,1.5,2.8,2.2,3z M0.9,3.6L0.9,3.6C0.9,3.4,0.8,3.6,0.9,3.6z",
    "shadow": "M4.2,1.8C4.2,2,4.3,2.7,4,2.7c-0.1,0,0.1-0.2,0-0.2C3.9,2.8,4.1,2.2,4,2.1C3.7,1,3.6,3.4,3.8,3.7     c0.1,0.3,0.4,2-0.1,0.9C3.2,3,3.2,2.9,2.8,4.7C2.7,4.9,2.9,5.3,2.6,5.3c-0.4,0-0.1-0.9-0.1-1.1c0.2-0.6,0-1.3,0.2-2     C2.2,2.1,2.2,1.9,2.5,1.5C2.6,1.2,2.9,1.1,3.2,1C3.1,0.6,3.7,0.2,3.7,0.8C3.5,1.2,4.2,1.3,4.2,1.8z M2.7,1.9     c0.1,0.1,0.1-0.1,0.1-0.1C2.7,1.8,2.6,1.8,2.7,1.9L2.7,1.9z"
  },
  {
    "man": "M4.1,4C4.5,4.1,4.3,4.8,4,4.3C3.5,4.2,3.1,4.3,2.7,4.1C2.8,4.4,4,4.6,3.3,4.9c0,0.1-0.5,0.2-0.3,0     c0.3-0.2-0.2-0.4-0.5-0.5C2.3,4.2,1.1,3.3,1,3.6C1.1,3.9,0.7,3.9,0.7,4C0.6,4.1,0.4,4.1,0.4,4C0.4,4,0.3,4,0.3,4     c0,0,0.4,0,0.2-0.1c0-0.1,0.2,0.1,0.2-0.1C1,3.6,0.5,3.3,0.6,3.2C0.4,3.2,0,3.2,0,2.9c-0.2-0.2,0.6-0.2,0.7,0     C2.8,2.3,2.2,4.2,4.1,4z M2.2,3.3C2.1,3.1,1.9,3,1.8,3.1C1.7,3.1,2.2,3.3,2.2,3.3z",
    "shadow": "M4.7,4.4c0.2,0.5-0.5,1.2-0.4,0.2C3.8,4.2,3.7,4.3,3.5,3.8C3.4,4.2,4,5.2,3.3,5.2c-0.1,0.1-0.3,0.1-0.3,0     c0.3-0.3,0.5-0.4,0.3-1C3,3.5,3.1,2.9,2.8,2.3c-0.1-0.4-0.2,0-0.4,0.1c-0.2,0-0.6,0.3-0.7,0.1c0.1-0.2-0.2-0.3,0-0.3     C2,2.3,1.9,2.3,2,2.1c0.1,0.3,0.1,0.1,0.3,0C2.6,2,2.5,1.5,2.7,1.3C2.1,1.1,2.6-0.1,3,0.7c0,0.2-0.1,0.4,0.2,0.4     C5.4,1.7,3,3.6,4.7,4.4z M3.9,2.4C4,2.1,4,1.8,3.7,1.8C3.7,1.8,3.9,2.4,3.9,2.4z"
  },
  {
    "man": "M1,2.6c0.1,0.1,0.3,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.2c1,0.1,1.5,1.3,2.4,1.6c0.7,0-0.1,0.3-0.4,0.2     C3.1,4.5,2.9,4.4,2.7,4.3c0.2,0.3,0.4,0.5,0.7,0.6C3.5,5.2,3,5,2.9,4.9C2.1,4.4,1.5,3.9,0.8,3.3C0.7,3.2,0.9,3.2,0.9,3.1     C0.9,3,0.5,3,0.5,2.8c0-0.1,0-0.1,0.1-0.1c0-0.1,0.2-0.1,0.2,0C0.9,2.6,0.9,2.6,1,2.6z",
    "shadow": "M3.6,0.6c0,0.2,0.2,0.1,0,0.3c0,0,0,0.1,0,0.2c0.1,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0.7,0.9,0,2.5,0.4,3.5     C4.7,5.1,3.7,5,3.5,4.8c0-0.2-0.1-1.3-0.2-0.8C3.3,4.4,3.5,5.9,2.9,4.9c0-0.7-0.2-1.6-0.1-2.3c-0.1-0.1-0.1-0.3,0-0.4     C2.6,1.8,2.7,1.4,3.1,1.1C3.1,1,2.9,0.4,3.3,0.5c0.2-0.1,0.2,0.1,0.2,0C3.5,0.5,3.5,0.5,3.6,0.6z"
  },
  {
    "man": "M2.2,3c0.3,0.1,0.1,0.3,0.1,0.5c0.5,0.3,0.9,1,1.4,1.2c0,0.5-1.2-0.8-1.5-0.9c0.2,0.3,1.3,1,1,1.1     C2.6,4.8,2,3.7,1.1,3.8C0.8,3.7,0.8,3.4,0.8,3.2c0-0.2,0.5-0.2,0-0.4L0.9,3c-0.8-0.3,0-0.7,0.4-0.1c0,0-0.1-0.1-0.1-0.1     C1.2,3,1.6,2.7,2.2,3z M1.4,3.7L1.4,3.7C1.4,3.6,1.2,3.5,1.1,3.4C1.1,3.6,1.2,3.7,1.4,3.7z M2.1,3.2C2,3.1,1.9,3.1,1.8,3.1     C1.8,3.2,2.3,3.5,2.1,3.2z",
    "shadow": "M4.2,1.9c0.2,0.3-0.3,0.5-0.4,0.7c0,0.8-0.2,1.7-0.1,2.5c-0.5,0.6-0.2-1.8-0.4-2C3.2,3.5,3.5,5.6,3,5.2     c0-0.9,0.3-2.2-0.4-2.9C2.3,1.4,3.4,1.3,3.2,0.8c0,0.8-0.3-0.5,0.2-0.4C3.9,0.3,3.5,1.5,3.6,1C3.4,1.4,3.8,0.9,4.2,1.9z M2.9,2.4     L2.9,2.4c0-0.1,0-0.4,0-0.6C2.8,2,2.7,2.2,2.9,2.4z M3.9,2.1c0-0.1,0-0.2-0.1-0.3C3.7,1.9,3.7,2.7,3.9,2.1z"
  },
  {
    "man": "M0.5,2.7c0.1-0.1,0.2-0.1,0.4,0c0,0,0,0,0,0C1,2.7,1,2.9,1.2,2.9c0.2-0.1,0.6,0,0.9,0.1C2.1,3,2,3,2.1,3     c-0.2,0-0.1-0.1,0,0C1.9,2.9,2.3,2.8,2.3,3.2c0,0.3-0.5,0-0.2,0.2c0.6,0.3,1.1,1.1,1.8,1.4C3.2,5.1,2.8,4.2,2.2,4     C2.3,4.4,3.6,4.8,3,5.1C2.5,4.7,1.6,3.9,0.9,3.7C0.4,3.2,1.2,3,0.6,3C0.5,2.9,0.4,2.8,0.5,2.7C0.5,2.7,0.5,2.7,0.5,2.7z",
    "shadow": "M3.2,0.4c0.2-0.1,0.2,0,0.3,0.2c0,0,0,0,0,0C3.3,1.7,3.7,0.8,4.1,1.9c0-0.1,0-0.2,0.1-0.1     c-0.1-0.1,0-0.2,0.1,0c0-0.1-0.1-0.2,0-0.1c0.2,0.2-0.4,1-0.5,0.5c0.1,1-0.2,2.2,0.1,3.1C3,5.1,3.6,3.8,3.3,3.2     C2.9,3.8,3.5,4.9,3,5.3c-0.3,0,0-0.3,0-0.5c-0.2-0.8,0-2-0.5-2.7C2.6,1,3.3,1.4,3,0.8C2.9,0.7,3,0.5,3.2,0.4     C3.1,0.5,3.1,0.4,3.2,0.4z"
  },
  {
    "man": "M0.6,2.6c0.4-0.1,0.4,0.1,0.6,0.2c-0.1,0.1,0.1,0.1,0.3,0c0.4,0,0.9,0.3,1.1,0.6c0.1,0,0.5,0,0.3,0.2     C2.8,3.9,2.3,3.2,2.2,3.4c0.5,0.3,1,0.8,1.4,1.1c0.3,0.2-0.3,0.5-0.3,0.2C3.2,4.9,2.5,5.1,3,4.7c0-0.2-0.4-0.3-0.6-0.4     C2,4.2,1.8,3.8,1.4,3.7c-0.2,0.2,0.4,0.4,0,0.4c0.3,0.1,0,0.1-0.1,0c-0.1-0.3-0.6-0.6-0.4-1C0.8,3,0.2,2.9,0.6,2.6z",
    "shadow": "M3.2,0.5c0.3,0,0.3,0.3,0.3,0.5c0.1,0,0,0.1,0,0C3.3,1.2,3.6,1.3,3.8,1.4C4.1,1.6,4,2.1,4.2,2.5     C4,2.7,4.1,2.8,4.3,2.9C4.4,3.1,4,3.3,4,3C3.9,3.1,4,2.6,3.9,2.6C3.8,2.3,3.7,2.7,3.8,2.8C3.5,3.6,4.1,4.6,3.6,5.3     C3.3,5.3,3.3,5.2,3.4,5C3.3,5.1,2.6,5,3,4.8c0.4,0,0.1-0.7,0-0.9c-0.1-0.4,0-1-0.2-1.4C2.5,2.7,2.7,3.3,2.6,3c0,0.2,0,0.3-0.1,0     c0.2-0.5,0.1-1.3,0.6-1.6C3,1.1,2.7,0.6,3.2,0.5z"
  },
  {
    "man": "M0.5,2.6C0.7,2.4,1,2.7,1.1,2.8c0.2,0,1.2,0,1,0.3c0.3,0,0.5,0.3,0.8,0.3c0.1,0,0,0,0,0     c0.1,0,0.3,0.2,0.1,0.1c0.2,0.1,0.1,0.1,0,0c0.1,0.1,0,0.1-0.1,0C2.9,3.8,2.2,3.3,2,3.3C2.4,3.6,4.4,5,3.5,4.7     c-0.2-0.1-1.9-1.3-1-0.3C2.7,4.5,3.4,5.1,2.8,5C2.4,4.4,1.6,4.2,1.2,3.6C1.2,3.7,1.3,3.8,1.3,4c0,0.1,0.3,0.3,0.1,0.2     c0.1,0.1,0,0.1,0,0c0.1,0.1,0,0.1-0.1,0c0,0.2-0.1,0-0.1-0.1c0,0-0.1,0.1-0.1,0c0.3-0.4-0.6-0.5-0.5-1C1.1,2.8,0.1,2.9,0.5,2.6z",
    "shadow": "M3.2,0.4c0.3,0,0.3,0.5,0.2,0.7c0.2,0.1,0.9,0.8,0.5,1C4.1,2.3,4,2.8,4.3,2.9c0,0-0.1-0.1-0.1,0     c0,0.1,0,0.4,0,0.1c0,0.2-0.1,0.2,0,0c0,0.2-0.1,0.2-0.1,0C4,3.4,4,3,4,2.9c0-0.2-0.2-0.4-0.2-0.7c-0.1,0.7,0.4,2.6,0,3     c-0.3-0.5-0.1-1.4-0.5-2c-0.2,0.6-0.1,1-0.1,1.6c0,0.1-0.3,0.5-0.4,0.2c0.2-0.9-0.2-1.9,0-2.9C2.7,2.4,2.6,2.6,2.5,2.8     c0,0.1,0,0.6-0.1,0.3c0,0.1-0.1,0.2-0.1,0c0,0.2-0.1,0.2-0.1,0C2.1,3.4,2.3,3,2.2,2.9C1.9,3,2.4,2.8,2.4,2.6     C2.5,2.1,2.3,2,2.5,1.5c0-0.3,0.4-0.2,0.5-0.4C3,0.9,2.8,0.4,3.2,0.4z"
  },
  {
    "man": "M2.5,3.1C2.6,3.1,2.6,3.1,2.5,3.1c0.2,0.2-0.3,0.3-0.6,0.4c0.7,0.4,1,1.2,1.9,1.3C3.4,5.3,2.6,4.6,2.2,4.3     C2.3,4.8,2.7,5,2.9,5.2C2.4,5.5,2,4.9,1.9,4.5c-0.5-0.4-1-0.5-1.4-1c-0.1-0.1,0-0.2-0.1-0.3c0-0.1,0.1-0.1,0-0.2     c0-0.1,0.1-0.1,0.1-0.2C0.2,2.5,0.9,2.6,1,2.8c-0.1-0.1,0.1,0.1,0,0C1,2.9,1.1,3,1,3c0.1,0,0.1,0,0.2,0l0,0     c0.1,0,0.8,0.2,0.7,0.3C2.2,3.4,2.2,3,2.3,3.1C2.2,3.3,2.4,3.1,2.5,3.1z M0.6,3C0.5,3.1,0.5,2.9,0.6,3c-0.2,0,0,0.1-0.1,0.2     C0.3,3.3,0.6,3.1,0.6,3C0.5,3,0.6,3.1,0.6,3z",
    "shadow": "M4.3,2.1C4.5,2.1,4.4,2.1,4.3,2.1c0,0.1,0,0.1-0.1,0.1c-0.1,0.3-0.4,0.1-0.8,0c0.1,0.9-0.1,1.7,0,2.6     c0.7,0.5-0.2,0.3-0.4,0C3.1,4.5,3,4,3,3.6c-0.2,0.5-0.5,1-0.2,1.5C1.7,5.5,2.7,3.5,2.4,3C2.3,3.1,2.3,2,2.3,1.8     c0-0.6,1.1-2.3,1.2-1c0-0.2-0.1,0.2-0.1,0C3.3,1.2,3.2,1,3.4,1.3c0,0,0.2,0.3,0.2,0.4C3.6,1.8,3.7,2,3.6,2C3.9,2.3,4.2,1.7,4.2,2     C4,2.1,4.3,2.1,4.3,2.1z M2.9,0.9L2.9,0.9c0.1-0.2-0.1-0.2-0.1,0c0,0.2-0.3,0.1-0.2,0.2C2.6,1,2.7,1.1,2.8,1     C2.8,0.9,2.9,1,2.9,0.9z"
  },
  {
    "man": "M0.7,2.9C0.3,2.5,1.1,2.5,1.2,2.8c-0.1,0,0,0.1,0,0.1C1.1,2.9,1.2,3,1.3,3C1.6,3,2.7,2.9,2.1,3.3     c-1.4-0.2,1,0.6,0.5,1C3,4.8,3.7,4.8,3.3,4.9C3,5,2.2,4.1,2.6,4.6c0.7,0.7,0.2,0.9,0.1,0.3C2.4,4.8,2.1,4.4,1.8,4.3     C1.3,4,0,3.6,0.7,2.9z",
    "shadow": "M3.1,0.9c0.1-0.9,1-0.2,0.4,0.3c0,0.3,0.7,0.4,0.8,0.7c0,0.1-0.4,0.3-0.4,0.2C3.8,1.9,3.9,2,3.7,1.9     c-0.3-0.1,0,0.7-0.1,0.8c-0.1,0.3,0.1,1-0.3,1c0,0.6-0.2,0.7,0.1,1.3C3.4,5.1,3.1,4.8,3.1,4.7c0.1-0.2,0-1.1-0.1-0.6     C3,4.4,2.9,4.7,2.9,5c0,0.3-0.4,0.3-0.3,0c0.3-0.3,0.1-0.6,0.2-1C2.8,2.9,1.7,1.4,3.1,0.9z"
  },
  {
    "man": "M0.6,2.8c-0.2-0.4,0.7-0.3,0.6,0c0.4-0.1,0.9,0,1,0.4c0.6,0.4,1.1,0.9,1.6,1.4c0.6,0.2,0.1,0.3-0.2,0.1     C3.3,4.5,2.9,4.2,2.5,4C2.6,4.4,3.7,4.9,3,5.2c-0.1-0.4-0.6-0.7-1-1C1.7,4,1.6,3.7,1.3,3.7C0.1,3.1,1.6,3.2,0.6,2.8z",
    "shadow": "M3.1,0.7C3.3,0,4,0.8,3.6,1.1c0.4,0.3,0.5,0,0.5,0.8C4,2.2,4,2.5,4.1,2.8C4,3.6,4,4.5,4.1,5.2     C3.6,5.8,3.7,3.6,3.5,3.3C3.3,3.7,3.7,5.5,2.8,5.1C3.4,4.4,2.8,3.3,3,2.5c0-0.1,0-0.2-0.1-0.2c-0.3-0.2-0.1-0.7,0-1     C3.4,1.1,3.3,1.3,3.1,0.7z"
  },
  {
    "man": "M4.1,4.6C4.4,5.1,3,4.2,2.8,4.2c-0.1,0-0.6-0.3-0.3,0C2.8,4.4,3.6,5.1,2.8,5C3.1,4.2,0.5,4,1,3     c-1-0.2,0.2-0.8,0.3-0.2c0.4,0,0.9,0,1.2,0.4C2.3,4,3.6,4.1,4.1,4.6z M2.1,3.3l0.1,0.1C2.3,3.3,2,3.2,2.1,3.3z",
    "shadow": "M4.2,5C4,6.2,3.6,3,3.4,3.3c0,0.4,0,0.8,0,1.3c0,0.3-0.2,0.4-0.4,0.4C2.5,5,3,4.9,3,4.7c0-0.6,0-1.2-0.1-1.8     C2.7,2.5,2.6,1.6,3,1.3c0.4-0.2,0.1-0.2,0.1-0.5C2.9,0.1,4,0.4,3.6,1c-0.1,0,0.1,0,0.1,0c0,0.1,0.2,0,0.1,0.1     c0.4,0,0.5,0.6,0.5,1C4.1,2.5,3.8,2.5,3.8,2.8C3.8,3.6,4.2,4.3,4.2,5z M3.9,2.1l0,0.2C4,2.3,3.9,1.9,3.9,2.1z"
  },
  {
    "man": "M1.9,2.9c0.4,0.2,0.6,0.7,1,0.9C3,4,4.5,4.9,3.6,4.9C3.4,4.3,1.7,3.5,3,4.8c0.5,0-0.2,0.6-0.3,0.4     c0-0.1,0.2-0.1,0-0.3C2.4,4.5,1.9,4.1,1.4,3.8C1.3,3.9,0.6,3.7,1.1,3.7c0.5-0.1-0.2-0.2,0-0.6C0.2,2.9,0.8,2.3,1.2,2.7     C1.4,3,1.6,2.9,1.9,2.9z M1.6,3.8c-0.2-0.1,0,0.1,0.1,0.1C1.6,3.8,1.6,3.8,1.6,3.8z",
    "shadow": "M4.1,1.5C4.2,2,3.9,2.7,4,3.3C3.9,3.7,4.4,5.7,3.6,5.2C4,4.5,3.4,2.4,3.3,4.3C3.2,4.6,3.4,5.1,3.1,5.1     C3,5.1,2.5,5.4,2.6,5.1C2.7,5,2.9,4.9,2.9,4.7c0.1-0.7,0-1.3,0.1-2C2.9,2.2,3,2.5,2.7,2.2C2.4,1.8,3,2.2,3.1,2.1     c0-0.3,0-0.6,0.3-0.8C3.1,1,3.1,0.2,3.7,0.5C4,1.1,3.4,1.1,4.1,1.5z M3.1,2.5c0-0.2-0.1,0.1,0,0.2C3,2.6,3,2.5,3.1,2.5L3.1,2.5z"
  },
  {
    "man": "M0.5,2.5C1,2.4,1,3,1.5,2.8c0.3,0,0.5,0.4,0.8,0.4c0,0.2,0.8,0,0.4,0.1c0.1,0,0.2,0.1,0,0.1c0.1,0,0,0.1,0,0     C2.9,3.5,2,3.3,2,3.3C2.4,3.7,3,3.9,3.3,4.5c0,0,0.4,0.1,0.1,0.2C3,4.6,2.8,4.1,2.4,4c0.2,0.4,1.9,1.4,0.4,0.7     C2.2,4.3,1.6,4,1.2,3.6c-0.1,0,0.4,0.3,0.1,0.3c0,0.1,0.5,0.2,0.2,0.2c-0.3,0-0.7-0.4-0.8-0.7C0.5,3.2,0.8,3.1,0.8,2.9     C0.6,2.9,0.2,2.7,0.5,2.5z",
    "shadow": "M3.2,0.4c0.2,0,0.3,0.4,0.2,0.5C3.3,1.1,3.5,1.2,3.7,1.3c0.2,0.2,0.1,0.7,0.2,1C4,2.3,4,2.3,4,2.4     C4,2.6,4.5,2.7,4.2,2.6c0,0.1,0.1,0.3,0,0.1c0.1,0.1,0,0.1,0,0C4,3,4,2.6,3.9,2.5c-0.2,0-0.1-0.2-0.2-0.3c0,0.8,0.2,1.6,0,2.4     c0,0.1,0.2,0.4-0.1,0.3c-0.3-0.5,0.1-1-0.2-1.5C3.2,4.1,3.4,6.6,2.9,4.3c0-0.6-0.1-1.9-0.1-2.1c-0.1,0.2,0,0.3-0.1,0.5     c-0.1-0.1-0.1,0.4,0,0.4C2.4,3.2,2.4,2.7,2.4,2.5c-0.2,0,0-0.2,0-0.3c0-0.5,0.3-0.9,0.7-1.1C3,0.8,2.9,0.4,3.2,0.4z"
  },
  {
    "man": "M2.2,3.1c0,0.1,0.9,0.6,0.6,0.6c0-0.1-0.1,0,0,0.1C3,4.1,3.4,4.3,3.5,4.6c0,0.1,0.4,0.1,0.2,0.2     C3.3,4.9,2.9,4.1,2.4,4c0,0.3,1.6,1.1,0.8,1C3,4.7,2.7,4.7,2.4,4.4C2.1,4.3,1.8,4,1.6,3.8c-0.1,0,0.3,0.4,0.3,0.4     C1.6,4.3,1.4,3.6,1.1,3.6C0.7,3.1,1,3.4,1,3C0.2,2.9,0.9,2.3,1.2,2.8C1.2,3.1,2.1,2.7,2.2,3.1z M2.6,3.6C2.5,3.5,2.2,3.3,2,3.2     C2,3.2,2.7,3.8,2.6,3.6z M2.8,3.7C2.8,3.7,2.7,3.7,2.8,3.7C2.7,3.7,2.8,3.8,2.8,3.7L2.8,3.7z",
    "shadow": "M4.1,2.1C4,2.2,4.2,3.3,3.9,3.3c0-0.3-0.1,0.3-0.1,0.4c0,0.3,0.1,0.8,0,1.1c0,0.1,0.2,0.4,0,0.4     C3.3,5.1,3.7,4.1,3.5,3.8c-0.1-0.6-0.1-0.5-0.2,0C3.2,4.2,3.6,5,3.3,5.3c-0.3,0,0-0.3-0.1-0.4c0-0.7-0.2-1.5-0.1-2.3     C2.9,2.7,2.9,3.1,2.9,3.3C2.6,3.2,2.8,2.9,2.8,2.7C3,2.1,2.7,1.8,3,1.5C3.4,1.4,3.1,1,3.1,0.8c0.2-0.6,0.8-0.1,0.5,0.4     c0.1,0.3,0.5,0.1,0.5,0.5C4.1,1.8,4.2,2.1,4.1,2.1z M3.9,3c0-0.3,0-0.6-0.1-0.9C3.8,2.1,3.9,3.2,3.9,3z M4,3.2C4,3.2,4,3.1,4,3.2     C4,3.1,4,3.2,4,3.2L4,3.2z"
  },
  {
    "man": "M0.6,2.8c0.1-0.3,0.7,0,0.5,0.1C1.2,3.1,1.5,3.1,1.7,3C1.6,2.9,1.2,3,1.3,2.8C0.9,2.6,3.1,3.2,1.9,3.2     c0.5,0.4,1,0.8,1.5,1.3C3.5,4.7,4,4.8,3.6,4.9C3.1,4.7,2.8,4.3,2.3,4.1c0,0.3,1.2,1,0.7,1.1c-0.6-0.7-1.6-1-2.2-1.7     c0-0.2,0.4-0.3,0-0.4c0,0-0.2,0-0.1-0.1C0.7,2.9,0.5,2.9,0.6,2.8z",
    "shadow": "M3.2,0.7C3.4,0.5,3.6,0.7,3.5,1C3.7,1,3.3,1.4,3.6,1.5C4.2,1.6,3.5,1.2,3.7,1c0.1,0-0.1-0.2,0-0.1     c0.1,0.3,0.9,1.5,0,1.1c0,0.3,0.2,3.9-0.2,3.2C3.4,4.5,3.5,3.9,3.3,3.3C3.2,3.5,3.1,6.1,2.9,5C3,3.9,2.6,2.8,2.7,1.8     c0-0.4,0.6-0.3,0.4-0.7C3,1.1,3,1,3.1,0.9C3.1,0.8,3.1,0.7,3.2,0.7z"
  },
  {
    "man": "M2,3c0.4,0.6,1.1,1.1,1.6,1.6c0.2,0,0.4,0.2,0.1,0.2C3.1,4.8,2.8,4.3,2.4,4.1C2.5,4.4,2.8,4.7,3,4.9     C3.1,5,2.5,5.4,2.6,5.2c0.3-0.4-1-1-1.1-1.4C1.3,3.6,1.2,3.8,1,3.7C0.9,3.6,0.7,3.3,0.8,3.2C1.2,3,0.8,3,0.7,2.7     c0.6-0.5,0.5,0.4,0.8,0.2C1.7,2.8,1.8,3,2,3z",
    "shadow": "M4,1.8C3.8,2.7,4,3.8,3.7,4.7c-0.1,0.1,0.1,0.1,0,0.1C3.7,5,4,5.2,3.8,5.3c-0.3,0-0.4-0.5-0.3-0.8     c0-0.3-0.1-1.5-0.2-0.7C3,4.3,3.3,5.4,2.4,5.2c0.7-0.7,0.2-1.9,0.5-2.7C3,2.1,2.3,2.5,2.7,1.7c0.1-0.6,0.6-0.3,0.6-0.6     C3.1,0.5,4,0.3,3.8,1c-0.2,0-0.2,0.3,0,0.3C4.1,1.4,4,1.6,4,1.8z"
  },
  {
    "man": "M0.6,2.6c-0.2-0.2,0.7-0.4,0.6,0c0,0,0.1,0,0,0.1c0,0,0,0,0,0C2,2.6,2.4,3,2.6,3.5C3,3.8,3.4,4.1,3.7,4.4     c0,0.1,0.5,0.1,0.3,0.2C3.4,4.7,3,4,2.4,3.8c0.1,0.3,1.3,0.8,1,1.1C2.9,4.7,2.5,4.2,1.9,4C1.8,3.8,1.6,3.8,1.6,3.6     c-0.1,0-0.4-0.6-0.3-0.3c0.1,0.3-0.8,0.2-0.7,0c0.3-0.2,0.2,0,0.4,0C0.9,3.3,0.8,3.1,1.1,2.8C0.9,2.8,0.7,2.7,0.6,2.6z",
    "shadow": "M3.2,0.6c0-0.4,1-0.1,0.5,0.5c0.1,0.2,0.4,0.2,0.4,0.5C4.3,2.2,3.8,2.8,4,3.5C4,4,3.8,4.7,4.1,5.2     C3.4,5.4,3.8,3.8,3.5,3.3c-0.3,0.4,0.3,2-0.2,2C3.1,4.3,2.8,3,3.1,1.9C2.8,2.6,2.2,2,2.4,1.7C2.9,1.5,2.5,1.9,2.7,2     C2.8,1.7,3,1.3,3.3,1.2C3.2,1.1,3.3,1,3.2,0.9C3.1,0.8,3.2,0.7,3.2,0.6z"
  },
  {
    "man": "M0.5,2.4c0.2-0.5,0.7,0.1,1,0.1C1.9,2.4,2.2,2.7,2.3,3c0.1,0.1,0.3,0.1,0.1,0.2c1.3,1.1,2.7,2.5,0.1,0.6     C2.7,4.1,3.7,5.1,3,5.1C2.7,4.4,2,3.9,1.5,3.4C1.4,3.5,1.2,3.6,1.1,3.6C1,3.5,0.1,3.6,0.7,3.4c0.1,0,0.4,0.1,0.5,0     c0-0.1-0.4-0.3-0.2-0.6h0c0.3-0.2-0.2-0.1-0.3-0.1C0.7,2.5,0.4,2.6,0.5,2.4z",
    "shadow": "M3.2,0.1c0.4-0.4,0.7,0.1,0.6,0.5c0,0.2,0.1,0,0.2,0.2C4.6,1,4.2,1.7,4.2,2.1C4.3,2.3,4,2.2,4.1,2.4     c0.1,0.4,0,0.8-0.1,1.2C4,3.9,4.2,5.4,3.9,5.3c-0.4-0.6,0-1.5-0.3-2.1c0,0.3-0.4,2.8-0.8,2c0.4-0.9,0.3-2,0.4-2.9     c0.1-0.3-0.8,0.2-0.6-0.3C2.4,1.8,2,1.5,2.5,1.6c0.1,0,0.3,0.4,0.4,0.2c0-0.3,0.2-0.8,0.4-0.9c0.3,0,0.1-0.3-0.1-0.3     C3.2,0.2,3,0.3,3.2,0.1z"
  },
  {
    "man": "M0.9,2.6C1,3.1,2.8,2.7,2.1,3.2c0.7,0.4,1,1.3,1.9,1.3C3.5,5,3,4.5,2.6,4.2C2.7,4.5,2.7,4.6,3,4.8     C3,5,3.3,5,3.4,5.1C2.6,5.7,2,4,1.4,3.7C1.1,3.5,0.5,3.4,0.8,3C0.3,2.9,0.4,2.4,0.9,2.6z",
    "shadow": "M3.5,0.5c0.1,0.2-0.1,0.5,0,0.6c0.2,0,1.1,0.6,0.7,0.8C3.8,1.9,4,3.1,3.9,3.5c0,0.4-0.3,1,0.3,1.2     c0.1,0.3-0.7,0-0.7,0c0.1-0.4-0.1-0.8,0-1.2C3.2,4,2.9,4.7,3.3,5.2C2.1,5.6,3.1,3.5,2.9,2.9C3,2.3,2.5,1.2,3.1,1     C3.2,0.9,3,0.7,3,0.5C3,0.2,3.6,0.2,3.5,0.5z"
  },
  {
    "man": "M0.7,2.7c0.6,0.4,1,0.1,1.5,0.5c0.1,0,0.3,0.1,0.2,0.1c0.1,0.1,0.7,0.3,0.4,0.4c-0.1,0.1,0-0.1-0.1,0     c0.1,0.3-0.3-0.4-0.5-0.3c-0.1-0.1-0.3-0.1-0.1,0c0.6,0.4,1,1,1.6,1.3C4.1,5,3.3,4.8,3.2,4.7c-0.3-0.3-1.4-1-0.5-0.2     c0.2,0.2,0.7,0.5,0.1,0.6C2.5,4.6,1.7,4.3,1.2,3.8C1.1,3.8,1.5,4,1.3,4c0.1,0.1,0.3,0.1,0.3,0.2c-0.1,0-0.1,0,0,0     C1.3,4.5,0.3,3.4,0.8,3.2C0.9,3,0.1,2.8,0.7,2.7z",
    "shadow": "M3.4,0.6c0.3,0.3-0.2,0.6,0.5,0.8c0.5,0.5,0.3,1,0.4,1.6C4.3,3.1,4,3.3,4,3.2c0.1,0,0-0.2,0-0.1     C3.9,3.3,4.1,2.6,4,2.4C3.7,1.8,3.9,2.3,3.9,2.7C3.8,3.4,3.7,4,3.8,4.7c0,0.2,0.1,0.4,0,0.6C3.3,5.5,3.5,3.9,3.3,3.6     C3.1,3.7,3.2,4.7,3.1,5.1C3,5.3,2.5,5.4,2.8,5c0-0.5,0.1-1.1-0.1-1.6c0-0.2,0-1.1,0-1c0,0.6-0.2,0.2-0.2,0.5     C2.6,3,2.6,3.1,2.6,3.2c0,0-0.1-0.2-0.1,0c-0.3,0.3-0.2-1.1,0-1.4C2.6,1.5,2.8,1.3,3,1.2C3.1,1,2.9,0.4,3.4,0.6z"
  },
  {
    "man": "M2.2,2.9c0.3,0.2,0.1,0.6,0.4,0.8c0.4,0.5,0.7,0.9,1.3,1c-0.6,0.3-1-0.4-1.4-0.7C1.9,3.8,3.9,5.4,2.9,5.2     C2.8,4.6,2.1,4.3,1.7,3.9c-0.5-0.1-1.2-0.1-1-0.7c0.6-0.4,0-0.3,0-0.4C0.2,2.4,1.2,2.4,1.1,2.7C1.4,2.9,1.8,2.7,2.2,2.9z      M1.4,3.6C1.3,3.5,0.9,3.3,0.9,3.5C0.9,3.7,1.7,3.9,1.4,3.6z M2.1,3.1C2.2,3,1.9,3.1,1.9,3c0,0.1,0.3,0.2,0.3,0.3     C2.3,3.5,2.3,3.3,2.1,3.1L2.1,3.1z",
    "shadow": "M4.3,1.7C4,2.7,3.4,3.9,3.8,4.9c0.5,0.6-0.5,0.2-0.4-0.2c0-0.5,0.1-1,0-1.4c-0.3,0.4,0,2.5-0.7,2     c0.4-0.7,0.2-1.6,0.2-2.5C2.3,2.2,2.2,1.3,3.1,1C3.5,0.9,3,0.7,3.2,0.6C3.1,0,3.8,0.2,3.7,0.7c-0.1,0-0.1,0.2,0,0.3     C4.1,1.1,4.1,1.3,4.3,1.7z M3,2.2c0.1-0.1-0.1-0.3-0.1-0.5c0-0.1-0.1,0.1-0.2,0c-0.1,0,0,0.1-0.1,0.1C2.6,2.1,3,2.6,3,2.2z M4,2     c0.1-0.1,0-0.2-0.1-0.4C3.8,1.9,3.8,2.9,4,2z"
  },
  {
    "man": "M2.6,3.4c0.1,0.1,0.3,0.3,0.1,0.3c-0.1,0.2,1,0.9,0.8,1c0.9,1.1-2-1.5-0.8-0.3c0.1,0.1,0.8,0.5,0.5,0.6     C3.1,5,2.7,5.2,2.8,5c0-0.6-1.2-0.8-1.4-1.4c0,0.1,0.1,0.3,0.1,0.3C1.6,4,1.8,4.2,1.6,4c-0.1,0.1,0.1,0,0.1,0.1     c0,0.1-0.3,0-0.3-0.1C1.3,3.8,0.7,3.2,1,3c0.2-0.2-0.1-0.1-0.2-0.1c0.1,0-0.3-0.3,0-0.3c0.2-0.2,0.4,0.1,0.5,0.2H1.2     c0,0,0,0,0.1,0C1.4,2.8,2.3,2.9,2.6,3.4z M2.5,3.4C2.3,3.3,2.1,3.2,1.8,3.1C2,3.3,2.3,3.4,2.5,3.6C2.5,3.5,2.5,3.5,2.5,3.4z      M2.6,3.6C2.6,3.6,2.6,3.6,2.6,3.6C2.6,3.6,2.6,3.7,2.6,3.6L2.6,3.6z",
    "shadow": "M4.1,2.6c0,0.2,0,0.4-0.2,0.5C3.6,3.4,3.8,4.3,3.7,4.8c-0.2,0,0.1,0.7-0.3,0.4c0-0.4,0-0.9,0-1.3     c0-1.6-0.1,0.6-0.1,1C3.3,5,2.7,5.2,2.7,5C3.5,4.4,2.7,3,3,2.2C2.9,2.3,2.8,2.7,2.8,2.7c0,0.1,0,0.5,0,0.2c-0.1,0,0.1,0.1,0,0.2     C2.4,2.9,3,1.8,3,1.3c0.2-0.2,0.6-0.2,0.1-0.4c0.2,0,0-0.7,0.5-0.4c0.1,0.1,0.1,0.3,0,0.4c0,0.1,0.1,0.2,0,0.1c0,0,0,0,0,0.1     C3.5,1,3.6,1.1,3.7,1.1C4.2,1.3,4.1,2.1,4.1,2.6z M4,2.6c0-0.3,0-0.6-0.1-0.8c-0.1,0.4,0.1,0.7,0.1,1C3.9,2.7,4,2.7,4,2.6z M4,3     c0,0,0-0.1,0-0.1C3.9,2.9,3.9,3,4,3z"
  },
  {
    "man": "M3.8,4.4c0.4,0,0.2,0.1-0.1,0.2C3.2,4.5,2.8,4,2.3,3.8C2.6,4.2,3,4.5,3.5,4.7c-0.1,0.3-1.8-0.8-2-1.1     C1.1,3.8,0.4,3.6,0.8,3c0,0,0,0,0,0c0,0-0.1,0.1,0,0C0.4,2.8,0.6,2.2,1,2.5c0.3,0.1,0.4,0.4,0.7,0.3C2.4,3.3,3.1,4,3.8,4.4z      M1.3,3.6C1.7,3.6,1.1,3.3,1,3.3C0.8,3.6,1,3.5,1.3,3.6z M2.7,3.5C2.7,3.5,2.7,3.5,2.7,3.5C2.7,3.6,2.8,3.6,2.7,3.5z",
    "shadow": "M4,4.9C4.4,5.2,3.9,5.2,3.7,5c0-0.6-0.1-1.2-0.3-1.8c-0.2,0.6-0.1,1.1,0,1.6c0.1,1.6-0.7-1.9-0.5-2.2     C2.1,2.3,2.5,1.6,3,1.2C2.9,1.3,3,1.1,3,1C2.9,0.8,3.4,0.2,3.6,0.6c0.2,0.7-0.2,0.6,0.3,0.9C3.8,2.1,4.1,2.7,4,3.2     C3.8,3.3,4,3.7,4,3.9C4,4.2,3.8,4.7,4,4.9z M2.8,2.4c0.3,0.2,0.2-0.6,0-0.7C2.5,2,2.5,2.1,2.8,2.4z M4,3.1C3.9,3,4,3.1,4,3.1     C4,3.2,4,3.1,4,3.1z"
  },
  {
    "man": "M0.9,2.7C1,2.5,1.4,2.8,1.2,2.8C1.4,3.1,1.4,2.9,1.7,3C2,3.2,2.4,3.5,2.8,3.7c0,0.1-0.1,0.1-0.2,0     c0,0,0.1-0.1,0-0.1c0.1,0.2-0.2-0.1-0.3-0.1c0.4,0.4,0.8,0.8,1.3,1.2c0,0-0.4,0.1-0.2,0.2c0.5,0,0,0.2-0.2,0.1     c-0.7-0.3-1.3-1-2-1.5C0.6,3.2,1.4,2.9,0.9,3c0.1,0-0.1,0-0.1,0c0.1-0.1-0.1,0-0.1,0c0.1,0,0,0,0-0.1c0.1,0,0-0.1,0-0.1     C0.8,2.8,0.7,2.7,0.9,2.7z",
    "shadow": "M3.5,0.6C3.7,0.5,3.8,1.1,3.7,1c0,0.1-0.1,0.2-0.1,0.3C4,1.7,3.9,2.5,4.1,3.1c0,0.1-0.2,0-0.2,0     C3.9,3,4,3,4,3C3.9,3.2,3.9,2.8,3.9,2.7C3.7,3.2,4.1,4.9,3.5,5C3.3,5,3.7,5.2,3.6,5.3C3,5.3,3.3,5.1,3.2,4.9     c-0.3,0,0-1.1-0.1-1.5C2.9,2.6,2.8,1.7,3.3,1.1c0,0-0.1,0-0.1,0c0.1,0,0-0.1-0.1-0.1c0.1,0,0,0,0-0.1c0.1,0,0-0.1,0-0.1     c0.1,0.1,0.1-0.1,0-0.1C3.3,0.7,3.3,0.5,3.5,0.6z"
  },
  {
    "man": "M0.9,2.7c0.1,0,0.2,0.1,0.3,0.1C0.9,2.8,1.4,2.9,1.4,3c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.5,0.4,0.8,0.6     c0.1,0.1,0,0.1,0,0.1c0,0,0-0.1-0.1-0.1c0.3,0.3,0.5,0.9,1,1c0.2,0,0,0.1-0.1,0.1c-0.3,0-0.6-0.5-0.9-0.6C2.3,4.4,3,4.8,3.1,5     c0.2,0.1-0.3,0.2-0.2,0c0-0.3-0.5-0.4-0.7-0.6C1.9,4.3,0.6,3.6,0.9,3.3c0.1-0.1,0-0.1,0-0.1c0-0.1,0-0.1,0,0c0,0,0-0.3-0.1-0.1     C0.6,2.8,0.7,2.7,0.9,2.7z",
    "shadow": "M3.5,0.8c0,0.1,0.1,0.2,0.2,0.2C3.4,0.9,3.8,1.3,3.6,1.4C3.9,1.5,3.9,1.7,4.1,2C3.8,2.1,4.2,3.1,3.9,3.3     c-0.1,0.1,0,0,0-0.1C3.8,3,3.9,3.8,3.7,3.8c0,0.3,0,0.7-0.1,1c0,0.2,0.5,0.4,0,0.4C3.2,5.1,3.7,3.7,3.3,3.8     c-0.2,0.3,0,1.6-0.4,1.4C3,4.7,3,4.1,2.9,3.5C2.8,3,2.5,1.9,3,1.5C3.1,1.5,3,1.4,3,1.4c0.1-0.1,0.1-0.1,0-0.1     c0,0,0.2-0.4,0.1-0.2C3.2,0.8,3.3,0.5,3.5,0.8z"
  },
  {
    "man": "M0.9,2.9c0,0-0.1,0-0.1,0c0.1-0.1,0,0,0,0c0-0.1-0.4-0.4,0.1-0.4c0.2,0,0.3,0.3,0.5,0.2     c0.1-0.2,2,0.8,1.5,0.7c0.1,0-0.3-0.2-0.4-0.2c0.1,0.1,0,0.2-0.1,0.1C2.5,3.7,2.7,4.1,3,4.4c0,0.1,0.6,0.1,0.3,0.2     c-0.1,0,0.1,0.1,0.1,0.1c0.1,0.1-0.1,0.2-0.2,0.1C2.7,4.2,1.5,3.9,1,3.2C1.2,3.5,0.9,3.9,1.1,4c0,0.1-0.2,0-0.2,0.1     C1.1,3.8,0.5,3.1,0.9,2.9z",
    "shadow": "M3.2,1.3c0-0.1-0.1,0-0.1,0c0.1,0,0-0.1,0,0C2.9,0.8,3.4,0.3,3.5,1c0,0.2-0.1,0.2,0.1,0.2     C4.1,1.1,4.5,4.4,4,2.5c0,0.1-0.1,0.2-0.2,0.1C3.7,3.3,3.4,4,3.4,4.7c0,0.1,0.4,0.4,0,0.3C3.5,5.3,3,5.4,3.2,5     C3.1,3.9,2.8,2.8,3,1.8C2.9,2.2,2.2,2.7,2.3,3C2.2,3.1,2.1,2.8,2,3C2.4,2.7,2.7,1.3,3.2,1.3z"
  },
  {
    "man": "M1.5,4C0.9,4.1,0.4,3.7,0.9,3.3C0,2.8,1,2.6,1.4,3c0.1,0.1,1.4,0,0.8,0.6c0.4,0.2,1.5,1.5,1,1.4     C3,4.7,3,4.7,2.7,4.8C3,5,2.9,5.2,2.6,5.2C2.5,5.1,2.7,5,2.5,4.9C2.1,4.9,1.8,4.2,1.5,4z M1.3,3.9C1.6,3.8,1.1,3.6,1,3.6     C0.8,3.8,1,3.8,1.3,3.9z M2.1,3.5c0.2,0,0.1-0.2,0-0.3C2,3.2,1.6,3.1,1.9,3.4C1.9,3.5,2,3.5,2.1,3.5z",
    "shadow": "M2.8,2.8C2.1,2.4,2.4,1.7,3,1.5c0-0.2-0.1-1.1,0.4-0.8c0.2,0.1,0.3,0.4,0.3,0.6c0.1,0.1,0.1,0.1,0,0.1     c0.2,0.2,0.8,0.6,0.5,1C3.5,2.9,3.8,3.9,3.6,4.6c-0.3,0-0.2,0.4-0.2,0.6C3,5.5,3.3,4.8,3.3,4.7C2.7,4.4,3.1,5.4,2.5,5.1     c0-0.2,0.4-0.4,0.1-0.5C2.6,4.1,2.8,3.3,2.8,2.8z M2.7,2.6c0.3,0,0.1-0.5,0.1-0.7C2.5,2.1,2.4,2.3,2.7,2.6z M3.7,2.5     C3.9,2.6,3.9,2.2,4,2.2C3.8,1.6,3.4,2.2,3.7,2.5L3.7,2.5z"
  },
  {
    "man": "M0.7,2.6c0.3-0.4,0.7,0.3,1.1,0.2C2.3,3,2.4,3.4,2.9,3.5c0.1,0,0.6,0,0.2,0.1c0.2,0.1,0.3,0.1,0,0.1     c0.1,0,0.3,0.1,0.1,0.1c0.1,0.1-0.1,0-0.2,0c0.3,0.2-0.6-0.2-0.7-0.3c0.3,0.1,1.7,2,1,1.4C3,4.5,2.7,4.1,2.3,4     c0.3,0.4,0.4,0.7,0.5,1.1c0,0.2-0.3,0.1-0.2,0C2.5,4.5,1.8,4.1,1.4,3.6c-0.2,0-1.3,0.3-1.2,0.2c-0.1,0,0.1-0.1,0.2-0.1     c0.1-0.1-0.3,0-0.1,0c0.3-0.1,0.5,0,0.8-0.1C1,3.4,0.7,3.1,1,3C0.9,2.9,0.6,2.7,0.7,2.6z",
    "shadow": "M3.5,0.5C3.9,0.3,3.9,1,3.9,1.3c0.2,0,0.2,0.1,0.2,0.4c0.2,0.6-0.2,1,0.3,1.4c0.1,0.1,0.2,0.2,0,0.1     c0,0.1,0.2,0.4,0,0.1c0,0.1,0.1,0.3,0,0.1c0.1,0.2-0.2-0.2-0.1-0.1c0,0.3-0.3-0.7-0.3-0.8C4,3.2,3.8,4,3.6,4.7     C3.4,4.8,3.8,5.3,3.4,5.3c-0.2-0.6,0.2-1.4,0-2C3.5,3.6,2.5,6,2.6,5C3.1,4.2,2.8,3.2,3,2.3C2.7,2.4,2.4,2,2.2,2.1     C2.1,2.2,1.7,1.9,1.9,1.9C1.8,1.8,2.2,2,2.2,1.9C1.9,1.7,2.4,1.9,2.5,2c0.1,0,0.4,0.2,0.3,0c0.1-0.4,0.1-0.7,0.4-0.8     C3.3,1,3.2,0.6,3.5,0.5z"
  },
  {
    "man": "M4,4.6c0.3,0.5-1.6-0.7-1.8-0.7C2.4,4.2,4,5.4,2.7,4.7C2.1,4.3,1.6,3.9,1.2,3.4C0.8,3.8,0.7,3.3,0.7,2.9     C0.4,2.7,1,2.6,1.2,2.8C1.4,2.8,1,3,1.4,2.9C2.2,2.8,2.9,4.3,4,4.6z M1,3L1,3C0.7,2.9,0.8,3.3,1,3z M2.1,3.3c0,0-0.1-0.1-0.2-0.1     C2,3.3,2.1,3.4,2.2,3.5C2.2,3.4,2.1,3.4,2.1,3.3z",
    "shadow": "M4.1,5.1C4,6,3.5,3.3,3.4,3.1c-0.1,0.3,0,3.1-0.3,1.7c-0.2-0.9-0.2-2-0.1-2.9c0-0.1,0-0.1-0.1,0     C2.3,2.1,3,1.1,3.1,0.9C3,0.8,3.3,0.5,3.4,0.7c0.1,0.1,0.4,0.5,0.1,0.5C3.5,1.4,4,1.3,4,1.5C4,2.7,3.7,3.9,4.1,5.1z M3.2,1.3     L3.2,1.3C3.2,1.1,3,1.2,3,1.4C3.1,1.4,3.1,1.4,3.2,1.3z M3.8,2.3c0-0.1,0-0.2,0-0.2c0,0.2-0.1,0.4,0,0.5C3.8,2.5,3.8,2.4,3.8,2.3     z"
  },
  {
    "man": "M0.9,2.6C1,2.4,1.5,3,1.5,2.8c0.7,0,1.1,0.8,1.7,1.1C2.4,4,4.3,4.6,3.5,4.8C3.4,4.5,3,4.3,2.7,4.2     c0.1,0.2,1.1,0.7,0.5,0.7C3.1,4.5,3.1,4.7,2.7,4.5C2.4,4.1,2.5,4.4,2.1,4.3C1.9,4,1.6,3.9,1.5,3.6C1.4,3.9,1.2,3.7,1.1,3.8     c0.1-0.1,0-0.2-0.1-0.3C0.9,3.3,0.8,3.3,0.9,3.1c0-0.1-0.2,0,0,0C0.8,3.1,0.8,3,0.7,2.9c0,0,0,0.1,0,0.1C0.6,2.8,0.6,2.5,0.9,2.6     z",
    "shadow": "M3.5,0.6c0.3-0.1,0.1,0.9,0.3,0.8c0,0,0.1,0,0,0.1c0.6,0.5,0,1.4,0.3,2.1c0.2,0.5-0.3,0-0.3,0.4     c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.5,0.3-0.3,0c0.3-0.4,0.1-0.8-0.1-1.2c0,0.2,0.2,1.7-0.3,1.3c0.2-0.5,0.2-0.3,0-0.9     c0-0.3,0-0.4-0.2-0.4C2.9,3.4,2.8,2.9,3,2.5C2.9,2.6,2.8,2.6,2.7,2.5c0-0.2,0-0.1-0.1-0.1c0.2-0.1,0.1,0,0.2-0.3     c0-0.3,0-0.6,0.3-0.8c0.1-0.1-0.2-0.2,0,0c-0.1-0.1,0-0.2,0-0.4C3,1,3,1,3,1.1C3,0.9,3.2,0.4,3.5,0.6z"
  },
  {
    "man": "M2.2,3.1c0.2,0,0.2,0.4,0.1,0.5c0.4,0.3,0.7,0.7,1,1.1c0,0.1,0.5,0.2,0.2,0.3C3.1,4.9,2,3.6,2.5,4.6     c0,0.2,0.2,0.3,0.4,0.4c0.1,0.2-0.2,0.1-0.2,0c-0.4-0.4-0.7-1-1.2-1.2C0.9,3.8,0.6,4,0.8,3.4c0.1-0.1,0.1-0.2,0-0.2     C0.1,2.5,1.1,2.8,1.4,3l-0.1,0C1.5,3.1,1.9,3,2.2,3.1z M1.4,3.8c-0.2,0-0.3-0.1-0.4,0C0.9,3.8,1.5,3.9,1.4,3.8z M2.1,3.2     C1.8,3.2,2,3.4,2.1,3.5C2.2,3.5,2.1,3.3,2.1,3.2z",
    "shadow": "M4.2,1.9c0.2,0.2-0.2,0.6-0.4,0.7c0.1,0.8-0.4,1.7-0.2,2.5C3,5.8,3.8,3.4,3.2,3.7C3.1,4.2,2.8,4.3,2.9,4.9     C2.9,5.1,2.6,5.4,2.6,5c0.2-0.8,0.2-1.5,0.3-2.3C2.6,2.5,2.2,2.1,2.6,1.8c0.6-0.5,0.5-2.1,1.1-0.5L3.6,1.3c0,0.2,0.3,0.2,0.3,0.5     c0,0.1,0.1,0,0.1,0.1C4.2,1.8,4.2,1.9,4.2,1.9z M3,2.4C2.8,2.3,2.9,2.1,2.7,2.1C2.5,2.2,2.9,2.7,3,2.4L3,2.4z M4,2.1     C3.9,2,3.7,2.2,3.8,2.4C3.7,2.7,4,2.2,4,2.1z"
  },
  {
    "man": "M4,4.6C3.5,5,3,3.8,2.3,4C2.4,4.5,2.9,4.6,3,5c0.2,0.6-0.9-0.7-1.1-0.7C1,3.7,0.9,3.9,0.6,3.1     c0-0.7,0.5-0.5,0.8,0c0.3,0,0.9-0.1,1,0.3c0,0.4,0,0.3,0.4,0.5C3.3,3.9,3.5,4.4,4,4.6z M2.1,3.5C2.2,3.3,2,3.2,1.8,3.2     C2,3.3,1.8,3.4,2.1,3.5z",
    "shadow": "M4.2,5C4,5.3,3.6,4.6,3.8,4.5c0.1-1.2-0.8-1.4-0.7-0.1c0,0,0.1,0.5-0.1,0.6C2.6,6.1,2.9,3.8,2.8,3.5     C2.7,2.5,2.3,1.8,3,1L2.9,1c0.5-0.8,0.9-0.5,0.6,0.4c0.3,0.2,0.8,0.6,0.5,1C3.8,2.9,3.5,2.5,3.9,3.2C4.4,3.7,3.9,4.4,4.2,5z      M3.7,2.5C3.9,2.4,4,2,3.8,1.9C3.8,2.1,3.6,2.3,3.7,2.5z"
  },
  {
    "man": "M0.8,2.6C1.3,2.5,2,2.9,2.2,3.4C2.5,3.6,2.8,3.8,2.9,4c0,0.1,1.4,0.9,0.7,0.8C3.3,4.5,2.9,4.3,2.5,4.1     c0.3,0.2,0.4,0.5,0.6,0.7C3,4.9,2.8,5.3,2.7,5c0.1-0.6-1-0.7-1.2-1.3C1.4,3.6,1,3.9,1,3.5C1.2,3.1,0.5,2.8,0.8,2.6z",
    "shadow": "M3.5,0.5C4,0.5,3.9,1.2,4,1.4c0.3,0.2,0,0.7-0.1,0.9c0,0.5,0.1,0.9,0,1.3C3.8,3.9,4,4.3,3.9,4.6     C3.8,6.4,3.6,4,3.4,3.6C3.5,4,3.1,4.4,3.2,4.8C3.1,4.9,2.9,5.2,2.7,5.1C2.8,4.6,3,4.9,3,4.2c0-0.6-0.3-1.3,0-1.8     c-0.6,0-0.2-0.7,0-0.9C3,1.4,3.2,1.3,3.2,1.1C3.2,0.9,3.2,0.5,3.5,0.5z"
  },
  {
    "man": "M0.6,2.7c0.2-0.1,0.7,0,0.5,0.2c0.6-0.1,1.3,0.5,1.8,0.7c0.1,0.1-0.1,0.1-0.2,0c-0.1-0.1,0,0.1-0.1,0     C2.5,3.5,2.1,3.5,1.8,3.3C4.5,4.6,2,3.7,3.6,4.9C3.4,5.4,2.9,4.1,2.5,4.5c0.2,0.1,0.3,0.3,0.4,0.4C3,4.9,3.2,5,3.1,5     C3,5.2,2.7,5.4,2.8,5.1c0-0.1,0.1-0.2-0.1-0.3C2,4.5,1.7,4,1.2,3.5c0.1,0.1,0.2,0.4,0.3,0.5c0.1,0,0.3,0.2,0.1,0.1     c0,0.1,0.2,0.2,0,0.1c0.1,0.1,0,0-0.1,0C1.4,4.2,1.1,3.7,0.9,3.5c-0.2,0-0.1-0.2,0-0.3C1.1,3,0.7,3.1,0.7,3     C0.6,3,0.5,2.8,0.6,2.7z",
    "shadow": "M3.3,0.6c0.3-0.1,0.5,0.5,0.2,0.6C3.4,1.4,3.8,1.3,3.9,1.5C4,1.7,3.9,2,4,2.2C4.1,2.5,4.3,3.8,4.1,3     C4.1,3.2,4,3.1,4,3c0.1-0.3-0.3-0.7-0.3-1c0.9,3.1-0.3,0.9-0.1,3.2C3,5.7,3.9,3.7,3.1,4c0.1,0.3-0.1,0.6,0,1     c0,0.2-0.8,0.5-0.4,0.1C2.9,4.9,3,4.7,2.9,4.4C2.8,4.2,3,4,2.8,3.9C2.8,3.4,3,2.6,3,2c0,0.3-0.3,0.7-0.2,1.1c0,0.1,0,0.2-0.1,0     c-0.1,0,0,0.5-0.1,0.2c0,0.2-0.1,0-0.1-0.1c0.2-0.4,0-1.6,0.6-1.9C3.4,1.2,3,1.1,3.1,0.9C3,0.8,3.1,0.6,3.3,0.6z"
  },
  {
    "man": "M2.5,2.9c0.5,0.4-0.7,0.5,0,0.7c0.6,0.1,0.6,0.6,1,1c0.9,0,0.2,0.2-0.2,0.2C3.3,4.9,3.1,5,3,5     c0-0.2,0-0.2-0.2-0.3C2.1,4.4,1.7,4,0.9,3.8C-0.4,3.8,1,2.9,0.5,3C0.2,2.5,0.9,2.5,1.3,2.7H1.2c0.1,0,0.1,0,0.2,0l-0.1,0     C1.7,2.7,2.1,2.8,2.5,2.9z M0.9,3.3c-0.2-0.1,0,0.3,0,0.3C1.2,3.8,1,3.5,0.9,3.3z M2.8,4.2C2.7,4,2.2,4,2,3.9     c0.3,0.3,0.8,0.6,1.2,0.9C3.1,4.6,2.9,4.4,2.8,4.2z M2.2,3.3C2.1,3.1,2,3,1.8,3C1.8,3.1,2.2,3.5,2.2,3.3z",
    "shadow": "M4.4,2.1C4.5,2.8,3.5,2.3,3.7,3c0.4,0.7-0.2,1.3-0.1,1.9c0.8,0.5-0.1,0.4-0.4,0.2c0,0.1-0.3,0.2-0.3,0     C3.1,4.9,3.2,4.9,3,4.7C2.7,3.9,2.8,2.9,2.3,2.2c-0.6,0-0.1-0.8,0.3-0.9C2.7,1.2,3,1.2,2.9,0.9L2.8,1C3,0.3,3.5,0.4,3.7,1.1     L3.6,1c0,0.1,0.1,0.1,0.2,0.1l-0.1,0C4.1,1.4,4.3,1.7,4.4,2.1z M2.8,1.7c0-0.3-0.2,0.4-0.3,0.5C2.7,2.6,2.8,1.9,2.8,1.7z      M3.5,4.1c0.2-0.3-0.2-0.7-0.3-1c-0.1,0.6,0,1.3,0.1,1.8C3.4,4.6,3.3,4.3,3.5,4.1z M3.9,2.4c0-0.2,0-0.4-0.1-0.7     C3.8,1.9,3.7,2.7,3.9,2.4z"
  },
  {
    "man": "M2.3,3c0.1,0.1,0,0.5,0,0.6c0.3,0.3,0.9,1,1,1.2c0.5,0.1,0,0.3-0.1,0.1C2.8,4.6,2.6,4.3,2.2,4     c0.1,0.6,0.6,0.7,1,1C3,5.1,2.5,5.5,2.7,5.1c-0.1-0.1,0,0.1-0.1,0c0.1-0.3-0.3-0.3-0.5-0.5C1.9,4.4,1.7,4.2,1.5,4     C0,3.6,1,3.7,0.5,2.7c0.3-0.3,0.7,0.1,0.9,0.2C1.6,3,2,2.9,2.3,3z M1.4,3.8C1.1,3.6,0.9,3.3,0.9,3.7C1.1,3.7,1.3,3.9,1.4,3.8z      M1.5,3.9C1.5,3.9,1.4,3.9,1.5,3.9C1.4,3.9,1.5,3.9,1.5,3.9L1.5,3.9z M2.1,3.2c0-0.1-0.2,0-0.3,0C1.5,3.1,2.4,3.9,2.1,3.2     L2.1,3.2z",
    "shadow": "M4.3,1.9c-0.7,0.9-0.7,2-0.8,2.9c0.3,0.5-0.3,0.4-0.2,0c0-0.5,0.1-1.1,0-1.6c-0.6,0.8,0.2,2-0.4,1.9     C2.7,5.3,2.3,5.2,2.5,5c0.1,0,0.2-0.1,0.2-0.2c0,0.1-0.2,0.2-0.1,0c0.3-0.4-0.2-1.4,0.1-2.1C2.7,2.4,2.1,2,2.5,1.6     C3,1.2,2.9,0.9,3.2,0.4C3.6,0.3,3.6,1,3.6,1.2C3.9,1.4,4.1,1.6,4.3,1.9z M2.8,2.4c0-0.5,0-0.8-0.3-0.4C2.6,2.1,2.7,2.5,2.8,2.4z      M2.8,2.6C2.8,2.6,2.8,2.6,2.8,2.6C2.8,2.6,2.8,2.6,2.8,2.6z M4,2c0-0.1-0.2-0.2-0.3-0.2C3.4,2.1,3.7,2.9,4,2z"
  },
  {
    "man": "M2.5,3.4c0.1,0.1,0.3,0.3,0.1,0.3c-0.1,0.2,1,0.9,0.8,1c0.9,1.1-2-1.5-0.8-0.3c0.1,0.1,0.8,0.5,0.5,0.6     C3.1,5,2.7,5.3,2.8,5c0-0.6-1.2-0.8-1.4-1.4c0,0.1,0.1,0.3,0.1,0.3c0.1,0,0.2,0.2,0.1,0.1c0,0-0.1,0,0,0C1.9,4.2,1.4,4.2,1.4,4     C1.3,3.8,0.7,3.2,1,3.1c0.2-0.2-0.1-0.1-0.2-0.1c0.1,0-0.3-0.3,0-0.3c0.2-0.2,0.4,0.1,0.5,0.2H1.2c0,0,0,0,0.1,0     C1.4,2.8,2.3,3,2.5,3.4z M2.4,3.5C2.3,3.3,2.1,3.2,1.8,3.1C2,3.3,2.3,3.4,2.5,3.6C2.5,3.5,2.5,3.5,2.4,3.5z M2.6,3.6     C2.6,3.6,2.6,3.6,2.6,3.6C2.6,3.6,2.6,3.7,2.6,3.6L2.6,3.6z",
    "shadow": "M4.1,2.6c0,0.3,0,0.5-0.3,0.5C3.6,3.8,3.9,4.8,3.6,5.3c-0.4,0,0-1.1-0.2-1.4c0-1.6-0.1,0.6-0.1,1     C3.3,5,2.7,5.2,2.7,5c0.8-0.6-0.1-2,0.3-2.8C2.9,2.3,2.8,2.8,2.8,2.7c0,0.1,0,0.5,0,0.2C2.6,3,2.8,3,2.7,3.1C2.4,2.9,3,1.8,3,1.3     c0.2-0.2,0.6-0.2,0.1-0.4c0.2,0,0-0.7,0.5-0.4c0.1,0.1,0.1,0.3,0,0.4c0,0.1,0.1,0.2,0,0.1c0,0,0,0,0,0.1C3.5,1,3.6,1.1,3.7,1.1     C4.2,1.3,4.1,2.1,4.1,2.6z M4,2.6c0-0.3,0-0.6-0.1-0.8c-0.1,0.4,0.1,0.7,0.1,1C3.9,2.7,4,2.7,4,2.6z M4,3c0,0,0-0.1,0-0.1     C3.9,2.9,3.9,3,4,3z"
  },
  {
    "man": "M2.3,3.1c0.2,0.1,0,0.4-0.1,0.5c0.4,0.3,0.9,0.8,1,1.1C3.3,4.8,3.7,4.9,3.5,5C3,4.8,2.7,4.3,2.2,4.1     c-0.2-0.1,0,0.4,0,0.5c0.2,0.1,0.3,0.2,0.4,0.3C2.6,4.8,2.8,5,2.8,5c0.5,0.1-0.5,0.4-0.4,0.2C2.9,5,2.1,4.7,1.9,4.6     C1.6,4,1.2,3.2,0.5,3.7C0.3,3.6,0.6,3.3,0.5,3.2C0.4,3.1,0.6,3,0.7,3c0.2-0.1-0.1,0.3,0,0.4C1,3,1.1,3.2,0.6,2.9     C0.3,2.6,1,2.6,1.2,2.8c0,0,0,0,0,0c0,0,0,0,0,0c-0.1,0,0,0,0,0c0,0,0,0,0,0C1,2.9,1.2,2.9,1.2,3c0,0,0,0-0.1,0c0,0,0,0,0,0     c0,0,0,0,0,0C1.5,3,1.9,2.9,2.3,3.1z M2.2,3.2L2.2,3.2C1.5,3,2.3,3.9,2.2,3.2z",
    "shadow": "M4.3,2c0.1,0.3-0.4,0.5-0.5,0.6c0.1,0.6-0.2,1.2-0.2,1.9C3.6,4.6,3.4,4.7,3.5,4.9c0.2,0.8-0.4,0.3-0.1-0.3     C3.3,4.2,3.5,2.9,3.1,3.4C2.7,4,3,4.5,2.9,5.1c-0.1,0-0.8,0.1-0.5-0.2C2.8,5,2.6,4.5,2.6,4.3C2.3,3.5,3.1,2.7,2.8,1.9     c-0.1-0.1-0.5,0.3-0.6,0C2.4,1.6,2.7,0.8,3,1c0.2,0-0.4,0.3-0.4,0.5c0.2-0.2,0.8-0.1,0.5-0.5C2.9,0.4,3.7,0.3,3.6,1     c0-0.1,0,0,0,0c0-0.1,0,0,0,0c0-0.1,0,0.1,0,0l0,0c0-0.1,0,0.1,0,0.1c0,0,0-0.1,0-0.1c0,0,0,0,0,0.1c0,0,0,0,0-0.1     C3.5,1.4,4.1,1.5,4.3,2z M4.1,2.1L4.1,2.1C3.7,1.5,3.5,3.1,4.1,2.1L4.1,2.1z"
  },
  {
    "man": "M2.3,3c0.3,0.2-0.8,0.3,0,0.6c0,0.4,1.5,1.1,1.2,1.3C3,4.7,2.6,4.2,2.1,4c0.3,0.4,0.6,0.7,1.1,1     C2.6,5.1,1.8,4.1,1.3,3.8C1,3.6,0.2,4.2,0.7,3.3C0.7,3.3,1,3.1,0.7,3.1C0,2.8,1.1,2.4,1.1,3C1.5,2.9,1.9,2.9,2.3,3z M1,3.7     c0.1,0,0.1,0,0.2,0c-0.1,0-0.2-0.2-0.3-0.1C0.8,3.7,0.6,3.7,1,3.7z M2,3.1c0,0-0.2,0-0.2,0.1C1.8,3.4,2,3.2,2,3.1z",
    "shadow": "M4.3,2c0.1,0.3-0.4,0.2-0.6,0.3c0,0.9,0,1.9,0,2.9c-0.4,0.2-0.2-1.6-0.4-2C3,3.6,3.3,6,2.9,5     c0-0.8-0.1-1.7-0.1-2.5C2.9,2.2,2,2.4,2.2,2C2.4,1.8,2.7,1.5,3,1.4c0.1-0.1-0.1-0.2-0.1-0.3C2.9,0.3,3.8,0.8,3.4,1.4     C3.7,1.5,4,1.7,4.3,2z M2.6,2.2c0.3,0.2,0.1-0.1,0.1-0.3C2.6,2.1,2.3,2.1,2.6,2.2z M4,2.1C4,2,3.7,2,3.7,2.1     C3.6,2.3,3.9,2.2,4,2.1L4,2.1z"
  },
  {
    "man": "M1.6,3c0.9,0.3,1.2,1.2,2,1.7c0.1,0,0.3,0,0.3,0.1C3.4,4.9,3,4.3,2.5,4.1c0.1,0.2,1.4,1.2,0.6,0.8     C2.5,4.5,1.8,4,1.2,3.7C0.8,3.4,1.1,3.2,0.9,3.3c0.1-0.1,0-0.1-0.1-0.1c0-0.1,0-0.1-0.1-0.2C0.5,2.6,1.1,2.7,1.4,2.8H1.3     C1.4,2.8,1.5,2.9,1.6,3z",
    "shadow": "M3.9,1.5c0.4,0.9,0,1.8,0,2.6c0,0.3,0.1,0.8,0.1,1.1C3.4,5.3,3.6,3.9,3.5,3.6c-0.2,0.3,0.2,2-0.3,1.7     c-0.1-1-0.2-2.1-0.4-3c0-0.1,0-0.2,0-0.3c0-0.2,0.3-0.5,0.1-0.4c0.2-0.4,0.3-1.4,0.9-0.5L3.8,1C3.8,1.2,3.8,1.3,3.9,1.5z"
  },
  {
    "man": "M0.1,3.3c0.8-0.1,0,0.1,0.7,0.2c0.2,0-0.3-0.4,0-0.5C1,3,0.8,2.9,0.7,3c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0     C0.2,2.6,1,2.4,1.1,2.7C1,2.8,1.2,2.9,1.3,2.9C1.7,2.6,2,3.3,1.9,2.8c-0.1-0.1,0-0.1,0-0.2c-0.1-0.1,0-0.1,0,0c0,0-0.1-0.1,0-0.1     C2,2.5,2,2.6,2.1,2.6c0,0,0-0.1,0.1-0.1c0.1,0,0,0.1,0,0.2C1.9,2.8,2.5,3.3,2,3.3c0.6,0.4,1.3,1,1.7,1.5C3.6,5.4,2.6,4,2.2,4     c0.3,0.3,0.6,0.6,0.9,1c0.1,0.7-1.6-1-1.8-1.2c-0.2-0.3-0.1-0.2-0.2,0C0.7,3.7,0.4,3.5,0.1,3.3z",
    "shadow": "M2.2,1c0.1-0.1,0,0.2,0.1,0.1c0,0,0.1-0.1,0.1,0c0,0.2,0.1,0.1,0.2,0.1c-0.1,0.1-0.1,0.3,0,0.5c0,0,0,0,0,0     c0.1,0.2,0.1,0,0.2-0.3c0-0.4,0.5-0.1,0.4-0.4C2.6,0.4,3.7-0.2,3.6,0.7C3.2,1.2,4,0.9,4,1.6c0.1-0.1,0.5-0.9,0.4-0.6     c0.1-0.2,0.1-0.3,0.1,0c0.1,0,0.1-0.2,0.2-0.1C4.8,1,4.5,1.2,4.4,1.2C4.2,1.4,4.2,2.3,3.8,2.1C3.9,2.3,3.9,6.4,3.3,5     c0.1-0.6,0.1-1.2,0-1.8c-0.4,4-0.8,0.9-0.5-0.9c0-0.2,0.1-0.4-0.1-0.2C2.3,2,2.3,1.3,2.2,1z"
  }
];
let vp = 300;
const App$2 = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $zeds, $$unsubscribe_zeds;
  let { animation, height, width: width2, padding, data } = $$props;
  let pitches = Math.ceil(187 / data.LA.DENSITY.DENSITY11);
  let people = data.LA.DENSITY.DENSITY11 / 187;
  let mostPeople = Math.ceil(data.COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.highest.PEOPLE_PER_FOOOTY_PITCH);
  let leastPeople = data.COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.PEOPLE_PER_FOOOTY_PITCH;
  console.log("PEOPLE", people);
  let intersect = import_line_intersect.checkIntersection;
  let peopleHere = people;
  pitch.forEach((e) => {
    e.order = 1;
  });
  let tempPitch = (i) => {
    let x2 = JSON.parse(JSON.stringify(pitch));
    x2.forEach((e) => {
      e.y1 = e.y1 - 750 * i;
      e.y2 = e.y2 - 750 * i;
      e.order = i + 1;
    });
    return x2;
  };
  let newPitch = JSON.parse(JSON.stringify(pitch)).concat(tempPitch(1)).concat(tempPitch(2)).concat(tempPitch(3)).concat(tempPitch(4)).concat(tempPitch(5)).concat(tempPitch(6)).concat(tempPitch(7)).concat(tempPitch(8)).concat(tempPitch(9)).concat(tempPitch(10));
  let points = [];
  let zeds = tweened([]);
  $$unsubscribe_zeds = (0, import_index_cf0e86af.d)(zeds, (value) => $zeds = value);
  for (let i = 0; i < 100; i++) {
    $zeds.push(0);
    points.push({
      x: Math.random() * 1e3 - 500,
      y: Math.random() * -500 - 25,
      scale: 1,
      order: i + 1,
      z: $zeds[i]
    });
  }
  function changePeople(count) {
    let peopleAtStart = people;
    if (peopleAtStart == count)
      return;
    if (count < 1) {
      let addPitches = setInterval(function() {
        let numberPitches = Math.ceil(1 / count);
        if (pitches == numberPitches) {
          clearInterval(addPitches);
        }
        if (pitches < numberPitches)
          pitches++;
        if (pitches > numberPitches)
          pitches--;
      }, 100);
    }
    if (count >= 1) {
      let numberPitches = Math.ceil(1 / count);
      let removePitches = setInterval(function() {
        if (pitches == numberPitches) {
          clearInterval(removePitches);
        }
        if (pitches > numberPitches)
          pitches--;
      }, 100);
    }
    let addPeople = setInterval(function() {
      let currentPeople = Math.ceil(people);
      if (currentPeople == Math.round(count)) {
        clearInterval(addPeople);
      }
      if (people < Math.round(count))
        people++;
      if (people > Math.round(count))
        people--;
    }, 500 / (peopleAtStart - count));
  }
  let h = vp;
  let h_orig = pitch[0].y1 * -1;
  newPitch.forEach((e) => {
    e.x1 = e.x1 + 0.5;
    e.x2 = e.x2 + 0.5;
    e.y1 = e.y1 - 0.5;
    e.y2 = e.y2 - 0.5;
  });
  let project = (x2, y2) => intersect(0, 0, -h_orig / y2 * x2, -h, 0, -vp, x2, 0).point;
  newPitch.forEach((e) => {
    e.x1 = project(e.x1, e.y1).x;
    e.y1 = project(e.x1, e.y1).y;
    e.x2 = project(e.x2, e.y2).x;
    e.y2 = project(e.x2, e.y2).y;
  });
  points.forEach((e) => {
    let eX = e.x, eY = e.y;
    e.x = project(e.x, e.y).x;
    e.y = project(e.x, e.y).y;
    e.scale = e.x / eX;
    e.skew = Math.atan2(eY + e.y, e.x - eX) * 180 * Math.PI;
  });
  console.log(points);
  let stepPrev = -1;
  function change(step2) {
    console.log(step2);
    if (step2 != stepPrev) {
      if (step2 == 9) {
        changePeople(peopleHere);
      }
      if (step2 == 10) {
        changePeople(mostPeople);
      }
      if (step2 == 11) {
        changePeople(leastPeople);
      }
      stepPrev = step2;
    }
    return step2;
  }
  function testData() {
    console.log(data);
    return true;
  }
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  animation && change(animation);
  $$unsubscribe_zeds();
  return `${peopleHere && testData ? `<svg style="${"width:" + (0, import_index_cf0e86af.e)(width2)}"${(0, import_index_cf0e86af.a)("width", width2, 0)}${(0, import_index_cf0e86af.a)("height", height, 0)} viewBox="${(0, import_index_cf0e86af.e)(-width2 / 6) + "\n  " + (0, import_index_cf0e86af.e)(-height / 2) + "\n  " + (0, import_index_cf0e86af.e)(width2 / 3) + "\n  " + (0, import_index_cf0e86af.e)(h_orig)}"><rect${(0, import_index_cf0e86af.a)("x", -width2 / 2, 0)}${(0, import_index_cf0e86af.a)("y", -height / 2, 0)}${(0, import_index_cf0e86af.a)("width", width2, 0)}${(0, import_index_cf0e86af.a)("height", height, 0)} fill="${"#40826D"}" fill-opacity="${"0.7"}"></rect><g transform="${"scale(" + (0, import_index_cf0e86af.e)(width2 / 1500) + ")"}">${(0, import_index_cf0e86af.f)(newPitch, (params) => {
    return `<line${(0, import_index_cf0e86af.o)([
      (0, import_index_cf0e86af.p)(params),
      { stroke: "white" },
      {
        "stroke-width": (0, import_index_cf0e86af.q)(1 / params.order * 3)
      },
      { "stroke-opacity": "1" },
      {
        visibility: (0, import_index_cf0e86af.q)(params.order > pitches ? "hidden" : "visible")
      }
    ], {})}></line>`;
  })}${(0, import_index_cf0e86af.f)(points, (point, i) => {
    return `
      <g class="${"shadow"}" transform="${"translate(" + (0, import_index_cf0e86af.e)(point.x - 14) + ", " + (0, import_index_cf0e86af.e)(point.y - 25.5) + ") scale(" + (0, import_index_cf0e86af.e)(6 * point.scale) + ")"}"><path${(0, import_index_cf0e86af.a)("d", folk[i % 45].shadow, 0)} fill="${"#40826D"}" transform="${"rotate(-10 50 100) translate(15 -5) skewX(40) scale(1 0.5)"}"${(0, import_index_cf0e86af.a)("visibility", point.order > people + 2 || $zeds[i] != 0 ? "hidden" : "visible", 0)}></path></g>`;
  })}${(0, import_index_cf0e86af.f)(points, (point, i) => {
    return `
      <g class="${"person"}" transform="${"translate(" + (0, import_index_cf0e86af.e)(point.x - 14) + ", " + (0, import_index_cf0e86af.e)(point.y - 25.5) + ") scale(" + (0, import_index_cf0e86af.e)(6 * point.scale) + ")\n        translate(" + (0, import_index_cf0e86af.e)(0) + ", " + (0, import_index_cf0e86af.e)($zeds[i]) + ") "}"><path${(0, import_index_cf0e86af.a)("d", folk[i % 45].shadow, 0)} fill="${"black"}"${(0, import_index_cf0e86af.a)("visibility", point.order > people + 2 ? "hidden" : "visible", 0)}></path></g>`;
  })}</g></svg>
<text x="${"100"}" y="${"500"}">step:${(0, import_index_cf0e86af.e)(animation)},   ${(0, import_index_cf0e86af.e)(pitches)} pitches, ${(0, import_index_cf0e86af.e)(people)} people,  most:${(0, import_index_cf0e86af.e)(mostPeople)},  least:${(0, import_index_cf0e86af.e)(leastPeople)}  here:${(0, import_index_cf0e86af.e)(peopleHere)}</text>` : ``}`;
});
var rankings = [
  [
    "E09000030",
    37.25030180942788,
    34.3587331743903,
    32.365540819604426,
    31.450180246835842,
    184,
    3,
    1,
    0
  ],
  [
    "E09000025",
    35.76783212436224,
    34.1285997077815,
    32.26896742584203,
    31.78820977713128,
    68,
    2,
    0,
    1
  ],
  [
    "E09000012",
    36.09078402103199,
    34.52879480049435,
    33.42950961927207,
    32.87753278921509,
    87,
    7,
    2,
    2
  ],
  [
    "E08000003",
    37.418064250788284,
    36.59643062680772,
    35.543000104375366,
    33.728437352795616,
    193,
    47,
    11,
    3
  ],
  [
    "E09000002",
    38.52824001664731,
    38.125169646647784,
    36.567736642082856,
    33.93843021660902,
    268,
    150,
    30,
    4
  ],
  [
    "E06000039",
    35.399675338103314,
    34.83867913810732,
    35.33110622107624,
    33.98742912164331,
    50,
    8,
    9,
    5
  ],
  [
    "E09000022",
    36.84012688764832,
    35.44080887458441,
    34.13481877510229,
    34.21578363896716,
    148,
    12,
    3,
    6
  ],
  [
    "E09000028",
    38.08131162861666,
    36.19873387602326,
    34.63896863935049,
    34.248230037844756,
    233,
    32,
    5,
    7
  ],
  [
    "E09000014",
    36.53055156656353,
    35.514702973234954,
    34.57234274471043,
    34.67533715666507,
    125,
    14,
    4,
    8
  ],
  [
    "E07000178",
    38.000458566597246,
    37.99417363741224,
    35.93722066622966,
    34.80461601253407,
    230,
    139,
    20,
    9
  ],
  [
    "E09000031",
    37.92596519024208,
    36.68621158027288,
    35.604665115597406,
    34.94796688467332,
    225,
    53,
    12,
    10
  ],
  [
    "E09000032",
    37.90302566582885,
    37.01682678023175,
    35.24410289497738,
    34.97917718529618,
    223,
    61,
    8,
    11
  ],
  [
    "E09000019",
    37.50980877647417,
    36.463998154062885,
    35.230101483571495,
    35.022377198302,
    201,
    44,
    7,
    12
  ],
  [
    "E09000023",
    37.90196699406518,
    36.64504530636454,
    35.22831357488059,
    35.05472388857676,
    222,
    51,
    6,
    13
  ],
  [
    "E09000011",
    36.9338584252959,
    36.64078979051288,
    36.26127681012044,
    35.07645635358682,
    161,
    50,
    25,
    14
  ],
  [
    "E09000013",
    38.31914614076092,
    36.7703465273195,
    35.68478602894903,
    35.24465321957555,
    252,
    55,
    14,
    15
  ],
  [
    "E06000032",
    34.24182638105975,
    34.46250385912589,
    35.42018094344433,
    35.25810650538137,
    19,
    5,
    10,
    16
  ],
  [
    "E06000018",
    37.32092667834644,
    37.32883781999226,
    36.39719157096733,
    35.296421093954464,
    187,
    80,
    26,
    17
  ],
  [
    "E06000016",
    36.26859363517559,
    36.27481117810812,
    35.956314460151255,
    35.31202344173976,
    104,
    35,
    22,
    18
  ],
  [
    "E09000005",
    36.30264200056518,
    35.79346775023146,
    35.860358000933715,
    35.534606301110166,
    109,
    20,
    16,
    19
  ],
  [
    "E09000018",
    36.85717983384179,
    36.36304593511647,
    35.910383934290344,
    35.7488570899798,
    149,
    37,
    18,
    20
  ],
  [
    "E08000025",
    36.70811650349019,
    36.925326286807746,
    36.46317106495341,
    35.77964344458993,
    139,
    59,
    27,
    21
  ],
  [
    "E06000038",
    36.18276694578571,
    36.50645576790273,
    36.191566904976554,
    35.8478593173965,
    93,
    46,
    24,
    22
  ],
  [
    "E09000009",
    36.75835483419516,
    36.404224052431,
    36.1298206322729,
    35.941522947327364,
    144,
    40,
    23,
    23
  ],
  [
    "E07000008",
    38.522256877157176,
    38.720671576039074,
    36.51571801278754,
    36.04686881897519,
    267,
    201,
    29,
    24
  ],
  [
    "E09000026",
    38.49869172852032,
    38.12746996260245,
    37.468697357503835,
    36.11906298168262,
    265,
    151,
    50,
    25
  ],
  [
    "E09000007",
    39.38594040968343,
    38.341038698927505,
    35.75607643710957,
    36.20399114088355,
    294,
    174,
    15,
    26
  ],
  [
    "E09000010",
    38.14844518585055,
    37.70122991100044,
    37.36505949225961,
    36.38002214640953,
    237,
    117,
    45,
    27
  ],
  [
    "E06000042",
    31.521810542708597,
    33.374411614586286,
    35.64585144402589,
    36.56145381619719,
    1,
    0,
    13,
    28
  ],
  [
    "E06000045",
    37.26782354688583,
    38.002428072171654,
    37.07272936307197,
    36.61042206668299,
    185,
    140,
    39,
    29
  ],
  [
    "E08000032",
    36.11872377337554,
    36.46606274489225,
    36.92845565311106,
    36.69490211540965,
    89,
    45,
    32,
    30
  ],
  [
    "E06000008",
    36.0460713550649,
    36.02150616344099,
    35.95520737863513,
    36.71841628867237,
    83,
    26,
    21,
    31
  ],
  [
    "E09000024",
    39.15856037020436,
    38.010417284976555,
    37.03182703462075,
    36.778642716569934,
    289,
    142,
    36,
    32
  ],
  [
    "E09000008",
    36.82765510787364,
    36.977815699658706,
    36.92210371248718,
    36.84559879794594,
    146,
    60,
    31,
    33
  ],
  [
    "E09000017",
    37.235874407750515,
    37.53044015163945,
    37.34160493827161,
    36.86815533555283,
    183,
    99,
    43,
    34
  ],
  [
    "E07000103",
    36.711626114124186,
    36.6211141807258,
    37.155555276760175,
    36.93444701609063,
    140,
    49,
    40,
    35
  ],
  [
    "E06000023",
    38.38534697557439,
    38.405286776942994,
    37.679158357701915,
    36.946540909876376,
    258,
    180,
    62,
    36
  ],
  [
    "E06000044",
    38.94659269733391,
    38.638142040218206,
    37.883350473497025,
    36.98692064606742,
    282,
    194,
    70,
    37
  ],
  [
    "W06000015",
    37.226174863387975,
    37.507988647711144,
    37.06074564348102,
    37.01168771128897,
    181,
    96,
    38,
    38
  ],
  [
    "E07000092",
    32.780509524547,
    34.4956135036231,
    35.876184404335305,
    37.11511401068151,
    3,
    6,
    17,
    39
  ],
  [
    "E09000033",
    40.406560987961655,
    39.29084627089364,
    37.76880919677186,
    37.195071924738826,
    313,
    231,
    65,
    40
  ],
  [
    "E09000003",
    38.49409380987168,
    38.10312231745037,
    37.73677593074749,
    37.2933981694006,
    264,
    149,
    64,
    41
  ],
  [
    "E07000226",
    35.17990074441688,
    36.10994477659623,
    37.32411027568922,
    37.33062375113746,
    39,
    30,
    42,
    42
  ],
  [
    "E06000034",
    34.89468788346594,
    36.04458257379576,
    37.03832661304411,
    37.330918487048606,
    32,
    27,
    37,
    43
  ],
  [
    "E08000026",
    36.31438513585388,
    37.57000988494737,
    37.577231948465496,
    37.33406423523473,
    111,
    104,
    54,
    44
  ],
  [
    "E08000021",
    38.421593557180756,
    38.81031320677658,
    38.30454676813409,
    37.39877827230644,
    260,
    203,
    92,
    45
  ],
  [
    "E06000031",
    34.83647946786539,
    35.983377511980464,
    37.42313804394492,
    37.411697915929224,
    30,
    24,
    46,
    46
  ],
  [
    "E07000123",
    37.404474468923055,
    37.29077108548405,
    37.43624259442113,
    37.42189840373176,
    191,
    75,
    47,
    47
  ],
  [
    "E09000021",
    38.96220376438315,
    38.610785286775545,
    37.50091667741782,
    37.50193677370986,
    283,
    192,
    51,
    48
  ],
  [
    "E07000154",
    36.27042856591789,
    36.40874301505812,
    37.35781356864802,
    37.6028203084845,
    105,
    41,
    44,
    49
  ],
  [
    "E07000138",
    37.05297400227447,
    37.66917316159879,
    37.85286214953271,
    37.841828716819364,
    173,
    113,
    68,
    50
  ],
  [
    "E08000006",
    37.74058923869301,
    38.49547316329724,
    38.65792542410529,
    37.84452172203152,
    215,
    184,
    109,
    51
  ],
  [
    "E07000148",
    38.24483985170836,
    38.6979817196741,
    38.822005034799346,
    37.89264368510022,
    246,
    199,
    123,
    52
  ],
  [
    "E06000036",
    33.211498214945216,
    34.880274937727336,
    35.92407268879199,
    37.912658451481825,
    6,
    9,
    19,
    53
  ],
  [
    "E06000043",
    42.547402769203636,
    41.24354651315157,
    39.2515868308174,
    37.91372650154187,
    336,
    307,
    149,
    54
  ],
  [
    "E08000004",
    36.46763448797514,
    37.08652571687195,
    37.67474293709898,
    37.91536792398298,
    119,
    64,
    60,
    55
  ],
  [
    "E08000028",
    37.21397159424067,
    38.26703517172198,
    38.5925597983804,
    37.93048012906451,
    180,
    167,
    105,
    56
  ],
  [
    "E06000010",
    36.26326611709047,
    36.920581857963064,
    37.66673029635012,
    37.96075364851057,
    102,
    58,
    59,
    57
  ],
  [
    "E07000150",
    33.489158857099234,
    35.67453434884247,
    37.67509215376514,
    37.971145212635705,
    10,
    19,
    61,
    58
  ],
  [
    "E09000015",
    37.92338144350921,
    37.80424787606197,
    38.241558202951246,
    38.0443076099324,
    224,
    128,
    86,
    59
  ],
  [
    "E06000015",
    36.86646550759244,
    37.75872706830833,
    38.36181777176365,
    38.098889657168584,
    151,
    123,
    93,
    60
  ],
  [
    "E08000035",
    37.437328843802206,
    38.236644327640356,
    38.12649654248888,
    38.136226937330754,
    195,
    164,
    80,
    61
  ],
  [
    "E08000012",
    37.409881741498864,
    37.796264780638744,
    37.856210734220305,
    38.17099042698027,
    192,
    126,
    69,
    62
  ],
  [
    "E06000035",
    34.219176888987086,
    35.521129926569756,
    36.93664625152312,
    38.22514919011083,
    18,
    15,
    33,
    63
  ],
  [
    "E09000020",
    38.003169383280905,
    38.10157954824631,
    38.17228371329151,
    38.278889246071515,
    231,
    148,
    82,
    64
  ],
  [
    "E06000002",
    34.65458707294676,
    36.04468260335537,
    37.501816698798756,
    38.28313296534983,
    28,
    28,
    52,
    65
  ],
  [
    "E07000243",
    33.53836005682972,
    35.39925080176188,
    37.00120418454128,
    38.304518979954025,
    11,
    11,
    34,
    66
  ],
  [
    "E07000107",
    36.9868184503979,
    37.68454411561072,
    37.92709473145066,
    38.33228059364248,
    169,
    115,
    71,
    67
  ],
  [
    "E08000019",
    38.67020254538056,
    39.57719641980678,
    39.00817078469539,
    38.34672823133067,
    273,
    253,
    135,
    68
  ],
  [
    "E08000005",
    35.604928011010365,
    36.69392176648662,
    37.61840183093105,
    38.407113401574875,
    58,
    54,
    55,
    69
  ],
  [
    "E07000241",
    37.12903208400332,
    39.16316610008012,
    39.283330770413656,
    38.44404487266477,
    177,
    224,
    151,
    70
  ],
  [
    "E07000202",
    37.44581363236956,
    38.14588392215876,
    38.69826415287756,
    38.495846578300245,
    196,
    153,
    113,
    71
  ],
  [
    "E06000030",
    35.3366392463845,
    36.19414691249634,
    37.6661242127012,
    38.54369465853239,
    44,
    31,
    58,
    72
  ],
  [
    "E06000020",
    33.75050668828537,
    35.65390349493965,
    37.01861676930365,
    38.5599132266369,
    13,
    18,
    35,
    73
  ],
  [
    "E07000041",
    38.3381549688033,
    39.05964331210191,
    38.730149441843714,
    38.591761269560934,
    255,
    219,
    114,
    74
  ],
  [
    "E07000073",
    33.21005319081732,
    36.36719639818301,
    37.465663874079716,
    38.68501659670019,
    5,
    38,
    49,
    75
  ],
  [
    "E07000081",
    36.26411001600539,
    37.03419022124242,
    38.03598078113056,
    38.69839261061074,
    103,
    63,
    75,
    76
  ],
  [
    "E09000027",
    39.935599944055234,
    39.59811985167857,
    38.56231431621948,
    38.73514626450612,
    305,
    255,
    102,
    77
  ],
  [
    "E07000237",
    36.91039963301762,
    37.6735062075714,
    38.00290218252693,
    38.80234488903289,
    156,
    114,
    72,
    78
  ],
  [
    "E09000029",
    38.51583853526372,
    38.38275698720985,
    38.01945884604259,
    38.81328032143721,
    266,
    177,
    73,
    79
  ],
  [
    "E08000034",
    36.57319508344914,
    37.38984983665079,
    38.05445463014912,
    38.89819816407785,
    129,
    82,
    76,
    80
  ],
  [
    "E08000001",
    36.36461539643929,
    37.38210794171333,
    38.270139910506316,
    38.91365531493645,
    113,
    81,
    88,
    81
  ],
  [
    "E06000021",
    37.5325609692642,
    38.044643696579016,
    38.93777635559693,
    38.9486683158774,
    204,
    143,
    131,
    82
  ],
  [
    "E08000031",
    36.48280615033627,
    37.73076923076923,
    38.87928556634359,
    38.99751473123021,
    121,
    119,
    126,
    83
  ],
  [
    "E07000236",
    31.674072177370768,
    34.378792922438734,
    37.22706273559163,
    39.0499798133327,
    2,
    4,
    41,
    84
  ],
  [
    "E07000199",
    30.93576853638797,
    33.66220652251481,
    36.49082199500845,
    39.053513077213495,
    0,
    1,
    28,
    85
  ],
  [
    "E07000217",
    36.571522592232654,
    37.29853627614822,
    38.471096463881715,
    39.15265428738483,
    128,
    76,
    97,
    86
  ],
  [
    "E07000084",
    33.78985079953758,
    35.83790317010843,
    37.65182398510925,
    39.16803735421546,
    14,
    21,
    56,
    87
  ],
  [
    "E07000109",
    35.680807201233776,
    37.459709693469186,
    38.696662905382816,
    39.20089461266221,
    61,
    93,
    112,
    88
  ],
  [
    "E07000120",
    37.42943279948263,
    37.691350937619596,
    38.06425678163741,
    39.21290905938019,
    194,
    116,
    78,
    89
  ],
  [
    "E07000201",
    34.33803573171922,
    35.993153182721585,
    37.7853772310574,
    39.2442424851041,
    23,
    25,
    66,
    90
  ],
  [
    "W06000022",
    36.68573503186631,
    37.92139846082299,
    38.67293458107655,
    39.26871191743975,
    137,
    135,
    110,
    91
  ],
  [
    "E08000030",
    35.766186049310285,
    37.52487590948329,
    38.823559577439234,
    39.28837306876873,
    67,
    98,
    124,
    92
  ],
  [
    "E09000004",
    36.994313092483395,
    37.84707696588827,
    38.93630617012505,
    39.29523873153532,
    171,
    131,
    130,
    93
  ],
  [
    "E06000006",
    33.41907239336298,
    35.28662420382165,
    37.732169595046145,
    39.33735466734528,
    8,
    10,
    63,
    94
  ],
  [
    "E07000240",
    36.91926505132413,
    38.248205258236794,
    38.86742430115196,
    39.34215577546494,
    158,
    165,
    125,
    95
  ],
  [
    "E07000007",
    35.003395860284606,
    36.67957519030309,
    38.11342578312956,
    39.34739926825289,
    34,
    52,
    79,
    96
  ],
  [
    "E07000071",
    36.02718581201373,
    37.404887204855626,
    38.46129529188998,
    39.37128049273721,
    82,
    84,
    95,
    97
  ],
  [
    "E07000122",
    37.92838112599033,
    37.82751348239358,
    38.18937119039082,
    39.37648124133614,
    226,
    129,
    83,
    98
  ],
  [
    "E07000177",
    34.45954738330976,
    35.966545590332,
    37.78902194699936,
    39.38597851523952,
    24,
    23,
    67,
    99
  ],
  [
    "E06000055",
    35.55867208981712,
    37.44872542859707,
    38.300903264191255,
    39.39536382628795,
    55,
    92,
    91,
    100
  ],
  [
    "E06000026",
    36.75457953090976,
    37.74904159458938,
    39.0066842809309,
    39.442496411632554,
    143,
    122,
    133,
    101
  ],
  [
    "E07000209",
    37.690452884639726,
    38.66826553792348,
    39.00801850424055,
    39.46044699416108,
    213,
    195,
    134,
    102
  ],
  [
    "E07000066",
    33.467059643952055,
    36.265422904098706,
    38.19242514771294,
    39.54387467979392,
    9,
    34,
    84,
    103
  ],
  [
    "E06000004",
    34.47302360216649,
    36.42646855881135,
    38.46571515046212,
    39.56134857262147,
    25,
    43,
    96,
    104
  ],
  [
    "E08000008",
    36.93766413268832,
    37.52414164329509,
    38.54045984997136,
    39.58531670040671,
    163,
    97,
    99,
    105
  ],
  [
    "E07000004",
    34.829568050414515,
    36.228714255367265,
    37.665751689189186,
    39.60308550164525,
    29,
    33,
    57,
    106
  ],
  [
    "E08000011",
    33.06598320143822,
    35.460563083943164,
    37.46188102359588,
    39.60311666769482,
    4,
    13,
    48,
    107
  ],
  [
    "E07000095",
    34.94733924611973,
    37.09502265221181,
    38.47733174015947,
    39.60684870044547,
    33,
    65,
    98,
    108
  ],
  [
    "E08000002",
    36.76475700875988,
    37.7607207513012,
    38.58862483665921,
    39.68931697827732,
    145,
    124,
    104,
    109
  ],
  [
    "E08000009",
    36.97276018099547,
    38.38602507391965,
    39.4159687856871,
    39.75646355780349,
    167,
    179,
    162,
    110
  ],
  [
    "E07000130",
    36.06003851129765,
    37.766455580158805,
    38.55755508201208,
    39.808880192655025,
    84,
    125,
    101,
    111
  ],
  [
    "E07000117",
    37.12867795794745,
    37.39119938549325,
    38.13837152172942,
    39.817566248176526,
    176,
    83,
    81,
    112
  ],
  [
    "E07000098",
    38.120691234740384,
    39.01992236556685,
    39.3291869574423,
    39.82827823374754,
    234,
    216,
    154,
    113
  ],
  [
    "E06000041",
    34.030721463449154,
    35.64259747537521,
    37.56486547652329,
    39.82902578054152,
    16,
    17,
    53,
    114
  ],
  [
    "E07000096",
    35.68392869642315,
    37.42513611615245,
    38.7667972718038,
    39.881754540998436,
    62,
    87,
    118,
    115
  ],
  [
    "E06000037",
    35.027055463700584,
    36.411741038771034,
    38.243810519175796,
    39.91613683348286,
    35,
    42,
    87,
    116
  ],
  [
    "E07000153",
    37.51960118314723,
    38.19369665134603,
    39.183224576581864,
    39.920326290451996,
    203,
    159,
    147,
    117
  ],
  [
    "E07000078",
    38.56148892126045,
    39.43633322019105,
    39.74570031270453,
    39.96669028445028,
    270,
    242,
    181,
    118
  ],
  [
    "E06000007",
    35.90056473178232,
    37.15763472644169,
    38.543456872821665,
    39.978316553592975,
    75,
    68,
    100,
    119
  ],
  [
    "E07000039",
    36.649993315805894,
    38.22207824778465,
    38.90509650994531,
    39.981371087928466,
    135,
    162,
    127,
    120
  ],
  [
    "E06000014",
    38.258010581743015,
    39.3939457527939,
    39.79428038167602,
    39.98716239756426,
    247,
    240,
    186,
    121
  ],
  [
    "E07000242",
    35.91279622190655,
    37.42889706263275,
    38.27202032346895,
    40.0164685119147,
    77,
    88,
    89,
    122
  ],
  [
    "W06000018",
    35.48438581647566,
    37.11596740719777,
    38.58313278595696,
    40.02740400210284,
    51,
    66,
    103,
    123
  ],
  [
    "E07000105",
    37.07246744661008,
    38.41729754903554,
    39.46112902126168,
    40.05061209264471,
    175,
    181,
    165,
    124
  ],
  [
    "E07000192",
    34.25408944780635,
    36.105191764321816,
    38.02268287388756,
    40.0559192300589,
    20,
    29,
    74,
    125
  ],
  [
    "E07000113",
    36.18721618274391,
    37.42035864523318,
    38.675371311315224,
    40.087955976000295,
    94,
    86,
    111,
    126
  ],
  [
    "E08000033",
    37.65257870623345,
    38.13595792990056,
    39.084064494667025,
    40.095620774582244,
    211,
    152,
    140,
    127
  ],
  [
    "E07000116",
    38.461009511411596,
    39.361098274026,
    39.65344393394721,
    40.100239897782686,
    261,
    238,
    175,
    128
  ],
  [
    "E07000156",
    35.59619050595331,
    37.228126982253755,
    38.745587424158856,
    40.11505387759435,
    56,
    72,
    116,
    129
  ],
  [
    "E08000010",
    35.782177686930694,
    37.16718430384868,
    38.770809695377245,
    40.12089860279567,
    70,
    69,
    119,
    130
  ],
  [
    "E07000125",
    36.589540657976414,
    37.44366711834473,
    38.28391959798995,
    40.1274602100556,
    130,
    91,
    90,
    131
  ],
  [
    "E06000056",
    34.301616801640876,
    36.295087363194995,
    38.2106661987383,
    40.12944166427524,
    22,
    36,
    85,
    132
  ],
  [
    "E07000212",
    38.19901597261837,
    39.461721155051606,
    39.42407269744431,
    40.13364799403801,
    243,
    244,
    163,
    133
  ],
  [
    "W06000024",
    37.50949208992506,
    37.744196436097575,
    39.08759645613032,
    40.18502772014558,
    200,
    121,
    141,
    134
  ],
  [
    "E07000219",
    35.21187791016766,
    36.868827529644946,
    38.75442748988602,
    40.19512662472456,
    40,
    56,
    117,
    135
  ],
  [
    "E07000207",
    39.13083388829892,
    39.65532979847833,
    39.898922385513714,
    40.216370582617,
    287,
    260,
    193,
    136
  ],
  [
    "E06000040",
    36.87316701359602,
    38.66883705129657,
    39.38693153329791,
    40.218974820143885,
    153,
    196,
    159,
    137
  ],
  [
    "E07000088",
    34.296919789440764,
    36.61165585323936,
    38.65291484516112,
    40.232867759192466,
    21,
    48,
    108,
    138
  ],
  [
    "E07000222",
    37.05934226229943,
    39.2031100869311,
    39.89013912270114,
    40.235237707776356,
    174,
    228,
    192,
    139
  ],
  [
    "W06000016",
    36.992329238016424,
    38.053026394978936,
    39.08939712076987,
    40.26157160530694,
    170,
    144,
    143,
    140
  ],
  [
    "E07000115",
    35.71015758180533,
    37.62833741143638,
    39.01288511239611,
    40.26371011133645,
    63,
    109,
    136,
    141
  ],
  [
    "E08000017",
    35.93801410924909,
    37.61697951214108,
    39.33770009481845,
    40.284422722071945,
    78,
    108,
    155,
    142
  ],
  [
    "E06000025",
    35.047832597065835,
    37.21401862373165,
    38.61542407243061,
    40.28859217481647,
    37,
    71,
    106,
    143
  ],
  [
    "W06000006",
    36.66063124189982,
    38.28272429558056,
    39.492808331128096,
    40.29422888671353,
    136,
    169,
    169,
    144
  ],
  [
    "E07000193",
    36.6263086580499,
    38.08457339992791,
    39.11127759416463,
    40.29575288555505,
    134,
    147,
    146,
    145
  ],
  [
    "E06000001",
    35.900895418126396,
    37.44043734583946,
    38.91989031326171,
    40.31023166862259,
    76,
    90,
    128,
    146
  ],
  [
    "E07000211",
    39.24328689071119,
    39.59510345823038,
    39.8200708177234,
    40.32410128051656,
    292,
    254,
    189,
    147
  ],
  [
    "E09000006",
    38.389263852627934,
    39.55059031206879,
    39.81866231735955,
    40.36786665459999,
    259,
    252,
    188,
    148
  ],
  [
    "E07000011",
    33.62793190825807,
    35.545150095436405,
    38.05697484773579,
    40.39700191141421,
    12,
    16,
    77,
    149
  ],
  [
    "E07000208",
    40.186533411146776,
    40.605944155088274,
    40.46404551351835,
    40.41616734574312,
    311,
    294,
    231,
    150
  ],
  [
    "E06000028",
    44.558074684772066,
    43.464660083805896,
    41.72057023984337,
    40.42442136126567,
    343,
    336,
    291,
    151
  ],
  [
    "E07000170",
    36.51610998251996,
    37.94350522313683,
    39.432312940437185,
    40.43865117952752,
    123,
    136,
    164,
    152
  ],
  [
    "E07000166",
    35.342833264698044,
    37.23290477376129,
    38.735719604297415,
    40.44573270470509,
    45,
    73,
    115,
    153
  ],
  [
    "E07000106",
    40.772952354289515,
    41.39723026777574,
    40.662695801947116,
    40.46242019253035,
    316,
    311,
    242,
    154
  ],
  [
    "E07000220",
    36.37399036417741,
    38.498781973203414,
    39.77102248038969,
    40.46267799150637,
    115,
    185,
    185,
    155
  ],
  [
    "E07000067",
    35.7344623892415,
    37.631642034605456,
    39.00073012582376,
    40.47350493595496,
    66,
    110,
    132,
    156
  ],
  [
    "E07000089",
    33.27473664658901,
    35.87434040607506,
    38.44162804344962,
    40.47447079630464,
    7,
    22,
    94,
    157
  ],
  [
    "E07000102",
    38.1957858052237,
    39.32227207260028,
    39.80285072897557,
    40.482351661188545,
    241,
    233,
    187,
    158
  ],
  [
    "E07000070",
    35.33184005007533,
    36.90948575627551,
    38.93244619890488,
    40.52058701206108,
    43,
    57,
    129,
    159
  ],
  [
    "E07000012",
    35.83758887718873,
    37.56106069738831,
    39.37596553658855,
    40.54998151322645,
    72,
    103,
    158,
    160
  ],
  [
    "W06000011",
    37.8465018364239,
    39.36262781048651,
    40.437009072914705,
    40.56734079983934,
    219,
    239,
    229,
    161
  ],
  [
    "E07000086",
    35.67521297954311,
    37.024806837800355,
    38.78291427440111,
    40.59051989233141,
    60,
    62,
    120,
    162
  ],
  [
    "E07000110",
    36.37000580158577,
    38.00525295685307,
    39.703893626974704,
    40.60913157538529,
    114,
    141,
    177,
    163
  ],
  [
    "E06000033",
    41.18788705278357,
    40.6876391806557,
    40.68845191521754,
    40.632075688997915,
    324,
    295,
    245,
    164
  ],
  [
    "E07000121",
    40.78590460290559,
    40.56093366490118,
    39.6743902985409,
    40.63683830171635,
    317,
    291,
    176,
    165
  ],
  [
    "E07000099",
    36.59215375526318,
    38.16856260156794,
    39.40574751967157,
    40.65248517079157,
    131,
    156,
    161,
    166
  ],
  [
    "E07000009",
    38.1903170233882,
    39.08203125,
    39.94882771428181,
    40.657734615476386,
    240,
    222,
    199,
    167
  ],
  [
    "E07000214",
    33.862328974971305,
    36.38084428313078,
    38.80067231075697,
    40.65878064635958,
    15,
    39,
    121,
    168
  ],
  [
    "E06000012",
    35.94690406640354,
    37.557120667409905,
    39.04819780470204,
    40.658987820769845,
    79,
    102,
    138,
    169
  ],
  [
    "E08000018",
    35.4992809778701,
    37.41797708604061,
    39.10765945445022,
    40.67168065920398,
    52,
    85,
    145,
    170
  ],
  [
    "E07000062",
    41.751249728319934,
    40.25686711210096,
    40.0436945731693,
    40.68035765727835,
    329,
    282,
    209,
    171
  ],
  [
    "E06000005",
    37.56181029074491,
    38.86467959476675,
    39.97805067508867,
    40.687213443977114,
    206,
    207,
    200,
    172
  ],
  [
    "E08000036",
    36.08429710996089,
    37.50693115481723,
    39.08919426587893,
    40.71024008936984,
    86,
    95,
    142,
    173
  ],
  [
    "E07000174",
    36.41784585656488,
    37.73449484987947,
    39.487408697778186,
    40.72396760668543,
    116,
    120,
    167,
    174
  ],
  [
    "E06000022",
    39.15563365199276,
    40.39841327855216,
    40.403842172202665,
    40.758709435505864,
    288,
    288,
    227,
    175
  ],
  [
    "E09000016",
    36.86353323407113,
    38.7057718787583,
    40.24173121602519,
    40.83228653807244,
    150,
    200,
    219,
    176
  ],
  [
    "E07000152",
    36.98253833049404,
    38.1935703099607,
    39.02044988439382,
    40.83775139745289,
    168,
    158,
    137,
    177
  ],
  [
    "E08000016",
    36.52807490810671,
    38.25324640055762,
    39.53875748599099,
    40.84736031761821,
    124,
    166,
    170,
    178
  ],
  [
    "E08000024",
    35.67212947536636,
    37.24041655134238,
    38.80496330141274,
    40.88045269431519,
    59,
    74,
    122,
    179
  ],
  [
    "E07000213",
    37.18159544531004,
    39.347933637074874,
    40.11681105542094,
    40.912989811502335,
    179,
    236,
    214,
    180
  ],
  [
    "W06000020",
    36.19920103408698,
    37.8368608260519,
    39.49219265449747,
    40.92421081526215,
    95,
    130,
    168,
    181
  ],
  [
    "E08000037",
    37.496681678122776,
    39.09999599174299,
    40.14899917338942,
    40.92963029558373,
    198,
    223,
    215,
    182
  ],
  [
    "W06000019",
    37.99687005754841,
    38.66884195374458,
    39.602997858672374,
    40.93534248145071,
    229,
    197,
    171,
    183
  ],
  [
    "E08000027",
    36.720916482139685,
    38.468041626315184,
    39.94080954518792,
    40.971374930095074,
    141,
    183,
    198,
    184
  ],
  [
    "E07000118",
    35.39246454783966,
    37.13110337395341,
    39.26757773619461,
    41.00398954785124,
    49,
    67,
    150,
    185
  ],
  [
    "E07000077",
    36.53889487606545,
    38.0754829441252,
    39.84304282232796,
    41.01509887592362,
    127,
    145,
    191,
    186
  ],
  [
    "W06000005",
    35.374875796364485,
    37.65126216889291,
    39.10564878199821,
    41.04297535834656,
    48,
    111,
    144,
    187
  ],
  [
    "W06000013",
    36.70657370517928,
    38.52008448481285,
    39.7461892436008,
    41.14928365115176,
    138,
    188,
    182,
    188
  ],
  [
    "E08000013",
    35.83065602790034,
    37.86055917298785,
    39.222948520763595,
    41.1987473475255,
    71,
    132,
    148,
    189
  ],
  [
    "E08000007",
    36.87226838122065,
    38.55812338472899,
    39.83203873258,
    41.23070338010767,
    152,
    189,
    190,
    190
  ],
  [
    "E07000036",
    37.1341679723298,
    38.23401758701615,
    39.39088646232671,
    41.24001837956478,
    178,
    163,
    160,
    191
  ],
  [
    "E07000180",
    35.72035671582304,
    37.604847073379304,
    39.32545036279826,
    41.24136277977981,
    64,
    107,
    152,
    192
  ],
  [
    "E06000054",
    36.92500469722256,
    38.5608427903999,
    39.74359255657974,
    41.26220059832562,
    160,
    190,
    180,
    193
  ],
  [
    "E07000134",
    36.60400642865343,
    38.50110468435817,
    40.03180765722572,
    41.275035306201055,
    132,
    187,
    207,
    194
  ],
  [
    "E06000013",
    35.88842669997113,
    38.082814028774614,
    40.16452511956244,
    41.279397537116445,
    73,
    146,
    216,
    195
  ],
  [
    "E07000126",
    35.058090496713604,
    37.30911951843609,
    39.64102107421706,
    41.30126906113317,
    38,
    78,
    174,
    196
  ],
  [
    "E07000195",
    37.5049055155057,
    39.06325834865775,
    40.0784854419851,
    41.30218130151528,
    199,
    220,
    211,
    197
  ],
  [
    "E07000129",
    35.54550438596491,
    37.71662636033857,
    39.344986149584486,
    41.328887824096256,
    53,
    118,
    156,
    198
  ],
  [
    "E07000169",
    36.61878614706692,
    37.3266044808149,
    39.32847875276299,
    41.355588443240784,
    133,
    79,
    153,
    199
  ],
  [
    "E07000179",
    36.449527491408936,
    38.15942113897352,
    39.479770477223255,
    41.37789835911722,
    117,
    154,
    166,
    200
  ],
  [
    "W06000014",
    36.31916897607274,
    38.17818500620108,
    39.73806410514317,
    41.379337639311046,
    112,
    157,
    179,
    201
  ],
  [
    "E07000094",
    38.13347369134033,
    39.8610794098728,
    40.456211527700056,
    41.37962605600583,
    235,
    264,
    230,
    202
  ],
  [
    "E07000151",
    35.261918878387334,
    37.43361002448876,
    38.620977619418774,
    41.38499929344964,
    41,
    89,
    107,
    203
  ],
  [
    "E07000204",
    35.962029766787765,
    38.31417405239232,
    40.086531705379784,
    41.409583093110406,
    80,
    170,
    212,
    204
  ],
  [
    "E08000022",
    37.99561914408711,
    39.46891609373537,
    40.59405669385008,
    41.41591675340262,
    228,
    247,
    236,
    205
  ],
  [
    "E07000228",
    36.91332098964659,
    38.90771331677572,
    40.306109231361035,
    41.43472043472043,
    157,
    209,
    224,
    206
  ],
  [
    "E07000135",
    35.890684466880955,
    38.384532562515766,
    39.76787218408932,
    41.44374221114474,
    74,
    178,
    184,
    207
  ],
  [
    "E07000033",
    37.72759894834079,
    39.047127220069,
    40.25180081646302,
    41.449199905095824,
    214,
    217,
    220,
    208
  ],
  [
    "E06000047",
    37.010115840275574,
    38.621603804870944,
    39.994356316062515,
    41.45242400271217,
    172,
    193,
    201,
    209
  ],
  [
    "E07000037",
    36.902742358724176,
    37.920309782353215,
    39.622150547251444,
    41.52890243365753,
    155,
    134,
    172,
    210
  ],
  [
    "E07000155",
    35.04281651404819,
    37.20856617386999,
    39.07673051943957,
    41.54119076406578,
    36,
    70,
    139,
    211
  ],
  [
    "E07000072",
    38.28335463148442,
    39.908017099468225,
    40.30599583071374,
    41.550048532396374,
    249,
    266,
    223,
    212
  ],
  [
    "E07000181",
    35.7267693426812,
    37.536620092852154,
    39.75222446440334,
    41.56278929938251,
    65,
    100,
    183,
    213
  ],
  [
    "E08000023",
    37.861746777255924,
    38.96240715721701,
    40.005072321487006,
    41.64731952986289,
    221,
    212,
    203,
    214
  ],
  [
    "E07000127",
    34.539289406899144,
    37.29958880512697,
    39.63529748283753,
    41.66754754483444,
    26,
    77,
    173,
    215
  ],
  [
    "E07000176",
    36.970402783062454,
    39.177872641364395,
    40.04181267165451,
    41.707002672569715,
    165,
    225,
    208,
    216
  ],
  [
    "E08000029",
    35.367683462832545,
    38.2008941303619,
    40.07164767088684,
    41.726341968510795,
    47,
    160,
    210,
    217
  ],
  [
    "E07000215",
    38.61570520864982,
    39.8629383091357,
    40.4738747603189,
    41.730222414997954,
    271,
    265,
    232,
    218
  ],
  [
    "E06000009",
    42.43613839653185,
    41.950636343098125,
    41.696062720953606,
    41.79222538978637,
    333,
    319,
    290,
    219
  ],
  [
    "E06000050",
    36.09450705965752,
    38.21792909151723,
    39.913660306102166,
    41.80476505424625,
    88,
    161,
    195,
    220
  ],
  [
    "E07000027",
    37.329375731296025,
    38.16352136752137,
    39.911980389161265,
    41.805802828317915,
    189,
    155,
    194,
    221
  ],
  [
    "E07000028",
    38.063528193996405,
    39.3281259322607,
    40.71372901381043,
    41.810851530821026,
    232,
    235,
    247,
    222
  ],
  [
    "W06000012",
    38.185817067958396,
    39.61273311245822,
    40.823938215324205,
    41.81211197894315,
    239,
    257,
    250,
    223
  ],
  [
    "E07000172",
    36.82907831896004,
    38.57189859712331,
    40.19576493335069,
    41.81535250760364,
    147,
    191,
    217,
    224
  ],
  [
    "E08000015",
    37.487667943142725,
    38.90369413080609,
    40.432973416075875,
    41.82135229202303,
    197,
    208,
    228,
    225
  ],
  [
    "E07000111",
    36.73222372659788,
    38.92274966001397,
    40.675447584370914,
    41.84212702253401,
    142,
    210,
    244,
    226
  ],
  [
    "E07000093",
    35.55226917404948,
    37.544021374768306,
    39.359893262417806,
    41.86390659633327,
    54,
    101,
    157,
    227
  ],
  [
    "E07000034",
    38.19832023841777,
    39.47081577014778,
    40.59983204500384,
    41.8778182448838,
    242,
    248,
    238,
    228
  ],
  [
    "E09000001",
    39.992939387356074,
    43.40294543698696,
    41.076103606740006,
    41.87898305084746,
    306,
    335,
    263,
    229
  ],
  [
    "E07000173",
    36.17634226941928,
    38.6708570546521,
    40.5702484144236,
    41.88199624811745,
    92,
    198,
    235,
    230
  ],
  [
    "E07000216",
    38.79846290768175,
    40.307211249690845,
    40.94564334007712,
    41.92100154640871,
    279,
    283,
    258,
    231
  ],
  [
    "E07000136",
    38.2685309327715,
    40.3705895614925,
    41.84351227214009,
    41.978858857929666,
    248,
    287,
    296,
    232
  ],
  [
    "E06000003",
    34.83910891089109,
    37.47788083212172,
    39.9956340508103,
    41.98922523802126,
    31,
    94,
    202,
    233
  ],
  [
    "E07000171",
    36.2336702301249,
    38.499961530693696,
    40.028991764389104,
    42.00918370059276,
    100,
    186,
    206,
    234
  ],
  [
    "E07000131",
    36.28208827263285,
    38.31544810448622,
    40.02295255383892,
    42.02735939659413,
    107,
    171,
    205,
    235
  ],
  [
    "E07000068",
    37.833907918149464,
    39.83692649829313,
    41.29279358260641,
    42.07643238542955,
    218,
    263,
    273,
    236
  ],
  [
    "E07000005",
    36.966294275852306,
    38.990794541285425,
    40.648693927406796,
    42.078129216818695,
    164,
    213,
    240,
    237
  ],
  [
    "W06000002",
    39.254225630782564,
    40.344455621145144,
    40.88428489511567,
    42.07944270311962,
    293,
    284,
    253,
    238
  ],
  [
    "E07000175",
    36.199502268774864,
    38.75199447384807,
    40.59847294487359,
    42.10114791363648,
    96,
    202,
    237,
    239
  ],
  [
    "W06000008",
    40.03639023333093,
    41.06808888325356,
    41.022839456762455,
    42.14101314506994,
    309,
    302,
    261,
    240
  ],
  [
    "E07000218",
    35.601846417011856,
    37.58634171234794,
    39.712767676767676,
    42.146853936207954,
    57,
    105,
    178,
    241
  ],
  [
    "E07000132",
    35.98188376707537,
    37.97593060363198,
    40.30370751390817,
    42.19170520946344,
    81,
    138,
    222,
    242
  ],
  [
    "E07000006",
    37.85051045211473,
    40.1036715292575,
    41.08735489287502,
    42.19215008898261,
    220,
    275,
    264,
    243
  ],
  [
    "E07000133",
    36.28152239779984,
    38.36573417272566,
    40.20480152177094,
    42.198963792282036,
    106,
    176,
    218,
    244
  ],
  [
    "E07000190",
    39.09520018869037,
    40.24921021174863,
    41.180406224342185,
    42.25546117055551,
    286,
    281,
    270,
    245
  ],
  [
    "E07000197",
    36.304163860249034,
    38.81800353176894,
    40.91115918245562,
    42.27668508202859,
    110,
    204,
    254,
    246
  ],
  [
    "E07000141",
    36.48232187796526,
    38.358323007021895,
    39.93760919392842,
    42.29639429545251,
    120,
    175,
    197,
    247
  ],
  [
    "E07000032",
    38.33784279556085,
    39.61238907209309,
    40.493638229006585,
    42.29743927266186,
    254,
    256,
    233,
    248
  ],
  [
    "E07000187",
    37.649290969433935,
    39.01062205160926,
    40.40363730889206,
    42.35747490368689,
    210,
    215,
    226,
    249
  ],
  [
    "E07000114",
    42.50092957222776,
    42.580216714510975,
    42.125217048145224,
    42.37226685347205,
    335,
    328,
    303,
    250
  ],
  [
    "E06000049",
    37.308202197423626,
    39.04932960778592,
    40.634783140098406,
    42.42857856897768,
    186,
    218,
    239,
    251
  ],
  [
    "E07000165",
    38.76112770780478,
    40.190719338087455,
    40.658812917550506,
    42.45011686904966,
    277,
    278,
    241,
    252
  ],
  [
    "E07000085",
    36.28720620792987,
    37.87236613183839,
    39.92956232098901,
    42.475823472424054,
    108,
    133,
    196,
    253
  ],
  [
    "E07000010",
    38.55463342017119,
    39.94518044769301,
    41.17790907893634,
    42.53075727992274,
    269,
    268,
    269,
    254
  ],
  [
    "E07000029",
    36.206673383429184,
    37.79728175493717,
    40.09056560237663,
    42.53887936773225,
    97,
    127,
    213,
    255
  ],
  [
    "E07000145",
    39.03650773839241,
    40.066914413387444,
    41.779688549685574,
    42.54142808680366,
    285,
    273,
    294,
    256
  ],
  [
    "E06000029",
    40.009198944789254,
    40.798083427282975,
    41.972780260626834,
    42.55862033932744,
    308,
    297,
    299,
    257
  ],
  [
    "E07000227",
    38.14117899185631,
    39.49848934249553,
    40.27964769181633,
    42.57025841387347,
    236,
    250,
    221,
    258
  ],
  [
    "E07000229",
    46.11797851928633,
    44.10955520658922,
    43.13155845220528,
    42.57224770642202,
    346,
    340,
    323,
    259
  ],
  [
    "E07000108",
    38.79647513278609,
    40.052317470159664,
    40.997958324965815,
    42.60190375557426,
    278,
    270,
    260,
    260
  ],
  [
    "E07000194",
    34.16840659964142,
    37.65747904055935,
    40.54691773842342,
    42.6991972499851,
    17,
    112,
    234,
    261
  ],
  [
    "E07000090",
    35.366079044640315,
    38.320989665572235,
    41.0751208866447,
    42.72778495906665,
    46,
    172,
    262,
    262
  ],
  [
    "E07000082",
    37.819066309041766,
    39.436027098492595,
    40.925399002724895,
    42.74676579859726,
    217,
    241,
    256,
    263
  ],
  [
    "W06000010",
    39.624417630093426,
    40.89169893801525,
    41.612543467317785,
    42.74864373670263,
    299,
    299,
    287,
    264
  ],
  [
    "E07000075",
    36.20733274984957,
    38.92356920220174,
    40.7041970872673,
    42.77459267352648,
    98,
    211,
    246,
    265
  ],
  [
    "E07000042",
    38.478385615914306,
    39.83574029692801,
    41.44070953690967,
    42.78771704180064,
    263,
    262,
    277,
    266
  ],
  [
    "E07000112",
    41.02257270931649,
    41.511761362394246,
    41.77305222469295,
    42.80684733580935,
    321,
    313,
    293,
    267
  ],
  [
    "E07000083",
    36.934966631034584,
    39.32232813361807,
    41.157053463894854,
    42.81473097152899,
    162,
    234,
    265,
    268
  ],
  [
    "E06000017",
    35.77680506920127,
    38.33394201149608,
    40.3834364698398,
    42.82205839064465,
    69,
    173,
    225,
    269
  ],
  [
    "W06000004",
    40.770904298214994,
    41.58398590224499,
    41.85001988199766,
    42.83995135169736,
    315,
    315,
    297,
    270
  ],
  [
    "E07000188",
    38.47313200216841,
    40.096739052606814,
    41.54221561127638,
    42.86478514329598,
    262,
    274,
    284,
    271
  ],
  [
    "E07000203",
    37.74100729800675,
    39.00408889682712,
    40.855130610976154,
    42.89490959464908,
    216,
    214,
    252,
    272
  ],
  [
    "E07000124",
    38.29352188929338,
    40.152075646647475,
    40.94974241132649,
    42.98230413778618,
    250,
    276,
    259,
    273
  ],
  [
    "E08000014",
    37.59088439571938,
    39.637064743629594,
    40.9162452156027,
    42.98962708645312,
    207,
    259,
    255,
    274
  ],
  [
    "E06000051",
    37.54143120840687,
    39.616865451847524,
    41.15926956570872,
    43.017477925972386,
    205,
    258,
    267,
    275
  ],
  [
    "E07000087",
    36.21992327923831,
    38.81807741129536,
    40.769255705394194,
    43.0333345282799,
    99,
    205,
    248,
    276
  ],
  [
    "E06000024",
    38.74157327895331,
    40.52763252794807,
    41.985259412073546,
    43.057201109761756,
    276,
    290,
    300,
    277
  ],
  [
    "E07000143",
    37.670935266809245,
    39.919774744091,
    41.481492158671585,
    43.09245465204497,
    212,
    267,
    281,
    278
  ],
  [
    "E07000234",
    36.13644202248741,
    38.82548282792974,
    41.157189702483294,
    43.09698623407414,
    90,
    206,
    266,
    279
  ],
  [
    "E07000210",
    39.56646410438534,
    41.18833627871749,
    41.95297516750106,
    43.13648609077599,
    298,
    305,
    298,
    280
  ],
  [
    "E07000139",
    36.53752237279468,
    40.191263666157965,
    41.21925924350083,
    43.14078651893918,
    126,
    279,
    271,
    281
  ],
  [
    "E07000239",
    36.14791636957976,
    38.44432256839707,
    40.824997421883054,
    43.14812452156162,
    91,
    182,
    251,
    282
  ],
  [
    "E07000061",
    45.483332208651056,
    44.95002764297561,
    43.62393762965937,
    43.239146179535666,
    345,
    344,
    333,
    283
  ],
  [
    "E07000050",
    39.55802040325928,
    41.224620994051044,
    41.50815766093207,
    43.240489625708996,
    297,
    306,
    282,
    284
  ],
  [
    "E06000057",
    37.60425799113807,
    39.27164630744288,
    41.171717829356425,
    43.25331932613566,
    208,
    230,
    268,
    285
  ],
  [
    "E07000053",
    38.82492971796499,
    39.468546372054284,
    41.83736170480262,
    43.274855371583776,
    280,
    246,
    295,
    286
  ],
  [
    "W06000009",
    36.89800457127683,
    39.35350403711469,
    41.34915628449772,
    43.33588562467841,
    154,
    237,
    275,
    287
  ],
  [
    "E07000189",
    38.23211661897765,
    40.15468920969962,
    41.61511253593334,
    43.375014729321585,
    244,
    277,
    288,
    288
  ],
  [
    "E07000080",
    37.51409964681083,
    39.46414115273852,
    40.81537095846566,
    43.4081148351045,
    202,
    245,
    249,
    289
  ],
  [
    "E06000019",
    38.15885244673825,
    40.0077873841256,
    41.74026601554235,
    43.43695667576863,
    238,
    269,
    292,
    290
  ],
  [
    "W06000021",
    37.40271716366486,
    39.65755566675006,
    41.246980854197346,
    43.45550956495078,
    190,
    261,
    272,
    291
  ],
  [
    "E07000223",
    41.13185333217482,
    42.379522225477864,
    42.646451937594364,
    43.45747115164591,
    322,
    325,
    315,
    292
  ],
  [
    "E07000149",
    38.69786829658107,
    40.5934003820216,
    42.31539184075288,
    43.45825403993162,
    275,
    292,
    307,
    293
  ],
  [
    "E07000074",
    36.23736843210992,
    38.27616713661223,
    40.00715271466559,
    43.48484479709228,
    101,
    168,
    204,
    294
  ],
  [
    "E07000200",
    37.32527197578137,
    39.27020544504722,
    41.472626534890686,
    43.558867107362666,
    188,
    229,
    280,
    295
  ],
  [
    "E07000026",
    37.968108360480045,
    39.50115985036885,
    41.45905313038176,
    43.578540167181764,
    227,
    251,
    279,
    296
  ],
  [
    "E07000142",
    36.07123896741655,
    39.45708362853919,
    41.5164398379915,
    43.59781512605042,
    85,
    243,
    283,
    297
  ],
  [
    "E07000196",
    34.63838733485099,
    37.59157526519856,
    40.674074808540375,
    43.624145712145456,
    27,
    106,
    243,
    298
  ],
  [
    "E07000069",
    35.29448474691481,
    37.957543900184845,
    40.940430003233104,
    43.63957346240811,
    42,
    137,
    257,
    299
  ],
  [
    "E06000052",
    39.493946214164374,
    40.88398977651128,
    42.541300210357605,
    43.72369535933628,
    295,
    298,
    313,
    300
  ],
  [
    "E07000038",
    36.49562208874088,
    39.08091626524546,
    41.5628448836034,
    43.732440948062575,
    122,
    221,
    286,
    301
  ],
  [
    "E07000043",
    39.72630025338941,
    41.008254716981135,
    42.472691332068834,
    43.76741541845047,
    301,
    301,
    309,
    302
  ],
  [
    "W06000001",
    36.46535650918714,
    39.297133725722716,
    41.54323297019035,
    43.81166578256943,
    118,
    232,
    285,
    303
  ],
  [
    "E07000198",
    36.923966281978515,
    39.19224724986904,
    41.45038470900759,
    43.85460218730048,
    159,
    226,
    278,
    304
  ],
  [
    "E07000140",
    38.936335907586475,
    41.41564205111432,
    43.2235802098167,
    43.85527359238699,
    281,
    312,
    325,
    305
  ],
  [
    "E07000146",
    38.35813891123625,
    40.72837301283132,
    42.84700723347347,
    43.93020393215373,
    257,
    296,
    316,
    306
  ],
  [
    "E06000011",
    38.30105791644253,
    40.0661371131514,
    41.632124847188265,
    43.93764270046891,
    251,
    272,
    289,
    307
  ],
  [
    "E07000238",
    36.970828905419765,
    39.485528333792125,
    41.325440382402405,
    43.95685114242715,
    166,
    249,
    274,
    308
  ],
  [
    "E07000164",
    37.228546171630626,
    39.20242367012905,
    41.3934255726325,
    43.958043527036125,
    182,
    227,
    276,
    309
  ],
  [
    "E07000063",
    41.578875368058995,
    42.473738113492544,
    43.34266250108479,
    44.15622243646284,
    327,
    327,
    328,
    310
  ],
  [
    "E07000221",
    37.61396670522557,
    40.34630538139526,
    42.06366898407715,
    44.258559156741505,
    209,
    285,
    302,
    311
  ],
  [
    "E07000206",
    39.70917952883834,
    41.306240690953715,
    42.48304285129337,
    44.278853662345774,
    300,
    308,
    310,
    312
  ],
  [
    "E07000144",
    38.355898377779376,
    40.59472961276484,
    42.229671572267605,
    44.34654942798004,
    256,
    293,
    306,
    313
  ],
  [
    "W06000023",
    38.65290820412026,
    40.4891113011115,
    42.18867483992497,
    44.37958729394778,
    272,
    289,
    304,
    314
  ],
  [
    "E07000065",
    41.80771158899184,
    41.99241249020842,
    42.97499000171399,
    44.40622167008025,
    330,
    321,
    319,
    315
  ],
  [
    "E07000030",
    38.234587104072396,
    40.35173646914284,
    42.04792043399638,
    44.579179666692035,
    245,
    286,
    301,
    316
  ],
  [
    "E07000079",
    39.234442523768365,
    41.14077604272291,
    42.38732517047434,
    44.583831034857205,
    291,
    304,
    308,
    317
  ],
  [
    "E07000205",
    39.49718870797704,
    40.23418542187645,
    42.537603779483796,
    44.5900577644049,
    296,
    280,
    312,
    318
  ],
  [
    "E06000027",
    43.535752030133594,
    43.53155238397647,
    43.62045703359906,
    44.60218465321207,
    339,
    339,
    332,
    319
  ],
  [
    "E07000168",
    41.15658119831155,
    42.04076877453611,
    43.13067048149682,
    44.65312566065831,
    323,
    323,
    322,
    320
  ],
  [
    "E06000046",
    41.589116581934675,
    42.70172262937781,
    43.62721313945604,
    44.87851227714895,
    328,
    330,
    334,
    321
  ],
  [
    "E07000163",
    39.79787692639293,
    41.593624100539174,
    42.64290508417697,
    44.92514753920843,
    303,
    316,
    314,
    322
  ],
  [
    "E07000225",
    40.931449461825714,
    43.09112255569368,
    43.73776512803171,
    44.95764275796615,
    319,
    331,
    336,
    323
  ],
  [
    "E07000035",
    38.990597639893416,
    40.908424854207986,
    42.52691693175766,
    44.9778530851004,
    284,
    300,
    311,
    324
  ],
  [
    "W06000003",
    42.57327753276276,
    43.177826590030385,
    43.5046718312301,
    44.97865102232096,
    337,
    332,
    331,
    325
  ],
  [
    "E07000045",
    42.45591845447753,
    42.68691459291692,
    43.25380914194066,
    44.97923039768153,
    334,
    329,
    326,
    326
  ],
  [
    "E07000047",
    39.90536164944526,
    41.32982895740277,
    43.019647973802705,
    45.01946669654361,
    304,
    310,
    321,
    327
  ],
  [
    "E07000046",
    40.33631735438191,
    41.10567054806346,
    42.87603039451813,
    45.04593586992277,
    312,
    303,
    317,
    328
  ],
  [
    "E07000167",
    39.99703939877021,
    41.94396551724138,
    42.944046940420264,
    45.08922532897915,
    307,
    318,
    318,
    329
  ],
  [
    "E06000053",
    38.32109842305601,
    40.0537109375,
    42.19101123595506,
    45.128234226055376,
    253,
    271,
    305,
    330
  ],
  [
    "E07000128",
    40.98168505681119,
    42.43959810642519,
    43.00383450104147,
    45.171579318601566,
    320,
    326,
    320,
    331
  ],
  [
    "E07000051",
    38.68356255262688,
    41.321651549063496,
    43.428132249273666,
    45.312909968203144,
    274,
    309,
    329,
    332
  ],
  [
    "E07000235",
    39.221747989441674,
    41.95472157079807,
    43.20193187172593,
    45.34365746137664,
    290,
    320,
    324,
    333
  ],
  [
    "E07000119",
    41.815562703811366,
    43.19831969464359,
    43.79487459701656,
    45.364487770107054,
    331,
    333,
    337,
    334
  ],
  [
    "E07000091",
    40.12521902421658,
    41.914387744926955,
    43.67200833879607,
    45.62126690165588,
    310,
    317,
    335,
    335
  ],
  [
    "E07000044",
    40.822312416393046,
    41.521014632888544,
    43.28338790070367,
    45.77213134471975,
    318,
    314,
    327,
    336
  ],
  [
    "E07000224",
    44.39744454242094,
    44.83632505392055,
    45.131206883077205,
    45.86263861207346,
    342,
    342,
    340,
    337
  ],
  [
    "E07000031",
    40.60076035227832,
    42.04028504494463,
    43.448277547509186,
    45.86597271797642,
    314,
    322,
    330,
    338
  ],
  [
    "E07000076",
    43.52102621403994,
    44.469312816926035,
    45.2105272655094,
    46.127107962447845,
    338,
    341,
    341,
    339
  ],
  [
    "E07000137",
    39.776064682173555,
    42.28765700214609,
    43.81422811280691,
    46.2726996136392,
    302,
    324,
    338,
    340
  ],
  [
    "E07000052",
    41.575313862135566,
    43.31035067807121,
    44.71884745322245,
    46.59433430045132,
    326,
    334,
    339,
    341
  ],
  [
    "E07000040",
    43.966504919800514,
    45.28852709431878,
    45.99979684997969,
    47.25365590342526,
    340,
    345,
    344,
    342
  ],
  [
    "E07000049",
    41.299801974345336,
    43.527090904470256,
    45.50184986275212,
    47.326193699378194,
    325,
    338,
    342,
    343
  ],
  [
    "E07000048",
    45.310379509186,
    47.00605652759085,
    47.27790915580939,
    47.53172641983582,
    344,
    347,
    347,
    344
  ],
  [
    "E07000064",
    46.557985689212906,
    46.738825704246906,
    46.73877923719885,
    47.546474146686094,
    347,
    346,
    346,
    345
  ],
  [
    "E07000147",
    41.9658351748505,
    43.513088513281964,
    45.67438373570521,
    47.90364929703741,
    332,
    337,
    343,
    346
  ],
  [
    "E07000191",
    44.28642540259196,
    44.947316040567436,
    46.17533059735522,
    48.0971160778659,
    341,
    343,
    345,
    347
  ]
];
let pyramidStore = tweened();
let comparisonStore = tweened();
const Pyramid = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $pyramidStore, $$unsubscribe_pyramidStore;
  let $comparisonStore, $$unsubscribe_comparisonStore;
  $$unsubscribe_pyramidStore = (0, import_index_cf0e86af.d)(pyramidStore, (value) => $pyramidStore = value);
  $$unsubscribe_comparisonStore = (0, import_index_cf0e86af.d)(comparisonStore, (value) => $comparisonStore = value);
  let bars;
  console.log("PYRAMID_STORE", $pyramidStore);
  console.log("COMPARISON_STORE", $comparisonStore);
  let trigger = writable();
  trigger.set("bars");
  let { request, height, width: width2, padding, w, w_change, la_change_blended, country_change_blended, country_change_divided, la_change_divided } = $$props;
  let f = height > width2 ? (height - padding * 1.5) / 18 : (height - padding * 2) / 18;
  if ($$props.request === void 0 && $$bindings.request && request !== void 0)
    $$bindings.request(request);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.w === void 0 && $$bindings.w && w !== void 0)
    $$bindings.w(w);
  if ($$props.w_change === void 0 && $$bindings.w_change && w_change !== void 0)
    $$bindings.w_change(w_change);
  if ($$props.la_change_blended === void 0 && $$bindings.la_change_blended && la_change_blended !== void 0)
    $$bindings.la_change_blended(la_change_blended);
  if ($$props.country_change_blended === void 0 && $$bindings.country_change_blended && country_change_blended !== void 0)
    $$bindings.country_change_blended(country_change_blended);
  if ($$props.country_change_divided === void 0 && $$bindings.country_change_divided && country_change_divided !== void 0)
    $$bindings.country_change_divided(country_change_divided);
  if ($$props.la_change_divided === void 0 && $$bindings.la_change_divided && la_change_divided !== void 0)
    $$bindings.la_change_divided(la_change_divided);
  {
    {
      bars = [];
      let ext = (0, import_d3_array.extent)($pyramidStore[0].concat($pyramidStore[1]));
      for (let i in $pyramidStore[0]) {
        let e = $pyramidStore[0][i];
        bars.push({
          x: width2 / 2 - e * w - f / 2,
          y: f + i * f,
          width: e * w,
          height: f - 4,
          sex: "f",
          value: e,
          agegroup: "",
          fill: (0, import_d3_scale_chromatic.interpolateViridis)(1 - (e - ext[0]) / (ext[1] - ext[0]))
        });
      }
      for (let i in $pyramidStore[1]) {
        ($pyramidStore[0][i] + $pyramidStore[0][i]) / 2;
        bars.push({
          x: width2 / 2 + 4 - f / 2,
          y: f + i * f,
          width: 2 * f,
          height: f - 4,
          sex: "m",
          value: 0,
          agegroup: `${(18 - i) * 5} ${i == 0 ? "+" : "to " + ((18 - i) * 5 + 4)}`,
          fill: "slategrey"
        });
      }
      for (let i in $pyramidStore[1]) {
        let e = $pyramidStore[1][i];
        bars.push({
          x: width2 / 2 + 2 * f + 8 - f / 2,
          y: f + i * f,
          width: e * w,
          height: f - 4,
          sex: "m",
          value: e,
          agegroup: "",
          fill: (0, import_d3_scale_chromatic.interpolateViridis)(1 - (e - ext[0]) / (ext[1] - ext[0]))
        });
      }
    }
  }
  $$unsubscribe_pyramidStore();
  $$unsubscribe_comparisonStore();
  return `${request == "bars" ? `<g transform="${"scale(" + (0, import_index_cf0e86af.e)(f * 18 / height) + ") translate(0," + (0, import_index_cf0e86af.e)(padding / 2) + ")"}">${(0, import_index_cf0e86af.f)(bars, (props) => {
    return `<rect${(0, import_index_cf0e86af.o)([(0, import_index_cf0e86af.p)(props), { rx: "6" }], {})}></rect>
      <text${(0, import_index_cf0e86af.a)("x", props.x + f, 0)}${(0, import_index_cf0e86af.a)("y", props.y + f / 2 + 2, 0)} text-anchor="${"middle"}" fill="${"white"}" font-size="${"18"}">${(0, import_index_cf0e86af.e)(props.agegroup)}</text>`;
  })}<text${(0, import_index_cf0e86af.a)("x", width2 / 2 - 20 - f / 2, 0)}${(0, import_index_cf0e86af.a)("y", 18.5 * f + 2 + f, 0)} fill="${"white"}" text-anchor="${"end"}" font-size="${"18"}" font-weight="${"bold"}">female
    </text><text${(0, import_index_cf0e86af.a)("x", width2 / 2 + 2 * f + 28 - f / 2, 0)}${(0, import_index_cf0e86af.a)("y", 18.5 * f + 2 + f, 0)} fill="${"white"}" text-anchor="${"start"}" font-size="${"18"}" font-weight="${"bold"}">male
    </text></g>` : ``}
${request == "comparison1" || request == "comparison2" ? `` : ``}`;
});
const App$1 = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $pyramidStore, $$unsubscribe_pyramidStore;
  $$unsubscribe_pyramidStore = (0, import_index_cf0e86af.d)(pyramidStore, (value) => $pyramidStore = value);
  rankings.map((e) => e[0]);
  let { animation, data, height, padding, width: width2 } = $$props;
  let makeDataPyramid = (d) => {
    let bars = [[], []];
    let f = d[1], m = d[0];
    for (let i in f) {
      bars[0].push(+f[i]);
    }
    for (let i in m) {
      bars[1].push(+m[i]);
    }
    bars[0].reverse();
    bars[1].reverse();
    return bars;
  };
  pyramidStore.set(makeDataPyramid(data.LA.PYRAMID01));
  let la_change = data.LA.PYRAMID11.map((e, i) => e.map((el, ii) => el - data.LA.PYRAMID01[i][ii]));
  let la_change_blended = la_change[0].map((e, i) => e + la_change[1][i]);
  let arr = [
    data.LA.PYRAMID01.flat(),
    data.LA.PYRAMID11.flat(),
    data.COUNTRY.PYRAMID01.flat(),
    data.COUNTRY.PYRAMID01.flat()
  ];
  let w = (width2 - padding * 2) / 2 / Math.max(...arr.flat());
  let country_change = data.COUNTRY.PYRAMID11.map((e, i) => e.map((el, ii) => el - data.COUNTRY.PYRAMID01[i][ii]));
  let country_change_blended = country_change[0].map((e, i) => e + country_change[1][i]);
  let arr_blended = [la_change_blended, country_change_blended];
  let w_change = (width2 - padding * 2) / 2 / Math.max(...arr_blended.flat());
  let la_change_divided = [[], []];
  la_change_blended.forEach((e, i) => {
    if (e >= 0) {
      la_change_divided[0][i] = e;
      la_change_divided[1][i] = 0;
    } else {
      la_change_divided[0][i] = 0;
      la_change_divided[1][i] = Math.abs(e);
    }
  });
  la_change_divided[0] = la_change_divided[0].map((e) => e / w * w_change);
  la_change_divided[1] = la_change_divided[1].map((e) => e / w_change * w);
  console.log("LA_CHANGE_DIVIDED", w, w_change, la_change_divided);
  let country_change_divided = [[], []];
  country_change_blended.forEach((e, i) => {
    if (e >= 0) {
      country_change_divided[0][i] = e;
      country_change_divided[1][i] = 0;
    } else {
      country_change_divided[0][i] = 0;
      country_change_divided[1][i] = Math.abs(e);
    }
  });
  country_change_divided[0] = country_change_divided[0].map((e) => e / w * w_change);
  country_change_divided[1] = country_change_divided[1].map((e) => e / w_change * w);
  console.log("COUNTRY_CHANGE_DIVIDED", w, w_change, country_change_divided);
  data.LA.PYRAMID01;
  data.COUNTRY.PYRAMID01;
  data.COUNTRY.PYRAMID11;
  let stepPrev;
  let request;
  function change(stp) {
    if (stp != stepPrev) {
      if (stp == 12) {
        request = "bars";
        pyramidStore.set(makeDataPyramid(data.LA.PYRAMID01), { easing: sineInOut });
      }
      if (stp == 13) {
        request = "bars";
        pyramidStore.set(makeDataPyramid(data.LA.PYRAMID11), { easing: sineInOut });
      }
      if (stp == 14) {
        request = "bars";
        pyramidStore.set(makeDataPyramid(data.COUNTRY.PYRAMID11), { easing: sineInOut });
      }
      if (stp == 15) {
        request = "bars";
        pyramidStore.set(makeDataPyramid(country_change_divided), { easing: sineInOut });
      }
      if (stp == 16) {
        request = "bars";
        pyramidStore.set(makeDataPyramid(la_change_divided), { easing: sineInOut });
      }
      if (stp >= 17) {
        request = "comparison2";
      } else {
        request = "bars";
      }
      stepPrev = stp;
    }
  }
  console.log("COUNTRY_CHANGE", country_change);
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    animation && change(animation);
    $$rendered = `${animation ? `${(0, import_index_cf0e86af.v)(Pyramid, "Pyramid").$$render($$result, {
      height,
      padding,
      width: width2,
      w,
      w_change,
      la_change_blended,
      country_change_blended,
      country_change_divided,
      la_change_divided,
      request,
      pyramid: $pyramidStore
    }, {
      pyramid: ($$value) => {
        $pyramidStore = $$value;
        $$settled = false;
      }
    }, {})}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_pyramidStore();
  return $$rendered;
});
const ordinal = (i) => {
  if (i < 10) {
    return [
      "",
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth"
    ][i];
  }
  const j = i % 10;
  const k2 = i % 100;
  if (j === 1 && k2 !== 11) {
    return i + "st";
  }
  if (j === 2 && k2 !== 12) {
    return i + "nd";
  }
  if (j === 3 && k2 !== 13) {
    return i + "rd";
  }
  return i + "th";
};
const numberWithCommas = (x2) => x2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const possessive = (s) => {
  if (s[s.length - 1] === "s") {
    return s + "'";
  }
  return s + "'s";
};
const createText = (template, dict) => {
  if (typeof template !== "string") {
    throw new TypeError(`Expected a string, got ${typeof template} here: ${template}`);
  }
  let at = 1;
  let ch = template.charAt(0);
  const getCh = function() {
    return ch;
  };
  const error = function(m) {
    throw JSON.stringify({
      name: "Robo-journalist error",
      message: m,
      at,
      text: template
    });
  };
  const next = function(c) {
    if (c && c !== ch) {
      error("Expected '" + c + "' instead of '" + ch + "'");
    }
    ch = template.charAt(at);
    at += 1;
    return ch;
  };
  const getValue = function(key) {
    const parts = key.split(".");
    let d = dict;
    for (const part of parts) {
      try {
        d = d[part];
      } catch {
        error(`${key} is not in the data dictionary.`);
      }
    }
    return d;
  };
  const rpn = function(key) {
    const tokens = key.split(" ");
    const operators = {
      "+": (a2, b2) => a2 + b2,
      "-": (a2, b2) => a2 - b2,
      "*": (a2, b2) => a2 * b2,
      "/": (a2, b2) => a2 / b2,
      "<": (a2, b2) => a2 < b2,
      ">": (a2, b2) => a2 > b2,
      "<=": (a2, b2) => a2 <= b2,
      ">=": (a2, b2) => a2 >= b2,
      "===": (a2, b2) => a2 === b2
    };
    const stack = [];
    for (const token of tokens) {
      if (/^-?\d+$/.test(token)) {
        stack.push(Number(token));
      } else if (token in operators) {
        const b2 = Number(stack.pop());
        const a2 = Number(stack.pop());
        stack.push(operators[token](a2, b2));
      } else if (token === "'") {
        stack[stack.length - 1] = possessive(stack[stack.length - 1]);
      } else if (token === ",") {
        stack[stack.length - 1] = numberWithCommas(stack[stack.length - 1]);
      } else if (token === ".0") {
        stack[stack.length - 1] = stack[stack.length - 1].toFixed(0);
      } else if (token === ".1") {
        stack[stack.length - 1] = stack[stack.length - 1].toFixed(1);
      } else if (token === ".2") {
        stack[stack.length - 1] = stack[stack.length - 1].toFixed(2);
      } else if (token === ".-2") {
        stack[stack.length - 1] = (stack[stack.length - 1] / 100).toFixed(0) * 100;
      } else if (token === "~abs") {
        stack[stack.length - 1] = Math.abs(stack[stack.length - 1]);
      } else if (token === "~ord") {
        stack[stack.length - 1] = ordinal(Number(stack[stack.length - 1]));
      } else if (token === "~ord'") {
        let result2 = ordinal(Number(stack.pop()));
        if (result2 === "first") {
          result2 = "";
        } else {
          result2 += " ";
        }
        stack.push(result2);
      } else if (token.charAt(0) === "^") {
        stack[stack.length - 1] = getValue(token.slice(1))(stack[stack.length - 1]);
      } else {
        stack.push(getValue(token));
      }
    }
    if (stack.length !== 1) {
      error("Invalid RPN");
    }
    return stack[0];
  };
  const eitherOr = function(which) {
    next("?");
    const first = parse2();
    next(":");
    const second = parse2();
    next("}");
    return which ? first : second;
  };
  const braced = function() {
    next("{");
    if (ch === ":") {
      next(":");
      next("}");
      return ":";
    }
    if (ch === "?") {
      next("?");
      next("}");
      return "?";
    }
    let varName = "";
    while (getCh()) {
      if (ch === "}") {
        next("}");
        return rpn(varName);
      }
      if (ch === "?") {
        return eitherOr(rpn(varName));
      }
      varName += ch;
      next();
    }
    error("Braces not closed");
  };
  const parse2 = function() {
    let result2 = "";
    while (getCh()) {
      if (ch === ":" || ch === "}") {
        return result2;
      }
      if (ch === "{") {
        result2 += braced();
        continue;
      }
      result2 += ch;
      next();
    }
    return result2;
  };
  const result = parse2();
  if (ch !== "") {
    error(`Didn't expect '${ch}'`);
  }
  return result;
};
var Component_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".container.svelte-12dbwcg{width:100%;height:100vh}.tooltip.svelte-12dbwcg{position:fixed;text-align:center;width:fit-content;height:fit-content;padding:4px;font:12px sans-serif;background:lightsteelblue;border:0px;border-radius:8px;pointer-events:none}.title_over.svelte-12dbwcg{z-index:10000;position:fixed;margin:0 5% 0 5% \n  }",
  map: null
};
const Component = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $tracker, $$unsubscribe_tracker;
  let $$unsubscribe_story_json;
  let $all_data, $$unsubscribe_all_data;
  $$unsubscribe_tracker = (0, import_index_cf0e86af.d)(tracker, (value) => $tracker = value);
  $$unsubscribe_story_json = (0, import_index_cf0e86af.d)(story_json, (value) => value);
  $$unsubscribe_all_data = (0, import_index_cf0e86af.d)(all_data, (value) => $all_data = value);
  let { height, width: width2, count = 0, index = 0, offset = 0, progress = 0, family = "", component, animation = "", padding = 50, country, data } = $$props;
  let components = { Animated_charts: App$3, Football: App$2, Pyramids: App$1 };
  function updateStep(stp) {
    tracker.set(stp);
    return $tracker;
  }
  function getPadding() {
    padding = Math.min(...[height / 10, width2 / 10]);
    return padding;
  }
  if (height)
    getPadding();
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.width === void 0 && $$bindings.width && width2 !== void 0)
    $$bindings.width(width2);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.family === void 0 && $$bindings.family && family !== void 0)
    $$bindings.family(family);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.country === void 0 && $$bindings.country && country !== void 0)
    $$bindings.country(country);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css$c);
  $$unsubscribe_tracker();
  $$unsubscribe_story_json();
  $$unsubscribe_all_data();
  return `<div class="${"container svelte-12dbwcg"}"${(0, import_index_cf0e86af.a)("family", family, 0)}${(0, import_index_cf0e86af.a)("component", component, 0)}>${height ? `${animation ? `<h3 class="${"title_over svelte-12dbwcg"}"${(0, import_index_cf0e86af.a)("x", getPadding(), 0)}${(0, import_index_cf0e86af.a)("y", padding / 2, 0)}>${(0, import_index_cf0e86af.e)(createText(animation.section.actions["data-title"], $all_data))}</h3>` : ``}
  <svg${(0, import_index_cf0e86af.a)("height", height, 0)}${(0, import_index_cf0e86af.a)("width", width2, 0)}${(0, import_index_cf0e86af.a)("count", count, 0)}${(0, import_index_cf0e86af.a)("index", index, 0)}${(0, import_index_cf0e86af.a)("offset", offset, 0)}${(0, import_index_cf0e86af.a)("progress", progress, 0)}${(0, import_index_cf0e86af.a)("animation", animation, 0)}>${animation && $all_data ? `
  ${(0, import_index_cf0e86af.v)(components[component] || import_index_cf0e86af.m, "svelte:component").$$render($$result, {
    progress,
    offset,
    index,
    count,
    height,
    width: width2,
    padding,
    country,
    data,
    family,
    component,
    animation: updateStep(animation.section.actions["data-id"])
  }, {}, {})}` : ``}</svg>` : ``}
<div class="${"tooltip svelte-12dbwcg"}" style="${"opacity:0"}"></div>
</div>`;
});
var Header_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".short.svelte-19u0sv3{min-height:85vh}.v-padded.svelte-19u0sv3{box-sizing:border-box;padding:40px 0}",
  map: null
};
const Header = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { theme = (0, import_index_cf0e86af.g)("theme") } = $$props;
  let { bgimage = null } = $$props;
  let { bgcolor = null } = $$props;
  let { bgfixed = false } = $$props;
  let { center = true } = $$props;
  let { short = false } = $$props;
  let style = "";
  if (bgimage) {
    style += `background-image: url(${bgimage});`;
  } else {
    style += "background-image: none;";
  }
  if (bgfixed) {
    style += " background-attachment: fixed;";
  }
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.bgimage === void 0 && $$bindings.bgimage && bgimage !== void 0)
    $$bindings.bgimage(bgimage);
  if ($$props.bgcolor === void 0 && $$bindings.bgcolor && bgcolor !== void 0)
    $$bindings.bgcolor(bgcolor);
  if ($$props.bgfixed === void 0 && $$bindings.bgfixed && bgfixed !== void 0)
    $$bindings.bgfixed(bgfixed);
  if ($$props.center === void 0 && $$bindings.center && center !== void 0)
    $$bindings.center(center);
  if ($$props.short === void 0 && $$bindings.short && short !== void 0)
    $$bindings.short(short);
  $$result.css.add(css$b);
  return `<header style="${"color:white; background-color: " + (0, import_index_cf0e86af.e)(bgcolor ? bgcolor : theme["background"]) + "; " + (0, import_index_cf0e86af.e)(style)}" class="${["svelte-19u0sv3", short ? "short" : ""].join(" ").trim()}"><div class="${[
    "v-padded col-wide middle svelte-19u0sv3",
    (short ? "short" : "") + " " + (!short ? "height-full" : "")
  ].join(" ").trim()}" style="${"position: relative"}"><div${(0, import_index_cf0e86af.r)((center ? "center" : "").trim())}>${slots.default ? slots.default({}) : ``}</div></div></header>`;
});
var Filler_svelte_svelte_type_style_lang = "";
const css$a = {
  code: "section.svelte-1odf9sx{padding:36px 0}",
  map: null
};
const Filler = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { theme = (0, import_index_cf0e86af.g)("theme") } = $$props;
  let { center = true } = $$props;
  let { wide = true } = $$props;
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.center === void 0 && $$bindings.center && center !== void 0)
    $$bindings.center(center);
  if ($$props.wide === void 0 && $$bindings.wide && wide !== void 0)
    $$bindings.wide(wide);
  $$result.css.add(css$a);
  return `<section style="${"color: " + (0, import_index_cf0e86af.e)(theme["text"]) + "; background-color: " + (0, import_index_cf0e86af.e)(theme["background"]) + ";"}" class="${"svelte-1odf9sx"}"><div class="${[
    "middle",
    (center ? "center" : "") + " " + (!wide ? "col-medium" : "") + " " + (wide ? "col-wide" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div></section>`;
});
var Divider_svelte_svelte_type_style_lang = "";
var Toggle_svelte_svelte_type_style_lang = "";
var Arrow_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".arrow.svelte-1prdo3z{width:48px;height:48px}.left.svelte-1prdo3z{margin-right:10px}.bounce.svelte-1prdo3z{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:svelte-1prdo3z-bounce;animation-name:svelte-1prdo3z-bounce;-webkit-animation-timing-function:ease;animation-timing-function:ease}@-webkit-keyframes svelte-1prdo3z-bounce{0%{-webkit-transform:translateY(10px);transform:translateY(10px)}30%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}50%{-webkit-transform:translateY(10px);transform:translateY(10px)}100%{-webkit-transform:translateY(10px);transform:translateY(10px)}}@keyframes svelte-1prdo3z-bounce{0%{-webkit-transform:translateY(10px);transform:translateY(10px)}30%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}50%{-webkit-transform:translateY(10px);transform:translateY(10px)}100%{-webkit-transform:translateY(10px);transform:translateY(10px)}}",
  map: null
};
const Arrow = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { color = "black" } = $$props;
  let { animation = true } = $$props;
  let { center = true } = $$props;
  const colors = ["black", "white"];
  color = colors.includes(color) ? color : "black";
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.center === void 0 && $$bindings.center && center !== void 0)
    $$bindings.center(center);
  $$result.css.add(css$9);
  return `${center ? `${slots.default ? slots.default({}) : ``}<br>
<img src="${(0, import_index_cf0e86af.e)(import_paths_6758d194.a) + "/img/scroll-down-" + (0, import_index_cf0e86af.e)(color) + ".svg"}" class="${["arrow svelte-1prdo3z", animation ? "bounce" : ""].join(" ").trim()}" alt="${""}" aria-hidden="${"true"}">` : `<img src="${(0, import_index_cf0e86af.e)(import_paths_6758d194.a) + "/img/scroll-down-" + (0, import_index_cf0e86af.e)(color) + ".svg"}" class="${["arrow left svelte-1prdo3z", animation ? "bounce" : ""].join(" ").trim()}" alt="${""}" aria-hidden="${"true"}">${slots.default ? slots.default({}) : ``}`}`;
});
var Scroller_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: "svelte-scroller-outer.svelte-6siu2r{display:block;position:relative;max-width:100%}svelte-scroller-background.svelte-6siu2r{display:block;position:relative;width:100%}svelte-scroller-foreground.svelte-6siu2r{display:block;position:relative;z-index:2;pointer-events:none\r\n	}svelte-scroller-foreground.svelte-6siu2r::after{content:' ';display:block;clear:both}svelte-scroller-background-container.svelte-6siu2r{display:block;position:absolute;width:100%;max-width:100%;pointer-events:none;will-change:transform}",
  map: null
};
const handlers = [];
if (typeof window !== "undefined") {
  const run_all = () => handlers.forEach((fn) => fn());
  window.addEventListener("scroll", run_all);
  window.addEventListener("resize", run_all);
}
if (typeof IntersectionObserver !== "undefined") {
  const map = new Map();
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const update = map.get(entry.target);
      const index = handlers.indexOf(update);
      if (entry.isIntersecting) {
        if (index === -1)
          handlers.push(update);
      } else {
        update();
        if (index !== -1)
          handlers.splice(index, 1);
      }
    });
  }, {
    rootMargin: "400px 0px"
  });
}
const Scroller = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { top: top2 = 0 } = $$props;
  let { bottom: bottom2 = 1 } = $$props;
  let { threshold: threshold2 = 0.5 } = $$props;
  let { query = "section" } = $$props;
  let { parallax = false } = $$props;
  let { index = 0 } = $$props;
  let { count = 0 } = $$props;
  let { offset = 0 } = $$props;
  let { progress = 0 } = $$props;
  let { visible = false } = $$props;
  let { splitscreen = false } = $$props;
  let { id = null } = $$props;
  let outer;
  let bgContainer;
  let foreground;
  let background;
  if ($$props.top === void 0 && $$bindings.top && top2 !== void 0)
    $$bindings.top(top2);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom2 !== void 0)
    $$bindings.bottom(bottom2);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold2 !== void 0)
    $$bindings.threshold(threshold2);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  if ($$props.parallax === void 0 && $$bindings.parallax && parallax !== void 0)
    $$bindings.parallax(parallax);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.splitscreen === void 0 && $$bindings.splitscreen && splitscreen !== void 0)
    $$bindings.splitscreen(splitscreen);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$8);
  return `

<svelte-scroller-outer class="${["svelte-6siu2r", splitscreen ? "splitscreen" : ""].join(" ").trim()}"${(0, import_index_cf0e86af.a)("this", outer, 0)}><svelte-scroller-background-container class="${"background-container svelte-6siu2r"}"${(0, import_index_cf0e86af.a)("this", bgContainer, 0)}><svelte-scroller-background class="${"svelte-6siu2r"}"${(0, import_index_cf0e86af.a)("this", background, 0)}>${slots.background ? slots.background({}) : ``}</svelte-scroller-background></svelte-scroller-background-container>

	<svelte-scroller-foreground class="${"svelte-6siu2r"}"${(0, import_index_cf0e86af.a)("this", foreground, 0)}>${slots.foreground ? slots.foreground({}) : ``}</svelte-scroller-foreground>
</svelte-scroller-outer>`;
});
function isOutOfViewport(parent, container) {
  const parentBounding = parent.getBoundingClientRect();
  const boundingContainer = container.getBoundingClientRect();
  const out = {};
  out.top = parentBounding.top < 0;
  out.left = parentBounding.left < 0;
  out.bottom = parentBounding.bottom + boundingContainer.height > (window.innerHeight || document.documentElement.clientHeight);
  out.right = parentBounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  return out;
}
var Item_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".item.svelte-3e0qet{cursor:default;height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--itemPadding, 0 20px);color:var(--itemColor, inherit);text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.groupHeader.svelte-3e0qet{text-transform:var(--groupTitleTextTransform, uppercase)}.groupItem.svelte-3e0qet{padding-left:var(--groupItemPaddingLeft, 40px)}.item.svelte-3e0qet:active{background:var(--itemActiveBackground, #b9daff)}.item.active.svelte-3e0qet{background:var(--itemIsActiveBG, #007aff);color:var(--itemIsActiveColor, #fff)}.item.notSelectable.svelte-3e0qet{color:var(--itemIsNotSelectableColor, #999)}.item.first.svelte-3e0qet{border-radius:var(--itemFirstBorderRadius, 4px 4px 0 0)}.item.hover.svelte-3e0qet:not(.active){background:var(--itemHoverBG, #e7f2ff);color:var(--itemHoverColor, inherit)}",
  map: null
};
const Item = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { isActive = false } = $$props;
  let { isFirst = false } = $$props;
  let { isHover = false } = $$props;
  let { isSelectable = false } = $$props;
  let { getOptionLabel = void 0 } = $$props;
  let { item = void 0 } = $$props;
  let { filterText = "" } = $$props;
  let itemClasses = "";
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  if ($$props.isFirst === void 0 && $$bindings.isFirst && isFirst !== void 0)
    $$bindings.isFirst(isFirst);
  if ($$props.isHover === void 0 && $$bindings.isHover && isHover !== void 0)
    $$bindings.isHover(isHover);
  if ($$props.isSelectable === void 0 && $$bindings.isSelectable && isSelectable !== void 0)
    $$bindings.isSelectable(isSelectable);
  if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0)
    $$bindings.getOptionLabel(getOptionLabel);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  $$result.css.add(css$7);
  {
    {
      const classes = [];
      if (isActive) {
        classes.push("active");
      }
      if (isFirst) {
        classes.push("first");
      }
      if (isHover) {
        classes.push("hover");
      }
      if (item.isGroupHeader) {
        classes.push("groupHeader");
      }
      if (item.isGroupItem) {
        classes.push("groupItem");
      }
      if (!isSelectable) {
        classes.push("notSelectable");
      }
      itemClasses = classes.join(" ");
    }
  }
  return `<div class="${"item " + (0, import_index_cf0e86af.e)(itemClasses) + " svelte-3e0qet"}"><!-- HTML_TAG_START -->${getOptionLabel(item, filterText)}<!-- HTML_TAG_END --></div>`;
});
var List_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".listContainer.svelte-1uyqfml{box-shadow:var(--listShadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));border-radius:var(--listBorderRadius, 4px);max-height:var(--listMaxHeight, 250px);overflow-y:auto;background:var(--listBackground, #fff);border:var(--listBorder, none);position:var(--listPosition, absolute);z-index:var(--listZIndex, 2);width:100%;left:var(--listLeft, 0);right:var(--listRight, 0)}.virtualList.svelte-1uyqfml{height:var(--virtualListHeight, 200px)}.listGroupTitle.svelte-1uyqfml{color:var(--groupTitleColor, #8f8f8f);cursor:default;font-size:var(--groupTitleFontSize, 12px);font-weight:var(--groupTitleFontWeight, 600);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--groupTitlePadding, 0 20px);text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:var(--groupTitleTextTransform, uppercase)}.empty.svelte-1uyqfml{text-align:var(--listEmptyTextAlign, center);padding:var(--listEmptyPadding, 20px 0);color:var(--listEmptyColor, #78848f)}",
  map: null
};
function isItemActive(item, value, optionIdentifier) {
  return value && value[optionIdentifier] === item[optionIdentifier];
}
function isItemFirst(itemIndex) {
  return itemIndex === 0;
}
function isItemHover(hoverItemIndex, item, itemIndex, items2) {
  return isItemSelectable(item) && (hoverItemIndex === itemIndex || items2.length === 1);
}
function isItemSelectable(item) {
  return item.isGroupHeader && item.isSelectable || item.selectable || !item.hasOwnProperty("selectable");
}
const List = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_cf0e86af.t)();
  let { container = void 0 } = $$props;
  let { VirtualList: VirtualList2 = null } = $$props;
  let { Item: Item$1 = Item } = $$props;
  let { isVirtualList = false } = $$props;
  let { items: items2 = [] } = $$props;
  let { labelIdentifier = "label" } = $$props;
  let { getOptionLabel = (option, filterText2) => {
    if (option)
      return option.isCreator ? `Create "${filterText2}"` : option[labelIdentifier];
  } } = $$props;
  let { getGroupHeaderLabel = null } = $$props;
  let { itemHeight = 40 } = $$props;
  let { hoverItemIndex = 0 } = $$props;
  let { value = void 0 } = $$props;
  let { optionIdentifier = "value" } = $$props;
  let { hideEmptyState = false } = $$props;
  let { noOptionsMessage = "No options" } = $$props;
  let { isMulti = false } = $$props;
  let { activeItemIndex = 0 } = $$props;
  let { filterText = "" } = $$props;
  let { parent = null } = $$props;
  let { listPlacement = null } = $$props;
  let { listAutoWidth = null } = $$props;
  let { listOffset = 5 } = $$props;
  let listStyle;
  function computePlacement() {
    const { height, width: width2 } = parent.getBoundingClientRect();
    listStyle = "";
    listStyle += `min-width:${width2}px;width:${listAutoWidth ? "auto" : "100%"};`;
    if (listPlacement === "top" || listPlacement === "auto" && isOutOfViewport(parent, container).bottom) {
      listStyle += `bottom:${height + listOffset}px;`;
    } else {
      listStyle += `top:${height + listOffset}px;`;
    }
  }
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.VirtualList === void 0 && $$bindings.VirtualList && VirtualList2 !== void 0)
    $$bindings.VirtualList(VirtualList2);
  if ($$props.Item === void 0 && $$bindings.Item && Item$1 !== void 0)
    $$bindings.Item(Item$1);
  if ($$props.isVirtualList === void 0 && $$bindings.isVirtualList && isVirtualList !== void 0)
    $$bindings.isVirtualList(isVirtualList);
  if ($$props.items === void 0 && $$bindings.items && items2 !== void 0)
    $$bindings.items(items2);
  if ($$props.labelIdentifier === void 0 && $$bindings.labelIdentifier && labelIdentifier !== void 0)
    $$bindings.labelIdentifier(labelIdentifier);
  if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0)
    $$bindings.getOptionLabel(getOptionLabel);
  if ($$props.getGroupHeaderLabel === void 0 && $$bindings.getGroupHeaderLabel && getGroupHeaderLabel !== void 0)
    $$bindings.getGroupHeaderLabel(getGroupHeaderLabel);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0)
    $$bindings.itemHeight(itemHeight);
  if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0)
    $$bindings.hoverItemIndex(hoverItemIndex);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.optionIdentifier === void 0 && $$bindings.optionIdentifier && optionIdentifier !== void 0)
    $$bindings.optionIdentifier(optionIdentifier);
  if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0)
    $$bindings.hideEmptyState(hideEmptyState);
  if ($$props.noOptionsMessage === void 0 && $$bindings.noOptionsMessage && noOptionsMessage !== void 0)
    $$bindings.noOptionsMessage(noOptionsMessage);
  if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0)
    $$bindings.isMulti(isMulti);
  if ($$props.activeItemIndex === void 0 && $$bindings.activeItemIndex && activeItemIndex !== void 0)
    $$bindings.activeItemIndex(activeItemIndex);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  if ($$props.parent === void 0 && $$bindings.parent && parent !== void 0)
    $$bindings.parent(parent);
  if ($$props.listPlacement === void 0 && $$bindings.listPlacement && listPlacement !== void 0)
    $$bindings.listPlacement(listPlacement);
  if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0)
    $$bindings.listAutoWidth(listAutoWidth);
  if ($$props.listOffset === void 0 && $$bindings.listOffset && listOffset !== void 0)
    $$bindings.listOffset(listOffset);
  $$result.css.add(css$6);
  {
    {
      if (parent && container)
        computePlacement();
    }
  }
  return `

<div class="${["listContainer svelte-1uyqfml", isVirtualList ? "virtualList" : ""].join(" ").trim()}"${(0, import_index_cf0e86af.a)("style", listStyle, 0)}${(0, import_index_cf0e86af.a)("this", container, 0)}>${isVirtualList ? `${(0, import_index_cf0e86af.v)(VirtualList2 || import_index_cf0e86af.m, "svelte:component").$$render($$result, { items: items2, itemHeight }, {}, {
    default: ({ item, i }) => {
      return `<div class="${"listItem"}">${(0, import_index_cf0e86af.v)(Item$1 || import_index_cf0e86af.m, "svelte:component").$$render($$result, {
        item,
        filterText,
        getOptionLabel,
        isFirst: isItemFirst(i),
        isActive: isItemActive(item, value, optionIdentifier),
        isHover: isItemHover(hoverItemIndex, item, i, items2),
        isSelectable: isItemSelectable(item)
      }, {}, {})}</div>`;
    }
  })}` : `${items2.length ? (0, import_index_cf0e86af.f)(items2, (item, i) => {
    return `${item.isGroupHeader && !item.isSelectable ? `<div class="${"listGroupTitle svelte-1uyqfml"}">${(0, import_index_cf0e86af.e)(getGroupHeaderLabel(item))}</div>` : `<div class="${"listItem"}" tabindex="${"-1"}">${(0, import_index_cf0e86af.v)(Item$1 || import_index_cf0e86af.m, "svelte:component").$$render($$result, {
      item,
      filterText,
      getOptionLabel,
      isFirst: isItemFirst(i),
      isActive: isItemActive(item, value, optionIdentifier),
      isHover: isItemHover(hoverItemIndex, item, i, items2),
      isSelectable: isItemSelectable(item)
    }, {}, {})}
                </div>`}`;
  }) : `${!hideEmptyState ? `<div class="${"empty svelte-1uyqfml"}">${(0, import_index_cf0e86af.e)(noOptionsMessage)}</div>` : ``}`}`}</div>`;
});
var Selection_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".selection.svelte-pu1q1n{text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap}",
  map: null
};
const Selection = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { getSelectionLabel = void 0 } = $$props;
  let { item = void 0 } = $$props;
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$5);
  return `<div class="${"selection svelte-pu1q1n"}"><!-- HTML_TAG_START -->${getSelectionLabel(item)}<!-- HTML_TAG_END --></div>`;
});
var MultiSelection_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".multiSelectItem.svelte-liu9pa.svelte-liu9pa{background:var(--multiItemBG, #ebedef);margin:var(--multiItemMargin, 5px 5px 0 0);border-radius:var(--multiItemBorderRadius, 16px);height:var(--multiItemHeight, 32px);line-height:var(--multiItemHeight, 32px);display:flex;cursor:default;padding:var(--multiItemPadding, 0 10px 0 15px);max-width:100%}.multiSelectItem_label.svelte-liu9pa.svelte-liu9pa{margin:var(--multiLabelMargin, 0 5px 0 0);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.multiSelectItem.svelte-liu9pa.svelte-liu9pa:hover,.multiSelectItem.active.svelte-liu9pa.svelte-liu9pa{background-color:var(--multiItemActiveBG, #006fff);color:var(--multiItemActiveColor, #fff)}.multiSelectItem.disabled.svelte-liu9pa.svelte-liu9pa:hover{background:var(--multiItemDisabledHoverBg, #ebedef);color:var(--multiItemDisabledHoverColor, #c1c6cc)}.multiSelectItem_clear.svelte-liu9pa.svelte-liu9pa{border-radius:var(--multiClearRadius, 50%);background:var(--multiClearBG, #52616f);min-width:var(--multiClearWidth, 16px);max-width:var(--multiClearWidth, 16px);height:var(--multiClearHeight, 16px);position:relative;top:var(--multiClearTop, 8px);text-align:var(--multiClearTextAlign, center);padding:var(--multiClearPadding, 1px)}.multiSelectItem_clear.svelte-liu9pa.svelte-liu9pa:hover,.active.svelte-liu9pa .multiSelectItem_clear.svelte-liu9pa{background:var(--multiClearHoverBG, #fff)}.multiSelectItem_clear.svelte-liu9pa:hover svg.svelte-liu9pa,.active.svelte-liu9pa .multiSelectItem_clear svg.svelte-liu9pa{fill:var(--multiClearHoverFill, #006fff)}.multiSelectItem_clear.svelte-liu9pa svg.svelte-liu9pa{fill:var(--multiClearFill, #ebedef);vertical-align:top}",
  map: null
};
const MultiSelection = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  (0, import_index_cf0e86af.t)();
  let { value = [] } = $$props;
  let { activeValue = void 0 } = $$props;
  let { isDisabled = false } = $$props;
  let { multiFullItemClearable = false } = $$props;
  let { getSelectionLabel = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.activeValue === void 0 && $$bindings.activeValue && activeValue !== void 0)
    $$bindings.activeValue(activeValue);
  if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0)
    $$bindings.isDisabled(isDisabled);
  if ($$props.multiFullItemClearable === void 0 && $$bindings.multiFullItemClearable && multiFullItemClearable !== void 0)
    $$bindings.multiFullItemClearable(multiFullItemClearable);
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  $$result.css.add(css$4);
  return `${(0, import_index_cf0e86af.f)(value, (item, i) => {
    return `<div class="${"multiSelectItem " + (0, import_index_cf0e86af.e)(activeValue === i ? "active" : "") + " " + (0, import_index_cf0e86af.e)(isDisabled ? "disabled" : "") + " svelte-liu9pa"}"><div class="${"multiSelectItem_label svelte-liu9pa"}"><!-- HTML_TAG_START -->${getSelectionLabel(item)}<!-- HTML_TAG_END --></div>
        ${!isDisabled && !multiFullItemClearable ? `<div class="${"multiSelectItem_clear svelte-liu9pa"}"><svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" aria-hidden="${"true"}" role="${"presentation"}" class="${"svelte-liu9pa"}"><path d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg>
            </div>` : ``}
    </div>`;
  })}`;
});
var VirtualList_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "svelte-virtual-list-viewport.svelte-g2cagw{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;display:block}svelte-virtual-list-contents.svelte-g2cagw,svelte-virtual-list-row.svelte-g2cagw{display:block}svelte-virtual-list-row.svelte-g2cagw{overflow:hidden}",
  map: null
};
const VirtualList = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let { items: items2 = void 0 } = $$props;
  let { height = "100%" } = $$props;
  let { itemHeight = 40 } = $$props;
  let { hoverItemIndex = 0 } = $$props;
  let { start = 0 } = $$props;
  let { end = 0 } = $$props;
  let viewport;
  let contents;
  let visible;
  let top2 = 0;
  let bottom2 = 0;
  if ($$props.items === void 0 && $$bindings.items && items2 !== void 0)
    $$bindings.items(items2);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0)
    $$bindings.itemHeight(itemHeight);
  if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0)
    $$bindings.hoverItemIndex(hoverItemIndex);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  $$result.css.add(css$3);
  visible = items2.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  });
  return `<svelte-virtual-list-viewport style="${"height: " + (0, import_index_cf0e86af.e)(height) + ";"}" class="${"svelte-g2cagw"}"${(0, import_index_cf0e86af.a)("this", viewport, 0)}><svelte-virtual-list-contents style="${"padding-top: " + (0, import_index_cf0e86af.e)(top2) + "px; padding-bottom: " + (0, import_index_cf0e86af.e)(bottom2) + "px;"}" class="${"svelte-g2cagw"}"${(0, import_index_cf0e86af.a)("this", contents, 0)}>${(0, import_index_cf0e86af.f)(visible, (row) => {
    return `<svelte-virtual-list-row class="${"svelte-g2cagw"}">${slots.default ? slots.default({
      item: row.data,
      i: row.index,
      hoverItemIndex
    }) : `Missing template`}
            </svelte-virtual-list-row>`;
  })}</svelte-virtual-list-contents></svelte-virtual-list-viewport>`;
});
const ClearIcon = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" aria-hidden="${"true"}" role="${"presentation"}"><path fill="${"currentColor"}" d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg>`;
});
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    let context = this;
    let args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
  };
}
var Select_svelte_svelte_type_style_lang$1 = "";
const { Object: Object_1 } = import_index_cf0e86af.k;
const css$2 = {
  code: ".selectContainer.svelte-17l1npl.svelte-17l1npl{--internalPadding:0 16px;border:var(--border, 1px solid #d8dbdf);border-radius:var(--borderRadius, 3px);box-sizing:border-box;height:var(--height, 42px);position:relative;display:flex;align-items:center;padding:var(--padding, var(--internalPadding));background:var(--background, #fff);margin:var(--margin, 0)}.selectContainer.svelte-17l1npl input.svelte-17l1npl{cursor:default;border:none;color:var(--inputColor, #3f4f5f);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--inputPadding, var(--padding, var(--internalPadding)));width:100%;background:transparent;font-size:var(--inputFontSize, 14px);letter-spacing:var(--inputLetterSpacing, -0.08px);position:absolute;left:var(--inputLeft, 0);margin:var(--inputMargin, 0)}.selectContainer.svelte-17l1npl input.svelte-17l1npl::placeholder{color:var(--placeholderColor, #78848f);opacity:var(--placeholderOpacity, 1)}.selectContainer.svelte-17l1npl input.svelte-17l1npl:focus{outline:none}.selectContainer.svelte-17l1npl.svelte-17l1npl:hover{border-color:var(--borderHoverColor, #b2b8bf)}.selectContainer.focused.svelte-17l1npl.svelte-17l1npl{border-color:var(--borderFocusColor, #006fe8)}.selectContainer.disabled.svelte-17l1npl.svelte-17l1npl{background:var(--disabledBackground, #ebedef);border-color:var(--disabledBorderColor, #ebedef);color:var(--disabledColor, #c1c6cc)}.selectContainer.disabled.svelte-17l1npl input.svelte-17l1npl::placeholder{color:var(--disabledPlaceholderColor, #c1c6cc);opacity:var(--disabledPlaceholderOpacity, 1)}.selectedItem.svelte-17l1npl.svelte-17l1npl{line-height:var(--height, 42px);height:var(--height, 42px);overflow-x:hidden;padding:var(--selectedItemPadding, 0 20px 0 0)}.selectedItem.svelte-17l1npl.svelte-17l1npl:focus{outline:none}.clearSelect.svelte-17l1npl.svelte-17l1npl{position:absolute;right:var(--clearSelectRight, 10px);top:var(--clearSelectTop, 11px);bottom:var(--clearSelectBottom, 11px);width:var(--clearSelectWidth, 20px);color:var(--clearSelectColor, #c5cacf);flex:none !important}.clearSelect.svelte-17l1npl.svelte-17l1npl:hover{color:var(--clearSelectHoverColor, #2c3e50)}.selectContainer.focused.svelte-17l1npl .clearSelect.svelte-17l1npl{color:var(--clearSelectFocusColor, #3f4f5f)}.indicator.svelte-17l1npl.svelte-17l1npl{position:absolute;right:var(--indicatorRight, 10px);top:var(--indicatorTop, 11px);width:var(--indicatorWidth, 20px);height:var(--indicatorHeight, 20px);color:var(--indicatorColor, #c5cacf)}.indicator.svelte-17l1npl svg.svelte-17l1npl{display:inline-block;fill:var(--indicatorFill, currentcolor);line-height:1;stroke:var(--indicatorStroke, currentcolor);stroke-width:0}.spinner.svelte-17l1npl.svelte-17l1npl{position:absolute;right:var(--spinnerRight, 10px);top:var(--spinnerLeft, 11px);width:var(--spinnerWidth, 20px);height:var(--spinnerHeight, 20px);color:var(--spinnerColor, #51ce6c);animation:svelte-17l1npl-rotate 0.75s linear infinite}.spinner_icon.svelte-17l1npl.svelte-17l1npl{display:block;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;-webkit-transform:none}.spinner_path.svelte-17l1npl.svelte-17l1npl{stroke-dasharray:90;stroke-linecap:round}.multiSelect.svelte-17l1npl.svelte-17l1npl{display:flex;padding:var(--multiSelectPadding, 0 35px 0 16px);height:auto;flex-wrap:wrap;align-items:stretch}.multiSelect.svelte-17l1npl>.svelte-17l1npl{flex:1 1 50px}.selectContainer.multiSelect.svelte-17l1npl input.svelte-17l1npl{padding:var(--multiSelectInputPadding, 0);position:relative;margin:var(--multiSelectInputMargin, 0)}.hasError.svelte-17l1npl.svelte-17l1npl{border:var(--errorBorder, 1px solid #ff2d55);background:var(--errorBackground, #fff)}.a11yText.svelte-17l1npl.svelte-17l1npl{z-index:9999;border:0px;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0px;white-space:nowrap}@keyframes svelte-17l1npl-rotate{100%{transform:rotate(360deg)}}",
  map: null
};
function convertStringItemsToObjects(_items) {
  return _items.map((item, index) => {
    return { index, value: item, label: `${item}` };
  });
}
const Select = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let filteredItems;
  let showSelectedItem;
  let showClearIcon;
  let placeholderText;
  let showMultiSelect;
  let listProps;
  let ariaSelection;
  let ariaContext;
  const dispatch = (0, import_index_cf0e86af.t)();
  let { id = null } = $$props;
  let { container = void 0 } = $$props;
  let { input = void 0 } = $$props;
  let { isMulti = false } = $$props;
  let { multiFullItemClearable = false } = $$props;
  let { isDisabled = false } = $$props;
  let { isCreatable = false } = $$props;
  let { isFocused = false } = $$props;
  let { value = null } = $$props;
  let { filterText = "" } = $$props;
  let { placeholder = "Select..." } = $$props;
  let { placeholderAlwaysShow = false } = $$props;
  let { items: items2 = null } = $$props;
  let { itemFilter = (label, filterText2, option) => `${label}`.toLowerCase().includes(filterText2.toLowerCase()) } = $$props;
  let { groupBy = void 0 } = $$props;
  let { groupFilter = (groups) => groups } = $$props;
  let { isGroupHeaderSelectable = false } = $$props;
  let { getGroupHeaderLabel = (option) => {
    return option[labelIdentifier] || option.id;
  } } = $$props;
  let { labelIdentifier = "label" } = $$props;
  let { getOptionLabel = (option, filterText2) => {
    return option.isCreator ? `Create "${filterText2}"` : option[labelIdentifier];
  } } = $$props;
  let { optionIdentifier = "value" } = $$props;
  let { loadOptions = void 0 } = $$props;
  let { hasError = false } = $$props;
  let { containerStyles = "" } = $$props;
  let { getSelectionLabel = (option) => {
    if (option)
      return option[labelIdentifier];
    else
      return null;
  } } = $$props;
  let { createGroupHeaderItem = (groupValue) => {
    return { value: groupValue, label: groupValue };
  } } = $$props;
  let { createItem = (filterText2) => {
    return { value: filterText2, label: filterText2 };
  } } = $$props;
  const getFilteredItems = () => {
    return filteredItems;
  };
  let { isSearchable = true } = $$props;
  let { inputStyles = "" } = $$props;
  let { isClearable = true } = $$props;
  let { isWaiting = false } = $$props;
  let { listPlacement = "auto" } = $$props;
  let { listOpen = false } = $$props;
  let { isVirtualList = false } = $$props;
  let { loadOptionsInterval = 300 } = $$props;
  let { noOptionsMessage = "No options" } = $$props;
  let { hideEmptyState = false } = $$props;
  let { inputAttributes = {} } = $$props;
  let { listAutoWidth = true } = $$props;
  let { itemHeight = 40 } = $$props;
  let { Icon = void 0 } = $$props;
  let { iconProps = {} } = $$props;
  let { showChevron = false } = $$props;
  let { showIndicator = false } = $$props;
  let { containerClasses = "" } = $$props;
  let { indicatorSvg = void 0 } = $$props;
  let { listOffset = 5 } = $$props;
  let { ClearIcon: ClearIcon$1 = ClearIcon } = $$props;
  let { Item: Item$1 = Item } = $$props;
  let { List: List$1 = List } = $$props;
  let { Selection: Selection$1 = Selection } = $$props;
  let { MultiSelection: MultiSelection$1 = MultiSelection } = $$props;
  let { VirtualList: VirtualList$1 = VirtualList } = $$props;
  function filterMethod(args) {
    if (args.loadOptions && args.filterText.length > 0)
      return;
    if (!args.items)
      return [];
    if (args.items && args.items.length > 0 && typeof args.items[0] !== "object") {
      args.items = convertStringItemsToObjects(args.items);
    }
    let filterResults = args.items.filter((item) => {
      let matchesFilter = itemFilter(getOptionLabel(item, args.filterText), args.filterText, item);
      if (matchesFilter && args.isMulti && args.value && Array.isArray(args.value)) {
        matchesFilter = !args.value.some((x2) => {
          return x2[args.optionIdentifier] === item[args.optionIdentifier];
        });
      }
      return matchesFilter;
    });
    if (args.groupBy) {
      filterResults = filterGroupedItems(filterResults);
    }
    if (args.isCreatable) {
      filterResults = addCreatableItem(filterResults, args.filterText);
    }
    return filterResults;
  }
  function addCreatableItem(_items, _filterText) {
    if (_filterText.length === 0)
      return _items;
    const itemToCreate = createItem(_filterText);
    if (_items[0] && _filterText === _items[0][labelIdentifier])
      return _items;
    itemToCreate.isCreator = true;
    return [..._items, itemToCreate];
  }
  let { selectedValue = null } = $$props;
  let activeValue;
  let prev_value;
  let prev_filterText;
  let prev_isFocused;
  let hoverItemIndex;
  const getItems = debounce(async () => {
    isWaiting = true;
    let res = await loadOptions(filterText).catch((err) => {
      console.warn("svelte-select loadOptions error :>> ", err);
      dispatch("error", { type: "loadOptions", details: err });
    });
    if (res && !res.cancelled) {
      if (res) {
        if (res && res.length > 0 && typeof res[0] !== "object") {
          res = convertStringItemsToObjects(res);
        }
        filteredItems = [...res];
        dispatch("loaded", { items: filteredItems });
      } else {
        filteredItems = [];
      }
      if (isCreatable) {
        filteredItems = addCreatableItem(filteredItems, filterText);
      }
      isWaiting = false;
      isFocused = true;
      listOpen = true;
    }
  }, loadOptionsInterval);
  function setValue() {
    if (typeof value === "string") {
      value = { [optionIdentifier]: value, label: value };
    } else if (isMulti && Array.isArray(value) && value.length > 0) {
      value = value.map((item) => typeof item === "string" ? { value: item, label: item } : item);
    }
  }
  let _inputAttributes;
  function assignInputAttributes() {
    _inputAttributes = Object.assign({
      autocapitalize: "none",
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: false,
      tabindex: 0,
      type: "text",
      "aria-autocomplete": "list"
    }, inputAttributes);
    if (id) {
      _inputAttributes.id = id;
    }
    if (!isSearchable) {
      _inputAttributes.readonly = true;
    }
  }
  function filterGroupedItems(_items) {
    const groupValues = [];
    const groups = {};
    _items.forEach((item) => {
      const groupValue = groupBy(item);
      if (!groupValues.includes(groupValue)) {
        groupValues.push(groupValue);
        groups[groupValue] = [];
        if (groupValue) {
          groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
            id: groupValue,
            isGroupHeader: true,
            isSelectable: isGroupHeaderSelectable
          }));
        }
      }
      groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
    });
    const sortedGroupedItems = [];
    groupFilter(groupValues).forEach((groupValue) => {
      sortedGroupedItems.push(...groups[groupValue]);
    });
    return sortedGroupedItems;
  }
  function dispatchSelectedItem() {
    if (isMulti) {
      if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
        if (checkValueForDuplicates()) {
          dispatch("select", value);
        }
      }
      return;
    }
    {
      dispatch("select", value);
    }
  }
  function setupFocus() {
    if (isFocused || listOpen) {
      handleFocus();
    } else {
      if (input)
        input.blur();
    }
  }
  function setupMulti() {
    if (value) {
      if (Array.isArray(value)) {
        value = [...value];
      } else {
        value = [value];
      }
    }
  }
  function setupFilterText() {
    if (filterText.length === 0)
      return;
    isFocused = true;
    listOpen = true;
    if (loadOptions) {
      getItems();
    } else {
      listOpen = true;
      if (isMulti) {
        activeValue = void 0;
      }
    }
  }
  function checkValueForDuplicates() {
    let noDuplicates = true;
    if (value) {
      const ids = [];
      const uniqueValues = [];
      value.forEach((val) => {
        if (!ids.includes(val[optionIdentifier])) {
          ids.push(val[optionIdentifier]);
          uniqueValues.push(val);
        } else {
          noDuplicates = false;
        }
      });
      if (!noDuplicates)
        value = uniqueValues;
    }
    return noDuplicates;
  }
  function findItem(selection) {
    let matchTo = selection ? selection[optionIdentifier] : value[optionIdentifier];
    return items2.find((item) => item[optionIdentifier] === matchTo);
  }
  function updateValueDisplay(items3) {
    if (!items3 || items3.length === 0 || items3.some((item) => typeof item !== "object"))
      return;
    if (!value || (isMulti ? value.some((selection) => !selection || !selection[optionIdentifier]) : !value[optionIdentifier]))
      return;
    if (Array.isArray(value)) {
      value = value.map((selection) => findItem(selection) || selection);
    } else {
      value = findItem() || value;
    }
  }
  function handleFocus() {
    isFocused = true;
    if (input)
      input.focus();
  }
  function handleClear() {
    value = void 0;
    listOpen = false;
    dispatch("clear", value);
    handleFocus();
  }
  let { ariaValues = (values) => {
    return `Option ${values}, selected.`;
  } } = $$props;
  let { ariaListOpen = (label, count) => {
    return `You are currently focused on option ${label}. There are ${count} results available.`;
  } } = $$props;
  let { ariaFocused = () => {
    return `Select is focused, type to refine list, press down to open the menu.`;
  } } = $$props;
  function handleAriaSelection() {
    let selected2 = void 0;
    if (isMulti && value.length > 0) {
      selected2 = value.map((v) => getSelectionLabel(v)).join(", ");
    } else {
      selected2 = getSelectionLabel(value);
    }
    return ariaValues(selected2);
  }
  function handleAriaContent() {
    if (!isFocused || !filteredItems || filteredItems.length === 0)
      return "";
    let _item = filteredItems[hoverItemIndex];
    if (listOpen && _item) {
      let label = getSelectionLabel(_item);
      let count = filteredItems ? filteredItems.length : 0;
      return ariaListOpen(label, count);
    } else {
      return ariaFocused();
    }
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0)
    $$bindings.isMulti(isMulti);
  if ($$props.multiFullItemClearable === void 0 && $$bindings.multiFullItemClearable && multiFullItemClearable !== void 0)
    $$bindings.multiFullItemClearable(multiFullItemClearable);
  if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0)
    $$bindings.isDisabled(isDisabled);
  if ($$props.isCreatable === void 0 && $$bindings.isCreatable && isCreatable !== void 0)
    $$bindings.isCreatable(isCreatable);
  if ($$props.isFocused === void 0 && $$bindings.isFocused && isFocused !== void 0)
    $$bindings.isFocused(isFocused);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.placeholderAlwaysShow === void 0 && $$bindings.placeholderAlwaysShow && placeholderAlwaysShow !== void 0)
    $$bindings.placeholderAlwaysShow(placeholderAlwaysShow);
  if ($$props.items === void 0 && $$bindings.items && items2 !== void 0)
    $$bindings.items(items2);
  if ($$props.itemFilter === void 0 && $$bindings.itemFilter && itemFilter !== void 0)
    $$bindings.itemFilter(itemFilter);
  if ($$props.groupBy === void 0 && $$bindings.groupBy && groupBy !== void 0)
    $$bindings.groupBy(groupBy);
  if ($$props.groupFilter === void 0 && $$bindings.groupFilter && groupFilter !== void 0)
    $$bindings.groupFilter(groupFilter);
  if ($$props.isGroupHeaderSelectable === void 0 && $$bindings.isGroupHeaderSelectable && isGroupHeaderSelectable !== void 0)
    $$bindings.isGroupHeaderSelectable(isGroupHeaderSelectable);
  if ($$props.getGroupHeaderLabel === void 0 && $$bindings.getGroupHeaderLabel && getGroupHeaderLabel !== void 0)
    $$bindings.getGroupHeaderLabel(getGroupHeaderLabel);
  if ($$props.labelIdentifier === void 0 && $$bindings.labelIdentifier && labelIdentifier !== void 0)
    $$bindings.labelIdentifier(labelIdentifier);
  if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0)
    $$bindings.getOptionLabel(getOptionLabel);
  if ($$props.optionIdentifier === void 0 && $$bindings.optionIdentifier && optionIdentifier !== void 0)
    $$bindings.optionIdentifier(optionIdentifier);
  if ($$props.loadOptions === void 0 && $$bindings.loadOptions && loadOptions !== void 0)
    $$bindings.loadOptions(loadOptions);
  if ($$props.hasError === void 0 && $$bindings.hasError && hasError !== void 0)
    $$bindings.hasError(hasError);
  if ($$props.containerStyles === void 0 && $$bindings.containerStyles && containerStyles !== void 0)
    $$bindings.containerStyles(containerStyles);
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  if ($$props.createGroupHeaderItem === void 0 && $$bindings.createGroupHeaderItem && createGroupHeaderItem !== void 0)
    $$bindings.createGroupHeaderItem(createGroupHeaderItem);
  if ($$props.createItem === void 0 && $$bindings.createItem && createItem !== void 0)
    $$bindings.createItem(createItem);
  if ($$props.getFilteredItems === void 0 && $$bindings.getFilteredItems && getFilteredItems !== void 0)
    $$bindings.getFilteredItems(getFilteredItems);
  if ($$props.isSearchable === void 0 && $$bindings.isSearchable && isSearchable !== void 0)
    $$bindings.isSearchable(isSearchable);
  if ($$props.inputStyles === void 0 && $$bindings.inputStyles && inputStyles !== void 0)
    $$bindings.inputStyles(inputStyles);
  if ($$props.isClearable === void 0 && $$bindings.isClearable && isClearable !== void 0)
    $$bindings.isClearable(isClearable);
  if ($$props.isWaiting === void 0 && $$bindings.isWaiting && isWaiting !== void 0)
    $$bindings.isWaiting(isWaiting);
  if ($$props.listPlacement === void 0 && $$bindings.listPlacement && listPlacement !== void 0)
    $$bindings.listPlacement(listPlacement);
  if ($$props.listOpen === void 0 && $$bindings.listOpen && listOpen !== void 0)
    $$bindings.listOpen(listOpen);
  if ($$props.isVirtualList === void 0 && $$bindings.isVirtualList && isVirtualList !== void 0)
    $$bindings.isVirtualList(isVirtualList);
  if ($$props.loadOptionsInterval === void 0 && $$bindings.loadOptionsInterval && loadOptionsInterval !== void 0)
    $$bindings.loadOptionsInterval(loadOptionsInterval);
  if ($$props.noOptionsMessage === void 0 && $$bindings.noOptionsMessage && noOptionsMessage !== void 0)
    $$bindings.noOptionsMessage(noOptionsMessage);
  if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0)
    $$bindings.hideEmptyState(hideEmptyState);
  if ($$props.inputAttributes === void 0 && $$bindings.inputAttributes && inputAttributes !== void 0)
    $$bindings.inputAttributes(inputAttributes);
  if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0)
    $$bindings.listAutoWidth(listAutoWidth);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0)
    $$bindings.itemHeight(itemHeight);
  if ($$props.Icon === void 0 && $$bindings.Icon && Icon !== void 0)
    $$bindings.Icon(Icon);
  if ($$props.iconProps === void 0 && $$bindings.iconProps && iconProps !== void 0)
    $$bindings.iconProps(iconProps);
  if ($$props.showChevron === void 0 && $$bindings.showChevron && showChevron !== void 0)
    $$bindings.showChevron(showChevron);
  if ($$props.showIndicator === void 0 && $$bindings.showIndicator && showIndicator !== void 0)
    $$bindings.showIndicator(showIndicator);
  if ($$props.containerClasses === void 0 && $$bindings.containerClasses && containerClasses !== void 0)
    $$bindings.containerClasses(containerClasses);
  if ($$props.indicatorSvg === void 0 && $$bindings.indicatorSvg && indicatorSvg !== void 0)
    $$bindings.indicatorSvg(indicatorSvg);
  if ($$props.listOffset === void 0 && $$bindings.listOffset && listOffset !== void 0)
    $$bindings.listOffset(listOffset);
  if ($$props.ClearIcon === void 0 && $$bindings.ClearIcon && ClearIcon$1 !== void 0)
    $$bindings.ClearIcon(ClearIcon$1);
  if ($$props.Item === void 0 && $$bindings.Item && Item$1 !== void 0)
    $$bindings.Item(Item$1);
  if ($$props.List === void 0 && $$bindings.List && List$1 !== void 0)
    $$bindings.List(List$1);
  if ($$props.Selection === void 0 && $$bindings.Selection && Selection$1 !== void 0)
    $$bindings.Selection(Selection$1);
  if ($$props.MultiSelection === void 0 && $$bindings.MultiSelection && MultiSelection$1 !== void 0)
    $$bindings.MultiSelection(MultiSelection$1);
  if ($$props.VirtualList === void 0 && $$bindings.VirtualList && VirtualList$1 !== void 0)
    $$bindings.VirtualList(VirtualList$1);
  if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0)
    $$bindings.selectedValue(selectedValue);
  if ($$props.handleClear === void 0 && $$bindings.handleClear && handleClear !== void 0)
    $$bindings.handleClear(handleClear);
  if ($$props.ariaValues === void 0 && $$bindings.ariaValues && ariaValues !== void 0)
    $$bindings.ariaValues(ariaValues);
  if ($$props.ariaListOpen === void 0 && $$bindings.ariaListOpen && ariaListOpen !== void 0)
    $$bindings.ariaListOpen(ariaListOpen);
  if ($$props.ariaFocused === void 0 && $$bindings.ariaFocused && ariaFocused !== void 0)
    $$bindings.ariaFocused(ariaFocused);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    filteredItems = filterMethod({
      loadOptions,
      filterText,
      items: items2,
      value,
      isMulti,
      optionIdentifier,
      groupBy,
      isCreatable
    });
    {
      {
        if (selectedValue)
          console.warn("selectedValue is no longer used. Please use value instead.");
      }
    }
    {
      updateValueDisplay(items2);
    }
    {
      {
        if (value)
          setValue();
      }
    }
    {
      {
        if (inputAttributes || !isSearchable)
          assignInputAttributes();
      }
    }
    {
      {
        if (isMulti) {
          setupMulti();
        }
      }
    }
    {
      {
        if (isMulti && value && value.length > 1) {
          checkValueForDuplicates();
        }
      }
    }
    {
      {
        if (value)
          dispatchSelectedItem();
      }
    }
    {
      {
        if (!value && isMulti && prev_value) {
          dispatch("select", value);
        }
      }
    }
    {
      {
        if (isFocused !== prev_isFocused) {
          setupFocus();
        }
      }
    }
    {
      {
        if (filterText !== prev_filterText) {
          setupFilterText();
        }
      }
    }
    showSelectedItem = value && filterText.length === 0;
    showClearIcon = showSelectedItem && isClearable && !isDisabled && !isWaiting;
    placeholderText = placeholderAlwaysShow && isMulti ? placeholder : value ? "" : placeholder;
    showMultiSelect = isMulti && value && value.length > 0;
    listProps = {
      Item: Item$1,
      filterText,
      optionIdentifier,
      noOptionsMessage,
      hideEmptyState,
      isVirtualList,
      VirtualList: VirtualList$1,
      value,
      isMulti,
      getGroupHeaderLabel,
      items: filteredItems,
      itemHeight,
      getOptionLabel,
      listPlacement,
      parent: container,
      listAutoWidth,
      listOffset
    };
    ariaSelection = value ? handleAriaSelection() : "";
    ariaContext = handleAriaContent();
    $$rendered = `

<div class="${[
      "selectContainer " + (0, import_index_cf0e86af.e)(containerClasses) + " svelte-17l1npl",
      (hasError ? "hasError" : "") + " " + (isMulti ? "multiSelect" : "") + " " + (isDisabled ? "disabled" : "") + " " + (isFocused ? "focused" : "")
    ].join(" ").trim()}"${(0, import_index_cf0e86af.a)("style", containerStyles, 0)}${(0, import_index_cf0e86af.a)("this", container, 0)}><span aria-live="${"polite"}" aria-atomic="${"false"}" aria-relevant="${"additions text"}" class="${"a11yText svelte-17l1npl"}">${isFocused ? `<span id="${"aria-selection"}">${(0, import_index_cf0e86af.e)(ariaSelection)}</span>
            <span id="${"aria-context"}">${(0, import_index_cf0e86af.e)(ariaContext)}</span>` : ``}</span>

    ${Icon ? `${(0, import_index_cf0e86af.v)(Icon || import_index_cf0e86af.m, "svelte:component").$$render($$result, Object_1.assign(iconProps), {}, {})}` : ``}

    ${showMultiSelect ? `${(0, import_index_cf0e86af.v)(MultiSelection$1 || import_index_cf0e86af.m, "svelte:component").$$render($$result, {
      value,
      getSelectionLabel,
      activeValue,
      isDisabled,
      multiFullItemClearable
    }, {}, {})}` : ``}

    <input${(0, import_index_cf0e86af.o)([
      { readonly: !isSearchable || null },
      (0, import_index_cf0e86af.p)(_inputAttributes),
      {
        placeholder: (0, import_index_cf0e86af.q)(placeholderText)
      },
      {
        style: (0, import_index_cf0e86af.q)(inputStyles)
      },
      { disabled: isDisabled || null }
    ], { classes: "svelte-17l1npl" })}${(0, import_index_cf0e86af.a)("this", input, 0)}${(0, import_index_cf0e86af.a)("value", filterText, 0)}>

    ${!isMulti && showSelectedItem ? `<div class="${"selectedItem svelte-17l1npl"}">${(0, import_index_cf0e86af.v)(Selection$1 || import_index_cf0e86af.m, "svelte:component").$$render($$result, { item: value, getSelectionLabel }, {}, {})}</div>` : ``}

    ${showClearIcon ? `<div class="${"clearSelect svelte-17l1npl"}" aria-hidden="${"true"}">${(0, import_index_cf0e86af.v)(ClearIcon$1 || import_index_cf0e86af.m, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}

    ${!showClearIcon && (showIndicator || showChevron && !value || !isSearchable && !isDisabled && !isWaiting && (showSelectedItem && !isClearable || !showSelectedItem)) ? `<div class="${"indicator svelte-17l1npl"}" aria-hidden="${"true"}">${indicatorSvg ? `<!-- HTML_TAG_START -->${indicatorSvg}<!-- HTML_TAG_END -->` : `<svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 20 20"}" focusable="${"false"}" aria-hidden="${"true"}" class="${"svelte-17l1npl"}"><path d="${"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"}"></path></svg>`}</div>` : ``}

    ${isWaiting ? `<div class="${"spinner svelte-17l1npl"}"><svg class="${"spinner_icon svelte-17l1npl"}" viewBox="${"25 25 50 50"}"><circle class="${"spinner_path svelte-17l1npl"}" cx="${"50"}" cy="${"50"}" r="${"20"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"5"}" stroke-miterlimit="${"10"}"></circle></svg></div>` : ``}

    ${listOpen ? `${(0, import_index_cf0e86af.v)(List$1 || import_index_cf0e86af.m, "svelte:component").$$render($$result, Object_1.assign(listProps, { hoverItemIndex }), {
      hoverItemIndex: ($$value) => {
        hoverItemIndex = $$value;
        $$settled = false;
      }
    }, {})}` : ``}

    ${!isMulti || isMulti && !showMultiSelect ? `<input${(0, import_index_cf0e86af.a)("name", inputAttributes.name, 0)} type="${"hidden"}"${(0, import_index_cf0e86af.a)("value", value ? getSelectionLabel(value) : null, 0)} class="${"svelte-17l1npl"}">` : ``}

    ${isMulti && showMultiSelect ? `${(0, import_index_cf0e86af.f)(value, (item) => {
      return `<input${(0, import_index_cf0e86af.a)("name", inputAttributes.name, 0)} type="${"hidden"}"${(0, import_index_cf0e86af.a)("value", item ? getSelectionLabel(item) : null, 0)} class="${"svelte-17l1npl"}">`;
    })}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
var Select_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".selectbox.svelte-lfed90{box-sizing:border-box;margin:0;border:0}.selectbox.svelte-lfed90{--border:2px solid #206095;--borderRadius:0;--listBorderRadius:0;--itemFirstBorderRadius:0;--multiItemBorderRadius:0;--padding:0 8px;--multiSelectPadding:0 8px;--clearSelectBottom:auto;--clearSelectRight:8px;--clearSelectTop:auto;--clearSelectWidth:24px;--clearSelectColor:#206095;--borderHoverColor:#206095;--borderFocusColor:#206095;--inputColor:#206095;--itemColor:#206095;--placeholderColor:#206095;--itemIsActiveBG:#206095;--itemHoverBG:#3875d7;--itemHoverColor:white;--clearSelectColor:white;--clearSelectFocusColor:white;--clearSelectHoverColor:white;--indicatorColor:white;--multiItemActiveColor:white;--multiClearFill:white;--multiClearBG:none;--multiClearHoverBG:none;--multiItemBG:grey;--multiItemActiveBG:grey;--spinnerColor:rgba(255,255,255,0)}.selectbox, .selectbox input, .selectbox .item, .selectbox svg{cursor:pointer !important}.selectbox input:focus{cursor:default !important}.selectbox > .selectContainer{box-shadow:inset -40px 0px #206095}.selectbox.multi-selected > .selectContainer{box-shadow:none !important}.selectbox.focused > .selectContainer{outline:4px solid orange}.selectbox.selected > .selectContainer{background-color:#206095 !important}.selectbox.selected .selectedItem{color:white !important;font-weight:bold}.selectbox .selectedItem .group{display:none}.selectbox .item > .group{font-size:smaller;opacity:0.7}.selectbox .selectContainer > .multiSelectItem{color:white !important;font-weight:bold}.selectbox .selectContainer > .multiSelectItem:nth-of-type(1){background-color:var(--firstItem) !important}.selectbox .selectContainer > .multiSelectItem:nth-of-type(2){background-color:var(--secondItem) !important}.selectbox .selectContainer > .multiSelectItem:nth-of-type(3){background-color:var(--thirdItem) !important}.selectbox .selectContainer > .multiSelectItem:nth-of-type(4){background-color:var(--fourthItem) !important}.selectbox .indicator svg{fill:white}.selectbox .clearSelect{height:24px}.selectbox .indicator{width:20px;height:20px}.selectbox .multiSelectItem .group{display:none}",
  map: null
};
const Select_1 = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let noOptionsMessage;
  let itemFilter;
  const searchIcon = `<svg viewBox="0 0 20 20" fill-rule="evenodd"><path d="M0,8a8,8,0,1,0,16,0a8,8,0,1,0,-16,0ZM3,8a5,5,0,1,0,10,0a5,5,0,1,0,-10,0Z"/><path d="M18,20L20,18L14,12L12,14Z"/></svg>`;
  const chevronIcon = `<svg viewBox="0 0 20 20"><path d="M1,6L19,6L10,15Z"/></svg>`;
  (0, import_index_cf0e86af.t)();
  let { id = "" } = $$props;
  let { mode = "default" } = $$props;
  let { items: items2 } = $$props;
  let { placeholder = "Select one..." } = $$props;
  let { value = null } = $$props;
  let { filterText = "" } = $$props;
  let { isSearchable = true } = $$props;
  let { autoClear = false } = $$props;
  let { idKey = "value" } = $$props;
  let { labelKey = "label" } = $$props;
  let { groupKey = null } = $$props;
  let { groupItems = false } = $$props;
  let { loadOptions = void 0 } = $$props;
  let { fontSize = "1rem" } = $$props;
  let { height = 42 } = $$props;
  let { isMulti = false } = $$props;
  let { maxSelected = 4 } = $$props;
  let { colors = ["#206095", "#a8bd3a", "#871a5b", "#27a0cc"] } = $$props;
  const getOptionLabel = groupKey && !groupItems ? (option) => `${option[labelKey]} <span class="group">${option[groupKey]}</span>` : (option) => option[labelKey];
  let { getSelectionLabel = (option) => {
    if (option)
      return getOptionLabel(option);
    else
      return null;
  } } = $$props;
  const groupBy = groupItems && groupKey ? (item) => item[groupKey] : void 0;
  const indicatorSvg = mode == "search" ? searchIcon : chevronIcon;
  const containerStyles = `--inputFontSize: ${fontSize}; --groupTitleFontSize: ${fontSize}; --height: ${height}px; font-size: ${fontSize};`;
  const ariaValues = (values) => `${values}, selected.`;
  const ariaListOpen = (label, count) => `You are currently focused on ${label}. There are ${count} results available.`;
  const ariaFocused = () => `Select is focused, type to refine list, press down to open the menu.`;
  let isFocused;
  let listOpen;
  let isWaiting;
  let handleClear;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.items === void 0 && $$bindings.items && items2 !== void 0)
    $$bindings.items(items2);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  if ($$props.isSearchable === void 0 && $$bindings.isSearchable && isSearchable !== void 0)
    $$bindings.isSearchable(isSearchable);
  if ($$props.autoClear === void 0 && $$bindings.autoClear && autoClear !== void 0)
    $$bindings.autoClear(autoClear);
  if ($$props.idKey === void 0 && $$bindings.idKey && idKey !== void 0)
    $$bindings.idKey(idKey);
  if ($$props.labelKey === void 0 && $$bindings.labelKey && labelKey !== void 0)
    $$bindings.labelKey(labelKey);
  if ($$props.groupKey === void 0 && $$bindings.groupKey && groupKey !== void 0)
    $$bindings.groupKey(groupKey);
  if ($$props.groupItems === void 0 && $$bindings.groupItems && groupItems !== void 0)
    $$bindings.groupItems(groupItems);
  if ($$props.loadOptions === void 0 && $$bindings.loadOptions && loadOptions !== void 0)
    $$bindings.loadOptions(loadOptions);
  if ($$props.fontSize === void 0 && $$bindings.fontSize && fontSize !== void 0)
    $$bindings.fontSize(fontSize);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0)
    $$bindings.isMulti(isMulti);
  if ($$props.maxSelected === void 0 && $$bindings.maxSelected && maxSelected !== void 0)
    $$bindings.maxSelected(maxSelected);
  if ($$props.colors === void 0 && $$bindings.colors && colors !== void 0)
    $$bindings.colors(colors);
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    noOptionsMessage = isWaiting ? "Loading..." : mode == "search" && filterText < 3 ? "Enter 3 or more characters for suggestions" : `No results match ${filterText}`;
    itemFilter = Array.isArray(value) && value.length >= maxSelected || mode == "search" && filterText.length < 3 ? (label, filterText2, option) => false : (label, filterText2, option) => `${label}`.split("<")[0].toLowerCase().slice(0, filterText2.length) == filterText2.toLowerCase();
    $$rendered = `<div class="${[
      "selectbox svelte-lfed90",
      (value && isMulti ? "multi-selected" : "") + " " + (isFocused ? "focused" : "") + " " + (value && !listOpen && !isMulti ? "selected" : "")
    ].join(" ").trim()}">${(0, import_index_cf0e86af.v)(Select, "Select").$$render($$result, {
      id,
      items: items2,
      placeholder,
      isMulti,
      isSearchable,
      groupBy,
      loadOptions,
      getSelectionLabel,
      getOptionLabel,
      itemFilter,
      ariaValues,
      ariaListOpen,
      ariaFocused,
      noOptionsMessage,
      indicatorSvg,
      containerStyles,
      optionIdentifier: idKey,
      showIndicator: true,
      isClearable: !isMulti,
      isFocused,
      value,
      listOpen,
      filterText,
      isWaiting,
      handleClear
    }, {
      isFocused: ($$value) => {
        isFocused = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      },
      listOpen: ($$value) => {
        listOpen = $$value;
        $$settled = false;
      },
      filterText: ($$value) => {
        filterText = $$value;
        $$settled = false;
      },
      isWaiting: ($$value) => {
        isWaiting = $$value;
        $$settled = false;
      },
      handleClear: ($$value) => {
        handleClear = $$value;
        $$settled = false;
      }
    }, {})}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
var items = [
  {
    areacd: "E07000223",
    areanm: "Adur",
    region: "South East"
  },
  {
    areacd: "E07000026",
    areanm: "Allerdale",
    region: "North West"
  },
  {
    areacd: "E07000032",
    areanm: "Amber Valley",
    region: "East Midlands"
  },
  {
    areacd: "E07000224",
    areanm: "Arun",
    region: "South East"
  },
  {
    areacd: "E07000170",
    areanm: "Ashfield",
    region: "East Midlands"
  },
  {
    areacd: "E07000105",
    areanm: "Ashford",
    region: "South East"
  },
  {
    areacd: "E07000004",
    areanm: "Aylesbury Vale",
    region: "South East"
  },
  {
    areacd: "E07000200",
    areanm: "Babergh",
    region: "East of England"
  },
  {
    areacd: "E09000002",
    areanm: "Barking and Dagenham",
    region: "London"
  },
  {
    areacd: "E09000003",
    areanm: "Barnet",
    region: "London"
  },
  {
    areacd: "E08000016",
    areanm: "Barnsley",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000027",
    areanm: "Barrow-in-Furness",
    region: "North West"
  },
  {
    areacd: "E07000066",
    areanm: "Basildon",
    region: "East of England"
  },
  {
    areacd: "E07000084",
    areanm: "Basingstoke and Deane",
    region: "South East"
  },
  {
    areacd: "E07000171",
    areanm: "Bassetlaw",
    region: "East Midlands"
  },
  {
    areacd: "E06000022",
    areanm: "Bath and North East Somerset",
    region: "South West"
  },
  {
    areacd: "E06000055",
    areanm: "Bedford",
    region: "East of England"
  },
  {
    areacd: "E09000004",
    areanm: "Bexley",
    region: "London"
  },
  {
    areacd: "E08000025",
    areanm: "Birmingham",
    region: "West Midlands"
  },
  {
    areacd: "E07000129",
    areanm: "Blaby",
    region: "East Midlands"
  },
  {
    areacd: "E06000008",
    areanm: "Blackburn with Darwen",
    region: "North West"
  },
  {
    areacd: "E06000009",
    areanm: "Blackpool",
    region: "North West"
  },
  {
    areacd: "W06000019",
    areanm: "Blaenau Gwent",
    region: "Wales"
  },
  {
    areacd: "E07000033",
    areanm: "Bolsover",
    region: "East Midlands"
  },
  {
    areacd: "E08000001",
    areanm: "Bolton",
    region: "North West"
  },
  {
    areacd: "E07000136",
    areanm: "Boston",
    region: "East Midlands"
  },
  {
    areacd: "E06000028",
    areanm: "Bournemouth",
    region: "South West"
  },
  {
    areacd: "E06000036",
    areanm: "Bracknell Forest",
    region: "South East"
  },
  {
    areacd: "E08000032",
    areanm: "Bradford",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000067",
    areanm: "Braintree",
    region: "East of England"
  },
  {
    areacd: "E07000143",
    areanm: "Breckland",
    region: "East of England"
  },
  {
    areacd: "E09000005",
    areanm: "Brent",
    region: "London"
  },
  {
    areacd: "E07000068",
    areanm: "Brentwood",
    region: "East of England"
  },
  {
    areacd: "W06000013",
    areanm: "Bridgend",
    region: "Wales"
  },
  {
    areacd: "E06000043",
    areanm: "Brighton and Hove",
    region: "South East"
  },
  {
    areacd: "E06000023",
    areanm: "Bristol, City of",
    region: "South West"
  },
  {
    areacd: "E07000144",
    areanm: "Broadland",
    region: "East of England"
  },
  {
    areacd: "E09000006",
    areanm: "Bromley",
    region: "London"
  },
  {
    areacd: "E07000234",
    areanm: "Bromsgrove",
    region: "West Midlands"
  },
  {
    areacd: "E07000095",
    areanm: "Broxbourne",
    region: "East of England"
  },
  {
    areacd: "E07000172",
    areanm: "Broxtowe",
    region: "East Midlands"
  },
  {
    areacd: "E07000117",
    areanm: "Burnley",
    region: "North West"
  },
  {
    areacd: "E08000002",
    areanm: "Bury",
    region: "North West"
  },
  {
    areacd: "W06000018",
    areanm: "Caerphilly",
    region: "Wales"
  },
  {
    areacd: "E08000033",
    areanm: "Calderdale",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000008",
    areanm: "Cambridge",
    region: "East of England"
  },
  {
    areacd: "E09000007",
    areanm: "Camden",
    region: "London"
  },
  {
    areacd: "E07000192",
    areanm: "Cannock Chase",
    region: "West Midlands"
  },
  {
    areacd: "E07000106",
    areanm: "Canterbury",
    region: "South East"
  },
  {
    areacd: "W06000015",
    areanm: "Cardiff",
    region: "Wales"
  },
  {
    areacd: "E07000028",
    areanm: "Carlisle",
    region: "North West"
  },
  {
    areacd: "W06000010",
    areanm: "Carmarthenshire",
    region: "Wales"
  },
  {
    areacd: "E07000069",
    areanm: "Castle Point",
    region: "East of England"
  },
  {
    areacd: "E06000056",
    areanm: "Central Bedfordshire",
    region: "East of England"
  },
  {
    areacd: "W06000008",
    areanm: "Ceredigion",
    region: "Wales"
  },
  {
    areacd: "E07000130",
    areanm: "Charnwood",
    region: "East Midlands"
  },
  {
    areacd: "E07000070",
    areanm: "Chelmsford",
    region: "East of England"
  },
  {
    areacd: "E07000078",
    areanm: "Cheltenham",
    region: "South West"
  },
  {
    areacd: "E07000177",
    areanm: "Cherwell",
    region: "South East"
  },
  {
    areacd: "E06000049",
    areanm: "Cheshire East",
    region: "North West"
  },
  {
    areacd: "E06000050",
    areanm: "Cheshire West and Chester",
    region: "North West"
  },
  {
    areacd: "E07000034",
    areanm: "Chesterfield",
    region: "East Midlands"
  },
  {
    areacd: "E07000225",
    areanm: "Chichester",
    region: "South East"
  },
  {
    areacd: "E07000005",
    areanm: "Chiltern",
    region: "South East"
  },
  {
    areacd: "E07000118",
    areanm: "Chorley",
    region: "North West"
  },
  {
    areacd: "E07000048",
    areanm: "Christchurch",
    region: "South West"
  },
  {
    areacd: "E09000001",
    areanm: "City of London",
    region: "London"
  },
  {
    areacd: "E07000071",
    areanm: "Colchester",
    region: "East of England"
  },
  {
    areacd: "W06000003",
    areanm: "Conwy",
    region: "Wales"
  },
  {
    areacd: "E07000029",
    areanm: "Copeland",
    region: "North West"
  },
  {
    areacd: "E07000150",
    areanm: "Corby",
    region: "East Midlands"
  },
  {
    areacd: "E06000052",
    areanm: "Cornwall",
    region: "South West"
  },
  {
    areacd: "E07000079",
    areanm: "Cotswold",
    region: "South West"
  },
  {
    areacd: "E06000047",
    areanm: "County Durham",
    region: "North East"
  },
  {
    areacd: "E08000026",
    areanm: "Coventry",
    region: "West Midlands"
  },
  {
    areacd: "E07000163",
    areanm: "Craven",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000226",
    areanm: "Crawley",
    region: "South East"
  },
  {
    areacd: "E09000008",
    areanm: "Croydon",
    region: "London"
  },
  {
    areacd: "E07000096",
    areanm: "Dacorum",
    region: "East of England"
  },
  {
    areacd: "E06000005",
    areanm: "Darlington",
    region: "North East"
  },
  {
    areacd: "E07000107",
    areanm: "Dartford",
    region: "South East"
  },
  {
    areacd: "E07000151",
    areanm: "Daventry",
    region: "East Midlands"
  },
  {
    areacd: "W06000004",
    areanm: "Denbighshire",
    region: "Wales"
  },
  {
    areacd: "E06000015",
    areanm: "Derby",
    region: "East Midlands"
  },
  {
    areacd: "E07000035",
    areanm: "Derbyshire Dales",
    region: "East Midlands"
  },
  {
    areacd: "E08000017",
    areanm: "Doncaster",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000108",
    areanm: "Dover",
    region: "South East"
  },
  {
    areacd: "E08000027",
    areanm: "Dudley",
    region: "West Midlands"
  },
  {
    areacd: "E09000009",
    areanm: "Ealing",
    region: "London"
  },
  {
    areacd: "E07000009",
    areanm: "East Cambridgeshire",
    region: "East of England"
  },
  {
    areacd: "E07000040",
    areanm: "East Devon",
    region: "South West"
  },
  {
    areacd: "E07000049",
    areanm: "East Dorset",
    region: "South West"
  },
  {
    areacd: "E07000085",
    areanm: "East Hampshire",
    region: "South East"
  },
  {
    areacd: "E07000242",
    areanm: "East Hertfordshire",
    region: "East of England"
  },
  {
    areacd: "E07000137",
    areanm: "East Lindsey",
    region: "East Midlands"
  },
  {
    areacd: "E07000152",
    areanm: "East Northamptonshire",
    region: "East Midlands"
  },
  {
    areacd: "E06000011",
    areanm: "East Riding of Yorkshire",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000193",
    areanm: "East Staffordshire",
    region: "West Midlands"
  },
  {
    areacd: "E07000061",
    areanm: "Eastbourne",
    region: "South East"
  },
  {
    areacd: "E07000086",
    areanm: "Eastleigh",
    region: "South East"
  },
  {
    areacd: "E07000030",
    areanm: "Eden",
    region: "North West"
  },
  {
    areacd: "E07000207",
    areanm: "Elmbridge",
    region: "South East"
  },
  {
    areacd: "E09000010",
    areanm: "Enfield",
    region: "London"
  },
  {
    areacd: "E07000072",
    areanm: "Epping Forest",
    region: "East of England"
  },
  {
    areacd: "E07000208",
    areanm: "Epsom and Ewell",
    region: "South East"
  },
  {
    areacd: "E07000036",
    areanm: "Erewash",
    region: "East Midlands"
  },
  {
    areacd: "E07000041",
    areanm: "Exeter",
    region: "South West"
  },
  {
    areacd: "E07000087",
    areanm: "Fareham",
    region: "South East"
  },
  {
    areacd: "E07000010",
    areanm: "Fenland",
    region: "East of England"
  },
  {
    areacd: "W06000005",
    areanm: "Flintshire",
    region: "Wales"
  },
  {
    areacd: "E07000112",
    areanm: "Folkestone and Hythe",
    region: "South East"
  },
  {
    areacd: "E07000201",
    areanm: "Forest Heath",
    region: "East of England"
  },
  {
    areacd: "E07000080",
    areanm: "Forest of Dean",
    region: "South West"
  },
  {
    areacd: "E07000119",
    areanm: "Fylde",
    region: "North West"
  },
  {
    areacd: "E08000037",
    areanm: "Gateshead",
    region: "North East"
  },
  {
    areacd: "E07000173",
    areanm: "Gedling",
    region: "East Midlands"
  },
  {
    areacd: "E07000081",
    areanm: "Gloucester",
    region: "South West"
  },
  {
    areacd: "E07000088",
    areanm: "Gosport",
    region: "South East"
  },
  {
    areacd: "E07000109",
    areanm: "Gravesham",
    region: "South East"
  },
  {
    areacd: "E07000145",
    areanm: "Great Yarmouth",
    region: "East of England"
  },
  {
    areacd: "E09000011",
    areanm: "Greenwich",
    region: "London"
  },
  {
    areacd: "E07000209",
    areanm: "Guildford",
    region: "South East"
  },
  {
    areacd: "W06000002",
    areanm: "Gwynedd",
    region: "Wales"
  },
  {
    areacd: "E09000012",
    areanm: "Hackney",
    region: "London"
  },
  {
    areacd: "E06000006",
    areanm: "Halton",
    region: "North West"
  },
  {
    areacd: "E07000164",
    areanm: "Hambleton",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E09000013",
    areanm: "Hammersmith and Fulham",
    region: "London"
  },
  {
    areacd: "E07000131",
    areanm: "Harborough",
    region: "East Midlands"
  },
  {
    areacd: "E09000014",
    areanm: "Haringey",
    region: "London"
  },
  {
    areacd: "E07000073",
    areanm: "Harlow",
    region: "East of England"
  },
  {
    areacd: "E07000165",
    areanm: "Harrogate",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E09000015",
    areanm: "Harrow",
    region: "London"
  },
  {
    areacd: "E07000089",
    areanm: "Hart",
    region: "South East"
  },
  {
    areacd: "E06000001",
    areanm: "Hartlepool",
    region: "North East"
  },
  {
    areacd: "E07000062",
    areanm: "Hastings",
    region: "South East"
  },
  {
    areacd: "E07000090",
    areanm: "Havant",
    region: "South East"
  },
  {
    areacd: "E09000016",
    areanm: "Havering",
    region: "London"
  },
  {
    areacd: "E06000019",
    areanm: "Herefordshire, County of",
    region: "West Midlands"
  },
  {
    areacd: "E07000098",
    areanm: "Hertsmere",
    region: "East of England"
  },
  {
    areacd: "E07000037",
    areanm: "High Peak",
    region: "East Midlands"
  },
  {
    areacd: "E09000017",
    areanm: "Hillingdon",
    region: "London"
  },
  {
    areacd: "E07000132",
    areanm: "Hinckley and Bosworth",
    region: "East Midlands"
  },
  {
    areacd: "E07000227",
    areanm: "Horsham",
    region: "South East"
  },
  {
    areacd: "E09000018",
    areanm: "Hounslow",
    region: "London"
  },
  {
    areacd: "E07000011",
    areanm: "Huntingdonshire",
    region: "East of England"
  },
  {
    areacd: "E07000120",
    areanm: "Hyndburn",
    region: "North West"
  },
  {
    areacd: "E07000202",
    areanm: "Ipswich",
    region: "East of England"
  },
  {
    areacd: "W06000001",
    areanm: "Isle of Anglesey",
    region: "Wales"
  },
  {
    areacd: "E06000046",
    areanm: "Isle of Wight",
    region: "South East"
  },
  {
    areacd: "E06000053",
    areanm: "Isles of Scilly",
    region: "South West"
  },
  {
    areacd: "E09000019",
    areanm: "Islington",
    region: "London"
  },
  {
    areacd: "E09000020",
    areanm: "Kensington and Chelsea",
    region: "London"
  },
  {
    areacd: "E07000153",
    areanm: "Kettering",
    region: "East Midlands"
  },
  {
    areacd: "E07000146",
    areanm: "King's Lynn and West Norfolk",
    region: "East of England"
  },
  {
    areacd: "E06000010",
    areanm: "Kingston upon Hull, City of",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E09000021",
    areanm: "Kingston upon Thames",
    region: "London"
  },
  {
    areacd: "E08000034",
    areanm: "Kirklees",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E08000011",
    areanm: "Knowsley",
    region: "North West"
  },
  {
    areacd: "E09000022",
    areanm: "Lambeth",
    region: "London"
  },
  {
    areacd: "E07000121",
    areanm: "Lancaster",
    region: "North West"
  },
  {
    areacd: "E08000035",
    areanm: "Leeds",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E06000016",
    areanm: "Leicester",
    region: "East Midlands"
  },
  {
    areacd: "E07000063",
    areanm: "Lewes",
    region: "South East"
  },
  {
    areacd: "E09000023",
    areanm: "Lewisham",
    region: "London"
  },
  {
    areacd: "E07000194",
    areanm: "Lichfield",
    region: "West Midlands"
  },
  {
    areacd: "E07000138",
    areanm: "Lincoln",
    region: "East Midlands"
  },
  {
    areacd: "E08000012",
    areanm: "Liverpool",
    region: "North West"
  },
  {
    areacd: "E06000032",
    areanm: "Luton",
    region: "East of England"
  },
  {
    areacd: "E07000110",
    areanm: "Maidstone",
    region: "South East"
  },
  {
    areacd: "E07000074",
    areanm: "Maldon",
    region: "East of England"
  },
  {
    areacd: "E07000235",
    areanm: "Malvern Hills",
    region: "West Midlands"
  },
  {
    areacd: "E08000003",
    areanm: "Manchester",
    region: "North West"
  },
  {
    areacd: "E07000174",
    areanm: "Mansfield",
    region: "East Midlands"
  },
  {
    areacd: "E06000035",
    areanm: "Medway",
    region: "South East"
  },
  {
    areacd: "E07000133",
    areanm: "Melton",
    region: "East Midlands"
  },
  {
    areacd: "E07000187",
    areanm: "Mendip",
    region: "South West"
  },
  {
    areacd: "W06000024",
    areanm: "Merthyr Tydfil",
    region: "Wales"
  },
  {
    areacd: "E09000024",
    areanm: "Merton",
    region: "London"
  },
  {
    areacd: "E07000042",
    areanm: "Mid Devon",
    region: "South West"
  },
  {
    areacd: "E07000203",
    areanm: "Mid Suffolk",
    region: "East of England"
  },
  {
    areacd: "E07000228",
    areanm: "Mid Sussex",
    region: "South East"
  },
  {
    areacd: "E06000002",
    areanm: "Middlesbrough",
    region: "North East"
  },
  {
    areacd: "E06000042",
    areanm: "Milton Keynes",
    region: "South East"
  },
  {
    areacd: "E07000210",
    areanm: "Mole Valley",
    region: "South East"
  },
  {
    areacd: "W06000021",
    areanm: "Monmouthshire",
    region: "Wales"
  },
  {
    areacd: "W06000012",
    areanm: "Neath Port Talbot",
    region: "Wales"
  },
  {
    areacd: "E07000091",
    areanm: "New Forest",
    region: "South East"
  },
  {
    areacd: "E07000175",
    areanm: "Newark and Sherwood",
    region: "East Midlands"
  },
  {
    areacd: "E08000021",
    areanm: "Newcastle upon Tyne",
    region: "North East"
  },
  {
    areacd: "E07000195",
    areanm: "Newcastle-under-Lyme",
    region: "West Midlands"
  },
  {
    areacd: "E09000025",
    areanm: "Newham",
    region: "London"
  },
  {
    areacd: "W06000022",
    areanm: "Newport",
    region: "Wales"
  },
  {
    areacd: "E07000043",
    areanm: "North Devon",
    region: "South West"
  },
  {
    areacd: "E07000050",
    areanm: "North Dorset",
    region: "South West"
  },
  {
    areacd: "E07000038",
    areanm: "North East Derbyshire",
    region: "East Midlands"
  },
  {
    areacd: "E06000012",
    areanm: "North East Lincolnshire",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000099",
    areanm: "North Hertfordshire",
    region: "East of England"
  },
  {
    areacd: "E07000139",
    areanm: "North Kesteven",
    region: "East Midlands"
  },
  {
    areacd: "E06000013",
    areanm: "North Lincolnshire",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000147",
    areanm: "North Norfolk",
    region: "East of England"
  },
  {
    areacd: "E06000024",
    areanm: "North Somerset",
    region: "South West"
  },
  {
    areacd: "E08000022",
    areanm: "North Tyneside",
    region: "North East"
  },
  {
    areacd: "E07000218",
    areanm: "North Warwickshire",
    region: "West Midlands"
  },
  {
    areacd: "E07000134",
    areanm: "North West Leicestershire",
    region: "East Midlands"
  },
  {
    areacd: "E07000154",
    areanm: "Northampton",
    region: "East Midlands"
  },
  {
    areacd: "E06000057",
    areanm: "Northumberland",
    region: "North East"
  },
  {
    areacd: "E07000148",
    areanm: "Norwich",
    region: "East of England"
  },
  {
    areacd: "E06000018",
    areanm: "Nottingham",
    region: "East Midlands"
  },
  {
    areacd: "E07000219",
    areanm: "Nuneaton and Bedworth",
    region: "West Midlands"
  },
  {
    areacd: "E07000135",
    areanm: "Oadby and Wigston",
    region: "East Midlands"
  },
  {
    areacd: "E08000004",
    areanm: "Oldham",
    region: "North West"
  },
  {
    areacd: "E07000178",
    areanm: "Oxford",
    region: "South East"
  },
  {
    areacd: "W06000009",
    areanm: "Pembrokeshire",
    region: "Wales"
  },
  {
    areacd: "E07000122",
    areanm: "Pendle",
    region: "North West"
  },
  {
    areacd: "E06000031",
    areanm: "Peterborough",
    region: "East of England"
  },
  {
    areacd: "E06000026",
    areanm: "Plymouth",
    region: "South West"
  },
  {
    areacd: "E06000029",
    areanm: "Poole",
    region: "South West"
  },
  {
    areacd: "E06000044",
    areanm: "Portsmouth",
    region: "South East"
  },
  {
    areacd: "W06000023",
    areanm: "Powys",
    region: "Wales"
  },
  {
    areacd: "E07000123",
    areanm: "Preston",
    region: "North West"
  },
  {
    areacd: "E07000051",
    areanm: "Purbeck",
    region: "South West"
  },
  {
    areacd: "E06000038",
    areanm: "Reading",
    region: "South East"
  },
  {
    areacd: "E09000026",
    areanm: "Redbridge",
    region: "London"
  },
  {
    areacd: "E06000003",
    areanm: "Redcar and Cleveland",
    region: "North East"
  },
  {
    areacd: "E07000236",
    areanm: "Redditch",
    region: "West Midlands"
  },
  {
    areacd: "E07000211",
    areanm: "Reigate and Banstead",
    region: "South East"
  },
  {
    areacd: "W06000016",
    areanm: "Rhondda Cynon Taff",
    region: "Wales"
  },
  {
    areacd: "E07000124",
    areanm: "Ribble Valley",
    region: "North West"
  },
  {
    areacd: "E09000027",
    areanm: "Richmond upon Thames",
    region: "London"
  },
  {
    areacd: "E07000166",
    areanm: "Richmondshire",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E08000005",
    areanm: "Rochdale",
    region: "North West"
  },
  {
    areacd: "E07000075",
    areanm: "Rochford",
    region: "East of England"
  },
  {
    areacd: "E07000125",
    areanm: "Rossendale",
    region: "North West"
  },
  {
    areacd: "E07000064",
    areanm: "Rother",
    region: "South East"
  },
  {
    areacd: "E08000018",
    areanm: "Rotherham",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000220",
    areanm: "Rugby",
    region: "West Midlands"
  },
  {
    areacd: "E07000212",
    areanm: "Runnymede",
    region: "South East"
  },
  {
    areacd: "E07000176",
    areanm: "Rushcliffe",
    region: "East Midlands"
  },
  {
    areacd: "E07000092",
    areanm: "Rushmoor",
    region: "South East"
  },
  {
    areacd: "E06000017",
    areanm: "Rutland",
    region: "East Midlands"
  },
  {
    areacd: "E07000167",
    areanm: "Ryedale",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E08000006",
    areanm: "Salford",
    region: "North West"
  },
  {
    areacd: "E08000028",
    areanm: "Sandwell",
    region: "West Midlands"
  },
  {
    areacd: "E07000168",
    areanm: "Scarborough",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000188",
    areanm: "Sedgemoor",
    region: "South West"
  },
  {
    areacd: "E08000014",
    areanm: "Sefton",
    region: "North West"
  },
  {
    areacd: "E07000169",
    areanm: "Selby",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E07000111",
    areanm: "Sevenoaks",
    region: "South East"
  },
  {
    areacd: "E08000019",
    areanm: "Sheffield",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E06000051",
    areanm: "Shropshire",
    region: "West Midlands"
  },
  {
    areacd: "E06000039",
    areanm: "Slough",
    region: "South East"
  },
  {
    areacd: "E08000029",
    areanm: "Solihull",
    region: "West Midlands"
  },
  {
    areacd: "E07000006",
    areanm: "South Bucks",
    region: "South East"
  },
  {
    areacd: "E07000012",
    areanm: "South Cambridgeshire",
    region: "East of England"
  },
  {
    areacd: "E07000039",
    areanm: "South Derbyshire",
    region: "East Midlands"
  },
  {
    areacd: "E06000025",
    areanm: "South Gloucestershire",
    region: "South West"
  },
  {
    areacd: "E07000044",
    areanm: "South Hams",
    region: "South West"
  },
  {
    areacd: "E07000140",
    areanm: "South Holland",
    region: "East Midlands"
  },
  {
    areacd: "E07000141",
    areanm: "South Kesteven",
    region: "East Midlands"
  },
  {
    areacd: "E07000031",
    areanm: "South Lakeland",
    region: "North West"
  },
  {
    areacd: "E07000149",
    areanm: "South Norfolk",
    region: "East of England"
  },
  {
    areacd: "E07000155",
    areanm: "South Northamptonshire",
    region: "East Midlands"
  },
  {
    areacd: "E07000179",
    areanm: "South Oxfordshire",
    region: "South East"
  },
  {
    areacd: "E07000126",
    areanm: "South Ribble",
    region: "North West"
  },
  {
    areacd: "E07000189",
    areanm: "South Somerset",
    region: "South West"
  },
  {
    areacd: "E07000196",
    areanm: "South Staffordshire",
    region: "West Midlands"
  },
  {
    areacd: "E08000023",
    areanm: "South Tyneside",
    region: "North East"
  },
  {
    areacd: "E06000045",
    areanm: "Southampton",
    region: "South East"
  },
  {
    areacd: "E06000033",
    areanm: "Southend-on-Sea",
    region: "East of England"
  },
  {
    areacd: "E09000028",
    areanm: "Southwark",
    region: "London"
  },
  {
    areacd: "E07000213",
    areanm: "Spelthorne",
    region: "South East"
  },
  {
    areacd: "E07000240",
    areanm: "St Albans",
    region: "East of England"
  },
  {
    areacd: "E07000204",
    areanm: "St Edmundsbury",
    region: "East of England"
  },
  {
    areacd: "E08000013",
    areanm: "St. Helens",
    region: "North West"
  },
  {
    areacd: "E07000197",
    areanm: "Stafford",
    region: "West Midlands"
  },
  {
    areacd: "E07000198",
    areanm: "Staffordshire Moorlands",
    region: "West Midlands"
  },
  {
    areacd: "E07000243",
    areanm: "Stevenage",
    region: "East of England"
  },
  {
    areacd: "E08000007",
    areanm: "Stockport",
    region: "North West"
  },
  {
    areacd: "E06000004",
    areanm: "Stockton-on-Tees",
    region: "North East"
  },
  {
    areacd: "E06000021",
    areanm: "Stoke-on-Trent",
    region: "West Midlands"
  },
  {
    areacd: "E07000221",
    areanm: "Stratford-on-Avon",
    region: "West Midlands"
  },
  {
    areacd: "E07000082",
    areanm: "Stroud",
    region: "South West"
  },
  {
    areacd: "E07000205",
    areanm: "Suffolk Coastal",
    region: "East of England"
  },
  {
    areacd: "E08000024",
    areanm: "Sunderland",
    region: "North East"
  },
  {
    areacd: "E07000214",
    areanm: "Surrey Heath",
    region: "South East"
  },
  {
    areacd: "E09000029",
    areanm: "Sutton",
    region: "London"
  },
  {
    areacd: "E07000113",
    areanm: "Swale",
    region: "South East"
  },
  {
    areacd: "W06000011",
    areanm: "Swansea",
    region: "Wales"
  },
  {
    areacd: "E06000030",
    areanm: "Swindon",
    region: "South West"
  },
  {
    areacd: "E08000008",
    areanm: "Tameside",
    region: "North West"
  },
  {
    areacd: "E07000199",
    areanm: "Tamworth",
    region: "West Midlands"
  },
  {
    areacd: "E07000215",
    areanm: "Tandridge",
    region: "South East"
  },
  {
    areacd: "E07000190",
    areanm: "Taunton Deane",
    region: "South West"
  },
  {
    areacd: "E07000045",
    areanm: "Teignbridge",
    region: "South West"
  },
  {
    areacd: "E06000020",
    areanm: "Telford and Wrekin",
    region: "West Midlands"
  },
  {
    areacd: "E07000076",
    areanm: "Tendring",
    region: "East of England"
  },
  {
    areacd: "E07000093",
    areanm: "Test Valley",
    region: "South East"
  },
  {
    areacd: "E07000083",
    areanm: "Tewkesbury",
    region: "South West"
  },
  {
    areacd: "E07000114",
    areanm: "Thanet",
    region: "South East"
  },
  {
    areacd: "E07000102",
    areanm: "Three Rivers",
    region: "East of England"
  },
  {
    areacd: "E06000034",
    areanm: "Thurrock",
    region: "East of England"
  },
  {
    areacd: "E07000115",
    areanm: "Tonbridge and Malling",
    region: "South East"
  },
  {
    areacd: "E06000027",
    areanm: "Torbay",
    region: "South West"
  },
  {
    areacd: "W06000020",
    areanm: "Torfaen",
    region: "Wales"
  },
  {
    areacd: "E07000046",
    areanm: "Torridge",
    region: "South West"
  },
  {
    areacd: "E09000030",
    areanm: "Tower Hamlets",
    region: "London"
  },
  {
    areacd: "E08000009",
    areanm: "Trafford",
    region: "North West"
  },
  {
    areacd: "E07000116",
    areanm: "Tunbridge Wells",
    region: "South East"
  },
  {
    areacd: "E07000077",
    areanm: "Uttlesford",
    region: "East of England"
  },
  {
    areacd: "W06000014",
    areanm: "Vale of Glamorgan",
    region: "Wales"
  },
  {
    areacd: "E07000180",
    areanm: "Vale of White Horse",
    region: "South East"
  },
  {
    areacd: "E08000036",
    areanm: "Wakefield",
    region: "Yorkshire and The Humber"
  },
  {
    areacd: "E08000030",
    areanm: "Walsall",
    region: "West Midlands"
  },
  {
    areacd: "E09000031",
    areanm: "Waltham Forest",
    region: "London"
  },
  {
    areacd: "E09000032",
    areanm: "Wandsworth",
    region: "London"
  },
  {
    areacd: "E06000007",
    areanm: "Warrington",
    region: "North West"
  },
  {
    areacd: "E07000222",
    areanm: "Warwick",
    region: "West Midlands"
  },
  {
    areacd: "E07000103",
    areanm: "Watford",
    region: "East of England"
  },
  {
    areacd: "E07000206",
    areanm: "Waveney",
    region: "East of England"
  },
  {
    areacd: "E07000216",
    areanm: "Waverley",
    region: "South East"
  },
  {
    areacd: "E07000065",
    areanm: "Wealden",
    region: "South East"
  },
  {
    areacd: "E07000156",
    areanm: "Wellingborough",
    region: "East Midlands"
  },
  {
    areacd: "E07000241",
    areanm: "Welwyn Hatfield",
    region: "East of England"
  },
  {
    areacd: "E06000037",
    areanm: "West Berkshire",
    region: "South East"
  },
  {
    areacd: "E07000047",
    areanm: "West Devon",
    region: "South West"
  },
  {
    areacd: "E07000052",
    areanm: "West Dorset",
    region: "South West"
  },
  {
    areacd: "E07000127",
    areanm: "West Lancashire",
    region: "North West"
  },
  {
    areacd: "E07000142",
    areanm: "West Lindsey",
    region: "East Midlands"
  },
  {
    areacd: "E07000181",
    areanm: "West Oxfordshire",
    region: "South East"
  },
  {
    areacd: "E07000191",
    areanm: "West Somerset",
    region: "South West"
  },
  {
    areacd: "E09000033",
    areanm: "Westminster",
    region: "London"
  },
  {
    areacd: "E07000053",
    areanm: "Weymouth and Portland",
    region: "South West"
  },
  {
    areacd: "E08000010",
    areanm: "Wigan",
    region: "North West"
  },
  {
    areacd: "E06000054",
    areanm: "Wiltshire",
    region: "South West"
  },
  {
    areacd: "E07000094",
    areanm: "Winchester",
    region: "South East"
  },
  {
    areacd: "E06000040",
    areanm: "Windsor and Maidenhead",
    region: "South East"
  },
  {
    areacd: "E08000015",
    areanm: "Wirral",
    region: "North West"
  },
  {
    areacd: "E07000217",
    areanm: "Woking",
    region: "South East"
  },
  {
    areacd: "E06000041",
    areanm: "Wokingham",
    region: "South East"
  },
  {
    areacd: "E08000031",
    areanm: "Wolverhampton",
    region: "West Midlands"
  },
  {
    areacd: "E07000237",
    areanm: "Worcester",
    region: "West Midlands"
  },
  {
    areacd: "E07000229",
    areanm: "Worthing",
    region: "South East"
  },
  {
    areacd: "W06000006",
    areanm: "Wrexham",
    region: "Wales"
  },
  {
    areacd: "E07000238",
    areanm: "Wychavon",
    region: "West Midlands"
  },
  {
    areacd: "E07000007",
    areanm: "Wycombe",
    region: "South East"
  },
  {
    areacd: "E07000128",
    areanm: "Wyre",
    region: "North West"
  },
  {
    areacd: "E07000239",
    areanm: "Wyre Forest",
    region: "West Midlands"
  },
  {
    areacd: "E06000014",
    areanm: "York",
    region: "Yorkshire and The Humber"
  }
];
var App_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');body{font-family:'Open Sans', sans-serif}label.svelte-1iad7dh{margin:20px 0 4px 0;font-weight:bold}p.svelte-1iad7dh{margin:4px 0 20px 0}",
  map: null
};
const App = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<form><label for="${"single"}" class="${"svelte-1iad7dh"}">Select one local authority:</label>
	${(0, import_index_cf0e86af.v)(Select_1, "Select").$$render($$result, {
    id: "single",
    idKey: "areacd",
    labelKey: "areanm",
    items
  }, {}, {})}</form>

<p class="${"svelte-1iad7dh"}">Selected: ${(0, import_index_cf0e86af.e)("None")}</p>`;
});
const prerender = true;
let selected, test;
let a;
let b;
let title, dogs;
async function load({ params, fetch, session, stuff }) {
  const response = await fetch(`${import_paths_6758d194.a}/data/place_data/${params.code}.json`);
  test = params.code;
  a = await Promise.resolve().then(() => __toModule(require("../../../chunks/neighbours-25764e6a.js")));
  b = a.default;
  console.log("code", b);
  selected = params.code;
  let data = await response.json();
  console.log(data);
  let myNeighbours = {};
  Object.keys(b).forEach((e) => myNeighbours[e] = b[e].flat().slice(0, 9));
  return { props: { data, myNeighbours, test } };
}
console.log(page);
let top = 0;
let threshold = 0.5;
let bottom = 1;
const U5Bcodeu5D = (0, import_index_cf0e86af.c)(($$result, $$props, $$bindings, slots) => {
  let $story_json, $$unsubscribe_story_json;
  let $all_data, $$unsubscribe_all_data;
  $$unsubscribe_story_json = (0, import_index_cf0e86af.d)(story_json, (value) => $story_json = value);
  $$unsubscribe_all_data = (0, import_index_cf0e86af.d)(all_data, (value) => $all_data = value);
  let { data, myNeighbours } = $$props;
  console.log("myNeighbours", myNeighbours);
  all_data.set(data);
  const country = data.CODE[0];
  console.log("countrty", country);
  let story;
  story = $story_json;
  let theme = (0, import_index_cf0e86af.g)("theme");
  let count;
  let index;
  let offset;
  let progress;
  let components = {};
  let animation;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.myNeighbours === void 0 && $$bindings.myNeighbours && myNeighbours !== void 0)
    $$bindings.myNeighbours(myNeighbours);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    selected && console.log(`${import_paths_6758d194.b}/${selected}`);
    $$rendered = `${data && country && story ? `${(0, import_index_cf0e86af.e)(story)}
  ${(0, import_index_cf0e86af.v)(Header, "Header").$$render($$result, {
      bgcolor: "#206095",
      bgfixed: true,
      theme,
      center: false,
      short: true
    }, {}, {
      default: () => {
        return `<h1><!-- HTML_TAG_START -->${story[0].headline}<!-- HTML_TAG_END --></h1>
	<p style="${"margin-top: 20px"}">09 February 2021</p>
	<br>
	<p class="${"text-big"}" style="${"margin-top: 5px"}"><!-- HTML_TAG_START -->${story[0].lede}<!-- HTML_TAG_END --></p>
	<br>
    
	<div class="${"ons-field"}">${(0, import_index_cf0e86af.v)(App, "Dropdown").$$render($$result, {}, {}, {})}</div>
	<div style="${"margin-top: 90px;"}">${(0, import_index_cf0e86af.v)(Arrow, "Arrow").$$render($$result, { color: "white", animation }, {}, {
          default: () => {
            return `Scroll to begin`;
          }
        })}</div>`;
      }
    })}

  
  
	${(0, import_index_cf0e86af.f)(story, (chunk, i) => {
      return `${chunk.type === "Scroller" ? `${(0, import_index_cf0e86af.v)(Scroller, "Scroller").$$render($$result, {
        top,
        threshold,
        bottom,
        splitscreen: 1,
        count,
        index,
        offset,
        progress
      }, {
        count: ($$value) => {
          count = $$value;
          $$settled = false;
        },
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        },
        offset: ($$value) => {
          offset = $$value;
          $$settled = false;
        },
        progress: ($$value) => {
          progress = $$value;
          $$settled = false;
        }
      }, {
        foreground: () => {
          return `<div slot="${"foreground"}">${(0, import_index_cf0e86af.f)(chunk.foreground, (section) => {
            return `<section${(0, import_index_cf0e86af.a)("id", section["data-id"], 0)}>${section.content && typeof section.content == "object" ? `<div>${(0, import_index_cf0e86af.f)(Object.keys(section.section.content), (type) => {
              return `${(0, import_index_cf0e86af.v)(components[type] || import_index_cf0e86af.m, "svelte:component").$$render($$result, { content: section.section.content[type] }, {}, {})}`;
            })}
				  </div>` : `<div${(0, import_index_cf0e86af.a)("data-id", section["data-id"], 0)}><p><!-- HTML_TAG_START -->${createText(section.section.content, $all_data)}<!-- HTML_TAG_END --></p>
					${section.section.actions["data-description"] ? `<p style="${"color:blue"}" class="${"screen-reader-only"}"><!-- HTML_TAG_START -->${createText(section.section.actions["data-description"], $all_data)}<!-- HTML_TAG_END -->
					  </p>` : ``}
					  ${section.section.actions["data-title"] ? `` : ``}
				  </div>`}
			  </section>`;
          })}
		  </div>`;
        },
        background: () => {
          return `<div slot="${"background"}">${(0, import_index_cf0e86af.v)(Component, "Component").$$render($$result, {
            progress,
            offset,
            index,
            count,
            family: chunk.family,
            component: chunk.background,
            animation: chunk.foreground[index],
            country,
            data
          }, {}, {})}	  

</div>`;
        }
      })}` : ``}
	  ${chunk.type === "Filler" ? `${(0, import_index_cf0e86af.v)(Filler, "Filler").$$render($$result, {
        theme: "lightblue",
        short: true,
        wide: true,
        center: false
      }, {}, {
        default: () => {
          return `<p class="${"text-big"}"><!-- HTML_TAG_START -->${createText(chunk.content, $all_data)}<!-- HTML_TAG_END --></p>
		`;
        }
      })}` : ``}`;
    })}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_story_json();
  $$unsubscribe_all_data();
  return $$rendered;
});
