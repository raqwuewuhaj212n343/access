/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import SaveOrCancelButtonsContainer from "@/components/setting_profile/ConfirmationButtonsContainer";
import Image from "next/image";
import clock from "@/public/assets/setting-profile/setting/verification/icons/clock.svg";
import { useDispatch } from "react-redux";
import { displayVerificationCompletedComponent } from "@/state_management/features/setting-profile/verification/DisplayVerificationCompletedComponent";
import { displayOTPComponent } from "@/state_management/features/setting-profile/verification/DisplayOTPVerificationComponent";
import Link from "next/link";

export const OTPVerification = () => {
	const [otp, setOtp] = useState(["", "", "", ""]);
	const inputRef1 = useRef<HTMLInputElement>(null);
	const inputRef2 = useRef<HTMLInputElement>(null);
	const inputRef3 = useRef<HTMLInputElement>(null);
	const inputRef4 = useRef<HTMLInputElement>(null);

	{/* This handleChangeFunction allow you to insert an OTP digit in 4 inputs and allow you to move from one input to another one without clicking on any button   */}
	const handleChange = (
		event: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newOtp = [...otp];
		newOtp[index] = event.target.value;
		setOtp(newOtp);
		if (index === 0 && event.target.value !== "") {
			inputRef2?.current?.focus();
		} else if (index === 1 && event.target.value !== "") {
			inputRef3?.current?.focus();
		} else if (index === 2 && event.target.value !== "") {
			inputRef4?.current?.focus();
		}
	};
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(10);

	{/* This useEffect represents the timer   */}
	useEffect(() => {
		let interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(interval);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [seconds, minutes]);
	const dispatch = useDispatch();
	return (
		<form>
			<div className=" mt-[.68em] flex flex-col w-[42em] ">
				<span className="text-[1.25em] font-helvetica-medium font-light ml-[5em] ">
					Email Verification
				</span>
				<span className="text-[.875em] leading-[1.28em] font-helvetica-regular text-center mt-[2.31em] font-light ">
					Enter OTP Code
				</span>
				<span className="text-[.875em] leading-[1.28em] font-helvetica-regular text-center text-cimen mt-[2.31em] font-light ">
					We will send you a One Time Password to your current email
				</span>
				<div className="flex flex-col relative">
					<div className="flex flex-row items-center justify-center  mt-[1.5em]  ">
						<input
							type="text"
							maxLength={1}
							value={otp[0]}
							onChange={(event) => handleChange(event, 0)}
							ref={inputRef1}
							className="w-[2.5em] h-[3.12em] font-helvetica-regular border border-1 border-solid border-cimen rounded-[6.25em] mr-[2.75em] cursor-pointer text-center "
						/>
						<input
							type="text"
							maxLength={1}
							value={otp[1]}
							onChange={(event) => handleChange(event, 1)}
							ref={inputRef2}
							className="w-[2.5em] h-[3.12em] font-helvetica-regular border border-1 border-solid border-cimen rounded-[6.25em] mr-[2.75em] cursor-pointer text-center"
						/>
						<input
							type="text"
							maxLength={1}
							value={otp[2]}
							onChange={(event) => handleChange(event, 2)}
							ref={inputRef3}
							className="w-[2.5em] h-[3.12em] font-helvetica-regular border border-1 border-solid border-cimen rounded-[6.25em] mr-[2.75em] cursor-pointer text-center"
						/>
						<input
							type="text"
							maxLength={1}
							value={otp[3]}
							onChange={(event) => handleChange(event, 3)}
							ref={inputRef4}
							className="w-[2.5em] h-[3.12em] font-helvetica-regular border border-1 border-solid border-cimen rounded-[6.25em] cursor-pointer text-center "
						/>
					</div>
					<div className="absolute top-[7em] right-[15.5em] text-[.75em] flex items-center ">
						<Image src={clock} alt="" />
						<div className="font-helvetica-regular font-light  ">
							{minutes === 0 && seconds === 0 ? (
								<span className="text-magenta">00:00</span>
							) : (
								<span>
									{minutes}:{seconds < 10 ? `00` : seconds}{" "}
								</span>
							)}
						</div>
					</div>
					<div className="mt-[3.5em] text-[.81em] font-helvetica-regular font-light text-center ">
						<span className="text-cimen">
							Didn't receive the verification OTP?
						</span>{" "}
						<Link href="" className="text-keinBlue">
							Resend again
						</Link>
					</div>
				</div>
			</div>
			<div className="ml-[5em]">
				{/* If you click on Continue button The OTPComponent will disappear and let place to the VerificationCompletedComponent */}
				<SaveOrCancelButtonsContainer
					title="Continue"
					action={() => {
						dispatch(
							displayOTPComponent({
								shouldDisplayComponent: false,
							})
						),
							dispatch(
								displayVerificationCompletedComponent({
									shouldDisplayComponent: true,
								})
							);
					}}
					cancelAction={() => {
						dispatch(
							displayOTPComponent({
								shouldDisplayComponent: false,
							})
						);
					}}
				/>
			</div>
		</form>
	);
};
export default OTPVerification;
