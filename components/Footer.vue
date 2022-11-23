<script setup lang="ts">
import startCase from 'lodash.startcase';

const routes = useRouter().options.routes;
</script>

<template>
	<footer class="py-8 flex flex-row px-16 bg-black">
		<div class="flex flex-col">
			<NuxtLink
				v-for="page in routes"
				:key="page.path"
				:to="page.path"
				class="text-white hover:underline"
			>
				{{ startCase(page.name?.toString().replace('index', 'home')) }}
			</NuxtLink>
		</div>
	</footer>
</template>
