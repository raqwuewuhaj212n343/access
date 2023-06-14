import Link from "next/link";
import SocialComponent from "../../../components/SocialComponent";
import { useRouter } from "next/router";
import style from "../../styles/signup/signup.module.css";
import GobackButton from "@/components/GobackButton";
import LogoWithDescriptiveLabel from "@/components/LogoWithDescriptiveLabel";
import WalletConnection from "@/components/WalletConnection";
import { useState } from "react";
const SignUp = () => {
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false)
	return (
		<section className={style.main}>
			<GobackButton />
			<LogoWithDescriptiveLabel description="Sign Up" />
			<div className={style.signUpContent}>
				{/* <TopLogo title='Sign Up' bold logoGap /> */}
				<div className={style.socialContainer}>
					<h3 className="!text-[1.2em] !font-light !font-helveticaText">Sign up with</h3>
					<SocialComponent />
				</div>
				<div>
					<div
						className={style.btnStyle}
						onClick={() => router.push("/sign-up/with-email")}
					>
						<p>Continue with Email</p>
					</div>
					<div className={style.divider}>
						<div className={style.line}></div>
						<div>
							<p>Or</p>
						</div>
						<div className={style.line}></div>
					</div>
					<div className={`${style.btnStyle} ${style.btnColor}`} onClick={() => setOpen(true)}>
						<p className="text-white">Continue with Wallet</p>
					</div>
					<p className={style.lastText}>
						Already have an account?
						<Link href="/login" className={style.loginText}>
							Log In Now
						</Link>
					</p>
				</div>
				<WalletConnection open={open} setOpen={setOpen} />
			</div>
		</section>
	);
};

export default SignUp;
