import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import glob from 'tiny-glob';

const outFile = join('public', 'licenses.txt');
const allLicenses = await glob('node_modules/**/LICENSE*');

const licenses = await Promise.all(
	allLicenses.map(async (license) => {
		const licenseText = await readFile(license, 'utf-8');
		const [name] = license.split('/').slice(-2);
		return `
${name}
${'-'.repeat(name.length)}
${licenseText}
`;
	})
);

await writeFile(outFile, licenses.join('\n'));
