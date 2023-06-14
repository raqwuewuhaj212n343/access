import React, { ReactNode, useState } from "react";
import arrowDown from "@/public/assets/setting-profile/icons/setting/arrow-down.svg";
import arrowUp from "@/public/assets/setting-profile/icons/setting/arrow-up.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setComponent } from "@/state_management/features/setting-profile/GetSelectedComponent";
import { useSelector } from "react-redux";
import { getComponentSelector } from "@/state_management/features/setting-profile/GetSelectedComponent";
import styles from "@/styles/setting-profile/sidebarLinks.module.css";

export interface LinkProps {
	icon?: string[]; //always put at the first index the icon that's going to be displayed when a link is not hovered  and at the second index when the link is  hovered or active
	title: string; // title or description of a link
	link?: string; // for a link that have sublinks, don't set this property (it's not important)
	subLinks?: LinkProps[]; // to set only if a link needs sublinks as a dropdown
	component?: ReactNode; // for a link that have sublinks, don't set this property (it's not important)
	isFirstLinkToLoad?: boolean; // set this property to true only if you want to see a link be active when component mount
	isFirstComponentToLoad?: boolean; // set this property to true only if you want to see a specific component  when component mount
}

const SidebarLinks = (props: LinkProps) => {
	const selectedComponent = useSelector(getComponentSelector);
	const isActiveLink = window.location.hash === props.link;
	const dispatch = useDispatch();
	const [showSubLinks, setShowSubLinks] = useState<boolean>(false);
	const [linkHovered, setLinkHovered] = useState<boolean>(false);

	return (
		<div>
			{/* If you don't provide any link so the link will be #/: initially the sidebar that won't have a link is going to be the one with sublinks   */}
			<Link

				href={`${props.link ? props.link : "#/"}`}
				onClick={() => {
					setShowSubLinks((prevState) => !prevState);
					props.link &&
						dispatch(setComponent({ component: props.component }));
				}}
				onMouseOver={() => setLinkHovered(true)}
				onMouseLeave={() => setLinkHovered(false)}
				className="no-underline"
			>
				<div
					className={`relative flex px-0 py-[1em] text-[1.2em]  font-light  items-center hover:bg-bannerColor ${isActiveLink
						? "bg-bannerColor border-l-[.18em] border-keinBlue"
						: ""
						} ${styles.linkContainer}
					
					${props.isFirstLinkToLoad && selectedComponent === null && `bg-bannerColor`}
					
					`}
				>
					{props.icon && (
						<Image
							src={
								isActiveLink ||
									linkHovered ||
									(props.isFirstLinkToLoad &&
										selectedComponent === null)
									? props.icon[1]
									: props.icon[0]
							}
							alt={`${props.title} icon`}
							className={`ml-[1.875em] `}
						/>
					)}

					<span
						className={` font-helvetica-regular ml-[1em] hover:text-keinBlue 
                    ${isActiveLink ? "text-keinBlue" : "text-bannerColor"}
					${props.isFirstLinkToLoad &&
							selectedComponent === null &&
							`bg-bannerColor ${styles.isFirstLinkToLoad}`
							}
					
                    `}
					>
						{props.title}{" "}
					</span>
					{props.subLinks && (
						<div className="absolute right-[1em]">
							<Image
								src={showSubLinks ? arrowUp : arrowDown}
								alt="arrow icon"
							/>
						</div>
					)}
				</div>
			</Link>

			{props.subLinks &&
				showSubLinks &&
				props.subLinks.map((sublink, i) => (
					<Link
						href={`${sublink.link}`}
						key={i}
						onClick={() => {
							dispatch(
								setComponent({
									component: sublink.component,
								})
							);
						}}
						className="no-underline"
					>
						<div
							className={`flex px-0 py-[1em] text-[1.2em] font-light items-center hover:bg-bannerColor text-keinBlue  ${window.location.hash === sublink.link
								? `bg-bannerColor text-keinBlue border-l-[.18em] border-keinBlue `
								: ""
								} ${styles.linkContainer}
							`}
						>
							<span
								className={` font-helvetica-regular ${sublink.icon ? "ml-[1em]" : "ml-[1.875em]"
									}  hover:text-keinBlue 
                    ${window.location.hash === sublink.link
										? "text-keinBlue"
										: "text-bannerColor"
									}
                    `}
							>
								{sublink.title}{" "}
							</span>
						</div>
					</Link>
				))}
		</div>
	);
};
export default SidebarLinks;
