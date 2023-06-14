import React from "react";
import { LinkProps } from "./SidebarLinks";

import SidebarLinks from "./SidebarLinks";

interface SidebarProps {
	SidebarData: LinkProps[]
}
//include the initialComponent here
const Sidebar = ({ SidebarData }: SidebarProps) => {
	return (
		<>
			<div className="absolute left-0 flex flex-col w-[20.12em] h-[40.43em] bg-keinBlue rounded-bl-[1.25em] ">
				{SidebarData.map((link, i) => (
					<div key={i}>
						<SidebarLinks {...link} />
					</div>
				))}

			</div>
		</>
	);
};
export default Sidebar;
