export const stripQuotes = (input: any) => {
  if (!input || typeof input !== "string") return input;

  const result = input
    .replace(/^\"|\"$/g, "")
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  if (result === "undefined") return undefined;
  if (result === "null") return null;

  try {
    return JSON.parse(result);
  } catch (error) {
    return result;
  }
};
