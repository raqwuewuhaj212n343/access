import Image from "next/image";
import style from '@/styles/component/profile/edit-profile/additionalDetails.module.css';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import crossIcon from '@/public/assets/edit-profile/icons/crossIcon.svg';
interface ITagInputProps {
    allData: string[],
    selectedData: string[]
    setSelectedData: React.Dispatch<React.SetStateAction<string[]>>
    setParentInputValue?: React.Dispatch<React.SetStateAction<string>>
    placeholder: string
    searchSelector?: boolean
    locationSelector?: boolean

}

const TagInput = ({ locationSelector, searchSelector, allData, selectedData, setSelectedData, placeholder, setParentInputValue }: ITagInputProps) => {

    const [suggestion, setSuggestion] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionRef = useRef<HTMLDivElement>(null);


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length) {
            const filteredSuggestion = allData.filter(data => {
                const dataName = data.toLowerCase()
                const suggestion = e.target.value.toLowerCase()

                return dataName.startsWith(suggestion)
            })
            setSuggestion(filteredSuggestion)
        } else if (e.target.value.length === 0) {
            setSuggestion([])
        }
        setInputValue(e.target.value)
    }

    const handleSuggestionClick = (suggestionName: string) => {
        const exist = selectedData.find(dataInfo => suggestionName.toLowerCase() === dataInfo.toLowerCase())

        if (!exist) {
            if (searchSelector) {
                setSelectedData([suggestionName])
                setInputValue('')
            } else {
                if (locationSelector && setParentInputValue && selectedData.length === 5) {
                    setParentInputValue('World Wide')
                    setSuggestion([])
                    setSelectedData([])
                    setInputValue('')
                } else {
                    setSelectedData([...selectedData, suggestionName])
                    setInputValue('')
                }

            }


        } else {
            alert('Already Have this. Please Add another one')
        }
    }


    const removeCountry = (removedIndex: number) => {
        const newSelection = selectedData.filter((_, index) => index !== removedIndex)
        setSelectedData(newSelection)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            suggestionRef.current &&
            !suggestionRef.current.contains(event.target as Node)
        ) {
            // Click outside input and div, hide the div
            setSuggestion([]);
        }
    };

    //   const addData = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //         if (event.currentTarget.value !== "") {
    //             const exist = selectedData.find(dataInfo => event.currentTarget.value.toLowerCase() === dataInfo.toLowerCase())
    //             if (!exist) {
    //                 setSelectedData([...selectedData, event.currentTarget.value]);
    //                 setInputValue('')
    //             } else {
    //                 alert('Already Have this. Please Add another one')
    //             }
    //         }
    //     }

    useEffect(() => {
        // Add event listeners to handle clicks outside the input and div
        document.addEventListener('click', handleClickOutside);

        return () => {
            // Cleanup: remove event listeners when component unmounts
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (<div className={`${searchSelector ? 'relative bg-white' : ''}`}>
        <div className={`${style.continentContainer} ${suggestion.length ? 'rounded-[20px]' : 'rounded-full'}`}>
            <div className="px-4 py-2 flex flex-wrap">
                <ul className={style.countryOuter}>
                    {selectedData.length ? selectedData.map((name, i) => <li key={i} className={`${style.tag} font-helveticaDisplay`}>{name}

                        <Image src={crossIcon} width={20} onClick={() => removeCountry(i)} className='ms-2 cursor-pointer' alt='crossIcon'></Image>
                    </li>) : ''}
                </ul>
                <input ref={inputRef} type="text" onClick={() => setSuggestion(allData)} onChange={onChangeInput} value={inputValue} placeholder={placeholder} className={`${searchSelector && selectedData.length === 1 ? 'hidden' : ''}`}
                // onKeyUp={event => event.key === 'Enter' ? dataInfo(event) : null} 
                />
            </div>
            {suggestion.length ? <div ref={suggestionRef} className='flex items-center w-full justify-center '>
                <ul className={style.suggestionContainer}>
                    {
                        suggestion.map((suggestionName, i) => <li onClick={() => handleSuggestionClick(suggestionName)} key={i}>{suggestionName}</li>)
                    }
                </ul>
            </div> : ''}
        </div>

    </div>);
}

export default TagInput;