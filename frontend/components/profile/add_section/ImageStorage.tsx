
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import closeModal from "@/public/assets/setting-profile/icons/setting/X.svg";
import { useState, useRef, MouseEvent, SetStateAction, Dispatch } from 'react';
import CropSelectedImageModal from './CropSelectedImage';
import { ImageTypeEnum } from '@/state_management/features/profile/add_section/about-us/CropImageSlice';

// props for image storage modal 
interface IStorageProps {
    headerTittle: string;
    openStorageModal: boolean;
    handleClose: (event: MouseEvent<HTMLImageElement>) => void;
    pageName: string,
    templateNumber: number
    imageType: ImageTypeEnum
    imageIndex: number
    cropAspect?: number
}

const ImageStorage = ({ openStorageModal, handleClose, headerTittle, pageName, templateNumber, imageType, imageIndex, cropAspect }: IStorageProps) => {

    // style for the modal content 
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "71.43em",
        height: "50em",
        bgcolor: "white",
        borderRadius: "20px",
    };

    // hooks
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [openCropImagePopUp, setOpenCropImagePopUp] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string>('')

    // upload images in state
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imagesArray = Array.from(files).slice(0, 12);
            setUploadedImages(imagesArray);
        }
    };

    // on click on input to upload the images 
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // click image to open the crop modal to edit the image
    const handleImageClick = (index: number, image: File) => {
        setSelectedImageIndex(index);
        setSelectedImage(URL.createObjectURL(image))
        setOpenCropImagePopUp(true);

    };

    // close the crop image modal 
    const handleCropImagePopupClose = () => {
        setOpenCropImagePopUp(false)
    }


    return (
        <section>
            <Modal
                open={openStorageModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* modal head  */}
                    <div className=" flex  h-[5.5em] p-4   border-b-[.18em] border-solid border-b-secondary ">
                        <div className="flex items-center justify-between w-[71.43em]  ">
                            <span className="font-helvetica-medium text-[2em]">
                                {headerTittle}
                            </span>
                            <Image
                                src={closeModal}
                                alt="CloseModal"
                                onClick={handleClose}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>

                    {/* upload images  */}
                    <div className="flex p-4 justify-end ">
                        <div>
                            <input
                                type="file"
                                accept="image/**"
                                multiple
                                onChange={handleImageChange}
                                className="invisible"
                                ref={fileInputRef}
                            />
                            <button
                                onClick={handleButtonClick}
                                className=" w-[9.93em] h-[2.5em] 
                                rounded-[6.25em] bg-keinBlue text-white
                                font-helveticaText font-light hover:text-keinBlue hover:bg-secondary
                                "
                            >
                                Upload Image
                            </button>
                        </div>
                    </div>

                    {/* show uploaded images  */}
                    <div className="flex flex-col p-4">
                        <span className=" font-helveticaText text-[.93em] text-cimen mb-[2em] ">
                            My Images
                        </span>
                        {/* The setImageTochange take the upload image and transform it to string so that the image can be displayed and used to change the default image  */}
                        <div className=" flex flex-wrap gap-1   ">
                            {uploadedImages?.map((images, index) => (
                                <Image
                                    src={URL.createObjectURL(images)}
                                    alt="image"
                                    key={index}
                                    width={238}
                                    height={201}
                                    className={`aspect-[4/3] hover:opacity-70 cursor-pointer ${selectedImageIndex === index ? 'opacity-70' : ''}`}
                                    onClick={(
                                        event
                                    ) => handleImageClick(index, images)}
                                />
                            ))}
                        </div>

                    </div>
                </Box>
            </Modal>

            {/* open modal for crop the selected image */}
            <CropSelectedImageModal
                headerTitle="My Image"
                openCropModal={openCropImagePopUp}
                handleClose={handleCropImagePopupClose}
                selectedImage={selectedImage}
                imageIndex={imageIndex}
                pageName={pageName}
                templateNumber={templateNumber}
                imageType={imageType}
                cropAspect={cropAspect}
            />
        </section>
    );
}

export default ImageStorage;