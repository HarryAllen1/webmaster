<script setup lang="ts">
import startCase from 'lodash.startcase';

let menuOpen = false;
const visible = true;
const routes = useRouter().options.routes;

useRouter().afterEach(() => (menuOpen = false));

onMounted(() => {
	window.addEventListener('resize', () => {
		if (window.innerWidth > 799) {
			menuOpen = false;
		}
	});
});
</script>
<template>
	<nav
		:class="{
			visible: visible || menuOpen,
			menuOpen: menuOpen,
		}"
		class="bg-black text-white my-0 mx-auto z-[100] w-full h-16 shadow-md select-none duration-200 px-4 grid grid-cols-3 items-center justify-between"
	>
		<NuxtLink to="/" class="nav-spot home" title="Home"> Home </NuxtLink>
		<NuxtLink to="/" class="nav-spot home" />
		<ul
			class="justify-center relative p-0 m-0 w-full list-none hidden md:flex md:h-full md:w-auto md:items-center md:p-0 md:mx-1 md:gap-4"
		>
			<li v-for="page in routes" :key="page.path">
				<NuxtLink
					v-if="page.name"
					class="prose-lg hover:opacity-80"
					to="{{page.link}}"
				>
					{{ startCase(page.name.toString().replace('index', 'home')) }}
				</NuxtLink>
			</li>
		</ul>

		<ul
			class="relative p-0 m-0 w-full list-none hidden md:flex md:h-full md:w-auto md:items-center md:p-0 md:mx-1 md:justify-end"
		>
			<li>
				<a
					href="https://github.com/MajesticString/webmaster"
					target="_blank"
					rel="noreferrer"
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 16 16"
						class="w-6 h-6 fill-white"
					>
						<path
							fill-rule="evenodd"
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
						/>
					</svg>
				</a>
			</li>
		</ul>

		<div class="block md:hidden" />

		<button
			aria-label="Toggle menu"
			class="menu-toggle flex justify-end md:hidden"
			class:menuOpen
			@click="menuOpen = !menuOpen"
		>
			<svg
				v-if="menuOpen"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
	</nav>

	<div v-if="menuOpen" class="flex flex-col bg-black p-4 w-full text-white">
		<NuxtLink
			v-for="page in routes"
			:key="page.path"
			class="h-8 text-end hover:opacity-80"
			:to="page.path"
			@click="menuOpen = false"
		>
			{{ startCase(page.name?.toString().replace('index', 'home')) }}
		</NuxtLink>
	</div>
</template>

<style scoped>
.nav-spot {
	background-image: url('/favicon.png');
}
</style>
