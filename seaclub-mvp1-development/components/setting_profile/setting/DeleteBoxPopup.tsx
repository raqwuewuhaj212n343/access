/* eslint-disable react/no-unescaped-entities */
import React, { MouseEvent} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
interface DeletePopupProps{
	buttonWithBackgroundColorTitle: string,
	buttonWithoutBackgroundColorTitle: string,
	openModal: boolean;
	handleClose: (event: MouseEvent<HTMLButtonElement>) => void;
	headingTitle: string,
	subTitle:string,
}
export const DeleteBoxPopup = (props: DeletePopupProps ) => {
	
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
							<div className="text-center flex flex-col ">
								<span className="text-[.91em]">{props.headingTitle} </span> 
								
								<span className='font-light text-[.81em] mt-[.3em] '>{props.subTitle}</span>
								
							</div>
						</div>
						<div className='text-[.75em] font-helvetica-regular font-light '>
							<button onClick={props.handleClose} >{props.buttonWithoutBackgroundColorTitle} </button>
							<button className="ml-[1.68em] w-[7.62em] h-[2.37em] rounded-[6.25em] bg-orange text-white " >{props.buttonWithBackgroundColorTitle} </button>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
};
export default DeleteBoxPopup;
