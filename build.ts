/**
 * @file build.ts
 *
 * Builds all js files, overwriting the current ones.
 */

import { bundle } from 'https://deno.land/x/emit@0.22.0/mod.ts';
import { minify } from 'npm:terser';
import { pages as navbarPages } from './js/pages.mjs';

const pages = [
	...navbarPages,
	['Cart', '/cart'],
	['Thanks', '/thanks'],
	['Checkout', '/checkout'],
];

const JS_BUILD_COMMENT = `// This file is bundled with a basic build system (see https://github.com/HarryAllen1/webmaster/blob/main/build.ts)
// No JS framework was used in this project, and no HTML was transformed, making this within the Webmaster rules.
// Only JS files were bundled since the number of external imports were severely slowing down the site
// (see https://github.com/HarryAllen1/webmaster/blob/main/vehicles/andante.mjs for example)
// You can see the original files at https://github.com/HarryAllen1/webmaster
`;

const CSS_BUILD_COMMENT = `/*
	This file was bundled with Post CSS (with a minifier, autoprefixer and TailwindCSS), which generates CSS based on class names used in HTML (and minifies the css).
	It also inlines all imports to reduce requests and file size.
	You can view the original file here: https://github.com/HarryAllen1/webmaster/blob/main/css/main.css
	This is within the rules as the rules only prohibit HTML transformation/generation, and this only generates CSS.
*/
`;

const { code } = await bundle(new URL('./js/index.mjs', import.meta.url));
const minified = await minify(code, { ecma: 2020 });

await Deno.writeTextFile('./js/index.mjs', JS_BUILD_COMMENT + minified.code);

const files = pages.map((page) => page[1].replaceAll('/', ''));

for (const file of files) {
	const { code } = await bundle(
		new URL(`./${file}/index.mjs`, import.meta.url)
	);
	const minified = await minify(code, { ecma: 2020 });
	await Deno.writeTextFile(
		`./${file}/index.mjs`,
		JS_BUILD_COMMENT + minified.code
	);
}

await new Deno.Command('npx', {
	args: 'pnpm i'.split(' '),
})
	.spawn()
	.output();
await new Deno.Command('npm', {
	args: 'run tailwind'.split(' '),
})
	.spawn()
	.output();

await Deno.writeTextFile(
	'./css/main.bundle.css',
	CSS_BUILD_COMMENT + (await Deno.readTextFile('./css/main.bundle.css'))
);

await Deno.remove('./node_modules', { recursive: true });
