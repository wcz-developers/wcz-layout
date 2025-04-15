import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormAutocomplete as Autocomplete } from "~/components/form/FormAutocomplete";
import { FormCheckbox as Checkbox } from "~/components/form/FormCheckbox";
import { FormDatePicker as DatePicker } from "~/components/form/FormDatePicker";
import { FormDateTimePicker as DateTimePicker } from "~/components/form/FormDateTimePicker";
import { FormRadioGroup as RadioGroup } from "~/components/form/FormRadioGroup";
import { FormSlider as Slider } from "~/components/form/FormSlider";
import { FormSubmitButton as SubmitButton } from "~/components/form/FormSubmitButton";
import { FormSwitch as Switch } from "~/components/form/FormSwitch";
import { FormTextField as TextField } from "~/components/form/FormTextField";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm: useLayoutForm, withForm: withLayoutForm } =
    createFormHook({
        fieldComponents: {
            TextField,
            Autocomplete,
            Checkbox,
            Switch,
            RadioGroup,
            Slider,
            DatePicker,
            DateTimePicker,
        },
        formComponents: {
            SubmitButton,
        },
        fieldContext,
        formContext,
    });
