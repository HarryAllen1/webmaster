# [TSA Webmaster](https://tsa-webmaster.deno.dev/)

Remade from scratch to avoid breaking rules about ~~compiling~~\* and HTML-generation

\* JS and CSS are now bundled. HTML is _never_ generated.

## Development

Most of the site works just fine without a build step. You should be able to edit exclusively content without any actual environment. If you need to bundle the
JS files for whatever reason, run:

```sh
deno run -A ./build.ts
```

(you will need [Deno](https://deno.land))

**DO NOT COMMIT ANY OF THE CHANGES FROM THIS COMMAND!**

To start a tailwind server, run:

```sh
npx pnpm i
npm run tailwind:watch
```

(you will need [Node JS](https://nodejs.org))

## Previewing/Deploying

You can preview the live site with the following:

```sh
deno run --allow-net --allow-read ./server.ts
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

### Firebase

- https://tsa--webmaster.web.app/
- https://tsa--webmaster.firebaseapp.com/

### Azure Static Web Apps

- https://gray-beach-054584010.3.azurestaticapps.net
