import { FormControl, FormHelperText, FormLabel, Slider, SliderProps } from "@mui/material";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

export interface FormSliderProps extends Omit<SliderProps, FormOmittedProps> {
    label?: string;
}

export const FormSlider: FC<FormSliderProps> = ({ label, ...props }) => {
    const field = useFieldContext<number | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <FormControl component="fieldset">
            {label && <FormLabel>{label}</FormLabel>}
            <Slider
                name={field.name}
                value={field.state.value ?? 0}
                onChange={(_, value) => field.handleChange(Array.isArray(value) ? value[0] : value)}
                onBlur={field.handleBlur}
                aria-label={field.name}
                {...props}
            />
            {isTouched && hasError && <FormHelperText error={hasError}>{helperText}</FormHelperText>}
        </FormControl>
    );
};
