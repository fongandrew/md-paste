import { sendToTab, ToTabMessageType } from 'src/bridge';
import contentScript from 'src/content-script?script';
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

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId !== id) return;
	const tabId = tab?.id;
	if (!tabId) return;

	const exists = await sendToTab(tabId, {
		type: ToTabMessageType.EXISTS,
	}).catch(() => {
		return false;
	});

	if (exists) {
		// If script already loaded, just send a message to paste
		await sendToTab(tabId, { type: ToTabMessageType.PASTE });
	} else {
		// Else load script, which will paste on init
		await chrome.scripting.executeScript({
			target: { tabId },
			files: [contentScript],
		});
	}
});
