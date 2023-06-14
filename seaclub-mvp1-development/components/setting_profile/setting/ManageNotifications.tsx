import React, { useState } from "react";
import SaveOrCancelButtonsContainer from "../ConfirmationButtonsContainer";
import Image from "next/image";
import NotificationOptions from "./notification/NotificationOptions";
import sms from "@/public/assets/setting-profile/setting/notification/icons/sms.svg";
import app from "@/public/assets/setting-profile/setting/notification/icons/app.svg";
export const ManageNotifications = () => {
	const [
		activateEmailNotificationForPlatformUpdates,
		setActivateEmailNotificationForPlatformUpdates,
	] = useState<boolean>(false);
	const [
		activateAppNotificationForPlatformUpdates,
		setActivateAppNotificationForPlatformUpdates,
	] = useState<boolean>(false);

	const [
		activateEmailNotificationForProfileCompletion,
		setActivateEmailNotificationForProfileCompletion,
	] = useState<boolean>(false);
	const [
		activateAppNotificationForProfileCompletion,
		setActivateAppNotificationForProfileCompletion,
	] = useState<boolean>(false);

	const [
		activateEmailNotificationForNewsAndUpdates,
		setActivateEmailNotificationForNewsAndUpdates,
	] = useState<boolean>(false);
	const [
		activateAppNotificationForNewsAndUpdates,
		setActivateAppNotificationForNewsAndUpdates,
	] = useState<boolean>(false);

	const [
		activateAppNotificationForTipsAndBestPractices,
		setActivateAppNotificationForTipsAndBestPractices,
	] = useState<boolean>(false);
	const [
		activateEmailNotificationForTipsAndBestPractices,
		setActivateEmailNotificationForTipsAndBestPractices,
	] = useState<boolean>(false);

	return (
		<div className="h-full">
			<div className="ml-[5em] mt-[.68em]">
				<span className="text-[1.25em] font-helvetica-medium font-light ">
					Notifications
				</span>

				<div className="mt-[2.5em] w-[30.93em] h-[19.62em]  ">
					<div className="flex border-b border-b-cimen border-1 border-solid text-cimen text-[.93em] font-helveticaText font-light justify-end p-1 ">
						<span className="flex items-center">
							<Image
								src={sms}
								alt="sms icon"
								className="mr-[.625em] "
							/>
							Email
						</span>
						<span className="ml-[1.25em] flex item-center ">
							<Image
								src={app}
								alt="sms icon"
								className="mr-[.625em] "
							/>
							App
						</span>
					</div>
					<div className="mt-[1.5em] ">
						<NotificationOptions
							description="Platform Updates"
							setActivateOrNotEmail={
								setActivateEmailNotificationForPlatformUpdates
							}
							activateOrNotEmail={
								activateEmailNotificationForPlatformUpdates
							}
							setActivateOrNotApp={
								setActivateAppNotificationForPlatformUpdates
							}
							activateOrNotApp={
								activateAppNotificationForPlatformUpdates
							}
						/>
						<NotificationOptions
							description="Profile Completion"
							setActivateOrNotEmail={
								setActivateEmailNotificationForProfileCompletion
							}
							activateOrNotEmail={
								activateEmailNotificationForProfileCompletion
							}
							setActivateOrNotApp={
								setActivateAppNotificationForProfileCompletion
							}
							activateOrNotApp={
								activateAppNotificationForProfileCompletion
							}
						/>
						<NotificationOptions
							description="News and updates"
							setActivateOrNotEmail={
								setActivateEmailNotificationForNewsAndUpdates
							}
							activateOrNotEmail={
								activateEmailNotificationForNewsAndUpdates
							}
							setActivateOrNotApp={
								setActivateAppNotificationForNewsAndUpdates
							}
							activateOrNotApp={
								activateAppNotificationForNewsAndUpdates
							}
						/>
						<NotificationOptions
							description="Tips and best practices"
							setActivateOrNotEmail={
								setActivateEmailNotificationForTipsAndBestPractices
							}
							activateOrNotEmail={
								activateEmailNotificationForTipsAndBestPractices
							}
							setActivateOrNotApp={
								setActivateAppNotificationForTipsAndBestPractices
							}
							activateOrNotApp={
								activateAppNotificationForTipsAndBestPractices
							}
						/>
					</div>
				</div>
			</div>
			<div className="ml-[5em] ">
				<SaveOrCancelButtonsContainer title="Save Changes" />
			</div>
		</div>
	);
};
export default ManageNotifications;
