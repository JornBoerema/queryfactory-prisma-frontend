"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/auth/login-schema";
import axios from "axios";
import { BASE_URL } from "@/lib/queryfactory";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	// const cookieStore = cookies();

	try {
		console.log(values);
		const { data } = await axios.post(`${BASE_URL}/login`, values);

		if (!data.success) {
			return data.message;
		}

		console.log(data);
	} catch (err) {
		console.log(err);
	}
};
