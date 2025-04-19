import { TextFieldProps } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

export interface FormDateTimePickerProps extends Omit<DateTimePickerProps<Dayjs>, FormOmittedProps> {
    textFieldProps?: TextFieldProps;
}

export const FormDateTimePicker: FC<FormDateTimePickerProps> = (props) => {
    const field = useFieldContext<string | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <DateTimePicker
            name={field.name}
            value={field.state.value ? dayjs(field.state.value) : null}
            onChange={(value) => field.handleChange(value ? value.format() : null)}
            slotProps={{
                textField: {
                    onBlur: field.handleBlur,
                    error: isTouched && hasError,
                    helperText: isTouched && helperText,
                    ...props.textFieldProps,
                },
                ...props.slotProps
            }}
            aria-label={field.name}
            {...props}
        />
    );
};
