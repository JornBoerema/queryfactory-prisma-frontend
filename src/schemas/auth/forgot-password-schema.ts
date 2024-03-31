import * as z from "zod";

export const ForgotPasswordSchema = z.object({
	email: z.string().email({
		message: "Email field is required",
	}),
});
