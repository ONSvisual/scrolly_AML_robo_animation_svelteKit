import pkg from 'archieml';
const { load } = pkg; //this is the parser from ArchieML to JSON
import {txt} from './script.js'
import { writable } from 'svelte/store';
export const story_json = writable(load(txt).ScrollY.map(e=>e.Part));
