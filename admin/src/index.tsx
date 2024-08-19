import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";

import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import Wysiwyg from "./components/Wysiwyg";

import { getTrad, pluginId } from "./utils";

export default {
  register(app: any) {
    app.addFields({ type: "wysiwyg", Component: Wysiwyg });

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: pluginPkg.strapi.name,
        },
      },
      [
        {
          intlLabel: {
            id: getTrad("settings.page-title"),
            defaultMessage: "Configuration",
          },
          id: "settings",
          to: `/settings/${pluginId}`,
          Component: async () => {
            return import("./containers/Settings");
          },
          // permissions: pluginPermissions["settings"],
        },
      ]
    );

    app.registerPlugin({
      id: { pluginId },
      icon: PluginIcon,
      name: pluginPkg.strapi.name,
      description: pluginPkg.strapi.description,

      isReady: true, // false ??
      isRequired: pluginPkg.strapi.required || false,

      intlLabel: getTrad("plugin.name", pluginId),

      initializer: Initializer,
    });
  },

  bootstrap() {},

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
