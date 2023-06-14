import React, { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setIdImageToChange } from "@/state_management/features/profile/add_section/portfolio/edit-portfolio-template/GetImageToChangeInfosSlice";
import Image from "next/image";
import styles from "@/styles/profile/add_section/portfolio/edit-portfolio-template/firstPortfolioTemplate.module.css";
import UploadAndSelectImagePopup from "./UploadAndSelectImagePopupSecondPortfolio";
export interface SelectAndChangeImageSecondPorfolioProps {
	imageId: number;
	imageSrc: string;
	width?: number;
	height?: number;
	isMainImage?: boolean;
	mainParagraphValue?: string;
	setMainParagraphValue?: Dispatch<SetStateAction<string>>;
	onChangeMainParagraphInput?: (
		event: ChangeEvent<HTMLTextAreaElement>
	) => void;
	onMouseEnterMainParagraph?: () => void;
	onMouseLeaveMainParagraph?: () => void;
	onClickInMainParagraph?: () => void;
	onClickOnChangeImageButton?: () => void;
	paragraphValue?: string;
	setParagraphValue?: Dispatch<SetStateAction<string>>;
	onChangeParagraphInput?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onMouseEnterParagraph?: () => void;
	onMouseLeaveParagraph?: () => void;
	onClickInParagraph?: () => void;
}

interface DataToDisplay {
	initialDataToDisplay: SelectAndChangeImageSecondPorfolioProps[];
}
const SelectAndChangeImageSecondPortfolio = ({
	initialDataToDisplay,
}: DataToDisplay) => {
	const paragraphInitialvalue =
		"This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.";

	const [isMainImageHovered, setIsMainImageHovered] =
		useState<boolean>(false);

	const [isSecondaryParagraphHovered, setIsSecondaryParagraphHovered] =
		useState<boolean>(false);

	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleCloseModal = () => setOpenModal(false);
	const handleOpenModal = () => setOpenModal(true);

	return (
		<div className="">
			{initialDataToDisplay.map(
				(data) =>
					data.isMainImage && (
						<div
							className="flex items-start justify-start w-[76em] "
							key={data.imageId}
						>
							<div
								className={`relative hover:opacity-70 ${styles.hovering}`}
							>
								<div
									style={{
										width: data.width,
										height: data.height,
										overflow: "hidden",
									}}
								>
									<Image
										src={data.imageSrc}
										width={data.width}
										height={data.height}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
										alt={data.imageSrc}
									/>
								</div>
								<div className="bg-white w-[29.18em] h-[16.25em] flex items-center justify-center absolute top-[5.56em] left-[5.12em] ">
									<textarea
										maxLength={200}
										name="mainParagraph"
										id="mainParagraph"
										autoComplete="off"
										value={
											!isMainImageHovered &&
											data.mainParagraphValue === ""
												? paragraphInitialvalue
												: data.mainParagraphValue
										}
										onChange={
											data.onChangeMainParagraphInput
										}
										onMouseEnter={() =>
											setIsMainImageHovered(true)
										}
										onMouseLeave={() =>
											setIsMainImageHovered(false)
										}
										onClick={data.onClickInMainParagraph}
										className={` w-[25.18em] h-[6.68em] resize-none  font-helveticaDisplay text-[1em] outline-none font-light   `}
									/>
								</div>
								<button
									onClick={() => {
										dispatch(
											setIdImageToChange({
												idImageToChange: data.imageId,
											})
										);

										handleOpenModal();
									}}
									className={`${styles.changeImageButton} absolute top-0 right-0 bottom-0 left-3 m-auto w-[8.12em] h-[2.5em] rounded-[6.25em] bg-keinBlue text-white
            font-helveticaText font-light hover:text-keinBlue hover:bg-secondary 
            `}
								>
									Change Image
								</button>
							</div>
						</div>
					)
			)}

			<div className="grid grid-cols-2 gap-1 mt-[2em]">
				{initialDataToDisplay.map(
					(data) =>
						!data.isMainImage && (
							<div
								className="h-[41.06em] w-[38em] text-white mb-10"
								key={data.imageId}
							>
								<div
									className={`relative hover:opacity-70 ${styles.hovering}`}
								>
									<div
										style={{
											width: data.width,
											height: data.height,
											position: "relative",
											overflow: "hidden",
										}}
									>
										<Image
											src={data.imageSrc}
											width={data.width}
											height={data.height}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
											alt={data.imageSrc}
										/>
									</div>
									<button
										onClick={() => {
											dispatch(
												setIdImageToChange({
													idImageToChange:
														data.imageId,
												})
											);

											handleOpenModal();
										}}
										className={`${styles.changeImageButton} absolute top-0 right-0 bottom-0 left-3 m-auto w-[8.12em] 
                        						h-[2.5em] rounded-[6.25em] bg-keinBlue text-white
                        						font-helveticaText font-light hover:text-keinBlue hover:bg-secondary 
                        						`}
									>
										Change Image
									</button>
								</div>
								<div
									className="w-[38em] h-[11.56em] mt-[1.93em] bg-secondary flex items-center"
									onMouseEnter={() =>
										setIsSecondaryParagraphHovered(true)
									}
									onMouseLeave={() =>
										setIsSecondaryParagraphHovered(false)
									}
								>
									<textarea
										maxLength={200}
										name="paragraph"
										id="paragraph"
										autoComplete="off"
										value={
											!isSecondaryParagraphHovered &&
											data.paragraphValue === ""
												? paragraphInitialvalue
												: data.paragraphValue
										}
										onChange={data.onChangeParagraphInput}
										onClick={data.onClickInParagraph}
										className="w-[25.18em] h-[6.68em] ml-[2em] resize-none bg-secondary font-helveticaDisplay text-[1em] outline-none font-light"
									/>
								</div>
							</div>
						)
				)}
			</div>
			<UploadAndSelectImagePopup
				headerTittle="Choose an Image"
				openModal={openModal}
				handleClose={handleCloseModal}
			/>
		</div>
	);
};
export default SelectAndChangeImageSecondPortfolio;
