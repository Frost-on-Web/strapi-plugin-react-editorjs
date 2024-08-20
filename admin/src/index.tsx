import { Strapi } from "@strapi/strapi";
import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";

import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import Wysiwyg from "./components/Wysiwyg";

import { pluginId } from "./utils";
import { getTrad } from "./translations";

export default {
  register(app: any) {
    app.registerPlugin({
      id: pluginId,
      icon: PluginIcon,
      name: pluginPkg.strapi.name,
      description: pluginPkg.strapi.description,

      isReady: true, // false ??
      isRequired: pluginPkg.strapi.required || false,

      intlLabel: getTrad("plugin.name", pluginId),

      initializer: Initializer,
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: pluginPkg.strapi.name,
      },
      Component: async () => {
        return await import("./containers/App");
      },
    });

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
          intlLabel: getTrad("settings.page-title", "Configuration"),
          id: "settings",
          to: `/settings/${pluginId}`,
          Component: async () => {
            return import("./containers/Settings");
          },
          // permissions: pluginPermissions["settings"],
        },
      ]
    );

    app.addFields({ type: "wysiwyg", Component: Wysiwyg });
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
