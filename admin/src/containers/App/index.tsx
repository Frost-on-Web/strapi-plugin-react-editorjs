/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { Switch, Route } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";

// Utils
import { pluginId } from "../../utils";

// Containers
import HomePage from "../HomePage";

const App = () => {
  return (
    <Switch>
      <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
      <Route component={AnErrorOccurred} />
    </Switch>
  );
};

export default App;
