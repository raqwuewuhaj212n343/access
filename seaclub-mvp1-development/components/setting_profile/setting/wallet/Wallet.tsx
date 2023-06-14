import React, { useState, useRef, useEffect, MouseEvent } from "react";
import copy from "@/public/assets/setting-profile/setting/wallet/icons/copy.svg";
import more from "@/public/assets/setting-profile/setting/wallet/icons/more.svg";
import Image from "next/image";
import DeleteBoxPopup from "../DeleteBoxPopup";
interface IWallet {
	icon: string;
	description: string;
	isDefaultWallet: boolean;
	walledId: string;
}
const Wallet = (props: IWallet) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	const [displayMore, setDisplayMore] = useState<boolean>(false);
	const displayOptionsAvailable = () => {
		setDisplayMore((prevState) => !prevState);
	};
	{/* This function will allow you to copy the wallet keys in clipboard   */}
	const copyToClipboard = (walledId: string) => {
		navigator.clipboard.writeText(walledId);
	};
	const toggleMoreOptionsRef = useRef<HTMLDivElement>(null);
	const [isClickOutside, setIsClickOutside] = useState<boolean>(false);
	{/* This function will allow you to detect if you clicked outside the more option div or not    */}
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
						alt={props.description}
						className="w-[1.5em] h-[1.5em]  "
					/>
					<div className="ml-[.5em]">
						<div className="font-helvetica-regular text-[.93em] font-light ">
							<span>{props.description} </span>
							<span className="text-cimen ml-[.625em]">
								{props.isDefaultWallet && "Default"}{" "}
							</span>
						</div>
						<div className="flex items-center">
							<span className="font-helvetica-regular text-[0.81em] font-light ">
								{props.walledId}{" "}
							</span>
							<Image
								src={copy}
								alt="clipboard"
								className="ml-[.625em] cursor-pointer"
								onClick={() => copyToClipboard(props.walledId)}
							/>
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
						{props.isDefaultWallet ? (
							<div className="border border-1 border-solid border-cimen rounded-[.5em] p-[.2em] absolute left-[2.5em] ">
								<button
									className="font-helvetica-regular text-[.81em] text-magenta "
									onClick={handleOpen}
								>
									Delete
								</button>
							</div>
						) : (
							<div className="flex flex-col items-start border border-1 border-solid border-cimen rounded-[.5em] p-[.8em] absolute left-[2.5em] w-[9.18em] ">
								<button className="font-helvetica-regular text-[.81em] ">
									Use as default
								</button>
								<button
									className="font-helvetica-regular text-[.81em] text-magenta "
									onClick={handleOpen}
								>
									Delete
								</button>
							</div>
						)}
					</div>
				)}
				<DeleteBoxPopup
					buttonWithBackgroundColorTitle="Yes, Delete"
					buttonWithoutBackgroundColorTitle="No, Keep"
					openModal={openModal}
					handleClose={handleClose}
					headingTitle="Are you sure you want to delete this wallet?"
				/>
			</div>
		</div>
	);
};
export default Wallet;
