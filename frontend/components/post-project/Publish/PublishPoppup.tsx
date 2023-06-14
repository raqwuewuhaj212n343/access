import { ReactNode, useState } from 'react';
import { Dialog } from '@headlessui/react'
import Twiter from '../../../src/assets/postingproject/icons/twiter.svg';
import Facebook from '../../../src/assets/postingproject/icons/facebook.svg';
import Linkedin from '../../../src/assets/postingproject/icons/linkedin.svg';
import PoppupinputIcon from '../../../src/assets/postingproject/icons/poppupinputIcon.svg';
import X from '../../../src/assets/postingproject/icons/X.svg';
import Image from 'next/image';
import styles from "@/styles/postingproject/postingproject.module.css";
type Props = {
    children: ReactNode;
    title?: string;
};
interface PublishPoppupProps {
    modalIsOpen: boolean;
    openModal: () => void;
    closeModal: () => void;

}
function PublishPoppup(props: PublishPoppupProps) {

    return (
        <Dialog
            style={{ zIndex: '9' }}
            open={props.modalIsOpen}
            onClose={() => props.closeModal()}
            className="flex flex-row flex-nowrap justify-center items-center w-100-width h-100vh-height left-0 bg-popupeffect top-0 fixed grid justify-items-center text-black p-t-117 p-l-142 p-r-142"
        >
            <div className='p-3.313 rounded-1.25 bg-white h-fit-content' style={{ width: '800px' }}>
                <div >
                    <div className='py-3'>
                        <h1 className='font-helvetica-regular font-medium text-center text-2xl font-medium p-tb-0.844'>Your project is officially launched!</h1>
                    </div>
                    <div className='py-1'>
                        <p className='font-helvetica-regular text-center text-x font-medium'>
                            Share your project with your network and let them see what you've created.
                        </p>
                    </div>
                </div>
                <div className='m-t-3.25'>
                    <div className='m-b-1.625'><p className='text-center text-cimen'>Share</p></div>
                    <div className='flex flex-row flex-nowrap justify-center items-center'>
                        <Image src={Twiter} alt='Twiter' className='hover:opacity-75 cursor-pointer' />
                        <Image src={Facebook} alt='Facebook' className='hover:opacity-75 cursor-pointer' />
                        <Image src={Linkedin} alt='Linkedin' className='hover:opacity-75 cursor-pointer' />
                    </div>
                </div>
                <div className='m-t-2.438'>
                    <p className='text-center text-cimen' style={{ marginBottom: '45px' }}>Project Link</p>
                    <div className='flex justify-center items-center' style={{ marginBottom: '45px' }} >

                        <input
                            className={styles.poppupInput}
                            type="text"
                            placeholder='https://myproject.web3/seaclub' />
                        <Image
                            className={styles.poppupInputIcon}
                            src={PoppupinputIcon}
                            alt='PoppupinputIcon' />
                    </div>
                    <div className='flex justify-center items-center'>
                        <Image
                            onClick={() => { props.closeModal() }}
                            src={X}
                            alt='X' style={{ marginBottom: '13px' }} />

                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default PublishPoppup;