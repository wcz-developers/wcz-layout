import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";

interface FormNumberFieldProps extends Omit<TextFieldProps, FormOmittedProps> {
	defaultValue?: number | null;
}

export const FormNumberField: FC<FormNumberFieldProps> = (props) => {
	const field = useFieldContext<number | null | undefined>();
	const { isTouched, hasError, helperText } = getFieldStatus(field);

	return (
		<NumericFormat
			customInput={TextField}
			thousandSeparator
			name={field.name}
			value={field.state.value ?? ''}
			onValueChange={({ floatValue }) => field.handleChange(floatValue)}
			onBlur={field.handleBlur}
			error={isTouched && hasError}
			helperText={isTouched && helperText}
			aria-label={field.name}
			{...props}
		/>
	);
}