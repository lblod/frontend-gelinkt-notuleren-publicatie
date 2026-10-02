/* I'm not sure how, but this seems to run despite using APIs introduced in node 23 */
/* eslint-disable n/no-unsupported-features/node-builtins */
// Workaround for ember-data fastboot compatibility
// See https://github.com/emberjs/data/issues/8475
module.exports = function () {
  return {
    buildSandboxGlobals(defaultGlobals) {
      return Object.assign({}, defaultGlobals, {
        AbortController,
        ReadableStream:
          typeof ReadableStream !== 'undefined'
            ? ReadableStream
            : require('node:stream/web').ReadableStream,
        WritableStream:
          typeof WritableStream !== 'undefined'
            ? WritableStream
            : require('node:stream/web').WritableStream,
        TransformStream:
          typeof TransformStream !== 'undefined'
            ? TransformStream
            : require('node:stream/web').TransformStream,
        Headers: typeof Headers !== 'undefined' ? Headers : undefined,
        BACKEND_URL: 'http://backend',
      });
    },
  };
};
