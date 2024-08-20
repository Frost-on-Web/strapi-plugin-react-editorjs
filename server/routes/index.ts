/**
 * When developing a Strapi plugin you might want to pass data from the [ /server ] to the [ /admin ] folder.
 * Within the [ /server ] folder you have access to the Strapi object and can do database queries
 * whereas in the /admin folder you can't.
 *
 * To pass data from the [ /server ] to [ /admin ] folder you would first create a custom admin route
 * and then get the data returned in the admin panel.
 *
 * https://docs.strapi.io/dev-docs/plugins/guides/pass-data-from-server-to-admin
 *
 */

import settings from "./settings";

export default { settings };
