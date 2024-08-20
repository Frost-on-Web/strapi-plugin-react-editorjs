import { Strapi } from "@strapi/strapi";

import { TPluginSettings } from "../../types/Config";
import { pluginId } from "../utils";

function getPluginStore() {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: pluginId,
  });
}

async function createDefaultConfig() {
  const pluginStore = getPluginStore();

  const value: TPluginSettings = {
    myCustomSetting: "",
  };

  await pluginStore.set({ key: "settings", value });
  return pluginStore.get({ key: "settings" });
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async getSettings() {
    const pluginStore = getPluginStore();

    // Try to get the config object from the store
    let config = await pluginStore.get({ key: "settings" });

    // If no config, set up a default one
    if (!config) {
      config = await createDefaultConfig();
    }

    // Return the config data (should be of type "TPluginSettings")
    return config;
  },

  async setSettings(settings: TPluginSettings) {
    const pluginStore = getPluginStore();

    // Update the settings in the store
    await pluginStore.set({ key: "settings", value: settings });

    // Return the updated settings
    return pluginStore.get({ key: "settings" });
  },
});
