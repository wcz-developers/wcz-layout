import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

interface Option {
    label: string;
    value: string | number;
}

interface FormRadioGroupProps extends Omit<RadioGroupProps, FormOmittedProps> {
    label?: string;
    options: Option[];
}

export const FormRadioGroup: FC<FormRadioGroupProps> = ({ label, options, ...props }) => {
    const field = useFieldContext<string | number | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <FormControl component="fieldset">
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <RadioGroup
                name={field.name}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-label={field.name}
                {...props}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {isTouched && hasError && <FormHelperText error={hasError}>{helperText}</FormHelperText>}
        </FormControl>
    );
};
