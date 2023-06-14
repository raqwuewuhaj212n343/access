
import style from '@/styles/component/profile/add-section/about-us/ThirdAboutUsTemplate.module.css';
import Image from 'next/image';
import { useRef, useState } from 'react';
import img3 from '../../../../../../public/assets/add_section/images/img3.svg';
import Header from '../../../Header';
import TemplateImageOverlay from '../../../TemplateImageOverlay';
import { ImageTypeEnum } from '@/state_management/features/profile/add_section/about-us/CropImageSlice';
import ImageStorage from '../../../ImageStorage';
import { useAppSelector } from '@/state_management/hooks';


const ThirdAboutUsTemplate = () => {


    // enum value for 
    const { banner } = ImageTypeEnum

    //state
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [imageType, setImageType] = useState<ImageTypeEnum>(banner)
    const [openStorageModal, setOpenStorageModal] = useState<boolean>(false)
    const [showOverlay, setShowOverlay] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    // useRef hook
    const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
    const headerTextareaRef = useRef<HTMLTextAreaElement>(null);
    const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

    // get image from state 
    const croppedImage = useAppSelector((state) => state.croppedImages)

    const bannerImage = croppedImage.find(imgInfo => imgInfo.pageName === 'about-us' && imgInfo.templateNumber === 3 && imgInfo.imageType === banner)


    // close modal 
    const handleCloseStorageModal = () => {
        setOpenStorageModal(false)
    }

    // set all the text in state 
    const handleHeaderChange = () => {
        const headerTextarea = headerTextareaRef.current;

        if (headerTextarea) {
            headerTextarea.style.height = '1.5em'; // Reset the height to auto
            headerTextarea.style.height = `${headerTextarea.scrollHeight}px`; // Set the height based on the content
        }
    };


    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const titleTextarea = titleTextareaRef.current;

        if (titleTextarea) {
            titleTextarea.style.height = '1.5em'; // Reset the height to auto
            titleTextarea.style.height = `${titleTextarea.scrollHeight}px`; // Set the height based on the content
        }
        setTitle(e.target.value)
    };


    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const messageTextarea = messageTextareaRef.current;

        if (messageTextarea) {
            messageTextarea.style.height = '23em'; // Reset the height to auto
            messageTextarea.style.height = `${messageTextarea.scrollHeight}px`; // Set the height based on the content
        }

        setMessage(e.target.value)
    };


    // publish the template
    const handlePublish = () => {
        alert('publish')
        console.log('title :', title, ' message :', message,)
    }

    // make draft the template
    const handleSaveAsDraft = () => {
        alert('SaveAsDraft')
    }

    return (
        <section className={style.mainContainer}>
            <Header handlePublish={handlePublish} handleSaveAsDraft={handleSaveAsDraft} />
            <div className={style.headerText}>
                <textarea ref={headerTextareaRef} defaultValue={'Write your tittle here. Click to edit.'} onChange={handleHeaderChange}></textarea>
            </div>
            <div className='mb-20 relative' onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>
                <Image src={bannerImage ? bannerImage.imageSrc : img3} alt={img3} className={style.bannerImage} width={100} height={100} />
                {showOverlay && <TemplateImageOverlay imageIndex={0} setImageIndex={setImageIndex} imageType={banner} setImageType={setImageType} setOpenStorageModal={setOpenStorageModal} />}
            </div>
            <div className={style.textContainer}>
                <div className={style.titleContainer}>
                    <textarea ref={titleTextareaRef} className={style.title} defaultValue={'United, we create magic!'} onChange={handleTitleChange}></textarea>
                </div>
                <textarea ref={messageTextareaRef} onChange={handleMessageChange} className={style.message} defaultValue={' ed viverra nisi nisl, id scelerisque felis mollis vel. Nam porta velit non nibh tempus commodo. Nulla semper sollicitudin condLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula eros viverra velit aliquam scelerisque. Etiam mollis diam odio, vel cursus ex efficitur eu. Fusce consequat pharetra elit vitae aliquam. Curabitur te. \n\n Fusce consequat pharetra elit vitae aliquam. Curabitur te  Fusce consequat pharetra elit vitae aliquam. Curabitur te Fusce consequat pharetra elit vitae aliquam. Curabitur te \n\n\n ed viverra nisi nisl, id scelerisque felis mollis vel. Nam porta velit non nibh tempus commodo. Nulla semper sollicitudin condLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula eros viverra velit aliquam scelerisque. Etiam mollis diam odio, vel cursus ex efficitur eu. Fusce consequat pharetra elit vitae aliquam. Curabitur te \n\n Fusce consequat pharetra elit vitae aliquam. Curabitur te  Fusce consequat pharetra elit vitae aliquam. Curabitur te Fusce consequat pharetra elit vitae aliquam. Curabitur te'}></textarea>

            </div>

            {/* image storage modal  */}
            <ImageStorage
                headerTittle="Choose an Image"
                openStorageModal={openStorageModal}
                handleClose={handleCloseStorageModal}
                pageName='about-us'
                templateNumber={3}
                imageType={imageType}
                imageIndex={imageIndex}
                cropAspect={21 / 9}
            />
        </section>
    );
}

export default ThirdAboutUsTemplate;