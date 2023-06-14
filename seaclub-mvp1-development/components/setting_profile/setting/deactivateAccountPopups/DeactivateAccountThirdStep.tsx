/* eslint-disable react/no-unescaped-entities */
import React, { MouseEvent, useState, ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import caretDown from "@/public/assets/components/icons/CaretDown.svg";
interface DeactivateAccountThirdStepProps {
	buttonWithBackgroundColorTitle: string;
	buttonWithoutBackgroundColorTitle: string;
	openModal: boolean;
	handleClose: (event: MouseEvent<HTMLButtonElement>) => void;
	headingTitle: string;
	subTitle: string;
}
export const DeactivateAccountThirdStep = (
	props: DeactivateAccountThirdStepProps
) => {
	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "26.81em",
		height: "21.81em",
		bgcolor: "#E6E8F6",
		borderRadius: "20px",
	};
	const [days, setdays] = useState<string[]>([
		"1 Day",
		"3 Days",
		"7 Days",
		
	]);

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
						<div className="font-helveticaDisplay w-[24em] ">
							<div className="text-center flex flex-col ">
								<span className="text-[.87em]">
									{props.headingTitle}{" "}
								</span>
								<span className="font-light text-[.81em] mt-[1em] ">
									{props.subTitle}
								</span>
							</div>
						</div>
						<div className=" w-[24em] mt-[-1.5em] h-[2.62em] flex items-center justify-center  font-helvetica-regular font-light text-[.93em] ">
							<div className="relative mt-[.625em] ">
								<select
									name="days"
									id="days"
									className=" flex items-center  w-[24em] h-[2.62em] rounded-[6.25em] border border-1 border-solid border-cimen
                                    text-[.93em] font-helvetica-regular font-light pl-[.825em] outline-none text-cimen appearance-none
                                    "
								>
									<option value="" key="0">
										Select days
									</option>
									{days.map((days) => (
										<option value={days} key={days}>
											{days}{" "}
										</option>
									))}
								</select>
								<Image
									src={caretDown}
									alt="caret icon"
									className="absolute bottom-0 overflow-auto m-auto top-0  right-[1em]  cursor-pointer "
								/>
							</div>
						</div>

						<div className="text-[.75em] font-helvetica-regular font-light ">
							<button onClick={props.handleClose}>
								{props.buttonWithoutBackgroundColorTitle}{" "}
							</button>
							<button className="ml-[1.68em] w-[8.62em] h-[2.37em] rounded-[6.25em] bg-orange text-white ">
								{props.buttonWithBackgroundColorTitle}{" "}
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
};
export default DeactivateAccountThirdStep;
