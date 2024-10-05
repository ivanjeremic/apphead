import { genIdV001, parseId } from "../packages/utils/src";

const parsed = parseId(genIdV001());

console.log(genIdV001());
console.log(parsed);
