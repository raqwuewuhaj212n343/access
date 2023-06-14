import React, { Dispatch,SetStateAction } from "react";
import Switch from "./Switch";
interface NotificationOptionsProps {
	description: string;
	activateOrNotEmail: boolean;
	setActivateOrNotEmail: Dispatch<SetStateAction<boolean>>;
	activateOrNotApp: boolean;
	setActivateOrNotApp: Dispatch<SetStateAction<boolean>>;
    
}
const NotificationOptions = (props: NotificationOptionsProps) => {
	return (
		<div className="flex  justify-between text-[.93em] font-helveticaText font-light mb-[1.25em]">
			<span>{props.description} </span>
			<div className="flex mr-[1em] ">
				<div>
					<Switch isSelected={props.activateOrNotEmail} setIsSelected={props.setActivateOrNotEmail} />
				</div>
				<div className="ml-[2.5em]">
				<Switch isSelected={props.activateOrNotApp} setIsSelected={props.setActivateOrNotApp} />
				</div>
			</div>
		</div>
	);
};
export default NotificationOptions;
