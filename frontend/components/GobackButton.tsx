import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import goback_icon from "@/public/assets/components/icons/goback_icon.svg";
import { useRouter } from "next/router";
{/* This function will allow you to go back where you were before    */}
interface GobackButtonProps {
	left?: number,
	top?: number,
}
const GobackButton = ({left, top}: GobackButtonProps ) => {
	const router = useRouter()
	const GoBack = () => {
		router.back();
	};
	return (
		<div className={`flex items-center justify-evenly flex-col w-[7.625em] h-[6.06em] absolute
		 ${top ? `top-[${top}em]` : "top-[2.75em]" }
		 ${left ? `left-[${left}em]` : "left-[1.25em]" }
		  cursor-pointer font-suisseIntl `} onClick={GoBack}>
			<button className={styles.goback_button}>
				<Image src={goback_icon} alt="Go back Icon" />
			</button>
			<span className={styles.previous_page_button_label}>GO BACK</span>
		</div>
	);
};
export default GobackButton;
