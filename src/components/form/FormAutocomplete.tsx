import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

export interface FormAutocompleteProps extends Omit<AutocompleteProps<any, boolean, boolean, boolean>, FormOmittedProps> {
    textFieldProps?: Omit<TextFieldProps, FormOmittedProps>;
}

export const FormAutocomplete: FC<FormAutocompleteProps> = ({ textFieldProps, ...autocompleteProps }) => {
    const field = useFieldContext();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <Autocomplete
            value={field.state.value}
            onChange={(_, value) => !autocompleteProps.freeSolo && field.handleChange(value)}
            onInputChange={(_, value, reason) => reason !== "reset" && autocompleteProps.freeSolo && field.handleChange(value)}
            onBlur={field.handleBlur}
            aria-label={field.name}
            {...autocompleteProps}
            renderInput={(params) =>
                <TextField
                    {...params}
                    name={field.name}
                    error={isTouched && hasError}
                    helperText={isTouched && helperText}
                    {...textFieldProps}
                />
            }
        />
    )
}