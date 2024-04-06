export let label = 'MD-PASTE';

export function setLabel(newLabel: string) {
	label = newLabel;
}

export function debug(...args: any[]) {
	// if (import.meta.env.DEV) {
	console.log(label, ...args);
	// }
}

/**
 * Normally force first param to be Error to get more useful stack trace
 * whenever we decide to start beaconing errors
 */
export function error(err: Error, ...args: any[]) {
	console.error(`[${label}]`, err, ...args);
	return err;
}

/** Sometimes we don't care though */
export function errorStr(...args: any[]) {
	console.error(`[${label}]`, ...args);
}

export function info(...args: any[]) {
	console.info(`[${label}]`, ...args);
}

export function warn(...args: any[]) {
	console.warn(`[${label}]`, ...args);
}
