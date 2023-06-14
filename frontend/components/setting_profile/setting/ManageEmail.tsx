/* eslint-disable react/no-unescaped-entities */
import React from "react";
import account_not_verified from "@/public/assets/setting-profile/setting/email/icons/account_not_verified.svg";
import Email from "@/components/setting_profile/setting/email/EmailComponent";
import { useSelector } from "react-redux";
import { displayPassworComponentSelector } from "@/state_management/features/setting-profile/email/ChangePassword";
import ChangePassword from "./email/ChangePassword";
export const ManageEmail = () => {
	const isDisplayPasswordClicked: boolean = useSelector(
		displayPassworComponentSelector
	);

	return (
		<div className="h-full">
			<div>
				{isDisplayPasswordClicked && (
					<>
						<div className="ml-[5em] mt-[.68em]">
							<span className="text-[1.25em] font-helvetica-medium font-light ">
								Change Password
							</span>
							<div className="text-[.875em] leading-[1.28em] font-helvetica-regular flex flex-col mt-[2.31em] font-light w-[31.56em] ">
								<span className=" text-cimen">
									Enter a new password below to change your
									password
								</span>
							</div>
							<div className="mt-[.88em]">
								<ChangePassword />
							</div>
						</div>
					</>
				)}
			</div>

			<div className="h-full">
				{!isDisplayPasswordClicked && (
					<div className={`ml-[5em] mt-[.68em]  `}>
						<span className="text-[1.25em] font-helvetica-medium font-light ">
							Email addresses
						</span>
						<div className="text-[.875em] leading-[1.28em] font-helvetica-regular flex flex-col mt-[2.31em] font-light w-[31.56em] ">
							<span className="text-cimen">
								Ensure that your messages reach the right people
								at the right time, making your communication
								more efficient and effective.
							</span>
						</div>
						<div className="mt-[1.88em]">
							<Email
								icon={account_not_verified}
								email_address="myemail@gmail.com"
								status="Awaiting verification"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default ManageEmail;
