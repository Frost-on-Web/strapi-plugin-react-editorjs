import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { LoadingIndicatorPage, useNotification } from "@strapi/helper-plugin";

import { HeaderLayout } from "@strapi/design-system/Layout";
import { ContentLayout } from "@strapi/design-system/Layout";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";

import { Check } from "@strapi/icons";

import { TPluginSettings } from "../../../../types/config";

import { getTrad } from "../../translations";

import { useFetchSettings } from "../../utils";

const Settings = () => {
  const { formatMessage } = useIntl();

  const { getSettings } = useFetchSettings();

  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <HeaderLayout
        id="title"
        title={formatMessage(getTrad("settings.title", "EditorJS Settings"))}
        subtitle={formatMessage(
          getTrad(
            "settings.subtitle",
            "Manage the settings of your TinyMCE plugin"
          )
        )}
        primaryAction={
          isLoading ? null : (
            <SubmitButton settings={{ myCustomSetting: "Nouveau test" }} />
          )
        }
      />
      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={6}
          paddingBottom={6}
          paddingLeft={7}
          paddingRight={7}
        >
          <Typography>
            <span
              style={{
                backgroundColor: "#ccc",
                display: "inline-block",
                width: "50%",
                border: "1px solid #888",
                padding: "0.5rem 1rem",
                color: "#000",
              }}
            >
              {isLoading ? "[Loading...]" : JSON.stringify(settingProp)}
            </span>
          </Typography>
        </Box>
      </ContentLayout>
    </>
  );
};

function SubmitButton({ settings }: { settings: TPluginSettings }) {
  const { formatMessage } = useIntl();
  const { setSettings } = useFetchSettings();
  const toggleNotification = useNotification();

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setIsSaving(true);

    await setSettings(settings);

    setIsSaving(false);
    toggleNotification({
      type: "success",
      message: formatMessage(
        getTrad("settings.success-message", "Settings successfully updated")
      ),
    });
  };

  return (
    <Button
      onClick={handleSubmit}
      startIcon={<Check />}
      disabled={isSaving}
      loading={isSaving}
      size="L"
    >
      {formatMessage(getTrad("settings.save-button", "Save"))}
    </Button>
  );
}

export default Settings;
