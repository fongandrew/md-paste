let o="MD-PASTE";function t(...n){console.info(`[${o}]`,...n)}function f(...n){console.warn(`[${o}]`,...n)}var d=(n=>(n.EXISTS="exists",n.PASTE="paste",n))(d||{});function w(n,e){return chrome.tabs.sendMessage(n,e)}const s={};let c=!1;function g(){chrome.runtime.onMessage.addListener(async(n,e,l)=>{const i=n==null?void 0:n.type,r=i&&s[i];if(r){const a=await r(n);a&&l(a)}}),c=!0}function T(n,e){t(`Adding listener for ${n}`),s[n]&&f(`Handler already registered for ${n} -- overwriting`),s[n]=e,c||(t("Message listener not active, starting"),g())}export{d as T,T as r,w as s,f as w};
