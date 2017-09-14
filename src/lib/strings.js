// Replace a single character in a string and an index
export const replaceChar = (source, index, what) =>
  source.substr(0, index) + what + source.substr(index + 1);
