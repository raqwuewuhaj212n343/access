import { useRouter } from "next/router";
import Image from "next/image";
import img from '../public/assets/components/images/leftArrow.svg'
import style from '../src/styles/component/BackBtnComponent.module.css';
const BackBtnComponent = () => {
    const router = useRouter()
    return (<div className={style.backBtnContainer} >
        <div className={style.arrowBtn} onClick={() => router.back()}>
            <Image src={img} alt="back img" />
        </div>
        <p>go back</p>
    </div>);
}

export default BackBtnComponent;