import Image from "next/image";
import style from '@/styles/component/profile/edit-profile/ImageOperation.module.css'
import { Dispatch, SetStateAction } from "react";
import CropIcon from '@/public/assets/edit-profile/icons/CropIcon.svg';
import rotateRightIcon from '@/public/assets/edit-profile/icons/rotateRightIcon.svg';
import rotateLeftIcon from '@/public/assets/edit-profile/icons/rotateLeftIcon.svg';
import zoomInIcon from '@/public/assets/edit-profile/icons/zoomInIcon.svg';
import zoomOutIcon from '@/public/assets/edit-profile/icons/zoomOutIcon.svg';
import deleteIcon from '@/public/assets/edit-profile/icons/deleteIcon.svg';
interface IImageOperationProps {
    disableCrop: boolean,
    setDisableCrop: Dispatch<SetStateAction<boolean>>,
    handleRotate: (direction: string) => void,
    handleZoom: (zoom: string) => void,
    removeImage: () => void
}

const ImageOperation = ({ disableCrop, setDisableCrop, handleRotate, handleZoom, removeImage }: IImageOperationProps) => {
    return (<div className={style.editImageContainer}>
        <div className={style.actionContainer}>
            <Image className='cursor-pointer' onClick={() => setDisableCrop(!disableCrop)} src={CropIcon} alt='CropIcon'></Image>
            <p>Crop</p>
        </div>
        <div className={style.actionContainer}>
            <div className='flex gap-x-2'>
                <Image className='cursor-pointer' onClick={() => handleRotate('right')} src={rotateRightIcon} alt='rotateRightIcon' />
                <Image className='cursor-pointer' onClick={() => handleRotate('left')} src={rotateLeftIcon} alt='rotateLeftIcon' />
            </div>
            <p>Rotate</p>
        </div>
        <div className={style.actionContainer}>
            <div className='flex gap-x-2'>
                <Image className='cursor-pointer' onClick={() => handleZoom('in')} src={zoomInIcon} alt='zoomInIcon' />
                <Image className='cursor-pointer' onClick={() => handleZoom('out')} src={zoomOutIcon} alt='zoomOutIcon' />
            </div>
            <p>Zoom</p>
        </div>
        <div className={style.actionContainer}>
            <Image className='cursor-pointer' onClick={removeImage} src={deleteIcon} alt='deleteIcon'></Image>
            <p>Delete</p>
        </div>
    </div>);
}

export default ImageOperation;
