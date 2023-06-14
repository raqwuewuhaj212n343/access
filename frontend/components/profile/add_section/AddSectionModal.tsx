import Image from "next/image";
import book from '@/public/assets/add_section/icons/book.svg';
import likeshapes from '@/public/assets/add_section/icons/likeshapes.svg';
import people from '@/public/assets/add_section/icons/people.svg';
import { useState } from 'react';
import goback_icon from '@/public/assets/components/icons/goback_icon.svg'
import style1 from '@/styles/profile/addSection.module.css';
import TeamTemplates from "@/components/profile/add_section/team/Team";
import AboutUsTemplates from "@/components/profile/add_section/aboutus/Aboutus";
import PortfolioTemplates from "@/components/profile/add_section/portfolio/Portfolio";
import { Box, Modal } from "@mui/material";
const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    overflow: 'scroll',
    border: '0',
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

interface IAddSectionProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AddSectionModal = ({ setOpen, open }: IAddSectionProps) => {
    const [selectCard, setSelectCard] = useState<number>(0)

    const handleClickCard = (number: number): void => {
        setSelectCard(number)
    }
    const handleClose1 = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                style={{ background: "#E6E8F6", display: 'flex', justifyContent: 'flex-start' }}
                sx={styleModal} className="style.test flex flex-nowrap justify-center flex-col gap-16"
            >
                <div className={style1.arrowBtnContainer} onClick={handleClose1}>
                    <div className={style1.arrowBtn}>
                        <Image src={goback_icon} alt="back img" />
                    </div>
                    <p>BACK TO profile</p>
                </div>
                <div className="flex justify-center  text-2xl">
                    <h1 className={style1.modalTitle}>Select Section</h1>
                </div>
                <div className="flex gap-8  items-center justify-center">
                    <div className={style1.modalcard} onClick={() => handleClickCard(1)}>
                        <div className="flex justify-center mb-8">
                            <Image src={likeshapes} alt="likeshapes" />
                        </div>
                        <div>
                            <h3 className={style1.cardTitle}>About Us</h3>
                            <p className="w-197 p-4 text-center text-sm font-normal">Tell clients about your company and your values</p>
                        </div>
                    </div>
                    <div className={style1.modalcard} onClick={() => handleClickCard(2)}>
                        <div className="flex justify-center mb-8">
                            <Image src={book} alt="book" />
                        </div>
                        <div>
                            <h3 className={style1.cardTitle}>Portfolio</h3>
                            <p className="w-197 p-4 text-center text-sm font-normal">Flaunt your past work that shows your expertise</p>
                        </div>
                    </div>
                    <div className={style1.modalcard} onClick={() => handleClickCard(3)}>
                        <div className="flex justify-center mb-8">
                            <Image src={people} alt="people" />
                        </div>
                        <div>
                            <h3 className={style1.cardTitle}>Team</h3>
                            <p className="w-197 p-4 text-center text-sm font-normal">
                                Who are the super talents that make up your team?
                            </p>
                        </div>
                    </div>
                </div>
                {selectCard === 1 ? <AboutUsTemplates /> : selectCard === 2 ? <PortfolioTemplates /> : selectCard === 3 ? <TeamTemplates /> : ''}
            </Box>

        </Modal>
    );
}

export default AddSectionModal;