import { ChangeEvent, FormEvent, useState } from 'react'
import {
    UserBasicInfo,
    validate_basic_info_inputs,
} from "@/utilities/FormValidation";
import InputField from '../basic-info/input/InputField';
import styles from "@/styles/component/profile/edit-profile/basicInfo.module.css";
import SaveOrCancelButtonsContainer from '../setting_profile/ConfirmationButtonsContainer';
import CustomSelectInput from '../CustomSelectInput';
import TagInput from './TagInput';
const BasicInfo = () => {
    const CompanySize = [
        {
            optionName: "1-10 employees",
            id: 1
        },
        {
            optionName: "11-50 employees",
            id: 2
        },
        {
            optionName: "51-200 employees",
            id: 3
        },
        {
            optionName: "201-500 employees",
            id: 4
        },
        {
            optionName: "501-1000 employees",
            id: 5
        },
        {
            optionName: "1001-5000 employees",
            id: 6
        },
    ];
    const location = [
        {
            optionName: "Country 1",
            id: 1
        },
        {
            optionName: "Country 2",
            id: 2
        },
        {
            optionName: "Country 3",
            id: 3
        },
        {
            optionName: "Country 4",
            id: 4
        },
        {
            optionName: "Country 5",
            id: 5
        },
        {
            optionName: "Country 6",
            id: 6
        },
    ];
    const [companyName, setCompanyName] = useState<string>("");
    const [companyNameError, setCompanyNameError] = useState<string>("");
    const [industryName, setindustryName] = useState<string>("");
    const [industryNameError, setindustryNameError] = useState<string>("");
    const [businessDescription, setbusinessDescription] = useState<string>("");
    const [businessDescriptionError, setbusinessDescriptionError] =
        useState<string>("");
    const [companySizeValue, setCompanySizeValue] = useState<string>("");
    const [companySizeValueError, setCompanySizeValueError] =
        useState<string>("");
    const [locationValue, setLocationValue] = useState<string>("");
    const [country, setCountry] = useState<string[]>([]);
    const [locationValueError, setLocationValueError] = useState<string>("");
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false)
    const languageData = ['English (US)', 'France', 'German', 'Italian', 'Spanish']


    const defaultCustomerData: UserBasicInfo = {
        companyName: "",
        industryName: "",
        businessDescription: "",
        companySize: "",
        // location: "",
    };
    let customerData: UserBasicInfo = defaultCustomerData;

    const handleCompanyName = (event: ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value);
    };
    const handleIndustryName = (event: ChangeEvent<HTMLInputElement>) => {
        setindustryName(event.target.value);
    };
    const handleBusinessDescription = (
        event: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setbusinessDescription(event.target.value);
    };
    // const handleCompanySize = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setCompanySizeValue(event.target.value);
    // };
    // const handleLocation = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setLocationValue(event.target.value);
    // };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        customerData.companyName = companyName;
        customerData.industryName = industryName;
        customerData.businessDescription = businessDescription;
        customerData.companySize = companySizeValue;
        customerData.location = country[0];

        const FormContainsErrors = await validate_basic_info_inputs(
            customerData
        );
        if (FormContainsErrors?.length > 0) {
            const missing_companyName: string = FormContainsErrors.filter(
                (error: string) =>
                    error.toLocaleLowerCase().includes("company name")
            );
            const missing_industryName: string = FormContainsErrors.filter(
                (error: string) =>
                    error.toLocaleLowerCase().includes("industry")
            );
            const missing_businessDescription: string =
                FormContainsErrors.filter((error: string) =>
                    error.toLocaleLowerCase().includes("business")
                );
            const missing_companySize: string = FormContainsErrors.filter(
                (error: string) => error.toLocaleLowerCase().includes("size")
            );
            const missing_location: string = FormContainsErrors.filter(
                (error: string) =>
                    error.toLocaleLowerCase().includes("location")
            );
            const large_desc: string = FormContainsErrors.filter(
                (error: string) =>
                    error.toLocaleLowerCase().includes("50 words")
            );

            setCompanyNameError(missing_companyName);
            setindustryNameError(missing_industryName);
            setbusinessDescriptionError(missing_businessDescription);
            setLocationValueError(missing_location)
            setCompanySizeValueError(missing_companySize);
            console.log(missing_businessDescription[0]);
            if (large_desc.length) {
                setbusinessDescriptionError(large_desc)
            }

        } else {
            setCompanyName("");
            setCompanySizeValue("");
            setLocationValue("");
            setindustryName("");
            setbusinessDescription("");
            setCompanyNameError("");
            setindustryNameError("");
            setbusinessDescriptionError("");
            setCompanySizeValueError("");
            setLocationValueError("");
            console.log(customerData);

            console.log('clg1');
        }
    };
    const handleCancelForm = () => {
        setCompanyName("");
        setCompanySizeValue("");
        setLocationValue("");
        setindustryName("");
        setbusinessDescription("");
        setCompanyNameError("");
        setindustryNameError("");
        setbusinessDescriptionError("");
        setCompanySizeValueError("");
        setLocationValueError("");
        setOpenCancelModal(false)
    }
    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    return (<div className={styles.BasicInfoContainer}>
        <h1 className={styles.title}>Basic Info</h1>
        <form
            onSubmit={handleSubmit}
            className={styles.input_basic_infos_form}
        >
            <div className={styles.first_section}>
                <div className="flex flex-col items-start basis-1/2">
                    <InputField
                        label="Name"
                        placeholder="Company Name"
                        inputType="text"
                        value={companyName}
                        handleChangeInput={handleCompanyName}
                        modal={true}
                        gap
                    />
                    {companyNameError && (
                        <span className="mt-[-1em] ml-[1.4em] text-magenta font-helvetica-medium text-[.75em]">
                            {companyNameError}{" "}
                        </span>
                    )}
                </div>
                <div className="flex flex-col items-start basis-1/2">
                    <InputField
                        label="Industry"
                        placeholder="Please indicate your industry"
                        inputType="text"
                        value={industryName}
                        handleChangeInput={handleIndustryName}
                        modal={true}
                        gap
                    />
                    {industryNameError && (
                        <span className="mt-[-1em] ml-[1.4em] text-magenta font-helvetica-medium text-[.75em]">
                            {industryNameError}{" "}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.second_section}>
                <div className="flex flex-col items-start basis-1/2 z-20">
                    <p className='text-[1.25em] font-[500] ml-[1.25em] mb-[0.625em]'>Company Size</p>
                    <div className="mb-4 w-full">
                        <CustomSelectInput inputOptions={CompanySize} defaultText='Select Company Size' inputSelectData={companySizeValue} setInputSelectData={setCompanySizeValue} />
                    </div>

                    {companySizeValueError && (
                        <span className="mt-[-1em] ml-[1.4em] text-magenta font-helvetica-medium text-[.75em]">
                            {companySizeValueError}{" "}
                        </span>
                    )}
                </div>
                <div className="flex flex-col items-start basis-1/2 z-20">
                    <p className='text-[1.25em] font-[500] ml-[1.25em] mb-[0.625em]'>Location</p>
                    <div className="mb-4 w-full h-[68px]">
                        <TagInput searchSelector allData={languageData} selectedData={country} setSelectedData={setCountry} placeholder='Select your country' />
                        {/* <CustomSelectInput inputOptions={location} defaultText='Select Company Size' inputSelectData={locationValue} setInputSelectData={setLocationValue} /> */}
                    </div>


                    {locationValueError && (
                        <span className="mt-[-1em] ml-[1.4em] text-magenta font-helvetica-medium text-[.75em]">
                            {locationValueError}{" "}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.third_section}>
                <div className="flex flex-col items-start ">
                    <InputField
                        label="Business Description"
                        placeholder="Please provide a brief Business Description for [ insert your company's name ]."
                        inputType="textarea"
                        value={businessDescription}
                        handleChangeTextarea={
                            handleBusinessDescription
                        }
                        textareaRows={1}
                        modal={true}
                        gap
                    />
                    {businessDescriptionError && (
                        <span className="text-magenta font-helvetica-medium text-[.75em]">
                            {businessDescriptionError}{" "}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.submit_button_container}>
                <SaveOrCancelButtonsContainer handleNotCancelAction={handleNotCancelAction} openCancelModal={openCancelModal} setCancelModal={setOpenCancelModal} cancelAction={handleCancelForm} title='Save Changes' type='submit' />
            </div>
        </form>
    </div>);
}

export default BasicInfo;