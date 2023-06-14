import InputField from '@/components/basic-info/input/InputField';
import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import plusIcon from '@/public/assets/edit-profile/icons/plusIcon.svg'
import trashIcon from '@/public/assets/edit-profile/icons/trashIcon.svg'
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import PieChart from '@/components/profile/PieChart';
import CustomSelectInput from '@/components/CustomSelectInput';
import SaveOrCancelButtonsContainer from '@/components/setting_profile/ConfirmationButtonsContainer';
interface IServiceInfo {
    service: string,
    percentage: number
}

const selectOptions = [
    {
        optionName: 'For a Web3 marketing agency',
        id: 1,
        children: [
            {
                optionName: 'Content Marketing',
                id: 11,
            },
            {
                optionName: 'Social Media Marketing',
                id: 12,
            },
            {
                optionName: 'Influencer Marketing',
                id: 13,
            },
            {
                optionName: 'Community & Engagement',
                id: 14,
            },
            {
                optionName: 'SEO',
                id: 15,
            },
            {
                optionName: 'Public Relations',
                id: 16,
            },
            {
                optionName: 'ICO Marketing',
                id: 17,
            },
            {
                optionName: 'Analytics & Performance',
                id: 18,
            },
            {
                optionName: 'Email Marketing',
                id: 19,
            },
            {
                optionName: 'NFT Marketing',
                id: 110,
            },
            {
                optionName: 'Market Research',
                id: 111,
            },
            {
                optionName: 'Branding',
                id: 112,
            },
            {
                optionName: 'Creative Design',
                id: 113,
            },
            {
                optionName: 'Event & Sponsorships',
                id: 114,
            },
            {
                optionName: 'Pay-Per-Click Ads (modifié)',
                id: 115,
            },
        ]
    },
    {
        optionName: 'For Web3 development agency',
        id: 2,
        children: [
            {
                optionName: 'Smart Contract Development',
                id: 21,
            },
            {
                optionName: 'dApp Development',
                id: 22,
            },
            {
                optionName: 'Blockchain Consultancy',
                id: 23,
            },
            {
                optionName: 'Cross-Chain Integration',
                id: 24,
            },
            {
                optionName: ' DeFi Solutions',
                id: 25,
            },
            {
                optionName: 'Identity Management',
                id: 26,
            },
            {
                optionName: 'Storage & Data Management',
                id: 27,
            },
            {
                optionName: 'Infrastructure & Security',
                id: 28,
            },
            {
                optionName: 'Software Development',
                id: 29,
            },
            {
                optionName: 'Mobile App Development',
                id: 210,
            },
            {
                optionName: 'Web Development',
                id: 211,
            },
            {
                optionName: 'API & Integration',
                id: 212,
            },
            {
                optionName: 'Analytics & Visualization',
                id: 213,
            },
            {
                optionName: 'Tokenization & NFT Solutions (modifié)',
                id: 214,
            },
        ]
    },
    {
        optionName: 'For a Web3 design agency',
        id: 3,
        children: [
            {
                optionName: 'UI/UX Design',
                id: 31,
            },
            {
                optionName: 'NFT Art & Design',
                id: 32,
            },
            {
                optionName: 'Branding & Visual Identity',
                id: 33,
            },
            {
                optionName: 'Web Design',
                id: 34,
            },
            {
                optionName: 'Motion Graphics & Animation',
                id: 35,
            },
            {
                optionName: 'Interactive Design',
                id: 36,
            },
            {
                optionName: 'Data Visualization',
                id: 37,
            },
            {
                optionName: 'Promotional Materials',
                id: 38,
            },
            {
                optionName: 'Print Design & Collateral',
                id: 39,
            },
            {
                optionName: 'Event & Exhibition Design',
                id: 310,
            },
            {
                optionName: 'Video Production & Editing',
                id: 311,
            },
            {
                optionName: 'Social Media Design',
                id: 312,
            },
        ]
    },
]
const ServiceLine = () => {
    const [service, setService] = useState<string>("");
    const [percentage, setPercentage] = useState<number>(0);
    const [addNewServiceUI, setAddNewServiceUI] = useState<IServiceInfo[]>([]);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const handleAddService = () => {
        if (addNewServiceUI.length < 5) {
            const exist = addNewServiceUI.find(services => services.service === service)
            if (!exist) {
                if (service && percentage) {
                    // setAddNewServiceUI([...addNewServiceUI, { service: service, percentage: percentage }])
                    const newService = addNewServiceUI
                    newService.unshift({ service: service, percentage: percentage })
                    setAddNewServiceUI(newService)
                    setService('')
                    setPercentage(0)
                } else {
                    alert('Please add Percentage or Service')
                }
            } else {
                const existingServiceIndex = addNewServiceUI.findIndex(serviceInfo => serviceInfo.service == service)
                if (existingServiceIndex !== -1) {
                    const updatedServices = [...addNewServiceUI];
                    updatedServices[existingServiceIndex] = { service: service, percentage: percentage };
                    setAddNewServiceUI(updatedServices);
                    setService('');
                    setPercentage(0);

                }
            }
        } else {
            alert('all Services is added')
        }
    }
    const handleDeleteService = (deleteServices: string) => {
        const updatedServices = addNewServiceUI.filter(serviceInfo => serviceInfo.service != deleteServices)
        setAddNewServiceUI(updatedServices)
    };
    let pieChartLabels: string[] = []
    let pieChartSeries: number[] = []
    if (addNewServiceUI) {
        addNewServiceUI.forEach(serviceInfo => {
            pieChartLabels.push(serviceInfo.service)
        })
        addNewServiceUI.forEach(serviceInfo => {
            pieChartSeries.push(serviceInfo.percentage)
        })
    }
    const handleNotCancelAction = () => {
        setOpenCancelModal(false)
    }
    const cancelAction = () => {
        setAddNewServiceUI([])
        setPercentage(0)
        setOpenCancelModal(false)
    }

    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = Number(e.target.value);
        if (!isNaN(parsedValue)) {
            setPercentage(parsedValue);
        }
    }

    const handleSubmitData = () => {
        console.log(addNewServiceUI);
    }
    return (<div className="px-8 py-12">
        <div className='flex gap-4 mb-4'>
            <div className=' basis-3/4'>
                <h1 className={style.title}>Service Lines</h1>
                <p className={style.subtitle}>Select the services your company excel in</p>
            </div>
            <div className='basis-1/4 w-full '>
                <PieChart showLegend={false} labels={pieChartLabels} series={pieChartSeries} width={200} />
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='w-4/5'>
                <div className='flex gap-3 mb-3 '>
                    <div className="basis-4/5">
                        <CustomSelectInput noHight defaultText='Select Services' inputOptions={selectOptions} inputSelectData={service} setInputSelectData={setService} />

                    </div>
                    <div className="basis-2/5  ">
                        <div className='flex gap-2'>
                            <input type='text' value={percentage} placeholder='Percentage' onChange={(e) => handleChangeInputValue(e)} className='border border-[#e6e6e6] w-full h-[50px] rounded-[100px] px-3 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />

                            <div className='my-auto z-10'>
                                <Image src={plusIcon} alt='plusIcon' className='cursor-pointer z-30' onClick={handleAddService}></Image>
                            </div>
                        </div>
                    </div>
                </div>
                {addNewServiceUI && addNewServiceUI.map((newService, i) => <div key={i} className='mb-2 flex gap-3'>
                    <div className="basis-4/5">
                        <input type='text' disabled={true} value={newService.service} placeholder='service' className='border border-[#e6e6e6] w-full h-[50px] rounded-[100px] px-3 text-center outline-none' />

                    </div>
                    <div className="basis-2/5 flex gap-2 ">
                        <input type='text' disabled={true} value={`${newService.percentage}%`} placeholder='Percentage' className='border border-[#e6e6e6] w-full h-[50px] rounded-[100px] px-3 text-center outline-none' />

                        <div className='flex items-center'>
                            <div className='cursor-pointer z-10' onClick={() => handleDeleteService(newService.service)}>
                                <Image src={trashIcon} alt='trashIcon' className='w-full h-full'></Image>
                            </div>

                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <SaveOrCancelButtonsContainer handleNotCancelAction={handleNotCancelAction} openCancelModal={openCancelModal} setCancelModal={setOpenCancelModal} cancelAction={cancelAction} title='Save Changes' type='button' action={handleSubmitData} />
    </div>);
}

export default ServiceLine;