
import { FormEvent, useState } from 'react';
import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import SaveOrCancelButtonsContainer from '@/components/setting_profile/ConfirmationButtonsContainer';
import InputField from '@/components/basic-info/input/InputField';
import TagInput from '../TagInput';
const TimeZone = () => {

    const TimeZoneData = ['English (US)', 'France', 'German', 'Italian', 'Spanish']
    const [selectedTimeZone, setSelectedTimeZone] = useState<string[]>(['English (US)']);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [timeZoneError, setTimeZoneError] = useState<string[]>([]);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedTimeZone.length > 0) {
            console.log(selectedTimeZone);
            setTimeZoneError([''])
        } else {
            setTimeZoneError(['Please Select at least One Time Zone'])
        }
    }
    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    const cancelAction = () => {
        setSelectedTimeZone(['English (US)'])
        setOpenCancelModal(false)
        setTimeZoneError([''])
    }
    return (
        <div className="px-16 py-12">
            <h1 className={style.title}>Time Zone</h1>
            <form onSubmit={handleSubmit}>
                <p className={style.subtitle}>Tell us the time zones you are able to work with</p>
                <TagInput allData={TimeZoneData} selectedData={selectedTimeZone} setSelectedData={setSelectedTimeZone} placeholder='Add Time Zone' />
                {timeZoneError.length ? (
                    <span className="text-magenta font-helvetica-medium text-[.75em]">
                        {timeZoneError}{" "}
                    </span>
                ) : ""}
                <SaveOrCancelButtonsContainer handleNotCancelAction={handleNotCancelAction} openCancelModal={openCancelModal} setCancelModal={setOpenCancelModal} cancelAction={cancelAction} title='Save Changes' type='submit' />
            </form>
        </div>
    );
}

export default TimeZone;