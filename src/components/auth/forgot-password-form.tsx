"use client";

import { useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ForgotPasswordSchema } from "@/schemas/auth/forgot-password-schema";

export function ForgotPasswordForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
		startTransition(() => {
			console.log(values);
		});
	};

	return (
		<div className="mx-auto grid w-[400px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Forgot password</h1>
				<p className="text-balance text-muted-foreground">Enter your email below and we will send you a password reset link</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input tabIndex={1} {...field} disabled={isPending} placeholder="m@example.com" type="email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Send password reset email
					</Button>
				</form>
			</Form>

			<div className="mt-4 text-center text-sm">
				<Link href="/login" className="underline">
					Back to login
				</Link>
			</div>
		</div>
	);
}
