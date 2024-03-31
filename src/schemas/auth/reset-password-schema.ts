import * as z from "zod";

export const ResetPasswordSchema = z.object({
	password: z.string().email({
		message: "Password field is required",
	}),
});
