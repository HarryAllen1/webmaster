// @deno-types="npm:@types/prettier"
import 'https://deno.land/std@0.178.0/dotenv/load.ts';
import { format } from 'npm:prettier';
import { CommitData } from './types.d.ts';

const ghToken = Deno.env.get('GITHUB_TOKEN');
const outFile = './about/work-log.mjs';

const res = await fetch(
	'https://api.github.com/repos/HarryAllen1/webmaster/commits?per_page=100',
	{
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${ghToken}`,
			'X-GitHub-Api-Version': '2022-11-28',
		},
	}
);

const commits: CommitData[] = await res.json();

// loop through all pages of commits, making new requests
while (res.headers.get('link')?.includes('rel="next"')) {
	const nextUrl = res.headers.get('link')!.match(/<(.+)>; rel="next"/)![1];
	const newRes = await fetch(nextUrl, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${ghToken}`,
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});
	commits.push(...(await newRes.json()));
}

Deno.writeTextFile(
	outFile,
	format(
		`export default ${JSON.stringify(
			commits
				.filter((i) => !i.commit.message.includes('Merge branch'))
				.map((c) => ({
					author: c.author.login,
					message: c.commit.message,
					link: c.html_url,
				}))
		)}`,
		{
			...JSON.parse(await Deno.readTextFile('./.prettierrc')),
			parser: 'babel',
		}
	)
);
