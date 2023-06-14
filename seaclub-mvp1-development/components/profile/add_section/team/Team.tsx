
import Minus from '../../../../public/assets/add_section/icons/team/Minus.svg';
import Plus from '../../../../public/assets/add_section/icons/team/Plus.svg';
import { useState } from 'react';
import Image from "next/image";
import style from '../../../../src/styles/profile/addSection.module.css';
const Team = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div className={style.mainContainer}>
            <div className={style.mainTeamContainer}>
                <p>How many team members do you want to display?</p>
                <div className={style.mainTeamContent}>
                    <Image src={Minus} alt='Minus' onClick={() => {
                        setCounter(counter - 1)
                    }} />
                    <p>{counter}</p>
                    <Image src={Plus} alt='Plus' onClick={() => {
                        setCounter(counter + 1)
                    }} />
                </div>
                <div className={style.blackBtnContainer}>
                    <button className={style.blackBtn}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default Team;