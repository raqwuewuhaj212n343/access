import React, { ChangeEvent } from 'react'

interface InputFieldProps{
    label: string,
    type: string,
    placeholder: string,
    value: string,
    onChange: (event:ChangeEvent<HTMLInputElement>) => void;
}
{/* This is the component that has been used to design the differents inputs type of ChangePassword but can be used for other applications (This component does not take in count: select and textarea)  */}
const SettingInputField = (props:InputFieldProps) => {
    return (
        <div className='w-[27.62em] h-[2.62em] mb-[1.43em] font-helvetica-regular font-light text-[.93em] flex items-center justify-between '>
            <label htmlFor={props.label} className='text-cimen'>{props.label} </label>
            <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} id={props.label}
                className='w-[15.25em] rounded-[6.25em] p-[.625em] outline-none border border-1 border-solid border-silver   '
            /> 
        </div>
    )
}
export default SettingInputField;
