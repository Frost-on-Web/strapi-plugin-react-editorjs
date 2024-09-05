import { useState } from "react";
import { useIntl } from "react-intl";

import cn from "classnames";

import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";

import Editor from "../Editorjs";
import Wrapper from "./wrapper";

/**
 * TODO : On devrait pouvoir retrouver et utiliser le type natif de Strapi (= qui définit un CustomField)
 */
type WysiwygProps = {
  name: string;
  onChange: (e: any) => void;

  intlLabel?: any; // IntlMessageDescriptor ==> { id: string; defaultMessage: string };
  description?: any; // IntlMessageDescriptor ==> { id: string; defaultMessage: string };

  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: object;
  value?: string;
  tabIndex?: string;
};

const Wysiwyg = ({
  name,
  onChange,
  intlLabel,
  description,
  required = false,
  disabled = false,
  error = undefined,
  className = "",
  style = {},
  value = "",
}: WysiwygProps) => {
  const { formatMessage } = useIntl();

  const [displayTechnicalData, setDisplayTechnicalData] = useState(false);

  const EditorProps = { name, value, disabled, onChange };

  return (
    <>
      <Wrapper className={cn(className)} style={style}>
        <Box>
          <Typography
            variant="pi"
            fontWeight="bold"
            onClick={() => setDisplayTechnicalData(!displayTechnicalData)}
          >
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>

        <Typography
          variant="omega"
          style={{
            display: displayTechnicalData ? "block" : "none",
            marginBottom: "0.5rem",
            padding: "0.5rem",
            border: "1px solid #f0f0f0",
          }}
        >
          {JSON.stringify(EditorProps)}
        </Typography>

        <Editor {...EditorProps} />

        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}

        {description && (
          <Typography variant="pi">{formatMessage(description)}</Typography>
        )}
      </Wrapper>
    </>
  );
};

export default Wysiwyg;
