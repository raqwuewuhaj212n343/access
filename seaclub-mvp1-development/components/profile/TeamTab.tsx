
import style from '../../src/styles/component/profile/teamTab.module.css';
import teamImage1 from '../../public/assets/profile/images/teamImage1.svg';
import teamImage2 from '../../public/assets/profile/images/teamImage2.svg';
import teamImage3 from '../../public/assets/profile/images/teamImage3.svg';
import PortfolioCard from './PortfolioCard';
import OverlayActionComponent from '../OverlayActionComponent';
import { useState } from 'react';
const TeamTab = () => {
    const [mouseEnter, setMouserEnter] = useState<boolean>(false)
    const cardInfo = [
        {
            cardImage: teamImage1,
            cardText: "Write your tittle here. Click to edit."
        },
        {
            cardImage: teamImage2,
            cardText: "Write your tittle here. Click to edit."
        },
        {
            cardImage: teamImage3,
            cardText: "Write your tittle here. Click to edit."
        },
    ]
    console.log(mouseEnter);
    return (
        <div onMouseOver={() => setMouserEnter(true)} onMouseLeave={() => setMouserEnter(false)} className={style.teamContainer}>
            <h1>Our Team</h1>
            <div className={style.subTitleContainer}>
                <textarea disabled defaultValue='This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.'></textarea>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                {cardInfo.map((info, i) => <PortfolioCard cardImage={info.cardImage} cardText={info.cardText} key={i} team />)}
            </div>
            {mouseEnter && <OverlayActionComponent team />}
        </div>
    );
}

export default TeamTab;