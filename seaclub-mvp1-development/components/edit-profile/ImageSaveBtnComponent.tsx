import CancelBoxPopup from '@/components/setting_profile/CancelBoxPopup';
import { SetStateAction } from 'react';
interface IImageBtnProps {
    handleOpenFolder?: () => void,
    handleSaveImage: () => void,
    handleNotCancelAction: () => void
    openCancelModal: boolean
    setOpenCancelModal: React.Dispatch<SetStateAction<boolean>>
    cancelAction?: () => void
}
const ImageSaveBtnComponent = ({ setOpenCancelModal, openCancelModal, handleNotCancelAction, cancelAction, handleOpenFolder, handleSaveImage }: IImageBtnProps) => {
    const handleClose = () => {
        setOpenCancelModal(false)
    }
    return (<div className='flex justify-between mt-2 h-10'>
        <button className='font-helveticaDisplay text-[16px] leading-[24px] text-keinBlue font-normal' onClick={() => setOpenCancelModal(true)}>Cancel</button>
        <div className='flex gap-x-8'>
            <button className='bg-keinBlue text-white rounded-full h-10 px-6 font-helveticaDisplay text-[16px] leading-[24px] font-normal' onClick={handleOpenFolder}>Change Image</button>
            <button className='bg-black text-white rounded-full h-10 px-6 font-helveticaDisplay text-[16px] leading-[24px] font-normal' onClick={handleSaveImage}>Save Changes</button>
        </div>
        <CancelBoxPopup handleNotCancelAction={handleNotCancelAction} openModal={openCancelModal} handleClose={cancelAction ? cancelAction : handleClose} buttonWithBackgroundColorTitle="Yes, cancel" buttonWithoutBackgroundColorTitle="Don't cancel" />
    </div>);
}

export default ImageSaveBtnComponent;