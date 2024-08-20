/**
 *
 * HomePage
 *
 */

import { useEffect, useState } from "react";

import { TPluginSettings } from "../../../../types/config";

import { pluginId } from "../../utils";

import { useFetchSettings } from "../../utils";

const HomePage = () => {
  const { getSettings } = useFetchSettings();

  const [isLoading, setIsLoading] = useState(false);
  const [settingProp, setSettingProp] = useState<TPluginSettings>({
    myCustomSetting: "",
  });

  useEffect(() => {
    setIsLoading(true);

    const asyncServerRequest = async () => {
      const { data } = await getSettings();
      if (data) {
        setIsLoading(false);
        return setSettingProp(data);
      }
    };

    asyncServerRequest();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "80%",
        maxWidth: "70rem",
        margin: "1rem auto",
        padding: "2rem",
        lineHeight: "1.8",
      }}
    >
      <h1 style={{ fontSize: "1.75rem" }}>
        {pluginId.toUpperCase()} Plugin HomePage
      </h1>
      <hr style={{ margin: "1rem 0" }} />
      <p>Can be used for debug... totally works with hotreload</p>
      <p>
        settingProp:{" "}
        <span
          style={{
            backgroundColor: "#ccc",
            display: "inline-block",
            width: "50%",
            border: "1px solid #888",
            padding: "0 0.5rem",
          }}
        >
          {isLoading
            ? "[Loading...]"
            : JSON.stringify(settingProp.myCustomSetting)}
        </span>
      </p>
    </div>
  );
};

export default HomePage;
