export interface Page {
	name: string;
	link: `/${string}`;
	/**
	 * Whether the link should be shown in the navbar and sidebar; the page can still exist and be linked to.
	 * @default true
	 */
	visibleInNavAndSidebar?: boolean;
}
export type Pages = Page[];
export const pages: Pages = [
	{
		name: 'Home',
		link: '/',
	},
	{
		name: 'About',
		link: '/about',
	},
	{
		name: 'Sources',
		link: '/sources',
	},
	{
		name: 'Suit',
		link: '/suit',
	},
];
