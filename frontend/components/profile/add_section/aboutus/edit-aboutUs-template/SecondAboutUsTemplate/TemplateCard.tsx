import Image from "next/image";
import style from '@/styles/component/profile/add-section/about-us/SecondAboutUsTemplate.module.css';
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import TemplateImageOverlay from "../../../TemplateImageOverlay";
import { ImageTypeEnum } from "@/state_management/features/profile/add_section/about-us/CropImageSlice";
import { useAppSelector } from "@/state_management/hooks";

// interface for props
interface ITemplateCardProps {
    img: string
    message: string
    imageIndex: number
    setOpenStorageModal: Dispatch<SetStateAction<boolean>>
    setImageType: Dispatch<SetStateAction<ImageTypeEnum>>
    setImageIndex: Dispatch<SetStateAction<number>>
    setCard1: Dispatch<SetStateAction<string>>
    setCard2: Dispatch<SetStateAction<string>>
    setCard0: Dispatch<SetStateAction<string>>

}


const TemplateCard = ({ setCard0, setCard1, setCard2, img, message, setOpenStorageModal, imageIndex, setImageType, setImageIndex }: ITemplateCardProps) => {


    //enum for image type
    const { cardImage } = ImageTypeEnum

    // hooks
    const cardMessageTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false)

    // get image from state
    const croppedImage = useAppSelector((state) => state.croppedImages)

    const cardImageInfo = croppedImage.find(imgInfo => imgInfo.pageName === 'about-us' && imgInfo.templateNumber === 2 && imgInfo.imageType === cardImage && imgInfo.imageIndex === imageIndex)


    // card message handling
    const handleCardMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const cardMessageTextarea = cardMessageTextareaRef.current;

        if (cardMessageTextarea) {
            cardMessageTextarea.style.height = 'auto'; // Reset the height to auto
            cardMessageTextarea.style.height = `${cardMessageTextarea.scrollHeight}px`; // Set the height based on the content
        }

        imageIndex === 0 ? setCard0(e.target.value) : imageIndex === 1 ? setCard1(e.target.value) : setCard2(e.target.value)
    };

    return (
        <section>

            {/* card image  */}
            <div onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)} className="relative">
                <Image src={cardImageInfo ? cardImageInfo.imageSrc : img} width={100} height={100} alt={img} className="w-full h-64 object-cover"></Image>
                {showOverlay && <TemplateImageOverlay setOpenStorageModal={setOpenStorageModal} setImageType={setImageType} imageType={cardImage} setImageIndex={setImageIndex} imageIndex={imageIndex} />}
            </div>

            {/* card message */}
            <div className={style.cardMessage}>
                <textarea ref={cardMessageTextareaRef} onChange={handleCardMessageChange} defaultValue={message} ></textarea>
            </div>
        </section>
    );
}

export default TemplateCard;