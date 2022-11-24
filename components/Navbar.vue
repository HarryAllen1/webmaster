<script setup lang="ts">
import startCase from 'lodash.startcase';
import { useResizeObserver } from '@vueuse/core';

let menuOpen = false;
const visible = true;
const pages = usePages();

useRouter().afterEach(() => (menuOpen = false));

useResizeObserver(document.body, () => {
	if (window.innerWidth > 768) {
		menuOpen = false;
	}
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
			<li v-for="page in pages" :key="page.path">
				<NuxtLink
					v-if="page.name"
					class="prose-lg hover:opacity-80"
					:to="page.path"
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
					<div class="text-white bg-white" i-uil-github-alt />
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
			v-for="page in pages"
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
