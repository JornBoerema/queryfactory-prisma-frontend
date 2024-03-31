"use client";

import { useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginSchema } from "@/schemas/auth/login-schema";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

export function LoginForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			login(values)
				.then(() => {
					router.push("/");
				})
				.catch((err) => {
					console.error(err);
				});
		});
	};

	return (
		<div className="mx-auto grid w-[400px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Login</h1>
				<p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
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
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>Password</FormLabel>
									<Link tabIndex={3} href="/forgot-password" className="ml-auto inline-block text-sm underline">
										Forgot your password?
									</Link>
								</div>
								<FormControl>
									<Input tabIndex={2} {...field} disabled={isPending} type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>

			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link href="/register" className="underline">
					Sign up
				</Link>
			</div>
		</div>
	);
}
