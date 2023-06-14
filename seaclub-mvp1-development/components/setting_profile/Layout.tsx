import React, { MouseEvent } from "react";
import Sidebar from "@/components/setting_profile/Sidebar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeModal from "@/public/assets/setting-profile/icons/setting/X.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getComponentSelector } from "@/state_management/features/setting-profile/GetSelectedComponent";
import { LinkProps } from "./SidebarLinks";

interface LayoutProps {
	headerTitles: string;
	openModal: boolean;
	handleClose: (event: MouseEvent<HTMLImageElement>) => void;
	sidebarLinksData: LinkProps[];
}
const Layout = ({
	headerTitles,
	openModal,
	handleClose,
	sidebarLinksData,
}: LayoutProps) => {
	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "62.5em",
		height: "45.93em",
		bgcolor: "#FFFFFF",
		borderRadius: "20px",
	};

	const selectedComponent = useSelector(getComponentSelector);
	const initalialComponentToLoad = sidebarLinksData.filter(
		(defaultComponentToDisplay: LinkProps) =>
			defaultComponentToDisplay.isFirstComponentToLoad
	)[0].component;
	return (
		<>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="relative flex items-center justify-center px-[10px] py-[40px] h-[5.5em] flex-row  border-b-[.18em] border-solid border-b-bannerColor ">
						<div className="flex items-center justify-between w-[57.5em] ">
							<span className="font-helvetica-medium text-[2em]">
								{headerTitles}
							</span>
							<Image
								src={closeModal}
								alt="CloseModal"
								onClick={handleClose}
								style={{ cursor: "pointer" }}
							/>
						</div>
					</div>
					<div className="flex flex-row">
						<Sidebar SidebarData={sidebarLinksData} />
						<div className="absolute left-[20em] w-[57.38em] h-[40.43em] p-2 ">
							{selectedComponent === null
								? initalialComponentToLoad
								: selectedComponent}
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
};
export default Layout;
