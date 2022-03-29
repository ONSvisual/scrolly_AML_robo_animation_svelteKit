import express from 'express'
var app = express()
import cors from 'cors'
app.use(cors())
import fs from 'fs'


import LOOKUP from './lookup.js'
//console.log(LOOKUP)
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
import Database from 'better-sqlite3'

const AGEBAND = 'AGEBAND',
  SEX = 'SEX',
  YEAR = 'YEAR',
  LAD = 'LAD',
  REGION = 'REGION',
  COUNTRY = 'COUNTRY',
  VALUE = 'VALUE'

const db2 = new Database('big-census.db')

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

app.get('/:place', (req, res, next) => {
  let CODE = req.params.place


  let search = buildPlace(
    CODE,
    LOOKUP[CODE].NAME,
    LOOKUP[CODE].REGION,
    LOOKUP[CODE].REGION_NAME,
    LOOKUP[CODE].COUNTRY,
    LOOKUP[CODE].COUNTRY_NAME
  )
  res.json(search)
})


// Root path
app.get('/', (req, res, next) => {
  res.json({
    message:
      'Please enter the geographic code for place you are interested in. For example https://.../E07000035',
  })
})

const grab = (sql, vals) => db2.prepare(sql).all(vals)
const replicate = (sql, vals) => db2.prepare(sql)

const SQL_ABS = (key, place, y) =>
  grab(
    'SELECT SUM(VALUE) AS SUM FROM NEW_FIVES WHERE ' +
      key +
      ' = ? AND YEAR = ?',
    [place, y],
  )[0].SUM

const SQL_PC = (key, place, y1, y2) =>
    (100 * (SQL_ABS(key, place, y2) - SQL_ABS(key, place, y1))) /
      SQL_ABS(key, place, y1)

const SQL_ABS_CHANGE = (key, place, y1, y2) =>
  SQL_ABS(key, place, y2) - SQL_ABS(key, place, y1)

const SQL_SIBLING_RANK_ABS = (key, place, y, parent, parentCode) => ({
  here: grab(
    'SELECT ROW_NUMBER() OVER(ORDER BY SUM(VALUE) DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY SUM(VALUE) ASC) AS SMALLEST, ' +
      key +
      ', SUM(VALUE) AS ABS FROM NEW_FIVES WHERE YEAR = ? AND ' +
      parent +
      ' = ? GROUP BY ' +
      key,
    [y, parentCode],
  ).filter((e) => e[key] == place)[0].BIGGEST,
  all: SQL_COUNT(key, parent, parentCode),
})

const SQL_SIBLING_RANK_DENSITY = (key, place, y, parent, parentCode) => ({
  here: grab(
   'SELECT ROW_NUMBER() OVER(ORDER BY DENSITY11 DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY DENSITY11 ASC) AS SMALLEST, ' +
      key +
      ', DENSITY11 AS ABS FROM LAD21_KM2_POP_DENSITY WHERE ' +
      parent +
      ' = ? GROUP BY ' +
      key,
      
     /* `SELECT ROW_NUMBER() OVER(ORDER BY DENSITY11 DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY DENSITY11 ASC) AS SMALLEST,
       LAD
       , DENSITY11 AS ABS FROM LAD21_KM2_POP_DENSITY WHERE 
       REGION =  "E12000004" 
       GROUP BY  
       LAD`*/
      
    [parentCode],
  ).filter((e) => e[key] == place)[0].BIGGEST,
  all: SQL_COUNT('LAD', parent, parentCode),
})

const SQL_SIBLING_RANK_DENSITY_CLASS = (key, place, clas) => ({
  here: grab(
    'SELECT ROW_NUMBER() OVER(ORDER BY PEOPLE_KM2_11 DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY PEOPLE_KM2_11 ASC) AS SMALLEST, ' +
      key +
      ', PEOPLE_KM2_11 AS ABS FROM corresponding_LAD INNER JOIN LAD_lookup ON LAD_lookup.LAD17CD=corresponding_LAD.LAD WHERE corresponding_LAD.CLASS LIKE ? GROUP BY ' +
      key,
    [clas],
  ).filter((e) => e[key] == place)[0].BIGGEST,
  all: grab(
    'SELECT COUNT(*) AS COUNT FROM corresponding_LAD WHERE CLASS LIKE ?',
    [clas],
  )[0].COUNT,
})

