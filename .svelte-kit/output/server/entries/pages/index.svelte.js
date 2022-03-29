import { c as create_ssr_component, e as each, a as add_attribute, b as escape } from "../../chunks/index-0089343d.js";
import { l as lookup } from "../../chunks/lookup-d8466c35.js";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${each(Object.keys(lookup), (place) => {
    return `<a${add_attribute("href", place, 0)}>${escape(lookup[place])}</a>`;
  })}`;
});
export { Routes as default };
