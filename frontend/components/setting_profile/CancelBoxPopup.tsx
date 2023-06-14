import React, { MouseEvent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
interface CancelPopupProps {
	buttonWithBackgroundColorTitle: string,
	buttonWithoutBackgroundColorTitle: string,
	openModal: boolean;
	handleClose: (event: MouseEvent<HTMLButtonElement>) => void;
	handleNotCancelAction: (event: MouseEvent<HTMLButtonElement>) => void;
}
export const CancelPopup = (props: CancelPopupProps) => {

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "19.31em",
		height: "10.75em",
		bgcolor: "#E6E8F6",
		borderRadius: "20px",
	};
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
						<div className=" font-helvetica-regular ">
							<div>
								<span className="text-[1em]">Are you sure you want to cancel?</span>
								<br />
								<span className='font-light text-[.81em]'>Changes will not be saved if you cancel.</span>

							</div>
						</div>
						<div className='text-[.75em] font-helvetica-regular font-light'>
							<button onClick={props.handleNotCancelAction}>{props.buttonWithoutBackgroundColorTitle} </button>
							<button className="ml-[1.68em] w-[7.62em] h-[2.37em] rounded-[6.25em] bg-orange text-white " onClick={props.handleClose}>{props.buttonWithBackgroundColorTitle} </button>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
};
export default CancelPopup;
