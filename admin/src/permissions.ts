const pluginPermissions = {
  // This permission regards the main component (App) and is used to tell
  // if the plugin link should be displayed in the menu and also if the plugin is accessible.
  // This use case is found when a user types the url of the plugin directly in the browser
  "menu-link": [{ action: "plugin::editorjs.menu-link", subject: null }],
  settings: [{ action: "plugin::editorjs.settings.read", subject: null }],
};

export default pluginPermissions;
