import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import logo from '../public/assets/components/logo/seaclubBlackLogo.svg'
interface PropsForDescription {
	description: string,
	src?: string,
}
{/* This is present only in the onboarding section, login and signup and represents the description that you associate to the seaclub logo   */}
const LogoWithDescriptiveLabel = ({ description, src }: PropsForDescription) => {
	return (
		<div className={styles.logo}>
			<Image
				src={src ? src : logo}
				alt="logo"
			/>
			<span className={styles.description}>{description}</span>
		</div>
	);
};
export default LogoWithDescriptiveLabel;
