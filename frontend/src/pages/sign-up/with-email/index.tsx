import { Formik, Form } from "formik";
import { PasswordInput, TextInput } from "../../../../components/FormikInput";
import style from '../../../styles/signup/SignUpWithEmail.module.css';
import Link from "next/link";
import SocialComponent from "../../../../components/SocialComponent";
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from "next/router";
import GobackButton from "@/components/GobackButton";
import LogoWithDescriptiveLabel from "@/components/LogoWithDescriptiveLabel";

interface FormValue {
    email: string,
    password: string,
    confirmPassword: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string()
        .required('Password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={};':",.<>?[\]\\|`~]).{8,32}$/, 'Password must be 8-32 characters and contain at least one number, one lowercase letter, one uppercase letter, and one special character'
        ),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
});


const SignUpWithEmail = () => {

    const initialValue: FormValue = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [togglePasswordType, setTogglePasswordType] = useState<boolean>(false)
    console.log('from index', togglePasswordType);
    const router = useRouter()
    return (
        <section className={style.mainContainer}>
            <GobackButton />
            <div className={style.OuterContent} >
                <LogoWithDescriptiveLabel description="Sign Up" />
                <div className={style.mainContent}>
                    <div className={style.formContainer}>
                        <div className={style.formTitle}><h2>Email</h2></div>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                router.push('/basic-info')
                            }}
                        >
                            <Form>
                                <div className={style.inputDiv}>
                                    <TextInput type='email' name='email' placeholder='Enter email address' />
                                </div>
                                <div className={style.inputDiv}>
                                    <PasswordInput name='password' placeholder='Create your password' />
                                </div>
                                <div className={style.inputDiv}>
                                    <PasswordInput name='confirmPassword' placeholder='Confirm your password' />
                                </div>
                                <p className={style.bottomText}>Already have an account?<Link href='/login' className={style.Login}>Log In Now</Link></p>
                                <div className={style.divider}>
                                    <div className={style.line}></div>
                                    <div><p>Or</p></div>
                                    <div className={style.line}></div>
                                </div>
                                <SocialComponent />
                                <div className="flex items-center justify-center">
                                    <button type='submit' className={style.submitBtn}>Continue</button>
                                </div>
                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUpWithEmail;