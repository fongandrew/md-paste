declare module 'src/content-script?script' {
	const name: string;
	export default name;
}

declare module 'turndown-plugin-gfm' {
	import type { Plugin } from 'turndown';

	declare const gfm: Plugin;
	declare const strikethrough: Plugin;
	declare const tables: Plugin;
	declare const taskListItems: Plugin;
	export { gfm, strikethrough, tables, taskListItems };
}
