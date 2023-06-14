import React, { useEffect } from "react";
import verifiedAccount from "@/public/assets/setting-profile/setting/email/icons/verified_account.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { displayVerificationCompletedComponent } from "@/state_management/features/setting-profile/verification/DisplayVerificationCompletedComponent";
import { displayOTPComponent } from "@/state_management/features/setting-profile/verification/DisplayOTPVerificationComponent";
export const VerificationCompleted = () => {
	const dispatch = useDispatch();
	{/* After 3 secondes This function will have a fading effect so that this component and OTP component disappear to let place to the first verification component (a sort of Go back)   */}
	useEffect(() => {
		const timer = setTimeout(() =>{
			dispatch(
				displayOTPComponent({shouldDisplayComponent: false})
			),
			dispatch(displayVerificationCompletedComponent({shouldDisplayComponent: false}))
		}, 3000)
		return () =>{
			clearTimeout(timer)
		}
	}, [dispatch])
	return (
		<div>
			<div className="ml-[5em] mt-[.68em] flex flex-col items-start ">
				<span className="text-[1.25em] font-helveticaDisplay font-light ">
					Email Verification
				</span>
				<div className="flex flex-col items-center justify-center  mt-[3.9em] w-[32em]  ">
					<Image
						src={verifiedAccount}
						alt="verified icon account"
						width={50}
						height={50}
					/>
					<span className="font-helveticaText text-[1em] font-light mt-[.75em] ">
						Congratulations!
					</span>
					<span className="font-helveticaText text-[.93em] font-light text-cimen mt-[.75em] ">
						Your email is verified now
					</span>
				</div>
			</div>
		</div>
	);
};
export default VerificationCompleted;
