import React from "react";
import { useDispatch } from "react-redux";
import {displayOTPComponent} from "@/state_management/features/setting-profile/verification/DisplayOTPVerificationComponent"
export const EmailVerification = () => {
	const dispatch = useDispatch();
	return (
		<form>
			<div className="ml-[5em] mt-[.68em] flex flex-col items-start ">
				<span className="text-[1.25em] font-helvetica-medium font-light ">
					Email Verification
				</span>
				<span className="text-[.875em] leading-[1.28em] font-helvetica-regular text-cimen mt-[2.31em] font-light ">
					You can click on the verify button to get your email verified
				</span>
				<div className="flex flex-row items-center justify-center  mt-[1.5em]  ">
					<div>
						<div className="flex items-center  w-[25em] h-[2.62em] rounded-[6.25em] border border-1 border-solid border-cimen
							text-[.93em] font-helvetica-regular font-light pl-[.825em] outline-none text-cimen appearance-none
							">
							myemail@gmail.com
						</div>
					</div>
					
					<button
						className="p-[.625em] ml-[.625em] w-[7em] rounded-[6.25em] border border-1 border-solid  text-greenColor "
						style={{ backgroundColor: "rgba(132, 236, 0, 0.1)" }}
						onClick={() => dispatch(displayOTPComponent({shouldDisplayComponent: true}))}
					>
						Verify
					</button>
				</div>
			</div>
           
			
		</form>
	);
};
export default EmailVerification;
