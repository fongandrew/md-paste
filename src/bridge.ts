import { info, warn } from 'src/utility/console-log';

export enum ToTabMessageType {
	EXISTS = 'exists',
	PASTE = 'paste',
}

interface ToTabMessageArgs {
	[ToTabMessageType.EXISTS]: void;
	[ToTabMessageType.PASTE]: void;
}

interface ToTabMessageResponse {
	[ToTabMessageType.EXISTS]: boolean;
	[ToTabMessageType.PASTE]: void;
}

export type ToTabMessage<T extends ToTabMessageType> =
	ToTabMessageArgs[T] extends void
		? {
				type: T;
			}
		: {
				type: T;
			} & ToTabMessageArgs[T];

export function sendToTab<T extends ToTabMessageType>(
	tabId: number,
	message: ToTabMessage<T>,
): Promise<ToTabMessageResponse[T]> {
	return chrome.tabs.sendMessage(tabId, message);
}

const handlers: Partial<{
	[T in ToTabMessageType]: (
		message: ToTabMessage<T>,
	) => Promise<ToTabMessageResponse[T]>;
}> = {};

let isListening = false;

export function listenInTab() {
	chrome.runtime.onMessage.addListener(
		async (request, _sender, sendResponse) => {
			const type = request?.type as ToTabMessageType | undefined;
			const handler = type && handlers[type];
			if (handler) {
				const resp = await handler(request);
				if (resp) {
					sendResponse(resp);
				}
			}
		},
	);
	isListening = true;
}

export function registerHandlerForTab<T extends ToTabMessageType>(
	type: T,
	handler: (
		message: ToTabMessage<T>,
	) => ToTabMessageResponse[T] | Promise<ToTabMessageResponse[T]>,
) {
	info(`Adding listener for ${type}`);
	if (handlers[type]) {
		warn(`Handler already registered for ${type} -- overwriting`);
	}
	(handlers as any)[type] = handler;
	if (!isListening) {
		info('Message listener not active, starting');
		listenInTab();
	}
}
