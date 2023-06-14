
import Image from 'next/image';
import tagIcon from '../../public/assets/components/icons/tagIcon.svg';
import clockIcon from '../../public/assets/components/icons/clockIcon.svg';
import footerIcon from '../../public/assets/components/icons/footerIcon.svg';
import style from '../../src/styles/component/profile/projectCard.module.css'
import OverlayActionComponent from '../OverlayActionComponent';
import { useState } from 'react';
interface ICardProps {
    cardImage: string,
    title: string,
    from: number,
    price: number,
    delivery: number,
    footer: string
}
const ProjectCard = ({ cardImage, title, from, price, footer, delivery }: ICardProps) => {
    const [mouseEnter, setMouserEnter] = useState<boolean>(false)
    return (
        <section onMouseOver={() => setMouserEnter(true)} onMouseLeave={() => setMouserEnter(false)} className={`${style.CardContainer} font-helveticaDisplay relative`}>
            <div className={style.imageContainer}>
                <Image src={cardImage} alt='cardImage' className='w-full h-full'></Image>
            </div>
            <div className={style.titleContainer}>
                <h1>{title}</h1>
            </div>
            <div className={`${style.cardBody} flex justify-evenly `}>
                <div className='flex items-center gap-1'>
                    <Image src={tagIcon} alt='tagIcon'></Image>
                    <p>{`From: ${from}$`}</p>
                </div>
                <div className='flex items-center gap-1 '>
                    <Image src={clockIcon} alt='tagIcon'></Image>
                    <p>{`Hour price: ${price}$`}</p>
                </div>
                <div className='flex items-center gap-1 '>
                    <Image src={clockIcon} alt='tagIcon'></Image>
                    <p>{`Delivery days: ${delivery}`}</p>
                </div>
            </div>
            <div className={style.cardFooter}>
                <div className="flex">
                    <Image src={footerIcon} alt='footerIcon'></Image>
                    <h2 className='ml-2.5'>{footer}</h2>
                </div>
            </div>
            {mouseEnter && <OverlayActionComponent project />}
        </section>
    );
}

export default ProjectCard;