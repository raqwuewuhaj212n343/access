import { useField } from 'formik';
import style from '../src/styles/component/FormikInput.module.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
type TextInputProps = {
    name: string;
    placeholder: string;
    setTogglePasswordType?: React.Dispatch<React.SetStateAction<boolean>>;
    togglePasswordType?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({ ...props }: TextInputProps) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input className={style.textInput} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='text-red-600'>{meta.error}</div>
            ) : null}
        </>
    );
};
export const PasswordInput = ({ setTogglePasswordType, togglePasswordType, ...props }: TextInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        if (setTogglePasswordType) {
            setTogglePasswordType(!togglePasswordType);
        }
    };
    const [field, meta] = useField(props);
    return (
        <>
            <div className={style.passInput}>
                <input className={style.textInput} {...field} {...props} type={showPassword ? 'text' : 'password'} />
                <div className={style.IconDiv} >
                    {showPassword ? <AiOutlineEye className='me-9 cursor-pointer' onClick={togglePasswordVisibility} size={30} color='#7C7C7C' /> :
                        <AiOutlineEyeInvisible className='me-9 cursor-pointer' onClick={togglePasswordVisibility} size={30} color='#7C7C7C' />}
                </div>
            </div>
            {meta.touched && meta.error ? (
                <div className='text-red-600'>{meta.error}</div>
            ) : null}
        </>
    );
};