export function parseString(value: any): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return String(value);
}

export function parseBoolean(value: any): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
  const strValue = String(value).toLowerCase();
  if (strValue === 'true' || strValue === '1') {
    return true;
  }
  if (strValue === 'false' || strValue === '0') {
    return false;
  }
  return undefined;
}

export function parseNumber(value: any): number | undefined {
  if (value === undefined) {
    return undefined;
  }
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

export function parseStringArray(
  value: any,
  separator = ',',
): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === 'string') {
    return value.split(separator).map((item) => item.trim());
  }
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim());
  }
  return undefined;
}

export function parseNumberArray(
  value: any,
  separator = ',',
): number[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  const strArray = parseStringArray(value, separator);
  if (!strArray) {
    return undefined;
  }
  const numArray = strArray
    .map((item) => Number(item))
    .filter((num) => !isNaN(num));
  return numArray.length > 0 ? numArray : undefined;
}
