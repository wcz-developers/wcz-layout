import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

interface FormCheckboxProps extends Omit<CheckboxProps, FormOmittedProps> {
    label?: string;
}

export const FormCheckbox: FC<FormCheckboxProps> = (props) => {
    const field = useFieldContext<boolean | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <FormControl component="fieldset">
            <FormControlLabel
                control={
                    <Checkbox
                        name={field.name}
                        checked={Boolean(field.state.value)}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        onBlur={field.handleBlur}
                        aria-label={field.name}
                        {...props}
                    />
                }
                label={props.label ?? ""}
            />
            {isTouched && hasError && <FormHelperText error={hasError}>{helperText}</FormHelperText>}
        </FormControl>
    );
};