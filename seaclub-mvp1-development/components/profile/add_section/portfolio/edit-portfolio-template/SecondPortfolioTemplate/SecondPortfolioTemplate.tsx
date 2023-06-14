/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useEffect } from "react";
import image1 from "@/public/assets/add_section/edit-portfolio-template/images/image5.png";
import image2 from "@/public/assets/add_section/edit-portfolio-template/images/image6.png";
import image3 from "@/public/assets/add_section/edit-portfolio-template/images/image7.png";
import Header from "../../../Header";

import StylingParagraph from "../StylingParagraph";
import SelectAndChangeImageSecondPortfolio, {
	SelectAndChangeImageSecondPorfolioProps,
} from "./SelectAndChangeImageSecondPortfolio";

{
	/* The only thing that need to be changed from another component is the image, and to do that we needed to export the default array containing the default datas, but
1 -you cannot export a value inside a function
2-The default array contains states that cannot be used outside a function
So I needed to create a partial copy of the original data that can be changed in another component
*/
}
let partialCopyOfTheDataToDisplay: SelectAndChangeImageSecondPorfolioProps[] = [
	{
		imageId: 1,
		imageSrc: image1.src,
		isMainImage: true,
		width: 1216,
		height: 438,
	},
	{
		imageId: 2,
		imageSrc: image2.src,
		width: 608,
		height: 438,
	},
	{
		imageId: 3,
		imageSrc: image3.src,
		width: 608,
		height: 438,
	},
	{
		imageId: 4,
		imageSrc: image2.src,
		width: 608,
		height: 438,
	},
	{
		imageId: 5,
		imageSrc: image3.src,
		width: 608,
		height: 438,
	},
];

