
import img1 from '../../../../public/assets/add_section/images/img1.svg';
import banner1 from '../../../../public/assets/add_section/images/banner1.svg';
import img21 from '../../../../public/assets/add_section/images/img21.svg';
import img22 from '../../../../public/assets/add_section/images/img22.svg';
import img23 from '../../../../public/assets/add_section/images/img23.svg';
import img3 from '../../../../public/assets/add_section/images/img3.svg';
import Image from "next/image";
import style from '../../../../src/styles/profile/addSection.module.css';
import { useRouter } from 'next/router';
const Aboutus = () => {
    // router 
    const router = useRouter()

    return (
        <>
            <h3 className={style.portfolioMainTitle}>About Us templates</h3>
            <p className={style.portfolioMainP}>
                Please choose from our selection of pre-designed templates
                below to help you create the best section for your company
            </p>

            <div className={style.mainContainer}>
                {/* first template  */}
                <div className={style.firsttmpltCard}>
                    <div className={style.portfoliofrstCardOverlay}>
                        <button onClick={() => router.push(`/edit-template/about-us/1`)}>Use template</button>
                    </div>
                    <div className={style.firsttmpltContainer}>
                        <div className={style.firsttmpltTextContainer}>
                            <h3>Write your tittle here. Click to edit.</h3>
                            <p>
                                This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.
                            </p>
                        </div>
                        <div>
                            <Image src={img1} alt='img1' />
                        </div>
                    </div>
                </div>

                {/* second template  */}
                <div className={style.firsttmpltCard}>
                    <div className={style.portfoliofrstCardOverlay}>
                        <button onClick={() => router.push(`/edit-template/about-us/2`)}>Use template</button>
                    </div>
                    <div className={style.secondtmpltContainer}>
                        <div>
                            <Image src={banner1} alt='banner1' />
                        </div>
                        <div className={style.secondtmpltTitleContainer}>
                            <h3>Write your tittle here. Click to edit.</h3>
                        </div>
                        <div className={style.secondtmpltPContainer}>
                            <p>
                                This is a paragraph, you can use it to add any information to share with possible clients. Click here to edit the text.
                            </p>
                        </div>
                        <div className={style.secondtmpltsection}>
                            <div>
                                <Image src={img21} alt="img21" />
                                <div>
                                    <p>
                                        This is a paragraph,
                                        you can use it to add any information
                                        to share with possible clients.
                                        Click here to edit the text.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Image src={img22} alt="img22" />
                                <div>
                                    <p>
                                        This is a paragraph,
                                        you can use it to add any information
                                        to share with possible clients.
                                        Click here to edit the text.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Image src={img23} alt="img23" />
                                <div>
                                    <p>
                                        This is a paragraph,
                                        you can use it to add any information
                                        to share with possible clients.
                                        Click here to edit the text.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* third template  */}
                <div className={style.firsttmpltCard}>
                    <div className={style.portfoliofrstCardOverlay}>
                        <button onClick={() => router.push(`/edit-template/about-us/3`)}>Use template</button>
                    </div>
                    <div className={style.secondtmpltContainer}>
                        <div className={style.thirdtmpltTextContainer}>
                            <h3>Write your tittle here. Click to edit.</h3>
                        </div>
                        <div className={style.thirdtmpltImgContainer}>
                            <Image src={img3} alt='img3' />
                        </div>
                    </div>


                    <div>
                        <hr className={style.firsttmpltCardHr} />
                    </div>
                    <div className={style.secondtmpltContainer}>
                        <div className={style.thirdtmpltTextContainer}>
                            <h3>United, we create magic!</h3>
                        </div>
                        <div className={style.thirdtmpltPContainer}>
                            <p>
                                ed viverra nisi nisl, id scelerisque felis mollis vel. Nam porta velit non nibh tempus commodo. Nulla semper sollicitudin condLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula eros viverra velit aliquam scelerisque. Etiam mollis diam odio, vel cursus ex efficitur eu. Fusce consequat pharetra elit vitae aliquam. Curabitur te

                                Fusce consequat pharetra elit vitae aliquam. Curabitur te
                            </p>
                            <p>
                                Fusce consequat pharetra elit vitae aliquam. Curabitur te Fusce consequat pharetra elit vitae aliquam. Curabitur te
                            </p>
                            <p>
                                ed viverra nisi nisl, id scelerisque felis mollis vel. Nam porta velit non nibh tempus commodo. Nulla semper sollicitudin condLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula eros viverra velit aliquam scelerisque. Etiam mollis diam odio, vel cursus ex efficitur eu. Fusce consequat pharetra elit vitae aliquam. Curabitur te

                                Fusce consequat pharetra elit vitae aliquam. Curabitur te
                            </p>
                            <p>
                                Fusce consequat pharetra elit vitae aliquam. Curabitur te Fusce consequat pharetra elit vitae aliquam. Curabitur te
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Aboutus;