
import Image from 'next/image';
import style from '../../src/styles/component/profile/portfolioTab.module.css'
import portfolioBG from '../../public/assets/images/portfolioBG.png';
import portfolioCardImg1 from '../../public/assets/profile/images/porfolioCardImg1.svg';
import portfolioCardImg2 from '../../public/assets/profile/images/porfolioCardImg2.svg';
import PortfolioCard from './PortfolioCard';
import OverlayActionComponent from '../OverlayActionComponent';
import { useState } from 'react';
const PortfolioTab = () => {
    const cardInfo = [
        {
            cardImage: portfolioCardImg1,
            cardText: "This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text."
        },
        {
            cardImage: portfolioCardImg2,
            cardText: "This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text."
        },
        {
            cardImage: portfolioCardImg1,
            cardText: "This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text."
        },
        {
            cardImage: portfolioCardImg2,
            cardText: "This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text."
        },
    ]
    const [mouseEnter, setMouserEnter] = useState<boolean>(false)
    return (<div onMouseOver={() => setMouserEnter(true)} onMouseLeave={() => setMouserEnter(false)} className={style.portfolioContainer}>
        <textarea className={style.title} disabled={true} defaultValue='Write your tittle here. Click to edit.'></textarea>
        <textarea className={style.shortInfo} disabled={true} defaultValue='This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'></textarea>
        <div className='relative'>
            <Image src={portfolioBG} alt='portfolioBG' className='h-full w-full'></Image>
            <div className={style.whiteBox}>
                <textarea disabled={true} defaultValue="This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text." className={style.boxText}></textarea>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 mt-6">
            {cardInfo.map((info, i) => <PortfolioCard cardImage={info.cardImage} cardText={info.cardText} key={i} />)}
        </div>
        <div className={style.footerContainer}>
            <textarea disabled={true} defaultValue='Write your tittle here. Click to edit.' className={style.footerText}></textarea>
        </div>
        {mouseEnter && <OverlayActionComponent portfolio />}
    </div>);
}

export default PortfolioTab;