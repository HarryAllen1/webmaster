// a simple server to staticly serve all files. For hosting purposes.
import { serveDir } from 'https://deno.land/std@0.186.0/http/file_server.ts';
import { serve } from 'https://deno.land/std@0.186.0/http/server.ts';

serve(async (req) => {
	const res = await serveDir(req);
	const url = new URL(req.url);
	if (
		res.status === 404 ||
		url.pathname.startsWith('/.') ||
		url.pathname.endsWith('.json')
	) {
		const file = await Deno.readFile('./404.html');
		return new Response(file, {
			status: 404,
			headers: {
				'content-type': 'text/html',
			},
		});
	}
	return res;
});