const MEAN_CHANGE_BY_CLASS = (clas) =>
  grab(
    'SELECT AVG(POP11-POP01)/AVG(POP01) AS MEAN FROM corresponding_LAD INNER JOIN LAD21_KM2_POP_DENSITY ON LAD21_KM2_POP_DENSITY.LAD=corresponding_LAD.LAD WHERE CLASS LIKE ?',
    [clas],
  )[0].MEAN * 100

const SQL_MEAN_AGE = (key, place, y) =>
  grab(
    'SELECT ROW_NUMBER() OVER(ORDER BY MEAN_AGE DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY MEAN_AGE ASC) AS SMALLEST, ' +
      key +
      ', MEAN_AGE FROM(SELECT  ' +
      key +
      ', (COMBINED_YEARS/PEOPLE) AS MEAN_AGE FROM ( SELECT SUM((AGEBAND+0.5)*VALUE)COMBINED_YEARS, SUM(VALUE)PEOPLE, * FROM NEW_FIVES WHERE YEAR = ? GROUP BY ' +
      key +
      '))',
    y,
  ).filter((e) => e[key] == place)[0].MEAN_AGE

const SQL_CUMULATIVE_AGE = (key, place, y) =>
  grab(
    'SELECT AGEBAND, POPULATION FROM(SELECT AGEBAND, SUM(POP) OVER (ORDER BY AGEBAND) AS POPULATION FROM (SELECT AGEBAND, SUM(VALUE) AS POP FROM NEW_FIVES WHERE ' +
      key +
      '= ? AND YEAR = ? GROUP BY AGEBAND))',
    [place, y],
  )

const SQL_MEDIAN_AGE = (key, place, y, bandwidth, a) => {
  let cumulative = SQL_CUMULATIVE_AGE(key, place, y)
  return cumulative
    .map((e) => e.POPULATION)
    .findIndex((e) => e > cumulative[cumulative.length - 1].POPULATION / 2)
}

const SQL_GET_UNDER = (key, place, y, maxThreshold) =>
  grab(
    'SELECT SUM(VALUE) AS SUM FROM NEW_FIVES WHERE AGEBAND < ? AND ' +
      key +
      ' = ? and YEAR = ?',
    [maxThreshold, place, y],
  )[0].SUM

const SQL_GET_OVER = (key, place, y, minThreshold) =>
  grab(
    'SELECT SUM(VALUE) AS SUM FROM NEW_FIVES WHERE AGEBAND >= ? AND ' +
      key +
      ' = ? and YEAR = ?',
    [minThreshold, place, y],
  )[0].SUM

const SQL_GET_OVER_SEX = (key, place, y, minThreshold, sex) =>
  grab(
    'SELECT SUM(VALUE) AS SUM FROM NEW_FIVES WHERE AGEBAND >= ? AND ' +
      key +
      ' = ? AND SEX =? and YEAR = ?',
    [minThreshold, place, sex, y],
  )[0].SUM

const SQL_GET_BETWEEN = (key, place, y, minThreshold, maxThreshold) =>
  grab(
    'SELECT SUM(VALUE) AS SUM FROM NEW_FIVES WHERE AGEBAND>= ? AND AGEBAND< ? AND ' +
      key +
      ' = ? and YEAR = ?',
    [minThreshold, maxThreshold, place, y],
  )[0].SUM

const SQL_COUNT = (key, parent, parentCode) =>
  grab(
    'SELECT COUNT(' +
      key +
      ') AS COUNT FROM  NEW_FIVES WHERE ' +
      parent +
      ' = ? GROUP BY SEX, YEAR, AGEBAND LIMIT 1',
    parentCode,
  )[0].COUNT

const SQL_PYRAMID = (key, place, y) => {
  let allData = grab(
    'SELECT AGEBAND, SEX, SUM(VALUE) AS VALUE FROM NEW_FIVES WHERE ' +
      key +
      ' = ? AND YEAR = ? GROUP BY AGEBAND, SEX, YEAR,' +
      key,
    [place, y],
  )

  let sumPlace = SQL_ABS(key, place, y)

  return [
    allData
      .filter((e) => e.SEX == 'M')
      .map((e) => ((100 * e.VALUE) / sumPlace).toFixed(3)),
    allData
      .filter((e) => e.SEX == 'F')
      .map((e) => ((100 * e.VALUE) / sumPlace).toFixed(3)),
  ]
}
const SQL_COHORT_CHANGE = (key, place) =>
  grab(
    'SELECT AGEBAND, SUM(TENYRNETCHANGE) AS CHANGE, SUM(VALUE) AS ALL_POP, SUM(TENYRNETCHANGE) * 100 / (SUM(VALUE) - SUM(TENYRNETCHANGE))  AS PC FROM NEW_FIVES WHERE YEAR =2011 AND AGEBAND>=10 AND AGEBAND<85 AND ' +
      key +
      '= ? GROUP BY AGEBAND',
    place,
  )
    .map((e) => [2011 - e.AGEBAND, e.PC])
    .reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {})

