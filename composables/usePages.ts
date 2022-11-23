export interface Page {
	name: string;
	path: string;
}

export const usePages: () => Page[] = () => [
	{
		name: 'Home',
		path: '/',
	},
];
