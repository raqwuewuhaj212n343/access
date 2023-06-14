
import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import SaveOrCancelButtonsContainer from '@/components/setting_profile/ConfirmationButtonsContainer';
import InputField from '@/components/basic-info/input/InputField';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import crossIcon from '@/public/assets/edit-profile/icons/crossIcon.svg';
import Image from 'next/image';
import TagInput from '../TagInput';
import CustomSelectInput from '@/components/CustomSelectInput';
const continentData = [
    'Asia', 'Africa', 'North America', 'South America', 'Europe', 'Australia'
]
const optionInputData = [
    {
        optionName: 'Specific Continent',
        id: 1
    },
    {
        optionName: 'World Wide',
        id: 2
    }
]
const TargetLocation = () => {
    const [location, setLocation] = useState<string>("");
    const [selectedContinent, setSelectedContinent] = useState<string[]>([]);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [selectedContinentError, setSelectedContinentError] = useState<string>('');
    const [specificContinentError, setSpecificContinentError] = useState<string>('');


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!location) {
            setSelectedContinentError('Please Select location')
        } else if (location === 'Specific Continent' && !selectedContinent.length) {
            setSpecificContinentError('Please Select at least one Continent')
        } else if (location === 'World Wide') {
            setSelectedContinentError('')
            setSpecificContinentError('')
        } else if (location === 'Specific Continent') {
            setSelectedContinentError('')
            setSpecificContinentError('')
        } else {
            setSelectedContinentError('')
            setSpecificContinentError('')
            console.log(location);
        }

    }


    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    const cancelAction = () => {
        setLocation('')
        setSelectedContinent([])
        setOpenCancelModal(false)
        setSpecificContinentError('')
        setSelectedContinentError('')
    }

    console.log(selectedContinentError);
    return (<div className="px-16 py-12">
        <h1 className={style.title}>Target Location</h1>
        <div>
            <p className={style.subtitle}>Tell us your business coverage continent or worldwide</p>
            <form onSubmit={handleSubmit}>
                <div className='mb-4 w-64'>

                    <CustomSelectInput setErrorValue1={setSelectedContinentError} setErrorValue2={setSpecificContinentError} defaultText='Select Continent' inputOptions={optionInputData} inputSelectData={location} setInputSelectData={setLocation} />

                </div>
                {selectedContinentError.length ? (
                    <p className="text-magenta font-helveticaDisplay text-[.75em] ms-4 -mt-2">
                        {selectedContinentError}
                    </p>
                ) : ""}
                {location === 'Specific Continent' ? <TagInput locationSelector allData={continentData} selectedData={selectedContinent} setSelectedData={setSelectedContinent} placeholder='Please Enter your Targeted Continents' setParentInputValue={setLocation} /> : ''}
                {specificContinentError.length ? (
                    <span className="text-magenta font-helvetica-medium text-[.75em] ms-4">
                        {specificContinentError}{" "}
                    </span>
                ) : ""}
                <SaveOrCancelButtonsContainer handleNotCancelAction={handleNotCancelAction} openCancelModal={openCancelModal} setCancelModal={setOpenCancelModal} cancelAction={cancelAction} title='Save Changes' type='submit' />
            </form>
        </div>
    </div>);
}

export default TargetLocation;