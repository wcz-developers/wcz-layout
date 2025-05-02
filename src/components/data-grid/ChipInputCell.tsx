import { Chip, ChipProps, Stack } from "@mui/material";
import { GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid-premium";

const isArray = (value: any) => Array.isArray(value);

interface ChipInputCellProps<T extends GridValidRowModel> {
    params: GridRenderCellParams<T>;
    slotProps?: ChipProps;
    getLabel?: (object: T) => string | number;
}

export const ChipInputCell = <T extends GridValidRowModel>({ params, slotProps, getLabel }: ChipInputCellProps<T>) => {
    if (!params.value) return null;

    const getLabelValue = (value: any) => {
        if (getLabel) return getLabel(value);
        return value;
    };

    if (isArray(params.value))
        return (
            <Stack direction="row" alignItems="center" gap={1} sx={{ overflowX: "auto", height: "100%", width: params.colDef.computedWidth }}>
                {params.value.map((value: any, index) =>
                    <Chip key={`${index + 1}-chip-input-cell`} label={getLabelValue(value)} {...slotProps} />
                )}
            </Stack>
        );

    return <Chip label={getLabelValue(params.value)} {...slotProps} />;
};