const SQL_COHORT_CHANGE_SEX = (key, place, sex) =>
  grab(
    'SELECT AGEBAND, SUM(TENYRNETCHANGE) AS CHANGE, SUM(VALUE) AS ALL_POP, SUM(TENYRNETCHANGE) * 100 / (SUM(VALUE) - SUM(TENYRNETCHANGE))  AS PC FROM NEW_FIVES WHERE YEAR =2011 AND AGEBAND>=10 AND AGEBAND<85 AND ' +
      key +
      '= ? AND SEX=? GROUP BY AGEBAND',
    [place, sex],
  )
    .map((e) => [2011 - e.AGEBAND, e.PC])
    .reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {})

const SQL_HEADLINE_COHORT_CHANGE = (
  key,
  place,
  sex,
  arr = SQL_COHORT_CHANGE_SEX(key, place, sex),
) => ({
  greatest_increase: {
    birth: Object.entries(arr).sort((a, b) => b[1] - a[1])[0][0],
    increment: Object.entries(arr).sort((a, b) => b[1] - a[1])[0][1],
  },
  greatest_decrease_under65: {
    birth: +Object.entries(arr)
      .filter((e) => e[0] > 1956)
      .sort((a, b) => a[1] - b[1])[0][0],
    increment: Object.entries(arr)
      .filter((e) => e[0] > 1956)
      .sort((a, b) => a[1] - b[1])[0][1],
  },
})

const SQL_NEIGHBOURS = (place) =>
  Object.values(grab('SELECT * FROM Neighbours WHERE LAD = ?', place)[0])

const SQL_NEIGHBOUR_RANK_ABS = (key, place, y) =>
  grab(
    'SELECT ROW_NUMBER() OVER(ORDER BY SUM(VALUE) DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY SUM(VALUE) ASC) AS SMALLEST, ' +
      key +
      ', SUM(VALUE) AS ABS FROM NEW_FIVES WHERE YEAR = ? AND LAD IN (?,?,?,?,?,?,?,?,?,?) GROUP BY ' +
      key,
    [y].concat(SQL_NEIGHBOURS(place)),
  ).filter((e) => e[key] == place)[0].BIGGEST

const SQL_HEADLINE_FOOTBALL_PITCH_EXTREMES = (key, place) => ({
  highest: grab(
    'SELECT LAD, NAME, DENSITY11*1.0/187 AS PEOPLE_PER_FOOOTY_PITCH FROM LAD21_KM2_POP_DENSITY WHERE ' +
      key +
      '=? AND DENSITY11 IS NOT NULL ORDER BY DENSITY11 DESC LIMIT 1',
    [place],
  )[0],
  lowest: grab(
    'SELECT LAD, NAME, DENSITY11*1.0/187 AS PEOPLE_PER_FOOOTY_PITCH FROM LAD21_KM2_POP_DENSITY WHERE ' +
      key +
      '=? AND DENSITY11 IS NOT NULL ORDER BY DENSITY11 ASC LIMIT 1',
    [place],
  )[0],
})

const SQL_NEW_FOOTBALLERS_BY_CLASS = (
  arr = grab(
    'SELECT CLASS, AVG(PEOPLE_KM2_01) AS DENS_01, AVG(PEOPLE_KM2_11) AS DENS_11, (AVG(PEOPLE_KM2_11)-AVG(PEOPLE_KM2_01))/187 AS ADDITIONAL_PLAYERS FROM LAD_lookup WHERE CLASS IS NOT NULL GROUP BY CLASS ORDER BY ADDITIONAL_PLAYERS DESC',
    [],
  ),
) => ({
  first: arr[0],
  second: arr[1],
  third: arr[2],
  fourth: arr[3],
  fifth: arr[4],
  sixth: arr[5],
  seventh: arr[6],
  eighth: arr[7],
})

