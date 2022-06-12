import adapter from '@sveltejs/adapter-static';
import preprocessor from 'svelte-preprocess';

const GITHUG_PATH = '/contrast-ratio-calc';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocessor(),

  kit: {
    adapter: adapter({
      // Default options are shown.
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
    }),

    paths: {
      // This is need when hosting the application on Github Pages.
      base: isDev ? '' : GITHUG_PATH
    }
  }
};

export default config;
