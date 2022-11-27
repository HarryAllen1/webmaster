<script setup lang="ts">
import startCase from 'lodash.startcase';

const pages = usePages();
</script>

<template>
	<footer class="py-8 flex flex-row px-16 bg-black">
		<div class="flex flex-col">
			<NuxtLink
				v-for="page in pages"
				:key="page.path"
				:to="page.path"
				class="text-white hover:underline"
			>
				{{ startCase(page.name.replace('index', 'home')) }}
			</NuxtLink>
		</div>
	</footer>
</template>
