import { ReactNode, forwardRef } from "react";

import Box from "@mui/material/Box";
import {
  useTheme,
  alpha,
  styled,
  Palette,
  PaletteColor,
} from "@mui/material/styles";

// ----------------------------------------------------------------------
export const StyledLabel = styled(Box)<{
  ownerState: { color: string; variant: string };
}>(({ theme, ownerState }) => {
  const lightMode = theme.palette.mode === "light";

  const filledVariant = ownerState.variant === "filled";

  const outlinedVariant = ownerState.variant === "outlined";

  const softVariant = ownerState.variant === "soft";

  const defaultStyle = {
    ...(ownerState.color === "default" && {
      // FILLED
      ...(filledVariant && {
        color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
        backgroundColor: theme.palette.text.primary,
      }),
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.text.primary}`,
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette.text.secondary,
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      }),
    }),
  };

  const colorStyle = {
    ...(ownerState.color !== "default" && {
      // FILLED
      ...(filledVariant && {
        color: (
          theme.palette[ownerState.color as keyof Palette] as PaletteColor
        ).contrastText,
        backgroundColor: (
          theme.palette[ownerState.color as keyof Palette] as PaletteColor
        ).main,
      }),
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: "transparent",
        color: (
          theme.palette[ownerState.color as keyof Palette] as PaletteColor
        ).main,
        border: `2px solid ${
          (theme.palette[ownerState.color as keyof Palette] as PaletteColor)
            .main
        }`,
      }),
      // SOFT
      ...(softVariant && {
        color: (
          theme.palette[ownerState.color as keyof Palette] as PaletteColor
        )[lightMode ? "dark" : "light"],
        backgroundColor: alpha(
          (theme.palette[ownerState.color as keyof Palette] as PaletteColor)
            .main,
          0.16
        ),
      }),
    }),
  };

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 6,
    cursor: "default",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    textTransform: "capitalize",
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shorter,
    }),
    ...defaultStyle,
    ...colorStyle,
  };
});

// ----------------------------------------------------------------------

const Label = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    color: string;
    variant?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    sx?: object;
  }
>(
  (
    {
      children,
      color = "default",
      variant = "soft",
      startIcon,
      endIcon,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      "& svg, img": { width: 1, height: 1, objectFit: "cover" },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

export default Label;
