import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "~/hooks/FormHooks";

export interface FormSubmitButtonProps extends Omit<ButtonProps, "loading" | "disabled" | "onClick"> { }

export const FormSubmitButton: FC<FormSubmitButtonProps> = (props) => {
    const form = useFormContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
                <Button
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleClick}
                    aria-label="submit"
                    {...props}
                />
            )}
        </form.Subscribe>
    );
};