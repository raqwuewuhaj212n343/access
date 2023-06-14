import React from "react";

interface ButtonProps {
	title: string;
	width: string;
	height: string;
	fontSize?: string;
	bgColor?: string;
}

const CustomizedLoginButton = (props: ButtonProps) => {
	return (
		<>
			<button
				type="submit"
				className={`flex items-center justify-center bg-black p-[.625em] ${
					props.fontSize ? `text-[${props.fontSize}em]` : "text-[1em]"
				}  w-[${props.width}em] h-[${props.height}em]
                             text-white border rounded-[6.25em] font-helvetica-regular font-light shadow-boxShadowBlack
                             hover:opacity-[.8] 
                            `}
			>
				{props.title}
			</button>
		</>
	);
};
export default CustomizedLoginButton;
