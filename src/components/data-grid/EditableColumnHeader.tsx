import { Edit } from "@mui/icons-material";
import { GridColumnHeaderParams, GridValidRowModel } from "@mui/x-data-grid-premium";
import { TypographyWithIcon } from "../core/TypographyWithIcon";

export const EditableColumnHeader = <T extends GridValidRowModel>({ colDef }: GridColumnHeaderParams<T>) => {
    return <TypographyWithIcon endIcon={<Edit color="disabled" fontSize="small" />} variant="body2" className="MuiDataGrid-columnHeaderTitle">{colDef.headerName}</TypographyWithIcon>;
};