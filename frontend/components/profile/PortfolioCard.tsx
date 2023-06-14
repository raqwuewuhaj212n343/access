import Image from "next/image";
import style from '../../src/styles/component/profile/portfolioCard.module.css';
interface IPortfolioCardProps {
    cardImage: string,
    cardText: string,
    team?: boolean
}
const PortfolioCard = ({ cardImage, cardText, team }: IPortfolioCardProps) => {
    return (<div className="box-border">
        <Image className={style.cardImage} src={cardImage} alt="cardImage"></Image>
        <div className={`${style.textContainer} ${team ? style.textContainerSmall : style.textContainerBig}`}>
            <textarea disabled={true} className={`${style.textarea} ${team ? style.smallFont : style.bigFont}`} defaultValue={cardText}></textarea>
        </div>
    </div>);
}

export default PortfolioCard;