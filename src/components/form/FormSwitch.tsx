import { FormControl, FormControlLabel, FormHelperText, Switch, SwitchProps } from "@mui/material";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

export interface FormSwitchProps extends Omit<SwitchProps, FormOmittedProps> {
    label?: string;
}

export const FormSwitch: FC<FormSwitchProps> = (props) => {
    const field = useFieldContext<boolean | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <FormControl component="fieldset">
            <FormControlLabel
                control={
                    <Switch
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
