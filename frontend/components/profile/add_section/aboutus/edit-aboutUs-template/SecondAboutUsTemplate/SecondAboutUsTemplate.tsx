import { useRef, useState } from 'react'
import Image from "next/image";
import banner1 from '@/public/assets/add_section/images/banner1.svg';
import img21 from '@/public/assets/add_section/images/img21.svg';
import img22 from '@/public/assets/add_section/images/img22.svg';
import img23 from '@/public/assets/add_section/images/img23.svg';
import style from '@/styles/component/profile/add-section/about-us/SecondAboutUsTemplate.module.css';
import Header from "../../../Header";
import TemplateCard from './TemplateCard';
import TemplateImageOverlay from '../../../TemplateImageOverlay';
import ImageStorage from '../../../ImageStorage';
import { ImageTypeEnum } from '@/state_management/features/profile/add_section/about-us/CropImageSlice';
import { useAppSelector } from '@/state_management/hooks';
const SecondAboutUsTemplate = () => {

    // enum value for image type 
    const { banner, cardImage } = ImageTypeEnum

    // useRef hooks
    const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
    const subtitleTextareaRef = useRef<HTMLTextAreaElement>(null);

    // state
    const [openStorageModal, setOpenStorageModal] = useState<boolean>(false)
    const [showOverlay, setShowOverlay] = useState<boolean>(false)
    const [imageType, setImageType] = useState<ImageTypeEnum>(banner)
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [subtitle, setSubtitle] = useState<string>('')
    const [card0, setCard0] = useState<string>('')
    const [card1, setCard1] = useState<string>('')
    const [card2, setCard2] = useState<string>('')

    // demo data for card 
    const cardInfo = [
        {
            img: img21,
            message: 'This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'
        },
        {
            img: img22,
            message: 'This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'
        },
        {
            img: img23,
            message: 'This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'
        },
    ]

    // get changed banner image from state
    const croppedImage = useAppSelector((state) => state.croppedImages)

    const bannerImage = croppedImage.find(imgInfo => imgInfo.pageName === 'about-us' && imgInfo.templateNumber === 2 && imgInfo.imageType === banner)


    // title change function
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const titleTextarea = titleTextareaRef.current;

        if (titleTextarea) {
            titleTextarea.style.height = 'auto'; // Reset the height to auto
            titleTextarea.style.height = `${titleTextarea.scrollHeight}px`; // Set the height based on the content
        }
        setTitle(e.target.value)
    };


    // subtitle change function
    const handleSubtitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const subtitleTextarea = subtitleTextareaRef.current;

        if (subtitleTextarea) {
            subtitleTextarea.style.height = 'auto'; // Reset the height to auto
            subtitleTextarea.style.height = `${subtitleTextarea.scrollHeight}px`; // Set the height based on the content
        }
        setSubtitle(e.target.value)
    };

    // close the image storage modal
    const handleCloseStorageModal = () => {
        setOpenStorageModal(false)
    }


    // save as publish of your template 
    const publishData = () => {
        alert('publish')
        console.log("title :", title, ' subtitle :', subtitle,);
    }

    //  save template as draft 
    const draftData = () => {
        alert('draft data')
    }

    return (
        <section className={style.mainContainer}>

            {/* common header for every edit template  */}
            <Header handlePublish={publishData} handleSaveAsDraft={draftData} />


            <div className={style.container}>
                <div className={style.bannerContainer} onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>

                    {/* header image  */}
                    <Image src={bannerImage ? bannerImage.imageSrc : banner1} alt='banner1' className={style.bannerImage} width={100} height={100} />

                    {/* overlay for change the header image  */}
                    {showOverlay && <TemplateImageOverlay imageIndex={0} setImageIndex={setImageIndex} setOpenStorageModal={setOpenStorageModal} buttonTop setImageType={setImageType} imageType={banner} />}

                    {/* title  */}
                    <div className={style.bannerTitle}>
                        <textarea ref={titleTextareaRef} onChange={handleTitleChange} defaultValue={'Write your tittle here. Click to edit.'}></textarea>
                    </div>

                </div>

                {/* subtitle  */}
                <div className={style.subTitle}>
                    <textarea ref={subtitleTextareaRef} onChange={handleSubtitleChange} defaultValue={'This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'}>
                    </textarea>
                </div>

                {/* template card  */}
                <div className={`grid grid-cols-3 mb-24 gap-10`}>
                    {
                        cardInfo.map((info, i) => <TemplateCard setCard1={setCard1} setCard2={setCard2} setCard0={setCard0} setOpenStorageModal={setOpenStorageModal} img={info.img} message={info.message} key={i} imageIndex={i} setImageType={setImageType} setImageIndex={setImageIndex} />)
                    }

                </div>
            </div>

            {/* modal for change the image  */}

            <ImageStorage
                headerTittle="Choose an Image"
                openStorageModal={openStorageModal}
                handleClose={handleCloseStorageModal}
                pageName='about-us'
                templateNumber={2}
                imageType={imageType}
                imageIndex={imageIndex}
                cropAspect={21 / 9}
            />
        </section>
    );
}

export default SecondAboutUsTemplate;