/**
 * @file build.ts
 *
 * Builds all js files and changes html files to use them
 */

import { bundle } from 'https://deno.land/x/emit@0.22.0/mod.ts';
import { walk } from 'https://deno.land/std@0.186.0/fs/mod.ts';
import { minify } from 'npm:terser';
import { pages } from './js/pages.mjs';

const JS_BUILD_COMMENT = `// This file is bundled with a basic build system (see https://github.com/HarryAllen1/webmaster/blob/main/build.ts)
// No JS framework was used in this project, and no HTML was transformed, making this within the Webmaster rules.
// Only JS files were bundled since the number of external imports were severely slowing down the site
// (see https://github.com/HarryAllen1/webmaster/blob/main/vehicles/andante.mjs for example)
// You can see the original files at https://github.com/HarryAllen1/webmaster
`;

const CSS_BUILD_COMMENT = `/*
	This file was bundled with Tailwind CSS, which generates CSS based on class names used in HTML.
	You can view the original file here: https://github.com/HarryAllen1/webmaster/blob/main/css/main.css
	This is within the rules as the rules only prohibit HTML transformation/generation, and this only generates CSS.
*/
`;

await Deno.writeTextFile(
	'./js/index.mjs',
	(
		await Deno.readTextFile('./js/index.mjs')
	).replaceAll('/index.mjs', '/index.bundle.js')
);
await Deno.writeTextFile(
	'./js/router.mjs',
	(
		await Deno.readTextFile('./js/router.mjs')
	).replaceAll('/index.mjs', '/index.bundle.js')
);
const { code } = await bundle(new URL('./js/index.mjs', import.meta.url));
const minified = await minify(code, { ecma: 2020 });

await Deno.writeTextFile(
	'./js/index.bundle.js',
	JS_BUILD_COMMENT + minified.code
);

const files = pages.map((page) => page[1].replaceAll('/', ''));

for (const file of files) {
	const { code } = await bundle(
		new URL(`./${file}/index.mjs`, import.meta.url)
	);
	const minified = await minify(code, { ecma: 2020 });
	await Deno.writeTextFile(
		`./${file}/index.bundle.js`,
		JS_BUILD_COMMENT + minified.code
	);
}

for await (const entry of walk('.', {
	exts: ['html'],
	match: [/index\.html/],
})) {
	const file = await Deno.readTextFile(entry.path);
	const newFile = file.replace('/js/index.mjs', '/js/index.bundle.js');

	await Deno.writeTextFile(entry.path, newFile);
}

const size =
	(await Deno.stat('./js/index.bundle.js')).size / 1000000 +
	(await Deno.stat('./vehicles/index.bundle.js')).size / 1000000;

const formatter = new Intl.NumberFormat('en-US', {
	maximumSignificantDigits: 2,
});

await new Deno.Command('npx', {
	args: ['pnpm i'.split(' ')],
})
	.spawn()
	.output();
await new Deno.Command('npm', {
	args: ['run tailwind'.split(' ')],
})
	.spawn()
	.output();

await Deno.writeTextFile(
	'./css/main.bundle.css',
	CSS_BUILD_COMMENT +
		(
			await Deno.readTextFile('./css/main.bundle.css')
		).replace('$$APP_SIZE_PLACEHOLDER$$', formatter.format(size))
);
