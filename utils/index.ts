import pluginPkg from "../package.json";

const pluginId = pluginPkg.name.replace(
  /^((?:@.*?\/)?strapi-plugin-react-)/i,
  ""
);

export { pluginId };
