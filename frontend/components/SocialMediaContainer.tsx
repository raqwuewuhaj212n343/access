import React from "react";

import google_logo from '../public/assets/components/logo/google.svg';
import facebook_logo from '../public/assets/components/logo/fb.svg';
import linkedin_logo from '../public/assets/components/logo/linkedin.svg';
import Image from "next/image";
import styles from "@/styles/Home.module.css";
const SocialMediaContainer = () => {
	return (
		<div className={styles.social_media}>
			<button className={styles.social_media_button}>
				<Image
					src={google_logo}
					alt="Google Logo"
					className={styles.social_media_logo}
				/>
			</button>
			<button className={styles.social_media_button}>
				<Image
					src={facebook_logo}
					alt="Facebook Logo"
					className={styles.social_media_logo}
				/>
			</button>
			<button className={styles.social_media_button}>
				<Image
					src={linkedin_logo}
					alt="Linkedin Logo"
					className={styles.social_media_logo}
				/>
			</button>
		</div>
	);
};
export default SocialMediaContainer;
