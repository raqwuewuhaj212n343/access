import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import hashiCorp from "@/public/assets/add_section/icons/Portfolio/HashiCorp.svg";
import image1 from "@/public/assets/add_section/edit-portfolio-template/images/image1.jpg";
import image2 from "@/public/assets/add_section/edit-portfolio-template/images/image2.jpg";
import image3 from "@/public/assets/add_section/edit-portfolio-template/images/image3.jpg";
import image4 from "@/public/assets/add_section/edit-portfolio-template/images/image4.jpg";
import { useDispatch } from "react-redux";
import { setIdImageToChange } from "@/state_management/features/profile/add_section/portfolio/edit-portfolio-template/GetImageToChangeInfosSlice";
import {
	SelectAndChangeImageComponent,
	SelectAndChangeImageComponentProps,
} from "./SelectAndChangeImageFirstPortfolio";
import Header from "../../../Header";

import StylingParagraph from "../StylingParagraph";
import UploadAndSelectImagePopup from "./UploadAndSelectImagePopupFirstPortfolio";

{
	/* This variable represents the initial data to display to the screen when the page loads */
}
let initialImageToDisplay: SelectAndChangeImageComponentProps[] = [
	{
		imageId: 1,
		imageSrc: image1.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 2,
		imageSrc: image2.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 3,
		imageSrc: image3.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 4,
		imageSrc: image4.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 5,
		imageSrc: image1.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 6,
		imageSrc: image2.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 7,
		imageSrc: image3.src,
		width: 587,
		height: 438,
	},
	{
		imageId: 8,
		imageSrc: image4.src,
		width: 587,
		height: 438,
	},
];

{
	/* This function will take the id of the image (imageIdSelector) which you clicked on and the new image that will replace the old one  */
}
export function updateImageToDisplay(
	imageIdSelector: number,
	newImageSrc: string
) {
	initialImageToDisplay = initialImageToDisplay.map((image) => {
		if (image.imageId === imageIdSelector) {
			return {
				...image,
				imageSrc: newImageSrc,
			};
		}
		return image;
	});
}

interface SaveAsDraftOrPublish {
	headerTitle: string;
	paragraph: string;
	footerTitle: string;
	imageCollection: SelectAndChangeImageComponentProps[];
}

