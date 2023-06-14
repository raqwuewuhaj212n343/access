import React, { ChangeEvent, useState } from "react";
import image1 from "@/public/assets/add_section/edit-portfolio-template/images/image8.png";
import image2 from "@/public/assets/add_section/edit-portfolio-template/images/image9.png";
import { useDispatch } from "react-redux";
import { setIdImageToChange } from "@/state_management/features/profile/add_section/portfolio/edit-portfolio-template/GetImageToChangeInfosSlice";
import {
	SelectAndChangeImageThirdPortfolio,
	SelectAndChangeImageThirdPortfolioProps,
} from "./SelectAndChangeImageThirdPortfolio";
import Header from "../../../Header";

import StylingParagraph from "../StylingParagraph";
import UploadAndSelectImagePopup from "./UploadAndSelectImagePopupThirdPortfolio";

{/* The only thing that need to be changed from another component is the image, and to do that we needed to export the default array containing the default datas, but
1 -you cannot export a value inside a function
2-The default array contains states that cannot be used outside a function
So I needed to create a partial copy of the original data that can be changed in another component
*/}
let partialDataToDisplay: SelectAndChangeImageThirdPortfolioProps[] = [
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
];
{/* This function change the partialCopyOfTheDataToDisplay and will be used in the cropSecondPortfolioTemplate to change the default image with a new one
*/}
export function updateImageToDisplay(
	imageIdSelector: number,
	imageToModify: string
) {
	partialDataToDisplay = partialDataToDisplay.map((image) => {
		if (image.imageId === imageIdSelector) {
			return {
				...image,
				imageSrc: imageToModify,
			};
		}
		return image;
	});
}
export const ThirdPortfolioTemplate = () => {
	const paragraphInitialvalue =
		"This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.";
	const [firstSecondaryParagraph, setFirstSecondaryParagraph] =
		useState<string>(paragraphInitialvalue);
	const [secondSecondaryParagraph, setSecondSecondaryParagraph] =
		useState<string>(paragraphInitialvalue);
	const handleFirstSecondaryParagraphInput = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setFirstSecondaryParagraph(event.target.value);
	};
	const handleSecondSecondaryParagraphInput = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setSecondSecondaryParagraph(event.target.value);
	};
	let initialDataToDisplay: SelectAndChangeImageThirdPortfolioProps[] = [
		{
			imageId: 1,
			imageSrc: image1.src,
			width: 587,
			height: 438,
			paragraphValue: firstSecondaryParagraph,
			setParagraphValue: setFirstSecondaryParagraph,
			onChangeParagraphValue: handleFirstSecondaryParagraphInput,
		},
		{
			imageId: 2,
			imageSrc: image2.src,
			width: 587,
			height: 438,
			paragraphValue: secondSecondaryParagraph,
			setParagraphValue: setSecondSecondaryParagraph,
			onChangeParagraphValue: handleSecondSecondaryParagraphInput,
		},
	];
	{/* This function merge the initialDataToDisplay with the partialCopyOftheDataToDisplay so that we can see the changes that happened when choosing an image  */ }
	let mergedDataToDisplay: SelectAndChangeImageThirdPortfolioProps[] =
		initialDataToDisplay.map((image) => {
			const modifiedImage = partialDataToDisplay.find(
				(modifiedImage) => modifiedImage.imageId === image.imageId
			);

			if (modifiedImage) {
				return {
					...modifiedImage,
					paragraphValue: image.paragraphValue,
					setParagraphValue: image.setParagraphValue,
					onChangeParagraphValue: image.onChangeParagraphValue,
				};
			}

			return image;
		});

	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleCloseModal = () => setOpenModal(false);
	const handleOpenModal = () => setOpenModal(true);

	const headerTitleInitialvalue = "Write your title here. Click here to edit";
	const footerTitleInitialvalue = "Write your title here. Click here to edit";

	const [isHeaderTitleHovered, setIsHeaderTitleHovered] =
		useState<boolean>(false);
	const [isParagraphHovered, setIsParagraphHovered] =
		useState<boolean>(false);
	const [isFooterTitleHovered, setIsFooterTitleHovered] =
		useState<boolean>(false);
	const [isFooterParagraphHovered, setIsFooterParagraphHovered] =
		useState<boolean>(false);
	const [footerParagraph, setFooterParagraph] = useState<string>(
		paragraphInitialvalue
	);
	const [headerTitle, setHeaderTitle] = useState<string>(
		headerTitleInitialvalue
	);
	const [footerTitle, setFooterTitle] = useState<string>(
		footerTitleInitialvalue
	);
	const [paragraph, setParagraph] = useState<string>(paragraphInitialvalue);
	const [displayStylingComponent, setDisplayStylingComponent] =
		useState<boolean>(false);

	const [
		displayFooterParagraphStylingComponent,
		setDisplayFooterParagraphStylingComponent,
	] = useState<boolean>(false);

	const handleHeaderInput = (event: ChangeEvent<HTMLInputElement>) => {
		setHeaderTitle(event.target.value);
	};
	const handleParagraphInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setParagraph(event.target.value);
	};
	const handleFooterInput = (event: ChangeEvent<HTMLInputElement>) => {
		setFooterTitle(event.target.value);
	};
	const handleFooterParagraphInput = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setFooterParagraph(event.target.value);
	};
	interface SaveAsDraftOrPublish {
		headerTitle: string;
		paragraph: string;
		imageAndTheirInputData: SelectAndChangeImageThirdPortfolioProps[];
		footerTitle: string;
		footerParagraph: string;
	}
	const handleSaveAsDraft = () => {
		const collectedData: SaveAsDraftOrPublish = {
			headerTitle: headerTitle,
			paragraph: paragraph,
			imageAndTheirInputData: mergedDataToDisplay,
			footerTitle: footerTitle,
			footerParagraph: footerParagraph,
		};
		alert(JSON.stringify(collectedData));
	};
	const handlePublish = () => {
		if (
			headerTitle !== ("" || headerTitleInitialvalue) &&
			footerTitle !== ("" || footerTitleInitialvalue) &&
			paragraph !== ("" || paragraphInitialvalue) &&
			footerParagraph !== ("" || footerTitleInitialvalue)
		) {
			const collectedData: SaveAsDraftOrPublish = {
				headerTitle: headerTitle,
				paragraph: paragraph,
				imageAndTheirInputData: mergedDataToDisplay,
				footerTitle: footerTitle,
				footerParagraph: footerParagraph,
			};
			alert(JSON.stringify(collectedData));
		}
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
							} p-1 font-helveticaDisplay text-[1.5em] outline-none font-light `}
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
						className={`mt-[6.37em] w-[76em] h-[7.56em] ${isParagraphHovered &&
							" bg-editDivBackgroundColor rounded-[1.25em]"
							} p-1 font-helveticaDisplay text-[1em] outline-none resize-none  `}
					/>
					{displayStylingComponent && (
						<div className="absolute top-[14em] right-0">
							<StylingParagraph />
						</div>
					)}
				</div>
				<div className="w-[75em]  ">
					{mergedDataToDisplay.map((data) => (
						<SelectAndChangeImageThirdPortfolio
							{...data}
							key={data.imageId}
							handleClickOnImage={() => {
								dispatch(
									setIdImageToChange({
										idImageToChange: data.imageId,
									})
								);
								handleOpenModal();
							}}
						/>
					))}
				</div>
				<div className="flex flex-col  mt-[1em] h-[33.43em] bg-editDivBackgroundColor w-full ">
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
						className={`mt-[6.43em] ml-[4.56em] w-[41.8em] h-[5.56em] mb-[2.5em]  bg-transparent  font-helveticaDisplay text-[1.3em] outline-none font-light `}
					/>
					<div
						className="flex flex-col w-[41.8em] relative h-[5.62em]"
						onMouseEnter={() =>
							setDisplayFooterParagraphStylingComponent(true)
						}
						onMouseLeave={() =>
							setDisplayFooterParagraphStylingComponent(false)
						}
					>
						<textarea
							name="footerComment"
							id="footerComment"
							maxLength={200}
							autoComplete="off"
							onMouseEnter={() =>
								setIsFooterParagraphHovered(true)
							}
							onMouseLeave={() =>
								setIsFooterParagraphHovered(false)
							}
							value={
								!isFooterParagraphHovered &&
									footerParagraph === ""
									? paragraphInitialvalue
									: footerParagraph
							}
							onChange={handleFooterParagraphInput}
							onClick={() => {
								if (footerParagraph === paragraphInitialvalue) {
									setFooterParagraph("");
								}
							}}
							className={`mt-[1em] ml-[5.56em] w-[41.8em] h-[5.62em] bg-transparent p-1 font-helveticaDisplay text-[1em] outline-none resize-none  `}
						/>
						{displayFooterParagraphStylingComponent && (
							<div className="absolute top-[6em] right-[-6em] ">
								<StylingParagraph />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="mt-[5em] border-1 border-solid">
				<span className="invisible">
					This is here to put spaces between the bottom and the image
					component above
				</span>
			</div>
			<UploadAndSelectImagePopup
				headerTittle="Choose an Image"
				openModal={openModal}
				handleClose={handleCloseModal}
			/>
		</div>
	);
};
export default ThirdPortfolioTemplate;
