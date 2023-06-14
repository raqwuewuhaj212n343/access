
import Image from 'next/image';
import style from '../../src/styles/component/profile/aboutUs.module.css'
import aboutUsTabImage from '../../public/assets/profile/images/aboutUsTabImage.svg';
import OverlayActionComponent from '../OverlayActionComponent';
import { useState } from 'react';
const AboutUsTab = () => {
    const [mouseEnter, setMouserEnter] = useState<boolean>(false)
    return (<div className={style.aboutUsContainer}>
        <div onMouseOver={() => setMouserEnter(true)} onMouseLeave={() => setMouserEnter(false)} className={`${style.contentOuter} grid grid-cols-2 gap-9 relative`}>
            <div className={style.textContainer}>
                <h1>Write your tittle here. Click to edit.</h1>
                <p>This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.</p>
            </div>
            <div className={style.ImageContainer}>
                <Image src={aboutUsTabImage} alt='aboutUsTabImage' className='h-full w-full' />
            </div>
            {mouseEnter && <OverlayActionComponent about />}
        </div>
    </div>);
}

export default AboutUsTab;