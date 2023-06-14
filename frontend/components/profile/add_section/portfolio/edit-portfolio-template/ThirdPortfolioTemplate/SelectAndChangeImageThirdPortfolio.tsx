import React, {
	MouseEvent,
	Dispatch,
	SetStateAction,
	useState,
	ChangeEvent,
} from "react";
import Image from "next/image";
import styles from "@/styles/profile/add_section/portfolio/edit-portfolio-template/firstPortfolioTemplate.module.css";
export interface SelectAndChangeImageThirdPortfolioProps {
	imageId: number;
	imageSrc: string;
	width?: number;
	height?: number;
	handleClickOnImage?: (event: MouseEvent<HTMLButtonElement>) => void;
	paragraphValue?: string;
	setParagraphValue?: Dispatch<SetStateAction<string>>;
	onChangeParagraphValue?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onClickInParagraph?: () => void;
}
export const SelectAndChangeImageThirdPortfolio = (
	props: SelectAndChangeImageThirdPortfolioProps
) => {
	const paragraphInitialvalue =
		"This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.";
	const [isSecondaryParagraphHovered, setIsSecondaryParagraphHovered] =
		useState<boolean>(false);
	return (
		<div className={`w-full grid grid-cols-2 gap-4  `}>
			<div
				className={`w-[${props.width}] h-[${props.height}]  flex items-center justify-center mb-[2em] bg-editDivBackgroundColor `}
			>
				<textarea
					name="headerTitle"
					id="headerTitle"
					maxLength={200}
					autoComplete="off"
					onMouseEnter={() => setIsSecondaryParagraphHovered(true)}
					onMouseLeave={() => setIsSecondaryParagraphHovered(false)}
					value={
						!isSecondaryParagraphHovered &&
						props.paragraphValue === ""
							? paragraphInitialvalue
							: props.paragraphValue
					}
					onChange={props.onChangeParagraphValue}
					onClick={props.onClickInParagraph}
					className={` w-[25.18em] h-[6.68em] bg-transparent p-1 font-helveticaDisplay text-[1em] outline-none resize-none  `}
				/>
			</div>
			<div
				className={` relative hover:opacity-70 ${styles.hovering} mb-[2em]`}
			>
				<div
					style={{
						width: props.width,
						height: props.height,
						overflow: "hidden",
					}}
				>
					<Image
						src={props.imageSrc}
						width={props.width}
						height={props.height}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
						alt={props.imageSrc}
					/>
				</div>
				<button
					onClick={props.handleClickOnImage}
					className={`${styles.changeImageButton} absolute top-0 right-0 bottom-0 left-0 m-auto w-[8.12em] h-[2.5em] rounded-[6.25em] bg-keinBlue text-white
            font-helveticaText font-light hover:text-keinBlue hover:bg-secondary
            `}
				>
					Change Image
				</button>
			</div>
		</div>
	);
};
