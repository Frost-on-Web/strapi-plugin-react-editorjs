// Export all from "../../../utils" file and re-export them from this file.
import * as utils from "../../../utils";
const pluginId = utils.pluginId;

import useFetchSettings from "./useFetchSettings";

export { pluginId, useFetchSettings };
