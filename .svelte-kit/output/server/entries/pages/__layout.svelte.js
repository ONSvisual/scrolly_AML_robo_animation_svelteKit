import { c as create_ssr_component, g as getContext, e as escape, a as add_attribute, s as setContext, v as validate_component } from "../../chunks/index-cf0e86af.js";
import { a as assets } from "../../chunks/paths-396f020f.js";
var app = "";
const themes = {
  "light": {
    "text": "#222",
    "muted": "#777",
    "pale": "#f0f0f0",
    "background": "#fff"
  },
  "dark": {
    "text": "#fff",
    "muted": "#bbb",
    "pale": "#333",
    "background": "#222"
  },
  "lightblue": {
    "text": "#206095",
    "muted": "#707070",
    "pale": "#f0f0f0",
    "background": "rgb(188, 207, 222)"
  }
};
var ONSHeader_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "nav.svelte-1ly5odw.svelte-1ly5odw{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;height:46px;margin-bottom:-46px;border-bottom:1px solid #777;z-index:1}picture.svelte-1ly5odw.svelte-1ly5odw{position:relative;top:-3px;padding:0 5px}img.svelte-1ly5odw.svelte-1ly5odw{width:270px}a.svelte-1ly5odw img.svelte-1ly5odw:hover{cursor:pointer}",
  map: null
};
const ONSHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { theme: theme2 = getContext("theme") } = $$props;
  let { filled = true } = $$props;
  let { center = false } = $$props;
  if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0)
    $$bindings.theme(theme2);
  if ($$props.filled === void 0 && $$bindings.filled && filled !== void 0)
    $$bindings.filled(filled);
  if ($$props.center === void 0 && $$bindings.center && center !== void 0)
    $$bindings.center(center);
  $$result.css.add(css$1);
  return `<nav style="${"border-bottom-color: " + escape(theme2["muted"]) + "; " + escape(filled ? "background-color: " + theme2["pale"] + ";" : "white")}" class="${"svelte-1ly5odw"}"><div class="${["col-wide middle", center ? "center" : ""].join(" ").trim()}"><a href="${"https://www.ons.gov.uk/"}" class="${"svelte-1ly5odw"}"><picture class="${"svelte-1ly5odw"}">${filled == true ? `<img src="${escape(assets) + "/img/ons-logo-pos-en.svg"}" alt="${"Office for National Statistics"}" class="${"svelte-1ly5odw"}">` : `<img src="${escape(assets) + "/img/ons-logo-black-en.svg"}" alt="${"Office for National Statistics"}" class="${"svelte-1ly5odw"}">`}</picture></a></div>
</nav>`;
});
var ONSFooter_svelte_svelte_type_style_lang = "";
const css = {
  code: "footer.svelte-137hs7y.svelte-137hs7y{padding-bottom:72px;padding-top:36px;font-size:18px}footer.svelte-137hs7y a.link.svelte-137hs7y{-webkit-box-sizing:border-box;box-sizing:border-box;text-decoration:underline;display:inline-block}footer.svelte-137hs7y a.link.svelte-137hs7y:hover{text-decoration:none}footer.svelte-137hs7y a.link.svelte-137hs7y:active{outline:3px solid transparent;background-color:#fd0;-webkit-box-shadow:0 -2px #fd0, 0 4px #222;box-shadow:0 -2px #fd0, 0 4px #222;color:#222;text-decoration:none}footer.svelte-137hs7y hr.svelte-137hs7y{margin-bottom:27px;margin-top:36px;border:none;border-top:1px solid #777}ul.svelte-137hs7y.svelte-137hs7y{padding:0;margin:0}li.svelte-137hs7y.svelte-137hs7y{margin-right:18px;display:inline-block}.logo-img.svelte-137hs7y.svelte-137hs7y{margin-bottom:27px}.ogl-img.svelte-137hs7y.svelte-137hs7y{margin:0 0.5rem 0.2rem 0;width:59px;height:24px;vertical-align:middle}.license.svelte-137hs7y.svelte-137hs7y{vertical-align:top}a.svelte-137hs7y img.svelte-137hs7y:hover{cursor:pointer}",
  map: null
};
const ONSFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { theme: theme2 = getContext("theme") } = $$props;
  if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0)
    $$bindings.theme(theme2);
  $$result.css.add(css);
  return `<footer style="${"color: " + escape(theme2["text"]) + "; background-color: " + escape(theme2["pale"]) + ";"}" class="${"svelte-137hs7y"}"><div class="${"col-wide"}" data-analytics="${"footer"}"><a href="${"https://www.ons.gov.uk/"}" class="${"svelte-137hs7y"}">${theme2.name == "dark" ? `<img class="${"logo-img svelte-137hs7y"}" src="${escape(assets) + "/img/ons-logo-neg-en.svg"}" alt="${"Office for National Statistics"}">` : `<img class="${"logo-img svelte-137hs7y"}" src="${escape(assets) + "/img/ons-logo-black-en.svg"}" alt="${"Office for National Statistics"}">`}</a>
		<ul class="${"svelte-137hs7y"}"><li class="${"svelte-137hs7y"}"><a href="${"https://www.ons.gov.uk/aboutus/contactus"}" class="${"link svelte-137hs7y"}" style="${"color: " + escape(theme2["text"])}">Contact us</a></li>
			<li class="${"svelte-137hs7y"}"><a href="${"https://www.ons.gov.uk/help/privacynotice"}" class="${"link svelte-137hs7y"}" style="${"color: " + escape(theme2["text"])}">Cookies and privacy</a></li></ul>
		<hr style="${"border-top-color: " + escape(theme2["muted"])}" class="${"svelte-137hs7y"}">
		<div class="${"license svelte-137hs7y"}"><svg class="${"ogl-img svelte-137hs7y"}" viewBox="${"0 0 59 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>UK Open Government Licence</title><path${add_attribute("fill", theme2["muted"], 0)} d="${"M59,17.5v6.2H45.3V4l6.2-3.9v17.4H59z M33.6,13h9.8v10.7H43L40.6,21c-2.1,1.8-4.9,3-7.9,3 c-4.4,0-8.3-2.4-10.4-6.1c-2.1,3.6-5.9,6.1-10.4,6.1C5.4,23.9,0,18.6,0,12C0,5.4,5.4,0.1,11.9,0.1c4.5,0,8.4,2.5,10.4,6.1 c2.1-3.6,5.9-6.1,10.4-6.1c4.2,0,7.9,2.2,10.1,5.5l-5.2,3.3c-1-1.6-2.8-2.7-4.8-2.7C29.6,6.2,27,8.8,27,12s2.6,5.8,5.8,5.8 c1.5,0,2.8-0.5,3.8-1.4L33.6,13z M17.7,12c0-3.2-2.6-5.7-5.8-5.7S6.2,8.8,6.2,12s2.6,5.8,5.8,5.8S17.7,15.2,17.7,12z"}"></path></svg>
			All content is available under the
			<a href="${"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"}" class="${"link svelte-137hs7y"}" target="${"_blank"}" rel="${"noopener"}" style="${"color: " + escape(theme2["text"])}">Open Government Licence v3.0</a>, 
			except where otherwise stated
		</div></div>
</footer>`;
});
let theme = "light";
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  setContext("theme", themes[theme]);
  return `${$$result.head += ``, ""}


${validate_component(ONSHeader, "ONSHeader").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}

${validate_component(ONSFooter, "ONSFooter").$$render($$result, {}, {}, {})}`;
});
export { _layout as default };