const SQL_NEIGHBOR_CHANGE = (
  place,
  y1,
  y2,
  res = SQL_NEIGHBOURS(place)
    .filter((e) => e != place)
    .map((e) => ({ NAME: LOOKUP[e].NAME, VAL: SQL_PC('LAD', e, y1, y2), CODE:e }))
    .sort((a, b) => a.VAL - b.VAL),
) => ({
  last: res[0],
  penultimate: res[1],
  second: res[res.length - 2],
  top: res[res.length - 1],
})

const SQL_HEADLINE_ABS_TOP = (
  key,
  place,
  res = grab(
    'SELECT LAD, NAME, POP11, POP01, (POP11-POP01)*100/POP01 AS CHANGE FROM LAD21_KM2_POP_DENSITY WHERE POP11 IS NOT NULL AND ' +
      key +
      ' = ? ORDER BY POP11 DESC LIMIT 2',
    [place],
  ),
) => ({ top: res[0], second: res[1] })

const SQL_HEADLINE_ABS_BOTTOM = (
  key,
  place,
  res = grab(
    'SELECT LAD, NAME, POP11, POP01, (POP11-POP01)*100/POP01 AS CHANGE FROM LAD21_KM2_POP_DENSITY WHERE POP11 IS NOT NULL AND ' +
      key +
      ' = ? ORDER BY CHANGE ASC LIMIT 2',
    [place],
    ),
    ) => ({ lowest: res[0], second_lowest: res[1] })

const SQL_HEADLINE_PC_TOP = (
  key,
  place,
  res = grab(
    'SELECT LAD, NAME, POP11, POP01, (POP11-POP01)*100/POP01 AS CHANGE FROM LAD21_KM2_POP_DENSITY WHERE POP11 IS NOT NULL AND ' +
      key +
      ' = ? ORDER BY CHANGE DESC LIMIT 2',
    [place],
  ),
) => ({ top: res[0], second: res[1] })

const SQL_HEADLINE_PC_BOTTOM = (
  key,
  place,
  res = grab(
    'SELECT LAD, NAME, POP11, POP01, (POP11-POP01)*100/POP01 AS CHANGE FROM LAD21_KM2_POP_DENSITY WHERE POP11 IS NOT NULL AND ' +
      key +
      ' = ? ORDER BY CHANGE ASC LIMIT 2',
    [place],
  ),
) => ({ lowest: res[0], second_lowest: res[1] })

const SQL_HEADLINE_PC_ALL_REGIONS = () =>
  grab(
    'SELECT GOR10NM, 100*(SUM(TOTAL11*1.0)-SUM(TOTAL01*1.0))/SUM(TOTAL01*1.0)  AS GROWTH, SUM(TOTAL01) AS COUNT01, SUM(TOTAL11) AS COUNT11 FROM LAD_lookup GROUP BY GOR10CD ORDER BY GROWTH DESC',
    [],
  )

const SQL_TWINS = (place) =>
  Object.values(
    grab(
      'SELECT LAD,S1,S2,S3,S4,S5 FROM corresponding_LAD WHERE LAD = ?',
      place,
    )[0],
  )

const SQL_TWINS_ARRAY = (place) =>
  SQL_TWINS(place).map((e) =>
    grab('SELECT * FROM LAD_lookup WHERE LAD17CD LIKE ?', e),
  )

const SQL_TWINS_OBJECT = (place, arr = SQL_TWINS_ARRAY(place)) => ({
  here: arr[0][0],
  first: arr[1][0],
  second: arr[2][0],
  third: arr[3][0],
  fourth: arr[4][0],
  fifth: arr[5][0],
})

const SQL_TWINS_RANK_ABS = (key, place, y) =>
  grab(
    'SELECT ROW_NUMBER() OVER(ORDER BY SUM(VALUE) DESC) AS BIGGEST, ROW_NUMBER() OVER(ORDER BY SUM(VALUE) ASC) AS SMALLEST, ' +
      key +
      ', SUM(VALUE) AS ABS FROM NEW_FIVES WHERE YEAR = ? AND LAD IN (?,?,?,?,?,?) GROUP BY ' +
      key,
    [y].concat(SQL_TWINS(place)),
  ).filter((e) => e[key] == place)[0].BIGGEST

const SQL_TWIN_DEFINITION = (place) =>
  Object.values(
    grab('SELECT CLASS FROM corresponding_LAD WHERE LAD = ?', place)[0],
  )[0].toLowerCase()

