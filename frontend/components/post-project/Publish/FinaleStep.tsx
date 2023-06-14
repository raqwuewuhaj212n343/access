import { ReactNode, useState } from 'react';
import Coffee from '../../../src/assets/postingproject/icons/coffee.svg';
import Eye from '../../../src/assets/postingproject/icons/Eye.svg';
import Image from 'next/image';
import PublishPoppup from './PublishPoppup';
import PreviewPoppup from './PreviewPoppup';
type Props = {
    children: ReactNode;
    title?: string;
};
function FinalStep() {

    let [modalIsOpen, setModalIsOpen] = useState(false)
    let [modalIsOpen1, setModalIsOpen1] = useState(false)

    // open/close poppup for Share
    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }
    // open/close poppup for preview
    const openModal1 = () => {
        setModalIsOpen1(true)
    }
    const closeModal1 = () => {
        setModalIsOpen1(false)
    }
    return (
        <>
            <PreviewPoppup openModal={openModal1} closeModal={closeModal1} modalIsOpen={modalIsOpen1} />
            <PublishPoppup openModal={openModal} closeModal={closeModal} modalIsOpen={modalIsOpen} />
            <div className='rounded-1.25 h-100-height bg-white'>
                <div className='w-full flex justify-end p-tr-57-142 '>
                    <div className='flex w-fit cursor-pointer' onClick={openModal1}>
                        <Image src={Eye} alt="Eye" className='m-l-1.138' />
                        <p className='text-cimen'>Preview</p>
                    </div>
                </div>
                <div className='grid justify-items-center text-black p-t-117 p-l-142 p-r-142'>
                    <Image src={Coffee} alt="Coffee" />
                    <div className='py-3'>
                        <h1 className='text-2xl font-medium p-tb-0.844'>We're almost done!</h1>
                    </div>
                    <div className='py-1'>
                        <p className='w-31 text-center text-xl'>
                            Once we make your project public,
                            we can start getting buyers on board.
                        </p>
                    </div>
                    <div className='w-34 flex space-x-10 m-t-5.781'>
                        <button className='focus:text-white focus:bg-black P6 p-tb-0.656 w-16 font-normal bg-whit text-xl  shadow-boxShadowBlack hover:bg-silver text-black rounded-6.25'>Save as Draft</button>
                        <button className='w-16 p-tb-0.656 font-normal bg-black text-xl shadow-boxShadowBlack hover:bg-blackHover text-white    rounded-6.25' onClick={openModal}>Publish</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FinalStep;