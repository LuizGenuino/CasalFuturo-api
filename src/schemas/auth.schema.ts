
import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;

const passwordSchema = z.string().min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
})

const emailSchema = z.string().email({
    message: "Invalid email address"
});

const addPasswordConfirmation = (schema: z.ZodSchema) => {
    return schema.refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });

}

export const baseSignUpSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
})

export const signUpSchema = addPasswordConfirmation(baseSignUpSchema);


