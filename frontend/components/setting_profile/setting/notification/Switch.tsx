import React, { Dispatch, SetStateAction } from "react";

interface SwitchProps {
	isSelected: boolean;
	setIsSelected: Dispatch<SetStateAction<boolean>>;
}

const Switch = ({ isSelected, setIsSelected }: SwitchProps) => {
	return (
		<div
			onClick={() => {
				setIsSelected(!isSelected);
			}}
			className={`flex w-[1.62em] h-[1em] bg-gray-600 rounded-full 
        transition-all duration-500 cursor-pointer ${
			isSelected && "bg-keinBlue"
		}
        `}
		>
			<span
				className={`h-[1em] w-[1em] bg-white rounded-full 
        transition-all duration-500 shadow-lg ${isSelected && "ml-[.625em] "}
        
        `}
			></span>
		</div>
	);
};
export default Switch;
