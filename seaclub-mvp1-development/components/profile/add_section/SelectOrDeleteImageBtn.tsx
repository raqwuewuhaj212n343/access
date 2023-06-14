const SelectOrDeleteImageBtn = ({ handleChooseImage }: { handleChooseImage: () => void }) => {
    return (<section>
        <button className='bg-black text-white rounded-full h-10 px-6 font-helveticaDisplay text-[16px] leading-[24px] font-normal' onClick={handleChooseImage}>Choose Image</button>
    </section>);
}

export default SelectOrDeleteImageBtn;