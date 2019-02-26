// dynamic polyfill
// https://www.npmjs.com/package/dynamic-polyfill
// https://polyfill.io/v2/docs/features/
// 待验证

import polyfill from 'dynamic-polyfill';

(async function() {
    await polyfill({
        fills: [
            'Map',
            'Promise',
            'fetch',
            'String.prototype.padStart',
            'String.prototype.padEnd',
            'Array.prototype.includes',
            'String.prototype.includes',
        ],
        options: ['gated', 'always'],
        minify: false,
        rum: false,
        afterFill() {
            // callback
        },
    });
})();
