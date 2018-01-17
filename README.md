# FormData
[![npm version][npm-image]][npm-url]

**This fork wraps the polyfill into a function so that it can be used on demand rather than automatically attaching to the browser window.**

You can find the original module [here](https://www.npmjs.com/package/formdata-polyfill).

```bash
npm install formdata-polyfill-on-demand
```

## Usage
```js
require("formdata-polyfill-on-demand")();
```

## Status

The status of the native FormData (2016-10-19) is:
[![skarmavbild 2016-10-19 kl 21 32 19](https://cloud.githubusercontent.com/assets/1148376/19534352/b7f42d8c-9643-11e6-91da-7f89580f51d8.png)](https://developer.mozilla.org/en-US/docs/Web/API/FormData#Browser_compatibility)

This polyfill normalizes support for the FormData API:

 - `append` with filename
 - `delete()`, `get()`, `getAll()`, `has()`, `set()`
 - `entries()`, `keys()`, `values()`, and support for `for...of`

  [npm-image]: https://img.shields.io/npm/v/formdata-polyfill.svg
  [npm-url]: https://www.npmjs.com/package/formdata-polyfill
