/**
 * @file build.ts
 *
 * Builds all js files and changes html files to use them
 */

import { bundle } from 'https://deno.land/x/emit@0.22.0/mod.ts';
import { walk } from 'https://deno.land/std@0.186.0/fs/mod.ts';
import { pages } from './js/pages.mjs';

await Deno.writeTextFile(
	'./js/index.mjs',
	(
		await Deno.readTextFile('./js/index.mjs')
	).replaceAll('/index.mjs', '/index.bundle.js')
);
const { code } = await bundle(new URL('./js/index.mjs', import.meta.url));

await Deno.writeTextFile('./js/index.bundle.js', code);

const files = pages.map((page) => page[1].replaceAll('/', ''));

for (const file of files) {
	const { code } = await bundle(
		new URL(`./${file}/index.mjs`, import.meta.url)
	);
	await Deno.writeTextFile(`./${file}/index.bundle.js`, code);
}

for await (const entry of walk('.', {
	exts: ['html'],
	match: [/index\.html/],
})) {
	const file = await Deno.readTextFile(entry.path);
	const newFile = file.replace('/js/index.mjs', '/js/index.bundle.js');

	await Deno.writeTextFile(entry.path, newFile);
}
