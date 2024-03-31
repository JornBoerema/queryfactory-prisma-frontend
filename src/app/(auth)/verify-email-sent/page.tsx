import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerifyEmailSentPage = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
	const { email } = searchParams;

	return (
		<div className="mx-auto grid w-[450px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Verify your email address</h1>
				<p className="text-balance text-muted-foreground">To start using Query factory, confirm your email address with the email we went to:</p>
				<p className="font-semibold text-lg mt-3">{email}</p>
			</div>
			<Button className="w-full mt-10">Resend email</Button>
			<div className="text-center text-sm">
				<Link href="/login" className="underline">
					Back to login
				</Link>
			</div>
		</div>
	);
};

export default VerifyEmailSentPage;
