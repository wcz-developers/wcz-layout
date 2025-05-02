import { Stack, SxProps, Theme, Typography, TypographyProps } from "@mui/material";

const stackSxProps = [
    "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "m", "mt", "mr", "mb", "ml", "mx", "my",
    "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "p", "pt", "pr", "pb", "pl", "px", "py",
    "flexGrow", "flexShrink", "flexBasis", "flexDirection", "alignItems", "justifyContent",
    "position", "zIndex", "top", "right", "bottom", "left",
    "gridGap", "gridColumnGap", "gridRowGap", "gridColumn", "gridRow", "gridAutoFlow",
    "gap", "columnGap", "rowGap"
];

interface TypographyWithIconProps extends TypographyProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export const TypographyWithIcon: React.FC<TypographyWithIconProps> = ({ startIcon, endIcon, children, sx, gutterBottom, ...props }) => {
    const sxCopy = { ...sx };

    const stackStyles = stackSxProps.reduce((acc, curr) => {
        if (sxCopy && (sxCopy as any)[curr]) {
            (acc as any)[curr] = (sxCopy as any)[curr];
            delete (sxCopy as any)[curr];
        }
        return acc;
    }, {} as SxProps<Theme>);

    return (
        <Stack direction="row" alignItems="center" gap={1} sx={stackStyles} mb={gutterBottom ? 0.7 : undefined}>
            {startIcon && startIcon}
            <Typography {...props} sx={sxCopy}>{children}</Typography>
            {endIcon && endIcon}
        </Stack>
    );
};