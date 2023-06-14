import InputField from '@/components/basic-info/input/InputField';
import SaveOrCancelButtonsContainer from '@/components/setting_profile/ConfirmationButtonsContainer';
import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import { FormEvent, useState } from 'react';
import TagInput from '../TagInput';
const Language = () => {
    const languageData = ['English (US)', 'France', 'German', 'Italian', 'Spanish']
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [selectedLanguageError, setSelectedLanguageError] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string[]>(['English (US)']);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedLanguage.length > 0) {
            console.log(selectedLanguage);
            setSelectedLanguageError([''])
        } else {
            setSelectedLanguageError(['Please Select at least One Language'])
        }
    }
    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    const cancelAction = () => {
        setSelectedLanguage(['English (US)'])
        setOpenCancelModal(false)
        setSelectedLanguageError([''])
    }
    return (<div className="px-16 py-12">
        <h1 className={style.title}>Language</h1>
        <div>
            <p className={style.subtitle}>Tell us the language(s) you are able to speak with confidence</p>
            <form onSubmit={handleSubmit}>
                <TagInput allData={languageData} selectedData={selectedLanguage} setSelectedData={setSelectedLanguage} placeholder='Add language' />
                {selectedLanguageError.length ? (
                    <span className="text-magenta font-helvetica-medium text-[.75em]">
                        {selectedLanguageError}{" "}
                    </span>
                ) : ""}
                <SaveOrCancelButtonsContainer openCancelModal={openCancelModal} setCancelModal={setOpenCancelModal} handleNotCancelAction={handleNotCancelAction} cancelAction={cancelAction} title='Save Changes' type='submit' />
            </form>

        </div>
    </div>);
}

export default Language;