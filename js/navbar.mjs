export const navbar = `
<header
	class="sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-2.5 sm:py-4 backdrop-blur-md border-b border-gray-700"
>
	<nav
		class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
	>
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="astrotours text-transparent inline-flex w-[13.5rem] items-center gap-x-2 text-xl font-semibold"
			>
				<img
					src="/assets/logo.png"
					class="w-10 h-auto"
					id="nav-logo"
					alt="AstroTours logo"
				/>
				AstroTours
			</a>
			<div class="sm:hidden">
				<button
					id="toggler"
					type="button"
					class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
					data-hs-collapse="#navbar-collapse"
					aria-controls="navbar-collapse"
					aria-label="Toggle navigation"
				>
					<svg
						class="hs-collapse-open:hidden w-4 h-4"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
						/>
					</svg>
					<svg
						class="hs-collapse-open:block hidden w-4 h-4"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div
			class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
			id="navbar-collapse"
		>
			<div
				class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-start sm:mt-0 sm:pl-5"
			>
				<a
					v-for="link in pages"
					:class="{ active: pageStore.current.replaceAll('index.html', '') !== link[1].replaceAll('/', '') }"
					:href="link[1]"
					class="font-medium text-blue-500 nav-link"
				>
					{{ link[0] }}
				</a>
			</div>
		</div>
		<div class="basis-full grow sm:block">
			<div
				class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5 text-white"
			>
				<a href="/cart" class="py-2 px-0 lg:px-2 text-white block">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="navbar-nav-svg"
						width="20"
						height="20"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
						/>
					</svg>
				</a>

				<span
					v-if="itemsCount.count"
					class="nav-item bg-danger text-white rounded-pill px-2 h-6 -ml-8 absolute"
				>
					{{ itemsCount.count }}
				</span>
				<a
					class="py-2 px-0 lg:px-2 text-white block"
					href="https://github.com/HarryAllen1/webmaster"
					target="_blank"
					rel="noopener"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						class="navbar-nav-svg"
						viewBox="0 0 512 499.36"
						role="img"
					>
						<path
							fill="currentColor"
							fill-rule="evenodd"
							d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
						></path>
					</svg>
				</a>
			</div>
		</div>
	</nav>
</header>
`;
