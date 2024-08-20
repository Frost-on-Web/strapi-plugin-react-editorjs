import { Strapi } from "@strapi/strapi";

import { pluginId } from "../utils";

export default ({ strapi }: { strapi: Strapi }) => ({
  getSettings: async (ctx) => {
    try {
      ctx.body = await strapi
        .plugin(pluginId)
        .service("settings")
        .getSettings();
    } catch (err) {
      ctx.body = err;
      ctx.throw(500, err);
    }
  },

  setSettings: async (ctx) => {
    const { body } = ctx.request;
    try {
      // First, save the settings
      await strapi.plugin(pluginId).service("settings").setSettings(body);

      // Then return the updated settings
      ctx.body = await strapi
        .plugin(pluginId)
        .service("settings")
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
