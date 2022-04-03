export const txt= `
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
content:Some nearby areas like {NEIGHBOURS.PC_CHANGE.top.NAME @} and {NEIGHBOURS.PC_CHANGE.second.NAME @} have seen their populations increase by {NEIGHBOURS.PC_CHANGE.top.VAL .0}% and {NEIGHBOURS.PC_CHANGE.second.VAL .0}% respectively, while others such as {NEIGHBOURS.PC_CHANGE.last.NAME @} ({NEIGHBOURS.PC_CHANGE.last.VAL .0}%) and {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} ({NEIGHBOURS.PC_CHANGE.penultimate.VAL .0}%) have seen smaller changes.
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
content:The sharpest population increases in {REGION_NAME} have been seen in {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME @} and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME @}, where the populations have grown by {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE}% and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE}% respectively.
{}
{.section}
{.actions}
data-id:3
data-description:On the same bar chart,  The district that has recorded the slowest growth is  highlighted. {TABLE}
data-title:Ten year population growth of local authority districts in {REGION_NAME}
{}
content:At the other end of the scale, {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.NAME @} has seen {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE 0 <?a fall of {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE ~abs}%.:}{REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE 0 >?an increase of just {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE}%.:}{REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE?:no notable change.}
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
content:{COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME @} saw the largest percentage growth in population in {COUNTRY_NAME}, increasing {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE}% between 2001 and 2011. {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME @} was second, increasing {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE}%.
{}
{.section}
{.actions}
data-id:6
data-description:The district that has seen the greatest fall in population is highlighted on the bell curve.{TABLE}
data-title:Local authority districts grouped by population growth in {COUNTRY_NAME}
{}
content:A few places have seen their populations decline. {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.NAME @} had an estimated population of {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP11 ,} in 2011, which was {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP01 COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP11 - ,} fewer than in 2001, and a decrease of {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE ~abs}%.
{}
{.section}
{.actions}
data-id:7
data-description:The bell curve changes into circles located at the centre of each district on a map. The area of each circle indicates the total population.{TABLE}
data-title:Population size of local authority districts in {COUNTRY_NAME}
{}
content:The total population of local authority areas varies a lot, from {COUNTRY.HEADLINES.BIGGEST_POP.top.NAME @} with over {COUNTRY.HEADLINES.BIGGEST_POP.top.POP11 ,} people to {COUNTRY.HEADLINES.SMALLEST_POP.lowest.NAME @} with just over {COUNTRY.HEADLINES.SMALLEST_POP.lowest.POP11} people. The area of these circles indicates total population.
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
content:In {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.highest.NAME @}, the population works out at around {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.highest.PEOPLE_PER_FOOOTY_PITCH .0} per pitch.
{}
{.section}
{.actions}
data-id:11
data-title: Population density of {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.NAME}
{}
content:At the other end of the population density scale, the amount of land in the rural district of {COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.NAME @} works out at nearly {1 COUNTRY.HEADLINES.FOOTBALL_PITCH_EXTREMES.lowest.PEOPLE_PER_FOOOTY_PITCH / .0} pitches per resident.
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
[]
{}
****** GROWTH BY AGE GROUP ******
{.Part}
type:Filler
content:In some areas in {COUNTRY_NAME}, population growth has been highest among children and young people, while in others working age or older people have increased the most. These maps show where each of the age-groups has grown the most.
{}//end of Filler
{.Part}
type:Scroller
background:Highlighted_map

[.foreground]
{.section}
{.actions}
data-id:17
data-description: A map of {COUNTRY_NAME} appears, highlighting the 10 districts with the greatest increase in people aged 65 and over.{TABLE}
data-title: Top five districts for population increase in over-65’s 
{}
content:{WALES 1 ===?The places that have seen the largest increases in the proportion of people aged 65 years and over are <a href="/W06000021">Monmouthshire</a>, which has seen 25% growth, and the <a href="/W06000001">Isle of Anglesey</a> (23%):The places that have seen the largest increases in the proportion of people aged 65 years and over are <a href="/E07000089">Hart</a>, in the South East, which has seen 42% growth, and <a href="/E07000194">Lichfield</a> (40%)}.
{}

{.section}
{.actions}
data-id:18
data-description: The map now highlights the 10 districts with the greatest increase in people aged under 15.{TABLE}
data-title: Top five districts for population increase in under-15’s
{}
content:{WALES 1 ===?The number of children in every local authority district of Wales has decreased, with the exception of Wrexham, which has seen a 1% increase in people aged under 15:The places that have seen the largest increase in the proportion of people aged under 15 years are <a href="/E09000033">Westminster</a>, in London, which has seen 32% growth, and <a href="/E06000039">Slough</a> in the South East (26%). Seven of the ten places that have seen the greatest growth in number of children are in the London region}.
{}
[]
{}//end of 4th Scroller*** SEX ***
{.Part}
type:Filler
content:Around 51% of the population of {COUNTRY_NAME} is female and 49% is male. However, women tend to live longer than men, so areas with an older population typically have more females than males.
{}//end of Filler
{.Part}
type:Scroller
background:MaleFemale
family:verticalBar
[.foreground]
{.section}
{.actions}
data-id:19
data-description: A bar chart is displayed with two bars showing the number of males and females aged 65 years and over in {NAME}.{TABLE}
data-title:The split of males and females aged 65 years and over in {NAME}
{}
content:In the 65 years and over age group, {NAME} has a split of {LA.OVER65.ABS.F ,} females to {LA.OVER65.ABS.M ,} males.
{}
{.section}
{.actions}
data-id:20
data-description: A map of {COUNTRY_NAME} highlights the 5 places with the highest ratio of males to females and the highest ratio of female to males. {TABLE} 
data-title:The most male and female places in {COUNTRY_NAME}

{}
content:{WALES 1 ===?Every local authority district in Wales has more females than males, with the most balanced place being Wrexham. The place with the highest ratio of females to males in {COUNTRY_NAME} is Conwy, which has 106 females for every 100 males.:The most male places in England are the City of London, Richmondshire and Newham. The most female places; West Somerset, Rother and Arun. } 
{}
[]
{}//end of fifth Scroller
{.Part}
type:Filler
content:We are publishing more insights from Census 2021. These first results are from the more <u>detailed bulletin</u>.<br><br>You can find out more about what has changed in your area since 2011 with our <u>local page</u>.<br><br>And you can test your population knowledge with this <u>online game</u>. <br><br><br>Future census topics to be released include<br><ul><li>Households and their characteristics</li><li>Ethnicity, identity, language and religion</li></ul><br>Explore more census content <u>here</u>.{}
[]//end of ScrollY

`