const SQL_LA_DENSITY = (place) =>
  grab('SELECT DENSITY11 FROM LAD21_KM2_POP_DENSITY WHERE LAD = ?', place)[0]

const SQL_LA_DENSITY_RANK = (place, parent) =>
  grab(
   /* 'SELECT DENSITY_RANK_11 FROM LAD21_KM2_POP_DENSITY WHERE LAD = ?',
    place,
  )[0]*/
  'SELECT ROW_NUMBER() OVER(ORDER BY SUM(VALUE) DESC) AS RANK, LAD, SUM(VALUE) AS ABS FROM NEW_FIVES WHERE YEAR = 2011 AND REGION = ? GROUP BY LAD',
  parent
  ).find(e=>e.LAD==place).RANK

  const SQL_LARGEST_AGEGROUP = (key, place)=>
  grab(
    'SELECT AGEBAND FROM NEW_FIVES WHERE '+ key +' = ? AND YEAR = 2011 ORDER BY VALUE DESC LIMIT 1',
    place
  )[0]

function buildPlace(
  CODE,
  NAME,
  REGION_CODE,
  REGION_NAME,
  COUNTRY_CODE,
  COUNTRY_NAME,
) {
  let STRUCTURE = {
    CODE: CODE,
    NAME: NAME,
    REGION_CODE: REGION_CODE,
    REGION_NAME: REGION_NAME,
    COUNTRY_CODE: COUNTRY_CODE,
    COUNTRY_NAME: COUNTRY_NAME,
    //CLASS: SQL_TWIN_DEFINITION(CODE),

    LA: {
      ABS: {
        Y01: SQL_ABS(LAD, CODE, 2001),
        Y11: SQL_ABS(LAD, CODE, 2011),
      },

      ABS_CHANGE: {
        FROM01TO11: SQL_ABS_CHANGE(LAD, CODE, 2001, 2011),
      },

      PC_CHANGE: {
        FROM01TO11: SQL_PC(LAD, CODE, 2001, 2011),
        CHART_DATA: [ {year:2001, value:0, group:NAME},
                      {year:2001, value:0, group:REGION_NAME},
                      {year:2001, value:0, group:COUNTRY_NAME},
                      {year:2011, value:SQL_PC(LAD, CODE, 2001, 2011), group:NAME},
                      {year:2011, value:SQL_PC(REGION, REGION_CODE, 2001, 2011), group:REGION_NAME},
                      {year:2011, value:SQL_PC(COUNTRY, COUNTRY_CODE, 2001, 2011), group:COUNTRY_NAME} ],
      },

    REGION_RANK: {
        DENSITY: {
          Y01: 0,
          Y11: SQL_SIBLING_RANK_DENSITY( //UPDATE FOR PARENTS WHEN NOT UTLA!!!!!!
            LAD,
            CODE,
            2011,
            REGION,
            REGION_CODE,
          ),
        },
      },
    /*    CLASS_RANK: {
        DENSITY: {
          Y11: SQL_SIBLING_RANK_DENSITY_CLASS(
            'LAD17CD',
            CODE,
            SQL_TWIN_DEFINITION(CODE),
          ),
        },
      },
      CLASS_CHANGE_MEAN:{}, //MEAN_CHANGE_BY_CLASS(SQL_TWIN_DEFINITION(CODE))
      REGION_RANK: {
        Y01: SQL_SIBLING_RANK_ABS(LAD, CODE, 2001, REGION, REGION_CODE),
        Y11: SQL_SIBLING_RANK_ABS(LAD, CODE, 2011, REGION, REGION_CODE),
      },*/
      COUNTRY_RANK: {
        Y01: SQL_SIBLING_RANK_ABS(LAD, CODE, 2001, COUNTRY, COUNTRY_CODE),
        Y11: SQL_SIBLING_RANK_ABS(LAD, CODE, 2011, COUNTRY, COUNTRY_CODE),
      },
    /*   NEIGHBOUR_RANK: {
        Y01: SQL_NEIGHBOUR_RANK_ABS(LAD, CODE, 2001),
        Y11: SQL_NEIGHBOUR_RANK_ABS(LAD, CODE, 2001),
      },
     TWINS_RANK: {
       Y01: SQL_TWINS_RANK_ABS(LAD, CODE, 2001),
        Y11: SQL_TWINS_RANK_ABS(LAD, CODE, 2011),
      },*/
      MEAN_AGE: {
        Y01: SQL_MEAN_AGE(LAD, CODE, 2001),
        Y11: SQL_MEAN_AGE(LAD, CODE, 2011),
      },
      MEDIAN_AGE: {
        Y01: SQL_MEDIAN_AGE(LAD, CODE, 2001, 0.5),
        Y11: SQL_MEDIAN_AGE(LAD, CODE, 2011, 0.5),
      },
      UNDER20: {
        ABS: {
          Y01: SQL_GET_UNDER(LAD, CODE, 2001, 18),
          Y11: SQL_GET_UNDER(LAD, CODE, 2011, 18),
        },
        PC: {
          Y01:
            (100 * SQL_GET_UNDER(LAD, CODE, 2001, 18)) /
            SQL_ABS(LAD, CODE, 2001),
          Y11:
            (100 * SQL_GET_UNDER(LAD, CODE, 2011, 18)) /
            SQL_ABS(LAD, CODE, 2011),
        },
      },
      OVER65: {
        ABS: {
          Y01: SQL_GET_OVER(LAD, CODE, 2001, 65),
          Y11: SQL_GET_OVER(LAD, CODE, 2011, 65),
          M: SQL_GET_OVER_SEX(LAD, CODE, 2001, 65, 'M'),
          F: SQL_GET_OVER_SEX(LAD, CODE, 2001, 65, 'F'),
        },
        PC: {
          Y01:
            (100 * SQL_GET_OVER(LAD, CODE, 2001, 65)) /
            SQL_ABS(LAD, CODE, 2001),
          Y11:
            (100 * SQL_GET_OVER(LAD, CODE, 2011, 65)) /
            SQL_ABS(LAD, CODE, 2011),
        },
      },
      WORKING: {
        ABS: {
          Y01: SQL_GET_BETWEEN(LAD, CODE, 2001, 18, 65),
          Y11: SQL_GET_BETWEEN(LAD, CODE, 2011, 18, 65),
        },
        PC: {
          Y01:
            (100 * SQL_GET_BETWEEN(LAD, CODE, 2001, 18, 65)) /
            SQL_ABS(LAD, CODE, 2001),
          Y11:
            (100 * SQL_GET_BETWEEN(LAD, CODE, 2011, 18, 65)) /
            SQL_ABS(LAD, CODE, 2011),
        },
      },
      PYRAMID01: SQL_PYRAMID(LAD, CODE, 2001),
      PYRAMID11: SQL_PYRAMID(LAD, CODE, 2011),
      LARGEST_AGEGROUP: SQL_LARGEST_AGEGROUP(LAD, CODE),
      COHORT_CHANGE11: SQL_COHORT_CHANGE(LAD, CODE),
      COHORT_CHANGE11_M: SQL_COHORT_CHANGE_SEX(LAD, CODE, 'M'),
      COHORT_CHANGE11_F: SQL_COHORT_CHANGE_SEX(LAD, CODE, 'F'),
      DENSITY: SQL_LA_DENSITY(CODE),
  /*    DENSITY_RANK: SQL_LA_DENSITY_RANK(CODE),*/
      HEADLINES: {
        ARRIVE_DEPART: {
          M: SQL_HEADLINE_COHORT_CHANGE(LAD, CODE, 'M'),
          F: SQL_HEADLINE_COHORT_CHANGE(LAD, CODE, 'F'),
        },
      },
    },
    REGION: {
      ABS: {
        Y01: SQL_ABS(REGION, REGION_CODE, 2001),
        Y11: SQL_ABS(REGION, REGION_CODE, 2011),
      },

      ABS_CHANGE: {
        FROM01TO11: SQL_ABS_CHANGE(REGION, REGION_CODE, 2001, 2011),
      },

      PC_CHANGE: {
        FROM01TO11: SQL_PC(REGION, REGION_CODE, 2001, 2011),
      },
  /*    MEAN_AGE: {
        Y01: SQL_MEAN_AGE(REGION, REGION_CODE, 2001),
        Y11: SQL_MEAN_AGE(REGION, REGION_CODE, 2011),
      },*/
      MEDIAN_AGE: {
        Y01: SQL_MEDIAN_AGE(REGION, REGION_CODE, 2001, 0.5),
        Y11: SQL_MEDIAN_AGE(REGION, REGION_CODE, 2011, 0.5),
      },
      UNDER20: {
        ABS: {
          Y01: SQL_GET_UNDER(REGION, REGION_CODE, 2001, 18),
          Y11: SQL_GET_UNDER(REGION, REGION_CODE, 2011, 18),
        },
        PC: {
          Y01:
            (100 * SQL_GET_UNDER(REGION, REGION_CODE, 2001, 18)) /
            SQL_ABS(REGION, REGION_CODE, 2001),
          Y11:
            (100 * SQL_GET_UNDER(REGION, REGION_CODE, 2011, 18)) /
            SQL_ABS(REGION, REGION_CODE, 2011),
        },
      },
      OVER65: {
        ABS: {
          Y01: SQL_GET_OVER(REGION, REGION_CODE, 2001, 65),
          Y11: SQL_GET_OVER(REGION, REGION_CODE, 2011, 65),
        },
        PC: {
          Y01:
            (100 * SQL_GET_OVER(REGION, REGION_CODE, 2001, 65)) /
            SQL_ABS(REGION, REGION_CODE, 2001),
          Y11:
            (100 * SQL_GET_OVER(REGION, REGION_CODE, 2011, 65)) /
            SQL_ABS(REGION, REGION_CODE, 2011),
        },
      },
      WORKING: {
        ABS: {
          Y01: SQL_GET_BETWEEN(REGION, REGION_CODE, 2001, 20, 65),
          Y11: SQL_GET_BETWEEN(REGION, REGION_CODE, 2011, 20, 65),
        },
        PC: {
          Y01:
            (100 * SQL_GET_BETWEEN(REGION, REGION_CODE, 2001, 20, 65)) /
            SQL_ABS(REGION, REGION_CODE, 2001),
          Y11:
            (100 * SQL_GET_BETWEEN(REGION, REGION_CODE, 2011, 20, 65)) /
            SQL_ABS(REGION, REGION_CODE, 2011),
        },
      },
      PYRAMID01: SQL_PYRAMID(REGION, REGION_CODE, 2001),
      PYRAMID11: SQL_PYRAMID(REGION, REGION_CODE, 2011),
      COHORT_CHANGE11: SQL_COHORT_CHANGE(REGION, REGION_CODE),
      COHORT_CHANGE11_M: SQL_COHORT_CHANGE_SEX(REGION, REGION_CODE, 'M'),
      COHORT_CHANGE11_F: SQL_COHORT_CHANGE_SEX(REGION, REGION_CODE, 'F'),
      HEADLINES: {
        BIGGEST_POP_CHANGE_UP: SQL_HEADLINE_PC_TOP('REGION', REGION_CODE),
        BIGGEST_POP_CHANGE_DOWN: SQL_HEADLINE_PC_BOTTOM('REGION', REGION_CODE),
        REGIONS_CHANGE: SQL_HEADLINE_PC_ALL_REGIONS(),
      },
    },
    COUNTRY: {
      ABS: {
        Y01: SQL_ABS(COUNTRY, COUNTRY_CODE, 2001),
        Y11: SQL_ABS(COUNTRY, COUNTRY_CODE, 2011),
      },

      ABS_CHANGE: {
        FROM01TO11: SQL_ABS_CHANGE(COUNTRY, COUNTRY_CODE, 2001, 2011),
      },

      PC_CHANGE: {
        FROM01TO11: SQL_PC(COUNTRY, COUNTRY_CODE, 2001, 2011),
      },

  /*    MEAN_AGE: {
        Y01: SQL_MEAN_AGE(COUNTRY, COUNTRY_CODE, 2001),
        Y11: SQL_MEAN_AGE(COUNTRY, COUNTRY_CODE, 2011),
      },
      MEDIAN_AGE: {
        Y01: SQL_MEDIAN_AGE(COUNTRY, COUNTRY_CODE, 2001, 0.5),
        Y11: SQL_MEDIAN_AGE(COUNTRY, COUNTRY_CODE, 2011, 0.5),
      },*/
      UNDER20: {
        ABS: {
          Y01: SQL_GET_UNDER(COUNTRY, COUNTRY_CODE, 2001, 18),
          Y11: SQL_GET_UNDER(COUNTRY, COUNTRY_CODE, 2011, 18),
        },
        PC: {
          Y01:
            (100 * SQL_GET_UNDER(COUNTRY, COUNTRY_CODE, 2001, 18)) /
            SQL_ABS(COUNTRY, COUNTRY_CODE, 2001),
          Y11:
            (100 * SQL_GET_UNDER(COUNTRY, COUNTRY_CODE, 2011, 18)) /
            SQL_ABS(COUNTRY, COUNTRY_CODE, 2011),
        },
      },
      OVER65: {
        ABS: {
          Y01: SQL_GET_OVER(COUNTRY, COUNTRY_CODE, 2001, 65),
          Y11: SQL_GET_OVER(COUNTRY, COUNTRY_CODE, 2011, 65),
        },
        PC: {
          Y01:
            (100 * SQL_GET_OVER(COUNTRY, COUNTRY_CODE, 2001, 65)) /
            SQL_ABS(COUNTRY, COUNTRY_CODE, 2001),
          Y11:
            (100 * SQL_GET_OVER(COUNTRY, COUNTRY_CODE, 2011, 65)) /
            SQL_ABS(COUNTRY, COUNTRY_CODE, 2011),
        },
      },
      WORKING: {
        ABS: {
          Y01: SQL_GET_BETWEEN(COUNTRY, COUNTRY_CODE, 2001, 20, 65),
          Y11: SQL_GET_BETWEEN(COUNTRY, COUNTRY_CODE, 2011, 20, 65),
        },
        PC: {
          Y01:
            (100 * SQL_GET_BETWEEN(COUNTRY, COUNTRY_CODE, 2001, 20, 65)) /
            SQL_ABS(COUNTRY, COUNTRY_CODE, 2001),
          Y11:
            (100 * SQL_GET_BETWEEN(COUNTRY, COUNTRY_CODE, 2011, 20, 65)) /
            SQL_ABS(COUNTRY, COUNTRY_CODE, 2011),
        },
      },
      PYRAMID01: SQL_PYRAMID(COUNTRY, COUNTRY_CODE, 2001),
      PYRAMID11: SQL_PYRAMID(COUNTRY, COUNTRY_CODE, 2011),
      LARGEST_AGEGROUP: SQL_LARGEST_AGEGROUP(COUNTRY, COUNTRY_CODE),
      COHORT_CHANGE11: SQL_COHORT_CHANGE(COUNTRY, COUNTRY_CODE),
      COHORT_CHANGE11_M: SQL_COHORT_CHANGE_SEX(COUNTRY, COUNTRY_CODE, 'M'),
      COHORT_CHANGE11_F: SQL_COHORT_CHANGE_SEX(COUNTRY, COUNTRY_CODE, 'F'),
      HEADLINES: {
        BIGGEST_POP:SQL_HEADLINE_ABS_TOP('COUNTRY', COUNTRY_CODE),
        SMALLEST_POP:SQL_HEADLINE_ABS_BOTTOM('COUNTRY', COUNTRY_CODE),
        BIGGEST_POP_CHANGE_UP: SQL_HEADLINE_PC_TOP('COUNTRY', COUNTRY_CODE),
        BIGGEST_POP_CHANGE_DOWN: SQL_HEADLINE_PC_BOTTOM(
          'COUNTRY',
          COUNTRY_CODE,
        ),
        FOOTBALL_PITCH_EXTREMES: SQL_HEADLINE_FOOTBALL_PITCH_EXTREMES(
          'COUNTRY',
          COUNTRY_CODE,
        ),
        NEW_PLAYERS_BY_CLASS: SQL_NEW_FOOTBALLERS_BY_CLASS(),
      },
    },

    SPECIALITY: {
      TYPE: 'COASTAL',
      PARTNERS: [],
    },
    RURBAN: {
      RURAL: false,
      PARTNERS: [],
    },
    NEIGHBOURS: {
      CODES: SQL_NEIGHBOURS(CODE),
      PC_CHANGE: SQL_NEIGHBOR_CHANGE(CODE, 2001, 2011),
    },
   /* TWINS: SQL_TWINS_OBJECT(CODE),*/
    SIBLING_MATCHES: [],
  }
  return STRUCTURE
}
/*
Object.keys(LOOKUP)*/
[
"E06000058",
]
.forEach(e=>{
  let CODE=e;
  
  let output 
  
  try{
    output=
    buildPlace(
      CODE,
      LOOKUP[CODE].NAME,
      LOOKUP[CODE].REGION,
      LOOKUP[CODE].REGION_NAME,
      LOOKUP[CODE].COUNTRY,
      LOOKUP[CODE].COUNTRY_NAME
    )
  }catch(err){output= err}
  
  if(output){
  fs.writeFile(e+'.json', JSON.stringify(output), function (err) {
    if (err) return console.log(err);
  });}
}
  )