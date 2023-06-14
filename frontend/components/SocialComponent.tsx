import Image from "next/image";
import google from '../public/assets/components/logo/google.svg';
import fb from '../public/assets/components/logo/fb.svg';
import linkedin from '../public/assets/components/logo/linkedin.svg';
import style from '../src/styles/component/SocialComponent.module.css';
const SocialComponent = () => {
    return (<div className={style.socialLogoContainer}>
        <div className={style.logoOuter}>
            <Image src={google} alt="Google" />
        </div>
        <div className={style.logoOuter}>
            <Image src={fb} alt="fb" />
        </div>
        <div className={style.logoOuter}>
            <Image src={linkedin} alt="linkedin" />
        </div>
    </div>);
}

export default SocialComponent;