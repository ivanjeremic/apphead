import { DOMParser, parseHTML, parseJSON } from "linkedom";

// Simplified way for HTML
const {
  // note, these are *not* globals
  window,
  document,
  customElements,
  HTMLElement,
  Event,
  CustomEvent,
  // other exports ..
} = parseHTML(`
  <!doctype html>
  <html lang="en">
    <head>
      <title>Hello SSR</title>
    </head>
    <body>
      <form>
        <input name="user">
        <button>
          Submit
        </button>
      </form>
    </body>
  </html>
`);
