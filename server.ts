// a simple server to staticly serve all files. For hosting purposes.
import { serveDir } from 'https://deno.land/std@0.179.0/http/file_server.ts';
import { serve } from 'https://deno.land/std@0.179.0/http/server.ts';

serve((req) => serveDir(req));
