# MD Paste

This is a a Chrome extension that creates a context menu item to paste HTML output as GitHub-flavored Markdown using [Turndown](https://github.com/mixmark-io/turndown/tree/master).

It does more or less the same thing by [Paste as Markdown](https://chromewebstore.google.com/detail/paste-as-markdown/lmelpnmpkekjahgdihfajfebaddffokl) but uses Manifest v3 instead of the deprecated Manifest v2.

## Install

This isn't on the Chrome Webstore yet, so you can just download it from the [releases here](https://github.com/fongandrew/md-paste/releases) and [load it as an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).

## Dev

* `npm install`
* `npm run dev` - This starts a [CRXJS](https://crxjs.dev/vite-plugin/) build
* Install the `dist` directory created in this repo as an unpacked extension


