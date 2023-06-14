import React, { MouseEvent, useState, ChangeEvent, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import closeModal from "@/public/assets/setting-profile/icons/setting/X.svg";
import ImageOperation from "@/components/edit-profile/ImageOperation";
import ImageCrop from "@/components/profile/add_section/ImageCropEditTemplate";
import {
	GetImageToCropSelector,
	GetImageToChangeIdSelector,
} from "@/state_management/features/profile/add_section/portfolio/edit-portfolio-template/GetImageToChangeInfosSlice";
import { useSelector } from "react-redux";
import { updateImageToDisplay } from "./SecondPortfolioTemplate";

interface CropSecondPortfolioTemplateProps {
	headerTittle: string;
	openModal: boolean;
	handleClose: (
		event: MouseEvent<HTMLImageElement | HTMLButtonElement>
	) => void;
}
export const CropSecondPortfolioTemplate = (
	props: CropSecondPortfolioTemplateProps
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
	const fileInputRef = useRef<HTMLInputElement>(null);
	let [selectedImage, setSelectedImage] = useState<string | null>(null);
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
	const [disableCrop, setDisableCrop] = useState<boolean>(true);
	const [scale, setScale] = useState<number>(1);
	const [rotate, setRotate] = useState<number>(0);
	const imageToCrop = useSelector(GetImageToCropSelector);
	let imageToModify = selectedImage ? selectedImage : imageToCrop;
	const handleRotate = (direction: string) => {
		if (direction === "right" && rotate <= 180) {
			setRotate(rotate + 10);
		}
		if (direction === "left" && rotate >= -180) {
			setRotate(rotate - 10);
		}
	};

	const handleZoom = (zoom: string) => {
		if (zoom === "in") {
			setScale(scale + 0.2);
		}
		if (zoom === "out" && scale >= 0) {
			setScale(scale - 0.2);
		}
	};

	const removeImage = () => {
		setSelectedImage("");
		setScale(1);
		setRotate(0);
	};

	const imageIdSelector = useSelector(GetImageToChangeIdSelector);

	const handleSaveImage = () => {
		if (croppedImageFile) {
			const blob = new Blob([croppedImageFile], {
				type: croppedImageFile.type,
			});
			const imageUrl = URL.createObjectURL(blob);
			updateImageToDisplay(imageIdSelector!, imageUrl);
		} else updateImageToDisplay(imageIdSelector!, imageToModify!);
	};
	const handleCloseModal = (
		event: MouseEvent<HTMLImageElement | HTMLButtonElement>
	) => {
		setSelectedImage("");
		props.handleClose(event);
	};
	return (
		<>
			<Modal
				open={props.openModal}
				onClose={handleCloseModal}
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
								onClick={handleCloseModal}
								style={{ cursor: "pointer" }}
							/>
						</div>
					</div>
					<div className="flex p-4 items-center justify-between ">
						<span className="text-[.93em] font-light font-helveticaText  ">
							Editing
						</span>
						<div>
							<input
								type="file"
								accept="image/**"
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
								Change Image
							</button>
						</div>
					</div>
					<div className="flex flex-col p-4">
						<div className="flex flex-col items-center justify-center">
							{imageToModify && (
								<div className="mb-[2.68em] flex justify-center items-center ">
									<ImageCrop
										imageURL={imageToModify}
										disableCrop={disableCrop}
										rotate={rotate}
										scale={scale}
										setCroppedImageFile={
											setCroppedImageFile
										}
										aspect={16 / 9}
										circularCrop={false}
									/>
								</div>
							)}
						</div>
					</div>
					{/* This is the component containing the different operation that will be applied to the choosed image */}
					<ImageOperation
						disableCrop={disableCrop}
						setDisableCrop={setDisableCrop}
						handleRotate={handleRotate}
						handleZoom={handleZoom}
						removeImage={removeImage}
					/>
					<div className="flex items-center justify-between p-4">
						<button
							className="text-keinBlue h-10 px-6 font-helveticaDisplay text-[16px] leading-[24px] font-normal"
							onClick={(event: MouseEvent<HTMLButtonElement>) => {
								setSelectedImage("");
								props.handleClose(event);
							}}
						>
							Cancel
						</button>
						{/* After clicking on save changes, we save the image and remove all the applied style to the image and close the croppedImagePopup */}
						<button
							className="bg-black text-white rounded-full h-10 px-6 font-helveticaDisplay text-[16px] leading-[24px] font-normal"
							onClick={(event: MouseEvent<HTMLButtonElement>) => {
								handleSaveImage();
								setSelectedImage("");
								setScale(1);
								setRotate(0);
								setCroppedImageFile(null);
								setDisableCrop(true);
								props.handleClose(event);
							}}
						>
							Save changes
						</button>
					</div>
				</Box>
			</Modal>
		</>
	);
};
export default CropSecondPortfolioTemplate;
