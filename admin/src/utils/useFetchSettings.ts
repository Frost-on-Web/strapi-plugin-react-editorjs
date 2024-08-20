import { useFetchClient } from "@strapi/helper-plugin";

import { TPluginSettings } from "../../../types/config";
import { pluginId } from "../utils";

/**
 * ? getFetchClient returns 401 Unauthorized and logs me out from admin panel
 * https://forum.strapi.io/t/getfetchclient-returns-401-unauthorized-and-logs-me-out-from-admin-panel/29721
 *
 * This is VERY late, but hopefully this helps the next dev.
 * I got this same error, and as far as I can tell, the reason is that Strapi has two separate API services,which isn’t documented well anywhere I could find.
 * There is an “Internal admin API” for plugin-specific or core admin api calls. You can use fetchRequest library because these calls are expected to be used by Admin Users.
 * There is also a “Content API/ External API” which is the APIs that are auto-generated for each content type as well as anything in the top level src/api folder. These are intended to be used by end users, and have a separate auth JWT token system.
 * Calling an external API with an Admin User JWT (which is what useFetchClient uses) will result in a 401 because the JWT is invalid for that API’s token service.
 * As for how to fix this, I have been moving my APIs into a plugin (I just made a “common” plugin), which allows for Admin User access. You could also allow public access to the API in question and use fetch instead of useFetchClient if access isn’t an issue.
 *
 */

const useFetchSettings = () => {
  const { get, post } = useFetchClient();

  return {
    getSettings: async () => {
      return await get<TPluginSettings>(`/${pluginId}/settings`);
    },
    setSettings: async (data: TPluginSettings) => {
      return await post(`/${pluginId}/settings`, data);
    },
  };
};

export default useFetchSettings;
