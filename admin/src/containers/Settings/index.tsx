import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { useNotification, LoadingIndicatorPage } from "@strapi/helper-plugin";

import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { HeaderLayout } from "@strapi/design-system/Layout";
import { ContentLayout } from "@strapi/design-system/Layout";
import { Typography } from "@strapi/design-system/Typography";
import { TextInput } from "@strapi/design-system/TextInput";

import { Check } from "@strapi/icons";

import taskRequests from "../../api/settings";

import { getTrad } from "@/utils";

const Settings = () => {
  const { formatMessage } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);

    const getApiKey = async () => {
      const data = await taskRequests.getSettings();
      if (data) {
        setIsLoading(false);
        return setCurrentApiKey(data.data.apiKey);
      }
    };

    getApiKey();
  }, []);

  const handleChange = (e: any) => {
    setCurrentApiKey(e.target.value);
  };

  return (
    <>
      <HeaderLayout
        id="title"
        title={formatMessage({
          id: getTrad("settings.title"),
          defaultMessage: "TinyMCE",
        })}
        subtitle={formatMessage({
          id: getTrad("settings.subtitle"),
          defaultMessage: "Manage the settings of your TinyMCE plugin",
        })}
        primaryAction={
          isLoading ? null : <SubmitButton settings={{ currentApiKey }} />
        }
      ></HeaderLayout>
      {isLoading ? (
        <LoadingIndicatorPage />
      ) : (
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
            <Stack size={3}>
              <Typography>
                {formatMessage({
                  id: getTrad("settings.content-title"),
                  defaultMessage: "Set your API key for TinyMCE editor.",
                })}
              </Typography>
              <Grid gap={6}>
                <GridItem col={8} s={18}>
                  <TextInput
                    id="api-key"
                    name="key"
                    onChange={handleChange}
                    label={formatMessage({
                      id: getTrad("settings.input-title"),
                      defaultMessage: "API key",
                    })}
                    value={currentApiKey}
                    placeholder={formatMessage({
                      id: getTrad("settings.input-placeholder"),
                      defaultMessage: "ex: ADASFNASF46564SAD",
                    })}
                  />
                </GridItem>
              </Grid>
            </Stack>
          </Box>
        </ContentLayout>
      )}
    </>
  );
};

function SubmitButton({ settings }: { settings: { currentApiKey: string } }) {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setIsSaving(true);

    await taskRequests.setSettings(settings.currentApiKey);
    setIsSaving(false);

    toggleNotification({
      type: "success",
      message: formatMessage({
        id: getTrad("settings.success-message"),
        defaultMessage: "Settings successfully updated",
      }),
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
      {formatMessage({
        id: getTrad("settings.save-button"),
        defaultMessage: "Save",
      })}
    </Button>
  );
}

export default Settings;
