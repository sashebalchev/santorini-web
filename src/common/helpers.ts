export const toBinary = (
  integer: number,
  overallLength: number
): string => {
  let str = integer.toString(2);
  return str.padStart(overallLength, "0");
};
