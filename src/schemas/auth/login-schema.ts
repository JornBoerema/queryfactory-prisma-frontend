import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email field is required",
	}),
	password: z.string().min(1, {
		message: "Password field is required",
	}),
});
