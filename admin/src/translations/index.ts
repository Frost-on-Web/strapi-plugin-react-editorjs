import en from "./en.json";
import fr from "./fr.json";

import { pluginId } from "../utils";

/**
 * We use the "en.json" file as the reference for the translations keys.
 * This way, we can ensure that all translations available in english are also available in other languages.
 */
type TranslationsDefinition = typeof en;

const trads: { [key: string]: TranslationsDefinition } = {
  en,
  fr,
};

/**
 * Type-safe function to get a translation key.
 * This key can be used with the `formatMessage` of the `useIntl` hook to get the translated label.
 *
 * Example:
 * * const { formatMessage } = useIntl();
 * * const pageTitleLabel = formatMessage({ id: getTradKey("settings.page-title") });
 *
 * @param id The short-key of a translated label.
 * @returns The translation key which reference a translated label.
 */
const getTradKey = (id: keyof TranslationsDefinition) => `${pluginId}.${id}`;

/**
 * Type-safe function to get the `formatMessage` arguments (used by the `useIntl` hook).
 *
 * @param id
 * @param defaultMessage
 * @returns
 */
const getTrad = (id: keyof TranslationsDefinition, defaultMessage?: string) => {
  return { id: getTradKey(id), defaultMessage };
};

export { type TranslationsDefinition, trads as trads, getTradKey, getTrad };
