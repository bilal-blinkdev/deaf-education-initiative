import { FieldHook } from 'payload';

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

export const formatSlug = (fallback: string): FieldHook => {
  return ({ value, originalDoc, data }) => {
    // If a slug is manually entered, use that.
    if (typeof value === 'string' && value.length > 0) {
      return format(value);
    }

    // Otherwise, generate the slug from the fallback field (e.g., 'title').
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (typeof fallbackData === 'string' && fallbackData.length > 0) {
      return format(fallbackData);
    }

    return value;
  };
};
