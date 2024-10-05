import { DOMParser, parseHTML, parseJSON } from "linkedom";
import { genIdV001 } from "./genId";

export function dom_insert_doc(coll: string) {
  const {
    // note, these are *not* globals
    window,
    document,
    customElements,
    HTMLElement,
    Event,
    CustomEvent,
    // other exports ..
  } = parseHTML(coll);

  document.createElement("li").setAttribute("id", genIdV001());
}
