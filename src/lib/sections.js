/**
 * Nav sections, shared by the desktop and mobile navigation
 * so both can never drift apart.
 *
 * @typedef {{ route: string, content: string }} Section
 */

/** @type {readonly Section[]} */
export const SECTIONS = [
	{ route: 'humedal', content: 'Humedal' },
	{ route: 'archive', content: 'Archivos' },
	{ route: 'blog', content: 'Blog' }
];
