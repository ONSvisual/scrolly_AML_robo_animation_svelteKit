//import adapter from '@sveltejs/adapter-auto';
import static_adapter from '@sveltejs/adapter-static';

import adapter from '@sveltejs/adapter-netlify';


const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: static_adapter(),
		//adapter: adapter(),

		files: {
			assets: 'static',
		    lib: 'src/lib'
		},

		// hydrate the <div id="svelte"> element in src/app.html
        paths: {
            assets: production ? '' : '',
            base: production ? '' : ''
        },
	    vite: {
        }
	}
};

export default config;
