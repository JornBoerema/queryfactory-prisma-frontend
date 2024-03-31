"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL } from "@/lib/queryfactory";
import { RegisterSchema } from "@/schemas/auth/register-schema";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(async () => {
			await axios.post(`${BASE_URL}/register`, values);
		});
	};

	return (
		<div className="mx-auto grid w-[400px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Sign Up</h1>
				<p className="text-balance text-muted-foreground">Enter your information to create an account</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
					<div className="grid grid-cols-2 gap-x-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input tabIndex={1} {...field} disabled={isPending} placeholder="John" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input tabIndex={2} {...field} disabled={isPending} placeholder="Doe" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input tabIndex={3} {...field} disabled={isPending} placeholder="john.doe@example.com" type="email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>Password</FormLabel>
									<Link tabIndex={5} href="/forgot-password" className="ml-auto inline-block text-sm underline">
										Forgot your password?
									</Link>
								</div>
								<FormControl>
									<Input tabIndex={4} {...field} disabled={isPending} type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Create an account
					</Button>
				</form>
			</Form>

			<div className="mt-4 text-center text-sm">
				Already have an account?{" "}
				<Link href="/login" className="underline">
					Sign in
				</Link>
			</div>
		</div>
	);
};
