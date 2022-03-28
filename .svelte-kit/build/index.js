
import root from '__GENERATED__/root.svelte';
import { respond } from '/Users/timkershaw/Documents/populated_scrolly/.svelte-kit/runtime/server/index.js';
import { set_paths, assets, base } from '/Users/timkershaw/Documents/populated_scrolly/.svelte-kit/runtime/paths.js';
import { set_prerendering } from '/Users/timkershaw/Documents/populated_scrolly/.svelte-kit/runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n        <meta name='viewport' content='width=device-width,initial-scale=1' />\n        <!-- <meta property=\"og:title\" content=\"ONS Scrollytelling Engine\" />\n        <meta property=\"og:type\" content=\"website\" />\n        <meta property=\"og:url\" content=\"https://bothness.github.io/scroll-engine/\" />\n        <meta property=\"og:description\" content=\"A library of Svelte components for building scrollytelling experiences.\" />\n        <meta name=\"description\" content=\"A library of Svelte components for building scrollytelling experiences.\" />\n\n        <title>ONS Scrollytelling Template</title>\n\n        <link rel='icon' type='image/x-icon' href='./favicon.ico' />\n        <link rel='stylesheet' href='./build/bundle.css' /> -->\n<!--        <link rel='stylesheet' href='./global.css' /> -->\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ event, resolve }) => resolve(event)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	externalFetch: hooks.externalFetch || fetch
});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		const hooks = get_hooks(user_hooks);

		this.options = {
			amp: false,
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			dev: false,
			floc: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks,
			hydrate: true,
			manifest,
			method_override: {"parameter":"_method","allowed":[]},
			paths: { base, assets },
			prefix: assets + '/_app/',
			prerender: true,
			read,
			root,
			service_worker: null,
			router: true,
			template,
			template_contains_nonce: false,
			trailing_slash: "never"
		};
	}

	respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to app.render must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		return respond(request, this.options, options);
	}
}
