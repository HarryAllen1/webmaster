import { join } from 'node:path';
import { globby } from 'globby';
import { readFile, writeFile } from 'node:fs/promises';

const outFile = join('static', 'licenses.txt');
const allLicenses = await globby('node_modules/**/LICENSE*');

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
