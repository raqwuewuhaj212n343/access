/* eslint-disable react/no-unescaped-entities */
import React, { MouseEvent, useState, ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeactivateAccountThirdStep from "./DeactivateAccountThirdStep";
interface DeactivateAccountSecondStepProps {
	buttonWithBackgroundColorTitle: string;
	buttonWithoutBackgroundColorTitle: string;
	openModal: boolean;
	handleClose: (event: MouseEvent<HTMLButtonElement>) => void;
	headingTitle: string;
}
export const DeactivateAccountSecondStep = (
	props: DeactivateAccountSecondStepProps
) => {
	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "23.31em",
		height: "10.75em",
		bgcolor: "#E6E8F6",
		borderRadius: "20px",
	};
	const [password, setPassword] = useState<string>("");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	return (
		<>
			<Modal
				open={props.openModal}
				onClose={props.handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="flex flex-col items-center justify-evenly  h-full">
						<div className="font-helveticaDisplay ">
							<div className="flex flex-col   ">
								<span className="text-[.91em] text-center ">
									{props.headingTitle}{" "}
								</span>

								<div className=" w-[22em] mt-[.5em] h-[2.62em] flex items-center justify-center  font-helvetica-regular font-light text-[.93em] ">
									<input
										type="password"
										placeholder="Enter password"
										value={password}
										onChange={(
											event: ChangeEvent<HTMLInputElement>
										) => setPassword(event.target.value)}
										className=" rounded-[6.25em] p-[.625em] outline-none border border-1 border-solid border-silver  w-full  "
									/>
								</div>
							</div>
						</div>
						<div className="text-[.75em] font-helvetica-regular font-light ">
							<button onClick={props.handleClose}>
								{props.buttonWithoutBackgroundColorTitle}{" "}
							</button>
							<button className="ml-[1.68em] w-[8.62em] h-[2.37em] rounded-[6.25em] bg-orange text-white " onClick={handleOpen}>
								{props.buttonWithBackgroundColorTitle}{" "}
							</button>
						</div>
					</div>
				</Box>
			</Modal>
			<DeactivateAccountThirdStep
				openModal={openModal}
				handleClose={handleClose}
				buttonWithBackgroundColorTitle="Yes, Deactivate"
				buttonWithoutBackgroundColorTitle="No, Keep alive"
				headingTitle="In order to reactivate your account, simply login with your primary email address/wallet ID and corresponding password. Or, we can automatically reactivate your account for you. "
				subTitle="Automatically activate your account in"
			/>
		</>
	);
};
export default DeactivateAccountSecondStep;
