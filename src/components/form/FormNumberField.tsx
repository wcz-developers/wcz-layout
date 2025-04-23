import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { useFieldContext } from "~/hooks/FormHooks";
import { FormOmittedProps, getFieldStatus } from "~/utils/FormUtils";
import { NumericFormatProps, InputAttributes } from 'react-number-format/types/types';

interface FormTextFieldProps extends Omit<TextFieldProps, FormOmittedProps> { }

interface FormNumberFieldProps extends FormTextFieldProps {
	defaultValue?: number | null;
	options?: Omit<NumericFormatProps<InputAttributes>, "customInput" | "onValueChange" | keyof InputAttributes>;
}

export const FormNumberField: FC<FormNumberFieldProps> = ({ options, ...props }) => {
	const field = useFieldContext<number | null | undefined>();
	const { isTouched, hasError, helperText } = getFieldStatus(field);

	return (
		<NumericFormat
			customInput={TextField}
			name={field.name}
			value={field.state.value ?? ''}
			onValueChange={({ floatValue }) => field.handleChange(floatValue)}
			onBlur={field.handleBlur}
			error={isTouched && hasError}
			helperText={isTouched && helperText}
			aria-label={field.name}
			{...props}
			{...options}
		/>
	);
}