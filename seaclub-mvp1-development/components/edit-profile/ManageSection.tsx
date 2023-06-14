import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import SaveOrCancelButtonsContainer from '@/components/setting_profile/ConfirmationButtonsContainer';
import Image from 'next/image';
import editManageIcon from '@/public/assets/edit-profile/icons/editManageIcon.svg';
import exportIcon from '@/public/assets/edit-profile/icons/exportIcon.svg';
import trashIcon from '@/public/assets/edit-profile/icons/trashIcon.svg';
import { useState } from 'react';
import AddSectionModal from '../profile/add_section/AddSectionModal';
const ManageSection = () => {

    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [openAddSectionModal, setOpenAddSectionModal] = useState<boolean>(false);


    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    const cancelAction = () => {
        setOpenCancelModal(false)
    }
    const addSectionOpen = () => {
        setOpenAddSectionModal(true)
    }

    return (<div className="px-16 py-12">
        <h1 className={style.title}>Manage section</h1>
        <div className='box-border'>
            <div className='mt-5 p-5 border-b border-[#E6E6E6] grid grid-cols-5 '>
                <div className={style.headItem}>
                    <p>
                        Section
                    </p>
                </div>
                <div className={style.headItem}>
                    <p>
                        Last Modified
                    </p>
                </div>
                <div className={style.headItem}>
                    <p className='ms-5'>
                        Status
                    </p>
                </div>
                <div className=""></div>
            </div>
            {[1, 2, 3].map(num => <div key={num} className={`${style.bodyContainer} grid grid-cols-5`}>
                <div className={style.bodyItem}>
                    <p>About Us</p>
                </div>
                <div className={style.bodyItem}>
                    <p>18 Apr 2023</p>
                </div>
                <div className={`${style.bodyItem} ms-5`}>
                    <p>Published</p>
                </div>
                <div className='col-span-1 ms-8'>
                    <div className={`${style.manageActionContainer} `}>
                        <div className={style.actionOuter}>
                            <Image src={editManageIcon} alt='editManageIcon'></Image>
                            <p>Edit</p>
                        </div>
                        <div className={style.actionOuter}>
                            <Image src={exportIcon} alt='editManageIcon'></Image>
                            <p>Unpublished</p>
                        </div>
                        <div className={style.actionOuter}>
                            <Image src={trashIcon} alt='editManageIcon'></Image>
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
        <SaveOrCancelButtonsContainer openCancelModal={openCancelModal} setCancelModal={setOpenCancelModal} bgBlue handleNotCancelAction={handleNotCancelAction} cancelAction={cancelAction} action={addSectionOpen} title='Add Section' type='submit' />
        <AddSectionModal open={openAddSectionModal} setOpen={setOpenAddSectionModal} />
    </div>);
}

export default ManageSection;