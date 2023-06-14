import Image from "next/image";
import * as React from 'react';
import logo from '../../../public/assets/logos/logoWithName.svg'
import ProfileIcon from '../../../public/assets/profile/icons/profileIcon.svg'
import settingIcon from '../../../public/assets/profile/icons/settingIcon.svg'
import chartEditIcon from '../../../public/assets/profile/icons/chartEditIcon.svg'
import logoutIcon from '../../../public/assets/profile/icons/logoutIcon.svg'
import cameraIcon from '../../../public/assets/profile/icons/cameraIcon.svg'
import EditIcon from '../../../public/assets/profile/icons/editIcon.svg'
import plusIcon from '../../../public/assets/profile/icons/plusIcon.svg'
import floatingPlusBtn from '../../../public/assets/profile/icons/floatingPlusBtn.svg'
import projectIcon1 from '../../../public/assets/profile/icons/projectIcon.svg'
import projectIcon2 from '../../../public/assets/profile/icons/projectIcon2.svg'
import aboutUsIcon1 from '../../../public/assets/profile/icons/aboutUsIcon1.svg'
import aboutUsIcon2 from '../../../public/assets/profile/icons/aboutUsIcon2.svg'
import portfolioIcon1 from '../../../public/assets/profile/icons/portfolioIcon1.svg'
import portfolioIcon2 from '../../../public/assets/profile/icons/porfolioIcon2.svg'
import teamIcon1 from '../../../public/assets/profile/icons/teamIcon1.svg'
import teamIcon2 from '../../../public/assets/profile/icons/teamIcon2.svg'
import draftIcon from '../../../public/assets/profile/icons/draftIcon.svg'
import style from '../../styles/profile/profile.module.css';

import style1 from '../../styles/profile/addSection.module.css';
//modal icons
import book from '../../../public/assets/add_section/icons/book.svg';
import likeshapes from '../../../public/assets/add_section/icons/likeshapes.svg';
import people from '../../../public/assets/add_section/icons/people.svg';
////
import { useState } from "react";
import ProjectTab from "../../../components/profile/ProjectTab";
import AboutUsTab from "../../../components/profile/AboutUsTab";
import PortfolioTab from "../../../components/profile/PortfolioTab";
import TeamTab from "../../../components/profile/TeamTab";
import PieChart from "../../../components/profile/PieChart";
import OverlayActionComponent from "../../../components/OverlayActionComponent";
import { SidebarLinksData } from "@/components/setting_profile/setting/SettingProfileSidebarLinks"
import Layout from "@/components/SidebarLayout";
// modal imports
import goback_icon from '../../../public/assets/components/icons/goback_icon.svg'
import TeamTemplates from "../../../components/profile/add_section/team/Team";
import AboutUsTemplates from "../../../components/profile/add_section/aboutus/Aboutus";
import PortfolioTemplates from "../../../components/profile/add_section/portfolio/Portfolio";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { profileSidebarLinksData } from "@/components/edit-profile/ProfileSidebarItems";
import AddSectionModal from "@/components/profile/add_section/AddSectionModal";
//////
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

