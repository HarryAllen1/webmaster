export interface Page {
	name: string;
	link: `/${string}`;
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
