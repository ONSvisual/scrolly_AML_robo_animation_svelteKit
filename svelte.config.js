import adapter from '@sveltejs/adapter-auto';
import static_adapter from '@sveltejs/adapter-static';

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
		target: '#svelte',
        paths: {
            assets: production ? '' : '',
            base: production ? '' : ''
        },
	    vite: {
        }
	}
};

export default config;
