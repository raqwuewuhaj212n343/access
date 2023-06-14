import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	UserNewPassword,
	validate_new_password,
} from "@/utilities/FormValidation";
import SettingInputField from "@/components/setting_profile/setting/email/SettingInputField";
import SaveOrCancelButtonsContainer from "@/components/setting_profile/ConfirmationButtonsContainer";
import eye from "@/public/assets/setting-profile/setting/email/icons/Eye.svg";
import eye_slash from "@/public/assets/setting-profile/setting/email/icons/eye-slash.svg";
import Image from "next/image";
import { displayPasswordComponent } from "@/state_management/features/setting-profile/email/ChangePassword";
import { getCurrentUserEmailSelector } from "@/state_management/features/setting-profile/email/ChangePassword";
const ChangePassword = () => {
	const dispatch = useDispatch();
	const currentEmailAddress = useSelector(getCurrentUserEmailSelector);
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<string>("");
	const userData: UserNewPassword = {
		password: "",
		confirmPassword: "",
	};
	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};
	const handleConfirmPasswordChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(event.target.value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		userData.password = password;
		userData.confirmPassword = confirmPassword;
		const FormContainsErrors = await validate_new_password(userData);

		if (FormContainsErrors) {
			if (FormContainsErrors.length > 0) {
				setPasswordError(FormContainsErrors[0]);
				{
					/* The FormContainsErrors will come with one or multiple errors so always select the first error every time until there is nothing left */
				}
			}
		} else {
			setPassword("");
			setConfirmPassword("");
			setPasswordError("");
			dispatch(
				displayPasswordComponent({
					displayComponent: false,
				})
			);
		}
	};
	return (
		<div className="w-[27.62em] ml-[.5em] mt-[1.87em] ">
			<form onSubmit={handleSubmit}>
				<div className="w-[27.62em] h-[2.62em] mb-[1.43em] font-helvetica-regular font-light text-[.93em] flex items-center justify-between">
					<span className="text-cimen">Current email address:</span>
					<span className="w-[15.25em]">{currentEmailAddress}</span>
				</div>
				<div className="w-[27.62em] h-[2.62em] mb-[1.43em] font-helvetica-regular font-light text-[.93em] flex items-center justify-between">
					<span className="text-cimen">Current password:</span>
					<div className="relative">
						<input
							type={`${showPassword ? "text" : "password"}`}
							name="current_password"
							value="12345678910"
							className="w-[15.25em] rounded-[6.25em] p-[.625em] outline-none border border-1 border-solid border-silver"
							readOnly
						/>
						<Image
							src={showPassword ? eye : eye_slash}
							alt="show password"
							width={18}
							height={18}
							onMouseEnter={() => setShowPassword(true)}
							onMouseLeave={() => setShowPassword(false)}
							className="absolute top-[.7em] right-[1.5em] cursor-pointer "
						/>
					</div>
				</div>
				<div>
					<SettingInputField
						label="Create a password:"
						placeholder="Enter password"
						value={password}
						onChange={handlePasswordChange}
						type="password"
					/>
				</div>
				<div>
					<SettingInputField
						label="Confirm password:"
						placeholder="Enter password"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						type="password"
					/>
				</div>
				{passwordError && (
					<div className="mt-3  w-full">
						<span className="flex items-start justify-start text-[.93em]  text-magenta">
							{passwordError}
						</span>
					</div>
				)}
				<SaveOrCancelButtonsContainer
					title="Save Changes"
					type="submit"
					cancelAction={() => {
						dispatch(
							displayPasswordComponent({
								displayComponent: false,
							})
						);
					}}
				/>
			</form>
		</div>
	);
};
export default ChangePassword;
