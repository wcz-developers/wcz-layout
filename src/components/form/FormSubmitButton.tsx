import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "~/hooks/FormHooks";

export interface FormSubmitButtonProps extends Omit<ButtonProps, "loading" | "disabled" | "onClick" | "type"> { }

export const FormSubmitButton: FC<FormSubmitButtonProps> = (props) => {
    const form = useFormContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
                <Button
                    loading={isSubmitting}
                    disabled={!canSubmit}
                    onClick={handleClick}
                    type="submit"
                    aria-label="submit"
                    {...props}
                />
            )}
        </form.Subscribe>
    );
};