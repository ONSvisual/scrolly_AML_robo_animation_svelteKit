# robojournalist

> A simple template system

## Install

```
$ npm install robojournalist
```

## Usage

```js
import robojournalist from 'robojournalist';

robojournalist('The value of a is {a}.', {a: 'b'});
//=> 'The value of a is b.'

robojournalist('The value of a.b is {a.b}.', {a: {b: 'c'}});
//=> 'The value of a.b is c.'

robojournalist('{which?a:{b}}', {which: true, b: 'y'});
//=> 'a'

robojournalist('{which?a:{b}}', {which: false, b: 'y'});
//=> 'y'
```

Braces can be nested to any depth.

Use `{:}` and `{?}` to add a colon and question mark to the output.

## API

### robojournalist(template, data)

#### template

Type: `string`

The template string, with braced variable names.

#### data

Type: `object`

If the template string refers to `{varName}`, the value of `data.varName` will
be placed in the output.
