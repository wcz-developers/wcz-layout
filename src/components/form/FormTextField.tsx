import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

interface FormTextFieldProps extends Omit<TextFieldProps, FormOmittedProps> {
    type?: "number" | "color" | "email" | "password" | "search" | "tel" | "text" | "url"
}

export const FormTextField: FC<FormTextFieldProps> = (props) => {
    const field = useFieldContext<string | number | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <TextField
            name={field.name}
            value={field.state.value ?? ''}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            error={isTouched && hasError}
            helperText={isTouched && helperText}
            aria-label={field.name}
            {...props}
        />
    )
}