import { useIntl } from "react-intl";

import cn from "classnames";

import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";

import Editor from "../Editorjs";
import Wrapper from "./wrapper";

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
  required,
  disabled,
  error,
  className,
  style,
  value,
}: WysiwygProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Wrapper className={cn(className)} style={style}>
        <Box>
          <Typography variant="pi" fontWeight="bold">
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>

        <Editor
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />

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

// Default props (only for the optionals ones...)
Wysiwyg.defaultProps = {
  intlLabel: "",
  description: "",

  required: false,
  disabled: false,
  error: undefined,
  className: "",
  style: {},
  value: "",
  tabIndex: "0",
};

export default Wysiwyg;
