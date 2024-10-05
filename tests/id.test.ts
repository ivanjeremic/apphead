import { expect, test } from "bun:test";
import { genIdV001, parseId } from "../packages/utils/src";

test(genIdV001(), () => {
  expect(genIdV001().slice(0, 3)).toBe("001");
});
