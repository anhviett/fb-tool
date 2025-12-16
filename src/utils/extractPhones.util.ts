export function extractPhones(text: string) {
  const regex = /(0|\+84)\d{9}/g;
  return text.match(regex) || [];
}