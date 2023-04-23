import { SINGLE_QUOTE_ATTRIBUTE_REGEX } from "./constants";

export function allowSingleQuotes(text: string) {
  return text.replace(SINGLE_QUOTE_ATTRIBUTE_REGEX, '$1="$2"');
}
