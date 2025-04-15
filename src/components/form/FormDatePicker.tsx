import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from 'dayjs';
import { FC } from "react";
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

interface FormDatePickerProps extends Omit<DatePickerProps<Dayjs>, FormOmittedProps> {
    textFieldProps?: TextFieldProps;
}

export const FormDatePicker: FC<FormDatePickerProps> = (props) => {
    const field = useFieldContext<string | null | undefined>();
    const { isTouched, hasError, helperText } = getFieldStatus(field);

    return (
        <DatePicker
            name={field.name}
            value={field.state.value ? dayjs(field.state.value) : null}
            onChange={(value) => field.handleChange(value ? value.format() : null)}
            slotProps={{
                textField: {
                    onBlur: field.handleBlur,
                    error: isTouched && hasError,
                    helperText: isTouched && helperText,
                    ...props.textFieldProps
                },
                ...props.slotProps
            }}
            aria-label={field.name}
            {...props}
        />
    )
}