const Profile = () => {

    //state 
    const [open, setOpen] = useState<boolean>(false);
    const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
    const [openSettingModal, setOpenSettingModal] = useState<boolean>(false);
    const [selectTab, setSelectTab] = useState<number>(1)
    const [selectCard, setSelectCard] = useState<number>(0)
    const [showItems, setShowItems] = useState<boolean>(false)

    // select the tab func
    const handleClickTab = (number: number): void => {
        setSelectTab(number)
    }
    const handleClickCard = (number: number): void => {
        setSelectCard(number)
    }

    // open settings or edit profile modal
    const handleOpen = (btn: string) => {
        window.location.hash === "";
        if (btn === 'setting') {
            setOpenSettingModal(true);
            setOpenProfileModal(false);
        } else {
            setOpenSettingModal(false);
            setOpenProfileModal(true);
        }

    };

    // open settings or edit profile modal
    const handleClose = () => { setOpenProfileModal(false); setOpenSettingModal(false) }

    // open add section modal
    const handleOpen1 = () => setOpen(true);

    // close add section modal
    const handleClose1 = () => setOpen(false);


    return (
        <main className={style.profilePageContainer}>
            <Image src={logo} alt="logo" />
            <section className="flex mt-75px font-helveticaDisplay">

                {/* sidebar of profile page */}
                <div className="w-40 ">
                    <div className="h-screen flex flex-col justify-around">
                        <div>
                            <div className="mb-2.5 cursor-pointer relative">
                                <Image src={ProfileIcon} className={style.sidebarIcon} alt="ProfileIcon" />
                                <div className={style.tooltip}>
                                    <p>View Profile</p>
                                </div>
                            </div>
                            <div className="cursor-pointer relative" onClick={() => handleOpen('setting')}>
                                <Image src={settingIcon} alt="settingIcon" className={style.sidebarIcon} />
                                <div className={style.tooltip}>
                                    <p>Settings</p>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer relative">
                            <Image src={logoutIcon} alt="logoutIcon" className={style.sidebarIcon} />
                            <div className={style.tooltip}>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">

                    {/* top part of profile page */}
                    <div className="grid grid-cols-12 gap-x-4">

                        {/* profile info part  */}
                        <div className="col-span-8">
                            <div className="bg-secondary h-180px relative">
                                <div className="h-168px w-168px border-3px border-white rounded bg-secondary p-3.5 absolute top-1/2 ms-14 cursor-pointer" >
                                    <div className="h-full w-full bg-white rounded-full flex justify-center items-center">
                                        <Image src={cameraIcon} alt="cameraIcon" />
                                    </div>
                                </div>
                            </div>
                            <div className="pl-14 pr-9 bg-white pt-20 pb-8 rounded-b-20px border-x border-b border-secondary">
                                <h2 className="m-2.5 font-helveticaDisplay font-medium text-xl leading-7">Company Name</h2>
                                <div className="flex justify-between">
                                    <div className="font-helveticaDisplay font-normal text-base leading-6">
                                        <div className="flex ">
                                            <h4 className="border-e border-secondary  p-2.5">Industry/Service Category</h4>
                                            <h4 className="border-e border-secondary pl-5 pr-12  py-2.5">Company size</h4>
                                            <h4 className=" pl-5 py-2.5">Location</h4>
                                        </div>
                                        <h2 className="p-2.5">Company Biography </h2>
                                    </div>
                                    <div className={style.editContainer} onClick={() => handleOpen('profile')}>
                                        <Image src={EditIcon} alt="edit" className="pb-2 cursor-pointer" />
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* additional info part  */}
                        <div className={`${style.chartContainer} col-span-4`} >
                            <div className="flex justify-between border-b border-secondary">
                                <p className={style.chartTitle}>Service Lines</p>
                                <Image src={chartEditIcon} alt="chartEditIcon" />
                            </div>
                            <div className="relative">

                                <div>
                                    <div className="mt-5">
                                        <PieChart showLegend={true} labels={['Blockchain Consultancy', 'Cross-Chain Integration', 'DeFi Solutions', 'Identity Management', 'App Development']} series={[70, 25, 30, 40, 50]} width={380}></PieChart>


                                    </div>
                                    <div className="mt-5">
                                        <div className={style.hoverInputContainer}>
                                            <input type="text" placeholder="English, Italian, Portuguese, German..." className={`${style.chartInput} ${style.hoverInput}`} />
                                            <div className={style.ChartInputLabel}>
                                                <p>Languages</p>
                                            </div>

                                        </div>
                                        <ul className={style.languagesContainer}>
                                            <li>English</li>
                                            <li>Italian</li>
                                            <li>Portuguese</li>
                                            <li>German</li>
                                            <li>Spanish</li>
                                        </ul>
                                        <div className="relative mt-1.5">
                                            <input type="text" placeholder='EST / UCT / PST' className={style.chartInput} />
                                            <div className={style.ChartInputLabel}>
                                                <p>Time Zone</p>
                                            </div>
                                        </div>
                                        <div className="relative mt-1.5">
                                            <input type="text" placeholder='Europe, Canada, United States...' className={style.chartInput} />
                                            <div className={style.ChartInputLabel}>
                                                <p>Target Location</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <OverlayActionComponent chart /> */}
                            </div>
                        </div>
                    </div>

                    {/* floating button of profile page */}
                    <div className={`${style.floatingBtn} fixed z-10 right-4 bottom-16 cursor-pointer`} onClick={() => setShowItems(!showItems)}>
                        <Image src={floatingPlusBtn} alt="floatingPlusBtn" className="w-3/5"></Image>
                    </div>
                    {showItems && <div>
                        <div className={`${style.addBtnElement} ${style.top}`}>
                            <p>Add Project</p>
                        </div>
                        <div className={`${style.addBtnElement} ${style.middle}`}>
                            <p>Manage Sections</p>
                        </div>
                        <div className={`${style.addBtnElement} ${style.bottom}`}>
                            <p>Add Section</p>
                        </div>
                    </div>}

                    {/* profile details info part  */}
                    <div className="mt-8 " >

                        {/* profile tab header */}
                        <div className="font-helveticaDisplay font-medium text-xl flex gap-x-18px">
                            <div className={`flex justify-center items-center w-48 py-4 cursor-pointer ${selectTab === 1 ? style.activeTab : style.tab} rounded-t-10px`} onClick={() => handleClickTab(1)}>
                                <Image src={selectTab === 1 ? projectIcon1 : projectIcon2} alt="projectIcon" />
                                <h4 className="ml-4">Projects</h4>
                            </div>
                            <div className={`${selectTab === 2 ? style.activeTab : style.tab} cursor-pointer flex justify-center items-center w-48 py-4 bg-white rounded-t-10px`} onClick={() => handleClickTab(2)}>
                                <Image src={selectTab === 2 ? aboutUsIcon1 : aboutUsIcon2} alt="aboutUsIcon" />
                                <h4 className="ml-4">About Us</h4>
                            </div>
                            <div className={`${selectTab === 3 ? style.activeTab : style.tab} cursor-pointer flex justify-center items-center w-48 py-4 bg-white rounded-t-10px`} onClick={() => handleClickTab(3)}>
                                <Image src={selectTab === 3 ? portfolioIcon1 : portfolioIcon2} alt="projectIcon" />
                                <h4 className="ml-4">Portfolio</h4>
                            </div>
                            <div className={`${selectTab === 4 ? style.activeTab : style.tab} flex justify-center items-center w-48 py-4 bg-white rounded-t-10px cursor-pointer`} onClick={() => handleClickTab(4)}>
                                <Image src={selectTab === 4 ? teamIcon1 : teamIcon2} alt="projectIcon" />
                                <h4 className="ml-4">Team</h4>
                            </div>
                            <div onClick={handleOpen1} className="flex justify-center items-center w-48 py-4 cursor-pointer">
                                <Image src={plusIcon} alt="pluseIcon" />
                                <h4 className="ml-4">Add Section</h4>
                            </div>
                        </div>

                        {/* tab section details  */}
                        <div className={`${style.ProjectOuter} px-5 pt-4 pb-8 bg-white `}>
                            <div className="flex w-full justify-end">
                                <button className={style.button}><Image src={draftIcon} alt="draft icon" /> <span className="ml-4 text-white">Draft</span></button>
                            </div>
                            {selectTab === 1 ? <ProjectTab /> : selectTab === 2 ? <AboutUsTab /> : selectTab === 3 ? <PortfolioTab /> : selectTab === 4 ? <TeamTab /> : ''}
                        </div>
                    </div>
                </div>
            </section>

            {/* add section modal  */}
            <AddSectionModal open={open} setOpen={setOpen} />


            {/* settings modal  */}
            <Layout
                headerTitles="Settings"
                openModal={openSettingModal}
                handleClose={handleClose}
                sidebarLinksData={SidebarLinksData}
            />

            {/* Edit profile modal  */}
            <Layout
                headerTitles="Profile Settings"
                openModal={openProfileModal}
                handleClose={handleClose}
                sidebarLinksData={profileSidebarLinksData}
            />
        </main>);
}

export default Profile;