import React, { useState, MouseEvent, SetStateAction } from 'react'
import CancelBoxPopup from './CancelBoxPopup'

interface ButtonDescription {
    title: string,
    action?: (event: MouseEvent<HTMLButtonElement>) => void;
    cancelAction?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: 'submit' | 'reset' | 'button',
    openCancelModal: boolean,
    setCancelModal: React.Dispatch<SetStateAction<boolean>>
    handleNotCancelAction: () => void
    bgBlue?: boolean
}
const SaveOrCancelButtonsContainer = ({ bgBlue, handleNotCancelAction, openCancelModal, setCancelModal, title, action, type, cancelAction }: ButtonDescription) => {

    const handleOpen = () => setCancelModal(true)
    const handleClose = () => setCancelModal(false)
    return (
        <div className='absolute bottom-[3.18em]  text-[1em] font-helvetica-regular font-light flex items-center  '>
            <button className='text-keinBlue' onClick={handleOpen} type='button'>Cancel</button>
            <button className={`w-[10.37em] h-[2.75em] ${bgBlue ? 'bg-keinBlue' : 'bg-black'} text-white rounded-[6.25em] ml-[19.37em] hover:opacity-[80%] `} onClick={action} type={type}>{title} </button>
            <CancelBoxPopup handleNotCancelAction={handleNotCancelAction} openModal={openCancelModal} handleClose={cancelAction ? cancelAction : handleClose} buttonWithBackgroundColorTitle="Yes, cancel" buttonWithoutBackgroundColorTitle="Don't cancel" />
        </div>
    )
}
export default SaveOrCancelButtonsContainer;