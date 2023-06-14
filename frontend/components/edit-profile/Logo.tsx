import style from '@/styles/component/profile/edit-profile/logo.module.css';
import uploadImageIcon from '@/public/assets/edit-profile/icons/uploadImageIcon.svg';
import Image from 'next/image';
import ImageOperation from './ImageOperation';
import { useRef, useState } from 'react';
import ImageSaveBtnComponent from './ImageSaveBtnComponent';
import ImageCrop from '../ImageCrop';
const Logo = () => {

    // state

    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

    // uploaded image in based64
    const [imageURL, setImageURL] = useState<string>('');

    // final crop image
    const [cropImg, setCropImg] = useState<string>('')


    // edit image

    const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
    const [disableCrop, setDisableCrop] = useState<boolean>(true);
    const [scale, setScale] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);

    // ref
    const inputRef = useRef<HTMLInputElement | null>(null)


    // convert uploaded image file to based 64 path
    const dataUrlConverter = (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            setImageURL(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleImageUpload = () => {
        const file = inputRef.current && inputRef.current.files && inputRef.current.files[0]
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            dataUrlConverter(file)
            setUploadedImage(file);
        }

    }
    const handleOpenFolder = () => {

        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            dataUrlConverter(file)
            setUploadedImage(file)
        }

    }

    const handleRotate = (direction: string) => {
        if (direction === 'right' && rotate <= 180) {
            setRotate(rotate + 1)
        }
        if (direction === 'left' && rotate >= -180) {
            setRotate(rotate - 1)
        }
    }

    const handleZoom = (zoom: string) => {
        if (zoom === 'in') {
            setScale(scale + 0.1)
        }
        if (zoom === 'out' && scale >= 0) {
            setScale(scale - 0.1)
        }
    }

    const removeImage = () => {
        setUploadedImage(null)
        setImageURL('')
        setScale(1)
        setRotate(0)
    }
    const handleSaveImage = () => {
        console.log(croppedImageFile);
    }
    const cancelAction = () => {
        setOpenCancelModal(false)
        setUploadedImage(null)
        setImageURL('')
        setScale(1)
        setRotate(0)
    }
    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    return (
        <div className={style.logoContainer}>
            <h1 className={style.title}>Logo</h1>
            <p className={style.subtitle}>Please use a square logo with a minimum size of 300 x 300 pixels for your company profile. It&apos;s also important to use PNG, JPEG, or GIF format and ensure the logo has a transparent background for best results.</p>
            <div className={style.imageContainer}>
                <div onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop} className={style.imageBG}>
                    {!imageURL ? <div className={style.imageRounded}>
                        <Image src={uploadImageIcon} className='mb-5' alt='uploadImageIcon'></Image>
                        <p className='mb-2.5' >Drag & drop file or <span onClick={handleOpenFolder} className='font-bold underline cursor-pointer'>Browse</span></p>
                        <p>Support formats: JPEG, PNG</p>
                    </div> :
                        <div className='w-full h-full'>
                            <ImageCrop imageURL={imageURL} disableCrop={disableCrop} rotate={rotate} scale={scale} setCroppedImageFile={setCroppedImageFile} aspect={1 / 1} circularCrop={true} />
                        </div>}
                    <input multiple={false} ref={inputRef} type="file" className='hidden' accept='image/jpg, image/png, image/jpeg ' onChange={handleImageUpload} />
                </div>
            </div>
            <ImageOperation disableCrop={disableCrop} setDisableCrop={setDisableCrop} handleRotate={handleRotate} handleZoom={handleZoom} removeImage={removeImage} />
            <ImageSaveBtnComponent handleNotCancelAction={handleNotCancelAction} openCancelModal={openCancelModal} setOpenCancelModal={setOpenCancelModal} cancelAction={cancelAction} handleOpenFolder={handleOpenFolder} handleSaveImage={handleSaveImage} />
        </div>
    );
}

export default Logo;