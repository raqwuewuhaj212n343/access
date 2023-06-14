import React from "react";
import GobackButton from "@/components/GobackButton";
import Image from "next/image";
import publish from "@/public/assets/add_section/edit-portfolio-template/icons/publish.svg";
import saveAsDraft from "@/public/assets/add_section/edit-portfolio-template/icons/save-as-draft.svg";
interface HeaderProps {
	handleSaveAsDraft? : () => void;
	handlePublish? : () => void,
}
export const Header = ({handleSaveAsDraft, handlePublish}: HeaderProps) => {
	return (
		<div className=" relative">
			<GobackButton top={-0.3} left={0.625} />
			<div className="flex items-center absolute top-[1em] right-[3.93em] ">
				<button className="flex flex-col items-center" onClick={handleSaveAsDraft}>
					<Image src={saveAsDraft} alt="save-as-draft-icon" />
					<span className=" text-keinBlue text-[.93em] font-helveticaText">
						Save as Draft
					</span>
				</button>
				<button className="flex flex-col items-center ml-[2.87em] " onClick={handlePublish}>
					<Image src={publish} alt="publish-icon" />
					<span className=" text-keinBlue text-[.93em] font-helveticaText">
						Publish
					</span>
				</button>
			</div>
		</div>
	);
};
export default Header;
