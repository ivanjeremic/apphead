import { expect, test } from "bun:test";
import { genIdV001, parseId } from "../packages/utils/src";

// test if id generator fn 'genIdV001()' is generating an id with version 001
test(genIdV001(), () => {
  expect(genIdV001().slice(0, 3)).toBe("001");
});