{
	/* This function change the partialCopyOfTheDataToDisplay and will be used in the cropSecondPortfolioTemplate to change the default image with a new one
	 */
}
export function updateImageToDisplay(
	imageIdSelector: number,
	newImage: string
) {
	partialCopyOfTheDataToDisplay = partialCopyOfTheDataToDisplay.map(
		(image) => {
			if (image.imageId === imageIdSelector) {
				return {
					...image,
					imageSrc: newImage,
				};
			}
			return image;
		}
	);
}
const SecondPortfolioTemplate = () => {
	const headerTitleInitialvalue = "Write your title here. Click here to edit";

	const footerTitleInitialvalue = "Write your title here. Click here to edit";
	const paragraphInitialvalue =
		"This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.";

	const [isHeaderTitleHovered, setIsHeaderTitleHovered] =
		useState<boolean>(false);
	const [isParagraphHovered, setIsParagraphHovered] =
		useState<boolean>(false);
	const [isFooterTitleHovered, setIsFooterTitleHovered] =
		useState<boolean>(false);
	const [headerTitle, setHeaderTitle] = useState<string>(
		headerTitleInitialvalue
	);
	const [footerTitle, setFooterTitle] = useState<string>(
		footerTitleInitialvalue
	);
	const [paragraph, setParagraph] = useState<string>(footerTitleInitialvalue);

	const [displayStylingComponent, setDisplayStylingComponent] =
		useState<boolean>(false);
	const [mainParagraph, setMainParagraph] = useState<string>(
		paragraphInitialvalue
	);
	const handleMainParagraphInput = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setMainParagraph(event.target.value);
	};
	const [paragraph1, setParagraph1] = useState<string>(paragraphInitialvalue);
	const [paragraph2, setParagraph2] = useState<string>(paragraphInitialvalue);
	const [paragraph3, setParagraph3] = useState<string>(paragraphInitialvalue);
	const [paragraph4, setParagraph4] = useState<string>(paragraphInitialvalue);
	const handleChangeParagraph1Input = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setParagraph1(event.target.value);
	};

	const handleChangeParagraph2Input = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setParagraph2(event.target.value);
	};

	const handleChangeParagraph3Input = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setParagraph3(event.target.value);
	};

	const handleChangeParagraph4Input = (
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		setParagraph4(event.target.value);
	};

	let initialDataToDisplay: SelectAndChangeImageSecondPorfolioProps[] = [
		{
			imageId: 1,
			imageSrc: image1.src,
			isMainImage: true,
			width: 1216,
			height: 338,
			mainParagraphValue: mainParagraph,
			setMainParagraphValue: setMainParagraph,
			onChangeMainParagraphInput: handleMainParagraphInput,
			onClickInMainParagraph: () => {
				if (mainParagraph === paragraphInitialvalue) {
					setMainParagraph("");
				}
			},
		},
		{
			imageId: 2,
			imageSrc: image2.src,
			width: 608,
			height: 438,
			paragraphValue: paragraph1,
			setParagraphValue: setParagraph1,
			onChangeParagraphInput: handleChangeParagraph1Input,
			onClickInParagraph: () => {
				if (paragraph1 === paragraphInitialvalue) {
					setParagraph1("");
				}
			},
		},
		{
			imageId: 3,
			imageSrc: image3.src,
			width: 608,
			height: 438,
			paragraphValue: paragraph2,
			setParagraphValue: setParagraph2,
			onChangeParagraphInput: handleChangeParagraph2Input,
			onClickInParagraph: () => {
				if (paragraph2 === paragraphInitialvalue) {
					setParagraph2("");
				}
			},
		},
		{
			imageId: 4,
			imageSrc: image2.src,
			width: 608,
			height: 438,
			paragraphValue: paragraph3,
			setParagraphValue: setParagraph3,
			onChangeParagraphInput: handleChangeParagraph3Input,
			onClickInParagraph: () => {
				if (paragraph3 === paragraphInitialvalue) {
					setParagraph3("");
				}
			},
		},
		{
			imageId: 5,
			imageSrc: image3.src,
			width: 608,
			height: 438,
			paragraphValue: paragraph4,
			setParagraphValue: setParagraph4,
			onChangeParagraphInput: handleChangeParagraph4Input,
			onClickInParagraph: () => {
				if (paragraph4 === paragraphInitialvalue) {
					setParagraph4("");
				}
			},
		},
	];
	{
		/* This function merge the initialDataToDisplay with the partialCopyOftheDataToDisplay so that we can see the changes that happened when choosing an image  */
	}

	const [mergedDataToDisplay, setMergedDataToDisplay] = useState<
		SelectAndChangeImageSecondPorfolioProps[]
	>([]);

	// Update the merged data whenever partialCopyOfTheDataToDisplay changes
	useEffect(() => {
		let mergedData: SelectAndChangeImageSecondPorfolioProps[] =
			initialDataToDisplay.map((image) => {
				const modifiedImage = partialCopyOfTheDataToDisplay.find(
					(modifiedImage) => modifiedImage.imageId === image.imageId
				);

				if (modifiedImage) {
					if (modifiedImage.isMainImage) {
						return {
							...modifiedImage,
							mainParagraphValue: image?.mainParagraphValue,
							isMainImage: image.isMainImage,
							setMainParagraphValue: image.setMainParagraphValue,
							onChangeMainParagraphInput:
								image.onChangeMainParagraphInput,
							onMouseEnterMainParagraph:
								image.onMouseEnterMainParagraph,
							onMouseLeaveMainParagraph:
								image.onMouseEnterMainParagraph,
							onClickInMainParagraph:
								image.onClickInMainParagraph,
						};
					}
					return {
						...modifiedImage,
						paragraphValue: image.paragraphValue,
						setParagraphValue: image.setParagraphValue,
						onChangeParagraphInput: image.onChangeParagraphInput,
						onMouseEnterParagraph: image.onMouseEnterParagraph,
						onMouseLeaveParagraph: image.onMouseLeaveParagraph,
						onClickInParagraph: image.onClickInParagraph,
					};
				}

				return image;
			});

		setMergedDataToDisplay(mergedData);
	}, [initialDataToDisplay]);
	const handleHeaderInput = (event: ChangeEvent<HTMLInputElement>) => {
		setHeaderTitle(event.target.value);
	};
	const handleParagraphInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setParagraph(event.target.value);
	};
	const handleFooterInput = (event: ChangeEvent<HTMLInputElement>) => {
		setFooterTitle(event.target.value);
	};
	interface SaveAsDraftOrPublish {
		headerTitle: string;
		paragraph: string;
		footerTitle: string;
		imageAndTheirInputData: SelectAndChangeImageSecondPorfolioProps[];
	}
	const handleSaveAsDraft = () => {
		const collectedData: SaveAsDraftOrPublish = {
			headerTitle: headerTitle,
			paragraph: paragraph,
			footerTitle: footerTitle,
			imageAndTheirInputData: mergedDataToDisplay,
		};
		alert(JSON.stringify(collectedData));
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
				imageAndTheirInputData: mergedDataToDisplay,
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
							}  font-helveticaDisplay text-[1em] outline-none resize-none p-1  `}
					/>
					{displayStylingComponent && (
						<div className="absolute top-[14em] right-0">
							<StylingParagraph />
						</div>
					)}
				</div>
				<SelectAndChangeImageSecondPortfolio
					initialDataToDisplay={mergedDataToDisplay}
				/>

				<div className="flex flex-col items-center justify-center mt-[2em] mb-[2.65em] bg-black h-[20.68em] w-[76em] ">
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
						className={` w-[36.56em] h-[4.56em] text-center font-helveticaDisplay text-[1.5em] outline-none font-light `}
					/>
				</div>
			</div>
			<div className="mt-[5em] border-1 border-solid">
				<span className="invisible">
					This is here to put spaces between the bottom and the image
					component above
				</span>
			</div>
		</div>
	);
};

export default SecondPortfolioTemplate;
