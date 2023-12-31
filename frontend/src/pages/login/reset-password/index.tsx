import React, { FormEvent, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserEmail } from "@/state_management/features/PasswordRecoverySlice";
import Head from "next/head";
import GobackButton from "@/components/GobackButton";
import LogoWithDescriptiveLabel from "@/components/LogoWithDescriptiveLabel";
import seaclub_logo from "@/public/assets/login/logo/seaclub_logo.svg";
import { useRouter } from "next/router";
import CustomizedLoginButton from "@/components/CustomizedLoginButton";
const ResetPassword = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(getUserEmail({ email }));
		setEmail("");
		router.push("/login/reset-password/recovery");
	};
	return (
		<>
			<Head>
				<title>Reset Password</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className=" flex  justify-center min-h-screen border-2">
				<GobackButton />
				<div className="flex flex-col items-center mt-[2.87em] h-full">
					<LogoWithDescriptiveLabel
						description="Password Recovery"
						src={seaclub_logo}
					/>
					<form
						className="w-[41.87em] h-full mt-[2.81em] flex flex-col items-center"
						onSubmit={handleSubmit}
					>
						<span className="flex w-[30.06em] items-center justify-center font-helvetica-medium text-[1.2em] text-cimen">
							Enter the email address you use for Seaclub
						</span>
						<div>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter your email"
								required={true}
								onChange={(
									event: ChangeEvent<HTMLInputElement>
								) => setEmail(event.target.value)}
								value={email}
								className="flex w-[41.87em] h-[4.87em] mt-[.93em] pt-[.625em] pr-[2.25em] pb-[.625em] pl-[4.18em]
                     bg-white outline-none border border-1 border-solid border-silver rounded-[6.25em]"
							/>
						</div>
						<div className="mt-[2.81em]">
							<CustomizedLoginButton
								title="Continue"
								width="16.06"
								height="3.125"
							/>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};
export default ResetPassword;
