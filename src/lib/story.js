import  {load}  from 'archieml' //this is the parser from ArchieML to JSON
import {txt} from './script.js'
import { writable } from 'svelte/store';
export const story_json = writable(load(txt).ScrollY.map(e=>e.Part));
