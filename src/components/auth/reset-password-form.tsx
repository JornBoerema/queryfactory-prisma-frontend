"use client";

import { useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResetPasswordSchema } from "@/schemas/auth/reset-password-schema";

export function ResetPasswordForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		startTransition(() => {
			console.log(values);
		});
	};

	return (
		<div className="mx-auto grid w-[400px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Reset password</h1>
				<p className="text-balance text-muted-foreground">Your password must be different to previously used passwords</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input tabIndex={1} {...field} disabled={isPending} type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Reset password
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
