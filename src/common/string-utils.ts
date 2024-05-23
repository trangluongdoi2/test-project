export function camelize(string: string): string {
  return string.replace(/-+(.)?/g, (match, character): string => {
    return character ? character.toUpperCase() : '';
  });
}
export function capitalize(string: string, firstLetterOnly: boolean): string {
  return string.charAt(0).toUpperCase()
    + (firstLetterOnly ? string.slice(1) : string.slice(1).toLowerCase());
}

export function toPascalCase(string: string): string {
  return camelize(capitalize(string, false));
}

