import { ReactNode, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Seaclub from '../../../src/assets/postingproject/logos/Seaclub.svg';
import Cover from '../../../src/assets/postingproject/images/Cover.png';
import Rectangle1 from '../../../src/assets/postingproject/images/Rectangle1.png';
import Rectangle2 from '../../../src/assets/postingproject/images/Rectangle2.png';
import Rectangle3 from '../../../src/assets/postingproject/images/Rectangle3.png';
import Banner from '../../../src/assets/postingproject/images/Banner.png';
import CaretDown from '../../../src/assets/postingproject/icons/CaretDown.svg';
import Pitch from '../../../src/assets/postingproject/images/Pitch.png';
import goback_icon from "@/public/assets/images/goback_icon.svg";
import UserOctagon from '../../../src/assets/postingproject/icons/UserOctagon.svg';
import ButtonGoBack from '../../../src/assets/postingproject/icons/ButtonGoBack.svg';

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
function PreviewPoppup(props: PublishPoppupProps) {

    return (
        <Dialog
            open={props.modalIsOpen}
            onClose={() => props.closeModal()}
            style={{ padding: '0 20px' }}
            className="overflow-scroll w-100-width  h-100vh-height left-0 bg-previewpoppupbg top-0 fixed text-black p-t-117 p-l-142 p-r-142"
        >
            <div>
                <Image src={Seaclub} alt="Seaclub" className='m-tbl-1.438-2.938-1.313' />
            </div>

            <div className={styles.goBackBtn}
                onClick={() => { props.closeModal() }}>
                <button >
                    <Image src={ButtonGoBack} alt="Go back Icon" />
                </button>
                <span >GO BACK</span>

            </div>
            <div style={{ paddingBottom: '20px' }}
                className='flex  gap-8 justify-center w-100-width p-trl-3.313-9-9 rounded-1.25-1.25  bg-white h-fit-content'>
                <div className="flex gap-8 flex-col">
                    <h1 className=' text-3xl font-medium p-tb-0.844'>Project's Tittle</h1>
                    <div className='flex justify-center'>
                        <Image src={Cover} alt="Cover" />
                    </div>

                    <div className='flex gap-4 h-fit justify-center'>
                        <Image
                            src={Rectangle1}
                            alt="Rectangle1" />
                        <Image
                            src={Rectangle2}
                            alt="Rectangle2" />
                        <Image
                            src={Rectangle3}
                            alt="Rectangle3" />
                    </div>
                    <div>
                        <h1 className='text-3xl font_medium'
                            style={{
                                'padding': '16px',
                                'paddingTop': '48px'
                            }}
                        >Project’s Tittle
                            <span
                                style={{ marginLeft: "10px" }}
                                className='text-2xl font_medium border-l border-solid border-gray-500 text-silver'> Web3 development agency</span></h1>
                        <p style={{ maxWidth: '839px', padding: '20px 44px 20px 16px' }}>
                            Korem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Nunc vulputate libero et velit interdum,
                            ac aliquet odio mattis. Class aptent taciti sociosqu
                            ad litora torquent per conubia nostra, per inceptos himenaeos.
                            Curabitur tempus urna at turpis condimentum lobortis.
                        </p>
                        <div style={{ padding: '19px 14px' }}>
                            <button style={{ width: '171px', height: '44px', marginRight: '15px' }} className='m-b-1.5 p-2  text-center text-base  text-keinBlue h-3.125 bg-previewpoppupbg   rounded-6.25' >
                                Web3 Apps
                            </button>
                            <button style={{ width: '235px', height: '44px' }} className='m-b-1.5 p-2  text-center text-base  text-keinBlue h-3.125 bg-previewpoppupbg   rounded-6.25' >
                                Software Development
                            </button>
                        </div>
                    </div>
                    <hr />
                    <h1
                        style={{ marginTop: '20px' }}
                        className=' text-3xl font-medium p-tb-0.844'>About Pitch</h1>

                    <div className=' border border-solid border-lightGray rounded-1.25'>

                        <Image
                            className='rounded-1.25-1.25'
                            src={Banner}
                            alt="Banner" />
                        <div
                            style={{
                                display: 'flex',
                                gap: '49px',
                                maxWidth: '700px',
                                alignItems: 'flex-end'
                            }}
                            className='m-tl-4.375-3'>

                            <Image src={Pitch} alt="Pitch" />
                            <h3 className='font-medium text-2xl'>Company Name</h3>
                        </div>
                        <div>
                            <div
                                className='gap-4 flex justify-center'>
                                <span style={{
                                    height: "50px",
                                    paddingLeft: "35px"
                                }}
                                    className='flex items-center'>Industry/Service Category</span>
                                <span style={{
                                    height: "50px",
                                    borderLeft: '1px solid #909090',
                                    paddingLeft: "15px"
                                }}
                                    className='flex items-center'>Company size</span>
                                <span style={{
                                    borderLeft: '1px solid #909090',
                                    paddingLeft: "15px"
                                }}
                                    className='flex items-center'>Location</span>
                            </div>
                            <p className={styles.campanyBio}>Company Biography</p>
                        </div>
                        <div>
                            <p className='p-lr-3.438' style={{
                                maxWidth: '861px',
                                padding: '71px',
                                fontSize: '14px'

                            }}>
                                Korem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                Nunc vulputate libero et velit interdum,
                                ac aliquet odio mattis. Class aptent taciti
                                sociosqu ad litora torquent per conubia nostra,
                                per inceptos himenaeos. Curabitur tempus urna at
                                turpis condimentum lobortis.
                            </p>
                        </div>
                        <div
                            className='flex flex-row justify-center items-center bg-lightGray rounded-0-1.25-1.25'
                            style={{ height: "70px" }}>
                            <a className='flex gap-4 cursor-pointer hover:text-keinBlue' >

                                <Image src={UserOctagon} alt="UserOctagon" />
                                View company profile
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex gap-8 flex-col'>
                    <div className='text-right p-tb-8px'>
                        <button className="w-135px h-44px p-2  text-center text-base  text-white hover:text-keinBlue h-3.125 hover:bg-previewpoppupbg bg-keinBlue   rounded-6.25" >
                            Edit Project
                        </button>
                    </div>
                    <div className='border border-solid border-lightGray rounded-1.25 p-lr-3.438'
                        style={{ width: '550px' }} >
                        <h1 className='m-b-2.438 font-medium  text-2xl text-center p-tb-0.844'>Pricing & Range</h1>
                        <div>
                            <div className='text-center'>
                                <p className='text-base text-center font-medium p-b-0.813'>Minimum project size:</p>
                                <input
                                    className='m-b-1.5 p-2  text-center text-base w-16.563 text-keinBlue h-3.125 bg-previewpoppupbg   rounded-6.25'
                                    type="text"
                                    value="$50 USD" />
                            </div>
                            <div className='text-center'>
                                <p className='text-base font-medium text-center p-b-0.813'>Delivery days:</p>
                                <input
                                    className='m-b-1.5 p-2 text-center text-base w-16.563 text-keinBlue h-3.125 bg-previewpoppupbg   rounded-6.25'
                                    type="text"
                                    value="15 days" />
                            </div>

                            <div>
                                <p className='text-medium font-medium  text-center p-b-0.813'>Average hour price:</p>
                                <div className={styles.priceRangeContainer}>
                                    <div className='flex'>
                                        <span
                                            className={styles.inputpreviewicon}
                                        >From</span>
                                        <input
                                            className='border border-solid border-previewpoppupbg  m-b-1.5 p-2 text-center text-base  text-keinBlue h-3.125    rounded-6.25'
                                            type="text"
                                            placeholder="$10 USD" />
                                    </div>
                                    <div className='flex'>
                                        <span className={styles.inputpreviewicon}>To</span>
                                        <input
                                            className='border border-solid border-previewpoppupbg  m-b-1.5 p-2 text-center text-base  text-keinBlue h-3.125   rounded-6.25'
                                            type="text"
                                            placeholder="$500 USD" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{ width: '550px', height: "356px" }}
                        className='border border-solid border-lightGray rounded-1.25 p-lr-5.438'>
                        <h1 style={{ marginTop: '50px' }} className='font-medium m-b-2.438 text-2xl text-center p-tb-0.844'>Requirements</h1>
                        <div>
                            <ul>
                                <li className='font-medium m-b-25px'>1. Requirement</li>
                                <li className='font-medium m-b-25px'>2. Requirement</li>
                                <li className='font-medium m-b-25px'>3. Requirement</li>
                            </ul>
                        </div>
                    </div>
                    <div
                        style={{ width: '550px', height: "415px" }}
                        className='border border-solid border-lightGray bg-lightGray rounded-1.25 p-lr-2.438'>
                        <h1 style={{ marginTop: '50px' }} className='font-medium m-b-2.438 text-2xl text-center p-tb-0.844'>FAQ</h1>
                        <div>

                            <div className='flex flex-row items-center'>
                                <select
                                    style={{ width: '100%' }}
                                    className='border border-solid border-previewpoppupbg  m-b-1.5 p-2 text-center text-base  text-black  h-3.0  rounded-6.25'
                                    placeholder="$500 USD" >
                                    <option>Quetion 1</option>
                                </select>
                                <div className={styles.cartDownImg}>
                                    <Image src={CaretDown} alt="CaretDown" />
                                </div>

                            </div>


                            <div className='flex flex-row items-center'>
                                <select
                                    style={{ width: '100%' }}
                                    className='border border-solid border-previewpoppupbg  m-b-1.5 p-2 text-center text-base  text-black  h-3.0  rounded-6.25'
                                    placeholder="$500 USD" >
                                    <option>Quetion 1</option>
                                </select>
                                <div style={{
                                    marginLeft: '-39px',
                                    background: 'white',
                                    width: '34px',
                                    marginTop: '-21px'
                                }}>
                                    <Image src={CaretDown} alt="CaretDown" />
                                </div>

                            </div>

                            <div className='flex flex-row items-center '>
                                <select
                                    style={{ width: '100%' }}
                                    className='border border-solid border-previewpoppupbg  m-b-1.5 p-2 text-center text-base  text-black  h-3.0  rounded-6.25'
                                    placeholder="$500 USD" >
                                    <option>Quetion 1</option>
                                </select>
                                <div style={{
                                    marginLeft: '-39px',
                                    background: 'white',
                                    width: '34px',
                                    marginTop: '-21px'
                                }}>
                                    <Image src={CaretDown} alt="CaretDown" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    );
}

export default PreviewPoppup;