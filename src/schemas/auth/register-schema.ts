import * as z from "zod";

export const RegisterSchema = z.object({
	firstName: z.string().min(1, {
		message: "First name field is required",
	}),
	lastName: z.string().min(1, {
		message: "Last name field is required",
	}),
	email: z.string().email({
		message: "Email field is required",
	}),
	password: z.string().min(1, {
		message: "Password field is required",
	}),
});
