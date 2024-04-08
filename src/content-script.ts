import { registerHandlerForTab, ToTabMessageType } from 'src/bridge';

// Callback for paste handler -- this doesn't necessarily
// work if code is spread across multiple functions, so
// we're inlining all the logic here.
async function doPaste() {
	let textToPaste = '';
	const clipboardItems = await navigator.clipboard.read();
	if (clipboardItems.length) {
		const item = clipboardItems[0];

		// Prefer explicit markdown
		if (item.types?.includes('text/markdown')) {
			const blob = await item.getType('text/markdown');
			textToPaste = await blob.text();
		}

		// Convert HTML to markdown
		else if (item.types?.includes('text/html')) {
			const blob = await item.getType('text/html');
			textToPaste = await blob.text();
		}

		// Default to plain text
		else if (item.types?.includes('text/plain')) {
			const blob = await item.getType('text/html');
			textToPaste = await blob.text();
		}
	}
	document.execCommand('insertText', false, textToPaste);
}

registerHandlerForTab(ToTabMessageType.EXISTS, () => true);

registerHandlerForTab(ToTabMessageType.PASTE, doPaste);

// Script is only loaded on context menu action, so do the thing
// for initial execution. This won't be repeated for subsequent
// invocations (hence why the listener above is needed)
doPaste();
