import { registerHandlerForTab, ToTabMessageType } from 'src/bridge';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService();
turndownService.use(gfm);

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
			textToPaste = turndownService.turndown(textToPaste);
		}

		// Default to plain text
		else if (item.types?.includes('text/plain')) {
			const blob = await item.getType('text/html');
			textToPaste = await blob.text();
		}
	}

	// document.execCommand is deprecated but this is still the
	// most reliable way to insert content with a history
	// event to enable undo-ing the action. If we need to
	// move to something else, take a look at the status
	// of Input Events Level 2 adoption:
	// https://www.w3.org/TR/input-events-2/
	document.execCommand('insertText', false, textToPaste);
}

registerHandlerForTab(ToTabMessageType.EXISTS, () => true);

registerHandlerForTab(ToTabMessageType.PASTE, doPaste);

// Script is only loaded on context menu action, so do the thing
// for initial execution. This won't be repeated for subsequent
// invocations (hence why the listener above is needed)
doPaste();
