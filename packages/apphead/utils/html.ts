export function html(literals: { raw: any }, ...vars: any[]) {
  let raw = literals.raw,
    HTML = "",
    i = 1,
    len = arguments.length,
    str,
    variable;

  while (i < len) {
    str = raw[i - 1];
    variable = vars[i - 1];
    HTML += str + variable;
    i++;
  }
  HTML += raw[raw.length - 1];

  return HTML;
}
