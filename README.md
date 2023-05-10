# [TSA Webmaster](https://tsa-webmaster.deno.dev/)

Remade from scratch to avoid breaking rules about compiling and HTML-generation

Deno config files for type checking only.

## Development

Most of the site works just fine without a build step. If you need to bundle the JS files for whatever reason, run:
```sh
deno run -A ./build.ts
```
**DO NOT COMMIT ANY OF THE CHANGES FROM THIS COMMAND!**

To start a tailwind server, run:
```sh
npx pnpm i
npm run tailwind:watch
```

## URLs

This site is deployed to way too many urls.

### Deno Deploy (preferred)

- https://webmaster.harryallen.dev/
- https://tsa-webmaster.deno.dev/

### Vercel

- https://tsa-webmaster.harryallen.dev/
- https://webmaster-tsa.vercel.app

### Cloudflare Pages

- https://webmaster-1v3.pages.dev/

### Netlify

- https://webmaster-tsa.netlify.app/
