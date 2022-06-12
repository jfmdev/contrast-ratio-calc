# Contrast ratio calculator

> A tool to calculate and compare the contrast ratio of colors.

A simple tool, implemented with Svelte and Boostrap, for calculate and compare the contrast ratio between different colors.

[Demo](https://jfmdev.github.io/contrast-ratio-calc/)

## Development and building

This application was created using [SvelteKit](https://kit.svelte.dev/), all commands for build and run locally can be found on the [official docs](https://kit.svelte.dev/docs/introduction), but the most used ones are:

- `yarn` to install all dependencies.
- `yarn run dev` to run the application locally.
- `yarn run format` to format the source code using Prettier.
- `yarn run lint` to identify errors on the source code using ESLint.
- `yarn run build` to build the application.

> For deploying in GitHub Pages, the following changes must be done to fix file references:
>
> * On `build/index.html` replace `/_app/` with `./_app/`.
> * On `build/_app/start-***.js` replace `"/_app/"` with `"./_app/"`.
> * On `build/_app/assets/pages/index.svelte-****.css` replace `/_app/assets/bootstrap-icons` with `../bootstrap-icons`.
>
> Note that these changes could be done automatically if the build configuration is properly updated.

## License

Contrast Ratio Calc is free software; you can redistribute it and/or modify it under the terms of the Mozilla Public License v2.0. You should have received a copy of the MPL 2.0 along with this library, otherwise you can obtain one at http://mozilla.org/MPL/2.0/.
