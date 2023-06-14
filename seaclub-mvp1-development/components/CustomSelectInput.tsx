import { useState } from "react";
import Image from 'next/image';
import CaretDown from '@/public/assets/components/icons/downArrow.svg';
import caretUp from '@/public/assets/components/icons/upArrow.svg';
import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import { AiOutlineDoubleRight } from "react-icons/ai";

interface IInputOption {
    optionName: string
    id: number
    children?: IInputOption[]
}

interface ICustomSelectInput {
    inputOptions: IInputOption[]
    inputSelectData: string
    setInputSelectData: React.Dispatch<React.SetStateAction<string>>
    setErrorValue1?: React.Dispatch<React.SetStateAction<string>>
    setErrorValue2?: React.Dispatch<React.SetStateAction<string>>
    defaultText: string
    showDefault?: boolean
    noHight?: boolean
}

const CustomSelectInput = ({ setErrorValue1, setErrorValue2, noHight, showDefault, defaultText, inputOptions, inputSelectData, setInputSelectData }: ICustomSelectInput) => {
    const [expand, setExpand] = useState<boolean>(false);

    const [subItemId, setSubItemId] = useState<number>(0)

    const handleParentClick = (id: number) => {
        if (subItemId === id) {
            setSubItemId(0)
        } else {
            setSubItemId(id)
        }
    }

    const handleChildOnClick = (optionName: string) => {
        setInputSelectData(optionName);
        setExpand(false)
        setSubItemId(0)
        setErrorValue1 ? setErrorValue1('') : null
        setErrorValue2 ? setErrorValue2('') : null
    }
    const handleNonChildLiClick = (optionName: string) => {
        setInputSelectData(optionName);
        setExpand(false)
        setErrorValue1 ? setErrorValue1('') : null
        setErrorValue2 ? setErrorValue2('') : null
    }
    return (
        <div className={`relative w-full ${noHight ? 'h-[50px]' : 'h-[64px]'}`}>

            <ul className={`${style.selectContainer} ${expand ? 'rounded-[20px]' : 'rounded-[100px]'} font-helveticaDisplay absolute`}>

                <li onClick={() => setExpand(!expand)} className={`${style.defaultSelect} ${noHight ? '' : '!h-[64px]'}`}>
                    {inputSelectData ? inputSelectData : defaultText} <Image src={expand ? caretUp : CaretDown} alt='caret' />
                </li>


                {expand ? <>{
                    inputOptions.length ? inputOptions.map((optionInfo, i) => {

                        if (!optionInfo.children) {
                            return <li onClick={() => handleNonChildLiClick(optionInfo.optionName)} key={i}>{optionInfo.optionName}</li>
                        } else {
                            return (
                                <div className="relative " key={i}>
                                    <li onClick={() => handleParentClick(optionInfo.id)} className={`flex items-center justify-between ${subItemId === optionInfo.id ? 'bg-[#e0e0e0]' : ''}`} >{optionInfo.optionName} <AiOutlineDoubleRight /></li>
                                    {optionInfo.id === subItemId ? <ul className={`${style.selectContainer} absolute top-0 left-full font-helveticaDisplay ${style.subItemContainer}`}>
                                        {
                                            optionInfo.children.map((childOption, i) => <li key={i} onClick={() => handleChildOnClick(childOption.optionName)}>{childOption.optionName}</li>)
                                        }
                                    </ul> : ''}
                                </div>

                            )
                        }

                    }) : ''
                } </> : ''}
            </ul>
        </div>
    );
}

export default CustomSelectInput;