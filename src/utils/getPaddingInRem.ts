export const getPaddingInRem = (paddingValue?: string | null): string | undefined => {
  // If there's no value or it's '0x', don't apply any padding
  if (!paddingValue || paddingValue === '0x') {
    return undefined;
  }

  // Extract the number from the string (e.g., '4x' -> 4)
  const multiplier = parseInt(paddingValue.replace('x', ''), 10);

  // If the number is not valid, return undefined
  if (isNaN(multiplier)) {
    return undefined;
  }

  // Return the value in rems
  return `${multiplier}rem`;
};
