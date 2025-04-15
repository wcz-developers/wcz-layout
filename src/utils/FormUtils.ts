import { AnyFieldApi } from "@tanstack/react-form";

export type FormOmittedProps =
    "name" |
    "value" |
    "onChange" |
    "onBlur" |
    "error" |
    "helperText" |
    "renderInput" |
    "type" |
    "aria-label";

export const getFieldStatus = (field: AnyFieldApi) => {
    const { meta } = field.state;

    const isTouched = meta.isTouched;
    const hasError = !!meta.errors?.length;
    const helperText = meta.errors?.[0]?.message;

    return { isTouched, hasError, helperText };
}