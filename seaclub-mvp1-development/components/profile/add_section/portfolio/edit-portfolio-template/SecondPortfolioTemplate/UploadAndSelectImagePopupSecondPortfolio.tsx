import React, { MouseEvent, useState, ChangeEvent, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import closeModal from "@/public/assets/setting-profile/icons/setting/X.svg";
import CropPortfolioTemplate from "./CropSecondPortfolioTemplate";
import { setImageToChange } from "@/state_management/features/profile/add_section/portfolio/edit-portfolio-template/GetImageToChangeInfosSlice";
import { useDispatch } from "react-redux";

interface UploadAndSelectImagePopupSecondPortfolioProps {
	headerTittle: string;
	openModal: boolean;
	handleClose: (event: MouseEvent<HTMLImageElement>) => void;
}
export const UploadAndSelectImagePopupSecondPortfolio = (
	props: UploadAndSelectImagePopupSecondPortfolioProps
) => {
	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "71.43em",
		height: "50em",
		bgcolor: "white",
		borderRadius: "20px",
	};
	const dispatch = useDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadedImages, setUploadedImages] = useState<File[]>([]);
	let selectedImage: File;
	{
		/* This function is used to upload and stock 12 images that can be used to modify the default image */
	}
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const imagesArray = Array.from(files).slice(0, 12);
			setUploadedImages(imagesArray);
		}
	};
	{
		/* This function triggers the action of uploading images when you click on upload image   */
	}
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const [openCropImagePopUp, setOpenCropImagePopUp] =
		useState<boolean>(false);
	const handleCropImagePopupOpen = () => setOpenCropImagePopUp(true);
	const handleCropImagePopupClose = () => setOpenCropImagePopUp(false);
	return (
		<>
			<Modal
				open={props.openModal}
				onClose={props.handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className=" flex  h-[5.5em] p-4   border-b-[.18em] border-solid border-b-secondary ">
						<div className="flex items-center justify-between w-[71.43em]  ">
							<span className="font-helvetica-medium text-[2em]">
								{props.headerTittle}
							</span>
							<Image
								src={closeModal}
								alt="CloseModal"
								onClick={props.handleClose}
								style={{ cursor: "pointer" }}
							/>
						</div>
					</div>
					<div className="flex p-4 justify-end ">
						<div>
							<input
								type="file"
								accept="image/**"
								multiple
								onChange={handleImageChange}
								className="invisible"
								ref={fileInputRef}
							/>
							<button
								onClick={handleButtonClick}
								className=" w-[9.93em] h-[2.5em] 
                                rounded-[6.25em] bg-keinBlue text-white
                                font-helveticaText font-light hover:text-keinBlue hover:bg-secondary
                                "
							>
								Upload Image
							</button>
						</div>
					</div>
					<div className="flex flex-col p-4">
						<span className=" font-helveticaText text-[.93em] text-cimen mb-[2em] ">
							My Images
						</span>
						{/* The setImageTochange take the upload image and transform it to string so that the image can be displayed and used to change the default image  */}
						<div className=" flex flex-wrap gap-1   ">
							{uploadedImages?.map((images) => (
								<Image
									src={URL.createObjectURL(images)}
									alt="image"
									key={images.name}
									width={238}
									height={201}
									className="aspect-[4/3] hover:opacity-70 cursor-pointer"
									onClick={(
										event: MouseEvent<HTMLImageElement>
									) => {
										selectedImage = images;
										dispatch(
											setImageToChange({
												imageToCrop:
													URL.createObjectURL(
														selectedImage
													),
											})
										);

										handleCropImagePopupOpen();
									}}
								/>
							))}
						</div>
					</div>
				</Box>
			</Modal>
			<CropPortfolioTemplate
				headerTittle="My Image"
				openModal={openCropImagePopUp}
				handleClose={handleCropImagePopupClose}
			/>
		</>
	);
};
export default UploadAndSelectImagePopupSecondPortfolio;
