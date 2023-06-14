import Image from "next/image";
import { useRouter } from "next/router";
import style from '../../styles/signup/Onboarding.module.css';
import profileTick from '../../../public/assets/sign-up/icons/profile-tick.png'
import briefcase from '../../../public/assets/sign-up/icons/briefcase.png';
import { MdOutlineCircle, MdCircle } from 'react-icons/md';
import { useRef, useState } from "react";
import GobackButton from "@/components/GobackButton";
import LogoWithDescriptiveLabel from "@/components/LogoWithDescriptiveLabel";
const Onboarding = () => {

    // user state interface
    interface User {
        userType: string,
        userIdentity: string
    }

    // states
    const [user, setUser] = useState<User>({ userType: '', userIdentity: '' })

    // button ref
    const clintRef = useRef<HTMLDivElement>(null)
    const serviceProviderRef = useRef<HTMLDivElement>(null)

    // router
    const router = useRouter()

    // set user type in the state
    const handleUserType = (userType: string): void => {
        setUser({ ...user, userType: userType })
        if (userType === 'client') {
            router.push('/sign-up')
        } else {

            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 10)
        }
    }

    // set user identity in the state and if all required information is on the state then it change the route and go to the sign up page
    const handleUserIdentity = (identity: string): void => {
        setUser({ ...user, userIdentity: identity })
        if (user.userType.length) {
            router.push('/sign-up')
        }
    }

    return (<section className={style.landingPageContainer} >
        <GobackButton />
        <LogoWithDescriptiveLabel description="Welcome to Seaclub" />
        <div>
            {/* <TopLogo title='Welcome to Seaclub' logoGap={false} /> */}

            <div className={style.middleDiv}>
                <h2>What Type of User are you?</h2>
            </div>
            <div className={style.selectUserType}>
                <div className={style.selectTypeOuter} ref={clintRef} onClick={() => handleUserType('client')}>
                    <div className={`${style.selectLogoContainer} ${style.clientBg}`}><Image src={profileTick} alt="profileTick" /></div>
                    <h3>Client</h3>
                </div>
                <div className={style.selectTypeOuter} ref={serviceProviderRef} onClick={() => handleUserType('service provider')}>
                    <div className={`${style.selectLogoContainer} ${style.providerBg}`}><Image src={briefcase} alt="briefcase" /></div>
                    <h3>Service Provider</h3>
                </div>
            </div>
            {user.userType === 'service provider' && <div>
                <h1 className={style.optionTitle}>Choose one option</h1>
                <div className={style.optionContainer} onClick={() => handleUserIdentity('agency')}><p>I have an Agency</p>
                    {user.userIdentity === 'agency' ? <MdCircle size={25} className="me-5" /> :
                        <MdOutlineCircle size={25} className="me-5" />}
                </div>
                <div className={style.optionContainer} onClick={() => handleUserIdentity('freelancer')}><p>I&apos;m a Freelancer</p>
                    {user.userIdentity === 'freelancer' ? <MdCircle size={25} className="me-5" /> :
                        <MdOutlineCircle size={25} className="me-5" />}
                </div>
            </div>}
        </div>
    </section>);
}

export default Onboarding;