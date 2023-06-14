import React, { useState, useRef, useEffect, MouseEvent } from "react";
import more from "@/public/assets/setting-profile/setting/wallet/icons/more.svg";
import Image from "next/image";
import DeleteBoxPopup from "../DeleteBoxPopup";
import { useDispatch } from "react-redux";
import { displayPasswordComponent } from "@/state_management/features/setting-profile/email/ChangePassword";
interface IEmail {
	icon: string;
	email_address: string;
	status: string;
}
const Email = (props: IEmail) => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	const [displayMore, setDisplayMore] = useState<boolean>(false);
	const displayOptionsAvailable = () => {
		setDisplayMore((prevState) => !prevState);
	};

	const toggleMoreOptionsRef = useRef<HTMLDivElement>(null); 
	const [isClickOutside, setIsClickOutside] = useState<boolean>(false);
	{/* This UseEffect allow you to detect if you have clicked outside the div that displays the available options like(change password or delete email)   */}
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				toggleMoreOptionsRef.current &&
				!toggleMoreOptionsRef.current.contains(event.target as Node)
			) {
				setIsClickOutside(true);
			} else setIsClickOutside(false);
		};
		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);
	return (
		<div className="w-[24.56em] mb-[.93em] flex items-start justify-between">
			<div className="ml-[1.25em] w-[11.625em] ">
				<div className="flex items-start">
					<Image
						src={props.icon}
						alt={props.email_address}
						className="w-[1.5em] h-[1.5em]  "
					/>
					<div className="ml-[.5em]">
						<div className="font-helvetica-regular text-[.93em] font-light ">
							<span>{props.email_address} </span>
						</div>
						<div className="flex items-center">
							<span className="font-helvetica-regular text-[0.81em] font-light text-cimen ">
								{props.status}{" "}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div
				className="flex items-start flex-col relative"
				ref={toggleMoreOptionsRef}
			>
				<button onClick={displayOptionsAvailable}>
					<Image src={more} alt="more icon" />
				</button>
				{displayMore && !isClickOutside && (
					<div>
						<div className="flex flex-col items-start border border-1 border-solid border-cimen rounded-[.5em] p-[.8em] absolute left-[2.5em] w-[9.18em] ">
							
							<button
								className="font-helvetica-regular text-[.81em] "
								onClick={() =>
									dispatch(
										displayPasswordComponent({
											displayComponent: true,
											setCurrentEmail:
												props.email_address,
										})
									)
								}
							>
								Change password
							</button>
							<button
								className="font-helvetica-regular text-[.81em] text-magenta "
								onClick={handleOpen}
							>
								Delete email
							</button>
						</div>
					</div>
				)}
				<DeleteBoxPopup
					buttonWithBackgroundColorTitle="Yes, Delete"
					buttonWithoutBackgroundColorTitle="No, Keep"
					openModal={openModal}
					handleClose={handleClose}
					headingTitle="Are you sure you want to delete this email address?"
					subTitle="You can't undo this action"
				/>
			</div>
		</div>
	);
};
export default Email;
