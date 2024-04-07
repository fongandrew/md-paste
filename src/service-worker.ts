import { warn } from 'src/utility/console-log';

// Chrome example says to place this in chrome.runtime.onInstalled
// listener but that doesn't always fire (is annoying to develop with),
// so let's just add it at the top level?
// https://github.com/GoogleChrome/chrome-extensions-samples/blob/ab934c0e6c6d0c5e8bc08a87f34f833df12e05ec/api-samples/contextMenus/basic/sample.js#L34
const id = chrome.contextMenus.create(
	{
		title: 'Markdown paste',
		contexts: ['editable'],
		id: 'markdownPaste',
	},
	() => {
		// Handle - ignore duplicate ID error
		const err = chrome.runtime.lastError;
		if (err) {
			warn(err);
		}
	},
);

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

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId !== id) return;
	const tabId = tab?.id;
	if (!tabId) return;
	chrome.scripting.executeScript({
		target: { tabId },
		func: doPaste,
	});
});
