
import Header from "../../../Header";
import style from '@/styles/component/profile/add-section/about-us/FirstAboutUsTemplate.module.css';
import Image from "next/image";
import aboutUsTabImage from '@/public/assets/profile/images/aboutUsTabImage.svg'
import { useRef, useState } from "react";
import TemplateImageOverlay from "../../../TemplateImageOverlay";
import ImageStorage from "../../../ImageStorage";
import { useAppSelector } from "@/state_management/hooks";
import { ImageTypeEnum } from "@/state_management/features/profile/add_section/about-us/CropImageSlice";
const FirstAboutUsTemplate = () => {

    // enum value for image type 
    const { banner } = ImageTypeEnum

    // useRef hooks
    const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
    const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

    // state
    const [showOverlay, setShowOverlay] = useState<boolean>(false)
    const [openStorageModal, setOpenStorageModal] = useState<boolean>(false)
    const [imageType, setImageType] = useState<ImageTypeEnum>(banner)
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [message, setMessage] = useState<string>('')


    // get all images from state
    const croppedImage = useAppSelector((state) => state.croppedImages)

    // filter image for this template
    const showCroppedImage = croppedImage.find(imgInfo => imgInfo.pageName === 'about-us' && imgInfo.templateNumber === 1)


    // title hight will increase according to text
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const titleTextarea = titleTextareaRef.current;

        if (titleTextarea) {
            titleTextarea.style.height = 'auto'; // Reset the height to auto
            titleTextarea.style.height = `${titleTextarea.scrollHeight}px`; // Set the height based on the content
        }
        setTitle(e.target.value)
    };

    // message hight will increase according to text
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const messageTextarea = messageTextareaRef.current;

        if (messageTextarea) {
            messageTextarea.style.height = 'auto'; // Reset the height to auto
            messageTextarea.style.height = `${messageTextarea.scrollHeight}px`; // Set the height based on the content
        }
        setMessage(e.target.value)
    };

    // close the image storage modal
    const handleCloseStorageModal = () => {
        setOpenStorageModal(false)
    }

    // make public this template
    const publishData = () => {
        alert('publish')
        console.log('title :', title, ' message :', message, ' imageInfo :', showCroppedImage);
    }

    // keep this template save as draft
    const draftData = () => {
        alert('draft data')
    }

    return (
        <section className={style.mainContainer}>


            {/* common header of the edit template  */}
            <Header handlePublish={publishData} handleSaveAsDraft={draftData} />

            {/* content of this template  */}
            <div className="mt-24 px-10">
                <div className={style.aboutUsContainer}>
                    <div className={`${style.contentOuter} grid grid-cols-2 gap-9 relative`}>
                        <div className={style.textContainer}>
                            <textarea ref={titleTextareaRef} className={`${style.title}`} onChange={handleTitleChange} defaultValue={'Write your tittle here. Click to edit.'} ></textarea>
                            <textarea onChange={handleMessageChange} ref={messageTextareaRef} className={style.message} defaultValue={'This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'}></textarea>
                        </div>
                        <div className={style.ImageContainer} onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>
                            <Image src={showCroppedImage ? showCroppedImage.imageSrc : aboutUsTabImage} alt='aboutUsTabImage' className='h-full w-full' width={100} height={100} />
                            {showOverlay && <TemplateImageOverlay imageIndex={imageIndex} setImageIndex={setImageIndex} imageType={banner} setImageType={setImageType} setOpenStorageModal={setOpenStorageModal} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* for change the image of the template this image storage modal will open   */}
            <ImageStorage
                headerTittle="Choose an Image"
                openStorageModal={openStorageModal}
                handleClose={handleCloseStorageModal}
                pageName="about-us"
                templateNumber={1}
                imageType={imageType}
                imageIndex={imageIndex}
                cropAspect={16 / 9}
            />
        </section>
    );
}

export default FirstAboutUsTemplate;