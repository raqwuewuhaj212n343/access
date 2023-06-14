import React, { MouseEvent } from "react";
import Image from "next/image";
import styles from "@/styles/profile/add_section/portfolio/edit-portfolio-template/firstPortfolioTemplate.module.css";
export interface SelectAndChangeImageComponentProps {
	imageId: number;
	imageSrc: string;
	width?: number;
	height?: number;
	handleClickOnImage?: (event: MouseEvent<HTMLButtonElement>) => void;
}
export const SelectAndChangeImageComponent = (
	props: SelectAndChangeImageComponentProps
) => {
	return (
		<div
			className={`w-[587px] h-[438px] m-2  relative hover:opacity-70 ${styles.hovering}  `}
		>
			<div
				style={{
					width: props.width,
					height: props.height,
					position: "relative",
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
					alt="Image template"
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
	);
};
