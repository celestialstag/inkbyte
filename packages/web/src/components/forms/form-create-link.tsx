import React, { useState } from "react";

import {
  Box,
  BoxProps,
  Button,
  Select,
  SelectProps,
  Switch,
  TextInput,
  TextInputProps,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { FiClock, FiSettings } from "react-icons/fi/index.js";
import { useDisclosure } from "@mantine/hooks";

export type FormCreateLinkProps = BoxProps & {
  children?: React.ReactNode;
  links: string[];
};

export const FormCreateLink = ({ links = [], sx }: FormCreateLinkProps) => {
  const [isAdvancedAnalyticsEnabled, { toggle: toggleAdvancedAnalytics }] =
    useDisclosure(false);
  const [customAlias, setCustomAlias] = useState("");

  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Box>
        <ITextInput placeholder="shorten a url" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <FiSettings />
        <Box
          sx={{
            "::after": {
              content: '"Link Customization"',
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          "@media (max-width: 680px)": {
            flexDirection: "column",
          },
        }}
      >
        <ISelectInput
          data={links}
          defaultValue={links[0]}
          sx={{ flex: 2, minWidth: 144 }}
        />
        <ITextInput
          placeholder="custom alias (optional)"
          sx={{
            flex: 3,
            '[value=""]': {
              ":not(:focus)": {
                backgroundColor: theme.colors.gray[3],
              },
            },
          }}
          value={customAlias}
          onChange={(e) => setCustomAlias(e.currentTarget.value)}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* <Checkbox
          // label="Enable Analytics"
          label="Link Redirect"
          sx={{ flex: 1 }}
          color="brand-green"
          defaultChecked={true}
        /> */}
        <Tooltip
          transitionProps={{ transition: "pop" }}
          label={
            isAdvancedAnalyticsEnabled
              ? "Your website will be displayed through our website"
              : "Your link will redirect to your website"
          }
        >
          <Box>
            <Switch
              label="Advanced Analytics"
              color="brand-green"
              value={isAdvancedAnalyticsEnabled ? "true" : "false"}
              onChange={toggleAdvancedAnalytics}
              sx={{
                flex: 1,
                // ".mantine-Switch-label": {
                //   color: theme.colors["brand-peach"][5],
                // color: theme.colors["brand-green"][4],
                // },
                ".mantine-Switch-track": {
                  backgroundColor: "lightgrey",
                  borderColor: "lightgrey",
                },
              }}
            />
          </Box>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Tooltip transitionProps={{ transition: "pop" }} label="View History">
          <Button color="brand-peach" size="xs">
            <FiClock />
          </Button>
        </Tooltip>
        <Button color="brand-green" size="xs" fullWidth>
          CREATE LINK
        </Button>
      </Box>
    </Box>
  );
};

const ITextInput = (props: TextInputProps) => (
  <TextInput
    {...props}
    size="xs"
    sx={{
      ...props.sx,
      input: {
        borderRadius: "0",
        padding: "4px 16px",
        fontSize: 12,
      },
      ":first-of-type": {
        input: {
          borderRadius: "4px 0px 0px 4px",
          "@media (max-width: 680px)": {
            borderRadius: "4px 4px 0px 0px",
          },
        },
      },
      ":last-of-type": {
        input: {
          borderRadius: "0px 4px 4px 0px",
          "@media (max-width: 680px)": {
            borderRadius: "0px 0px 4px 4px",
          },
        },
      },
      ":only-of-type": { input: { borderRadius: "4px" } },
    }}
  />
);

const ISelectInput = (props: SelectProps) => (
  <Select
    {...props}
    size="xs"
    sx={{
      ...props.sx,
      fontSize: 12,
      "&[data-selected]": {
        "&, &:hover": {
          backgroundColor: "brand-red",
          color: "red",
        },
      },
      ".mantine-Select-itemsWrapper": {
        padding: 2,
      },
      ".mantine-Select-item": {
        // margin: 2,
      },
      ":first-of-type": {
        input: {
          borderRadius: "4px 0px 0px 4px",
          "@media (max-width: 680px)": {
            borderRadius: "4px 4px 0px 0px",
          },
        },
      },
      ":last-of-type": {
        input: {
          borderRadius: "0px 4px 4px 0px",
          "@media (max-width: 680px)": {
            borderRadius: "0px 0px 4px 4px",
          },
        },
      },
    }}
    radius={0}
  />
);
