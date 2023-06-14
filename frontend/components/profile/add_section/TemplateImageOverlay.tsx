import { ImageTypeEnum } from '@/state_management/features/profile/add_section/about-us/CropImageSlice';
import style from '@/styles/component/profile/add-section/TemplateImageOverlay.module.css';
import { SetStateAction } from 'react';

interface IOverlayProps {
    setOpenStorageModal: React.Dispatch<SetStateAction<boolean>>
    setImageIndex: React.Dispatch<SetStateAction<number>>
    setImageType: React.Dispatch<SetStateAction<ImageTypeEnum>>
    buttonTop?: boolean
    imageType: ImageTypeEnum
    imageIndex: number
}

const TemplateImageOverlay = ({ setOpenStorageModal, imageType, buttonTop, setImageType, setImageIndex, imageIndex }: IOverlayProps) => {
    const handleOnClick = () => {
        setImageType(imageType)
        setOpenStorageModal(true)
        setImageIndex(imageIndex)
    }
    return (
        <section className={`${style.container} flex justify-center  ${buttonTop ? 'items-start' : 'items-center'}`}>
            <button className={`${buttonTop && 'mt-20'}`} onClick={handleOnClick}>Change Image</button>

        </section>
    );
}

export default TemplateImageOverlay;