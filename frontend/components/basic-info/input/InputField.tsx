import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/basic-info/input/input_field.module.css";
import Image from "next/image";
import caretDown from "@/public/assets/components/icons/CaretDown.svg";
interface InputProps {
	label?: string;
	placeholder?: string;
	handleChangeInput?: (event: ChangeEvent<HTMLInputElement>) => void; // equivalent of onChange but for simple inputs
	handleChangeTextarea?: (event: ChangeEvent<HTMLTextAreaElement>) => void; // equivalent of onChange but for Textarea inputs
	handleChangeSelect?: (event: ChangeEvent<HTMLSelectElement>) => void; // equivalent of onChange but for Select inputs
	value?: string | number;
	selectInputOptions?: string[];
	inputType?: string;
	selectDefaultValue?: string;
	textareaRows?: number;
	modal?: boolean;
	selectModal?: boolean
	gap?: boolean
	inputDefaultValue?: number | string
	disabled?: boolean
}
{/* You can use this piece of code to generate any inputs  */ }
const InputField = (props: InputProps) => {
	const [selectInputClicked, setSelectInputClicked] =
		useState<boolean>(false);
	return (
		<div className={`${styles.inputField} ${props.modal ? 'w-full h-full' : props.selectModal ? 'h-full w-1/2' : 'w-[34.25em] h-[6.81em] mb-4 mr-6'} ${props.gap ? 'mb-4' : ''}`}>
			{props.label && <label htmlFor={props.label} className={styles.label}>
				{props.label}{" "}
			</label>}
			{props.inputType === "select" ? (
				<div className={styles.select_container}>
					<select
						name={props.label}
						id={props.label}
						className={`${styles.select_input} ${props.modal ? 'px-[1em]' : 'py-[0.625em] px-[1.875em]'}`}
						onClick={() =>
							setSelectInputClicked((prevState) => !prevState)
						} //to change the caret direction
						onChange={props.handleChangeSelect}
						defaultValue={props.selectDefaultValue}

					>
						<option
							value={props.selectDefaultValue}

							disabled
						>
							{props.selectDefaultValue}{" "}
						</option>
						{props.selectInputOptions?.map((option_title) => (
							<option value={option_title} key={option_title}>
								{option_title}{" "}
							</option>
						))}
					</select>
					<div
						className={`${styles.select_icon} ${selectInputClicked && styles.changeCarrot
							} ${props.modal ? 'right-3' : 'right-[1.125em]'}`}
					>
						<Image src={caretDown} alt="" />
					</div>
				</div>
			) : props.inputType === "textarea" ? (
				<div className="h-[7.93em] w-full">
					<textarea
						name={props.label}
						placeholder={props.placeholder}
						id={props.label}
						className={`${styles.textarea_input} ${props.modal ? 'w-full' : 'w-[70em]'}`}
						value={props.value}
						onChange={props.handleChangeTextarea}
					></textarea>
				</div>
			) : (
				<input
					type={props?.inputType}
					name={props.label}
					placeholder={props.placeholder}
					id={props.label}
					className={`${styles.other_input} ${props.modal ? 'px-[1em]' : 'py[0.625em] px-[1.875em]'}`}
					value={props.value}
					onChange={props.handleChangeInput}
					defaultValue={props.inputDefaultValue}
					disabled={props.disabled}
				/>
			)}
		</div>
	);
};
export default InputField;
