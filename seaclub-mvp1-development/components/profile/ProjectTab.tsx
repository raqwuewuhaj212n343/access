
import filterIcon from '../../public/assets/profile/icons/filterIcon.svg'
import searchIcon from '../../public/assets/profile/icons/searchIcon.svg'
import cardImage from '../../public/assets/profile/images/cardImage.svg'
import emptyCardBtnIcon from '../../public/assets/profile/icons/emptyCardBtnIcon.svg'
import ProjectCard from "./ProjectCard";
import Image from 'next/image'
import style from '../../src/styles/component/profile/projectTab.module.css';
const ProjectTab = () => {
    const cardInfo = [
        {
            cardImage: cardImage,
            title: 'Text',
            from: 100,
            price: 200,
            delivery: 5,
            footer: 'Text'
        },
        {
            cardImage: cardImage,
            title: 'Text',
            from: 100,
            price: 200,
            delivery: 5,
            footer: 'Text'
        },
    ]
    return (<>

        <div className="flex justify-between">
            <div className="flex gap-x-4 flex-1 ">
                <div className="w-full relative">
                    <input placeholder="Search" type="text" className={`${style.searchInput} w-full h-50px rounded-full pl-72px py-3 border border-secondary outline-none"`} />
                    <div className="absolute top-0 flex justify-center items-center h-full cursor-pointer w-16"><Image src={searchIcon} alt="searchIcon" /></div>
                </div>
                <div>
                    <div className="w-50px h-50px rounded-full flex justify-center items-center border border-secondary cursor-pointer">
                        <Image src={filterIcon} alt="filterIcon" />
                    </div>
                </div>
            </div>
            <div className="flex-1">

            </div>
        </div>
        <div className={`${style.projectContainer} grid grid-cols-3 gap-3`}>
            {
                cardInfo.map((info, i) => <ProjectCard key={i} cardImage={info.cardImage} delivery={info.delivery} footer={info.footer} from={info.from} price={info.price} title={info.title} />)
            }
            <div className={style.emptyCardContainer}>
                <Image src={emptyCardBtnIcon} alt="emptyCardBtnIcon" />
                <h1>Add Project</h1>
            </div>
        </div>
    </>);
}

export default ProjectTab;