export const FirstPortfolioTemplate = () => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleCloseModal = () => setOpenModal(false);
	const handleOpenModal = () => setOpenModal(true);

	const headerTitleInitialvalue = "Click here to edit";
	const footerTitleInitialvalue = "Click here to edit";
	const paragraphInitialvalue =
		"This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.";

	const [headerTitle, setHeaderTitle] = useState<string>(
		headerTitleInitialvalue
	);
	const [footerTitle, setFooterTitle] = useState<string>(
		footerTitleInitialvalue
	);
	const [paragraph, setParagraph] = useState<string>(paragraphInitialvalue);
	const [isHeaderTitleHovered, setIsHeaderTitleHovered] =
		useState<boolean>(false);
	const [isParagraphHovered, setIsParagraphHovered] =
		useState<boolean>(false);
	const [isFooterTitleHovered, setIsFooterTitleHovered] =
		useState<boolean>(false);
	const [displayStylingComponent, setDisplayStylingComponent] =
		useState<boolean>(false);

	const handleHeaderInput = (event: ChangeEvent<HTMLInputElement>) => {
		setHeaderTitle(event.target.value);
	};
	const handleParagraphInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setParagraph(event.target.value);
	};
	const handleFooterInput = (event: ChangeEvent<HTMLInputElement>) => {
		setFooterTitle(event.target.value);
	};

	const handleSaveAsDraft = () => {
		let draftSaving: SaveAsDraftOrPublish = {
			headerTitle: headerTitle,
			footerTitle: footerTitle,
			paragraph: paragraph,
			imageCollection: initialImageToDisplay,
		};
		alert(JSON.stringify(draftSaving));
	};
	const handlePublish = () => {
		if (
			headerTitle !== ("" || headerTitleInitialvalue) &&
			footerTitle !== ("" || footerTitleInitialvalue) &&
			paragraph !== ("" || paragraphInitialvalue)
		) {
			let collectData: SaveAsDraftOrPublish = {
				headerTitle: headerTitle,
				footerTitle: footerTitle,
				paragraph: paragraph,
				imageCollection: initialImageToDisplay,
			};
			alert(JSON.stringify(collectData));
		} else
			alert("Some required inputs are empty, sorry We cannot publish it");
	};

	return (
		<div className="flex flex-col  h-screen">
			<Header
				handleSaveAsDraft={handleSaveAsDraft}
				handlePublish={handlePublish}
			/>
			<div className=" mt-[6.06em] ml-[7em] mr-[7em]   flex flex-col items-center  border-[.18em] border-solid border-silver ">
				<div className="flex flex-col items-center justify-center">
					<input
						type="text"
						maxLength={50}
						name="headerTitle"
						id="headerTitle"
						autoComplete="off"
						value={
							!isHeaderTitleHovered && headerTitle === ""
								? headerTitleInitialvalue
								: headerTitle
						}
						onChange={handleHeaderInput}
						onMouseEnter={() => setIsHeaderTitleHovered(true)}
						onMouseLeave={() => setIsHeaderTitleHovered(false)}
						onClick={() => {
							if (headerTitle === headerTitleInitialvalue) {
								setHeaderTitle("");
							}
						}}
						className={`mt-[4.37em] w-[51em] h-[5.56em]  ${isHeaderTitleHovered &&
							" bg-editDivBackgroundColor rounded-[1.25em]"
							} text-center font-helveticaDisplay text-[1.5em] outline-none font-light `}
					/>
				</div>
				<div
					className="flex flex-col items-center  relative h-[19em]"
					onMouseEnter={() => setDisplayStylingComponent(true)}
					onMouseLeave={() => setDisplayStylingComponent(false)}
				>
					<textarea
						name="headerTitle"
						id="headerTitle"
						maxLength={200}
						autoComplete="off"
						onMouseEnter={() => setIsParagraphHovered(true)}
						onMouseLeave={() => setIsParagraphHovered(false)}
						value={
							!isParagraphHovered && paragraph === ""
								? paragraphInitialvalue
								: paragraph
						}
						onChange={handleParagraphInput}
						onClick={() => {
							if (paragraph === paragraphInitialvalue) {
								setParagraph("");
							}
						}}
						className={`mt-[6.37em] w-[75em] h-[7.56em] ${isParagraphHovered &&
							" bg-editDivBackgroundColor rounded-[1.25em]"
							} text-center font-helveticaDisplay text-[1em] outline-none resize-none  `}
					/>
					{displayStylingComponent && (
						<div className="absolute top-[14em] right-0">
							<StylingParagraph />
						</div>
					)}
				</div>
				{/* The dispatch here allow to get the imageId of the current image you clicked on */}
				<div className="w-[75em] grid mt-[1em] grid-cols-2 gap-2  ">
					{initialImageToDisplay.map((image) => (
						<SelectAndChangeImageComponent
							{...image}
							key={image.imageId}
							handleClickOnImage={() => {
								dispatch(
									setIdImageToChange({
										idImageToChange: image.imageId,
									})
								);
								handleOpenModal();
							}}
						/>
					))}
				</div>
				<div className="flex flex-col items-center justify-center mt-[-2em] ">
					<input
						type="text"
						maxLength={50}
						name="footerTitle"
						id="footerTitle"
						autoComplete="off"
						value={
							!isFooterTitleHovered && footerTitle === ""
								? footerTitleInitialvalue
								: footerTitle
						}
						onChange={handleFooterInput}
						onMouseEnter={() => setIsFooterTitleHovered(true)}
						onMouseLeave={() => setIsFooterTitleHovered(false)}

						onClick={() => {
							if (footerTitle === footerTitleInitialvalue) {
								setFooterTitle("");
							}
						}}
						className={`mt-[4.37em] w-[75em] h-[5.56em]  ${isFooterTitleHovered &&
							" bg-editDivBackgroundColor rounded-[1.25em]"
							} text-center font-helveticaDisplay text-[1em] outline-none font-light `}
					/>
				</div>
				<div className="mt-[10em] mb-[5em] w-[75em] flex items-center justify-between ">
					<Image
						src={hashiCorp}
						alt="hashiCorp logo"
						width={300}
						height={70}
					/>
					<Image
						src={hashiCorp}
						alt="hashiCorp logo"
						width={300}
						height={70}
					/>
					<Image
						src={hashiCorp}
						alt="hashiCorp logo"
						width={300}
						height={70}
					/>
				</div>
			</div>
			<div className="mt-[5em] border-1 border-solid">
				<span className="invisible">
					This is here to put spaces between the bottom and the image
					component above
				</span>
			</div>
			{/* This is the Popup or modal that will be displayed when you clicked on the image button */}
			<UploadAndSelectImagePopup
				headerTittle="Choose an Image"
				openModal={openModal}
				handleClose={handleCloseModal}
			/>
		</div>
	);
};
export default FirstPortfolioTemplate;
