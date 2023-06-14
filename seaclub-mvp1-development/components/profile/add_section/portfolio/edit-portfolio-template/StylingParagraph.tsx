import React, { useState, ChangeEvent, MouseEvent } from "react";
import list from "@/public/assets/add_section/edit-portfolio-template/icons/list.svg";
import listWhite from "@/public/assets/add_section/edit-portfolio-template/icons/list-white.svg";
import textItalic from "@/public/assets/add_section/edit-portfolio-template/icons/text-italic.svg";
import textItalicWhite from "@/public/assets/add_section/edit-portfolio-template/icons/text-italic-white.svg";
import textalignCenter from "@/public/assets/add_section/edit-portfolio-template/icons/textalign-center.svg";
import textalignCenterWhite from "@/public/assets/add_section/edit-portfolio-template/icons/textalign-center-white.svg";
import textalignLeft from "@/public/assets/add_section/edit-portfolio-template/icons/textalign-left.svg";
import textalignLeftWhite from "@/public/assets/add_section/edit-portfolio-template/icons/textalign-left-white.svg";
import textalignRight from "@/public/assets/add_section/edit-portfolio-template/icons/textalign-right.svg";
import textalignRightWhite from "@/public/assets/add_section/edit-portfolio-template/icons/textalign-right-white.svg";
import underlined from "@/public/assets/add_section/edit-portfolio-template/icons/underlined.svg";
import underlinedWhite from "@/public/assets/add_section/edit-portfolio-template/icons/underline-white.svg";
import textBold from "@/public/assets/add_section/edit-portfolio-template/icons/bold.svg";
import textBoldWhite from "@/public/assets/add_section/edit-portfolio-template/icons/bold-white.svg";
import Image from "next/image";
import styles from "@/styles/profile/add_section/portfolio/edit-portfolio-template/firstPortfolioTemplate.module.css";

const StylingParagraph = () => {
	const [radioCheckedValue, setRadioCheckedValue] = useState<string>("");
	const [isButtonBoldClicked, setIsButtonBoldClicked] =
		useState<boolean>(false);
	const [isButtonItalicClicked, setIsButtonItalicClicked] =
		useState<boolean>(false);
	const [isButtonListClicked, setIsButtonListClicked] =
		useState<boolean>(false);
	const [isButtonUnderlineClicked, setIsButtonUnderlineClicked] =
		useState<boolean>(false);
	const handleClickOnBold = (event: MouseEvent<HTMLButtonElement>) => {
		setIsButtonBoldClicked((prevState) => !prevState);
	};
	const handleClickOnItalic = (event: MouseEvent<HTMLButtonElement>) => {
		setIsButtonItalicClicked((prevState) => !prevState);
	};
	const handleClickOnList = (event: MouseEvent<HTMLButtonElement>) => {
		setIsButtonListClicked((prevState) => !prevState);
	};
	const handleClickOnUnderline = (event: MouseEvent<HTMLButtonElement>) => {
		setIsButtonUnderlineClicked((prevState) => !prevState);
	};
	const handleRadioChanges = (event: ChangeEvent<HTMLInputElement>) => {
		setRadioCheckedValue(event.target.value);
	};
	return (
		<div className=" border border-1 border-solid border-silver  w-[27.87em] h-[3.75em] rounded-[1.25em] drop-shadow-md flex items-center justify-center  ">
			<div className="radio_buttons  ml-[1em]">
				<div className="flex">
					<div
						className={`${
							radioCheckedValue === "text-left" &&
							styles.radio_container
						} flex items-center justify-center mr-[1em] hover:border border-1 border-silver rounded-full w-[3em] h-[3em]  hover:bg-secondary hover:scale-90  `}
					>
						<input
							type="radio"
							name="textAlign"
							id="text-left"
							value="text-left"
							onChange={handleRadioChanges}
							className="appearance-none"
						/>
						<label htmlFor="text-left" className="cursor-pointer">
							<Image src={radioCheckedValue === "text-left" ? textalignLeftWhite: textalignLeft} alt="align-left-icon" />
						</label>
					</div>

					<div
						className={`${
							radioCheckedValue === "text-center" &&
							styles.radio_container
						} flex items-center justify-center mr-[1em] hover:border border-1 border-silver rounded-full w-[3em] h-[3em] cursor-pointer  hover:bg-secondary hover:scale-90  `}
					>
						<input
							type="radio"
							name="textAlign"
							id="text-center"
							value="text-center"
							onChange={handleRadioChanges}
							className="appearance-none"
						/>
						<label htmlFor="text-center" className="cursor-pointer">
							<Image
								src={radioCheckedValue === 'text-center' ? textalignCenterWhite : textalignCenter}
								alt="align-center-icon"
							/>
						</label>
					</div>
					<div
						className={`${
							radioCheckedValue === "text-right" &&
							styles.radio_container
						} flex items-center justify-center mr-[1em] hover:border border-1 border-silver rounded-full w-[3em] h-[3em]  hover:bg-secondary hover:scale-90  `}
					>
						<input
							type="radio"
							name="textAlign"
							id="text-right"
							value="text-right"
							onChange={handleRadioChanges}
							className="appearance-none"
						/>
						<label htmlFor="text-right" className="cursor-pointer">
							<Image
								src={radioCheckedValue === 'text-right' ? textalignRightWhite: textalignRight}
								alt="align-right-icon"
							/>
						</label>
					</div>
				</div>
			</div>
			<div className="other_styling flex items-center justify-center mr-[1em]">
				<button
					onClick={handleClickOnBold}
					className={`${
						isButtonBoldClicked && styles.apply_bg_color
					} flex items-center justify-center  mr-[1em] hover:border border-1 border-silver rounded-full w-[3em] h-[3em]  hover:bg-secondary hover:scale-90 `}
				>
					<Image src={isButtonBoldClicked ? textBoldWhite: textBold} alt="bold-icon" />
				</button>
				<button
					onClick={handleClickOnItalic}
					className={`${
						isButtonItalicClicked && styles.apply_bg_color
					} flex items-center justify-center  mr-[1em] hover:border border-1 border-silver rounded-full w-[3em] h-[3em]  hover:bg-secondary hover:scale-90 `}
				>
					<Image src={isButtonItalicClicked ? textItalicWhite: textItalic} alt="italic-icon" />
				</button>
				<button
					onClick={handleClickOnList}
					className={`${
						isButtonListClicked && styles.apply_bg_color
					} flex items-center justify-center  mr-[1em] hover:border border-1 border-silver rounded-full w-[3em] h-[3em]  hover:bg-secondary hover:scale-90 `}
				>
					<Image src={isButtonBoldClicked ? listWhite: list} alt="list-icon" />
				</button>
				<button
					onClick={handleClickOnUnderline}
					className={`${
						isButtonUnderlineClicked && styles.apply_bg_color
					} flex items-center justify-center  hover:border border-1 border-silver rounded-full w-[3em] h-[3em]  hover:bg-secondary hover:scale-90 `}
				>
					<Image src={isButtonUnderlineClicked ? underlinedWhite: underlined} alt="underlined-icon" />
				</button>
			</div>
            
		</div>
	);
};
export default StylingParagraph;
