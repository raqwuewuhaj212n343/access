import * as Yup from "yup";

export interface UserData {
    email: string;
    password: string;
}
export interface UserBasicInfo {
    companyName: string;
    industryName: string
    companySize?: string,
    location?: string,
    businessDescription: string,
}
export interface UserNewPassword {
    password: string,
    confirmPassword: string
}
export const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};

const userBasicInfoSchema = Yup.object().shape({
    companyName: Yup.string().trim().required('Please enter your company name'),
    industryName: Yup.string().trim().required('Please enter your industry name'),
    companySize: Yup.string().required('Please enter your company size'),
    location: Yup.string().required('Please enter your location'),
    businessDescription: Yup.string().trim().max(150, 'You can Give only 150 words').required('Please enter your business description'),
})

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email is not valid").required('Please enter an email'),
    password: Yup.string()
        .required("Please enter a password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),

});
const passwordShema = Yup.object().shape({
    password: Yup.string()
        .required("Please enter a password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters")
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: Yup.string()
        .required("Please re-type your password")
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of password.
        .oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const validate_email_and_password_form = async (userData: UserData) => {
    const response = await loginSchema
        .validate(userData, { abortEarly: false })
        .catch((error) => error);
    if (response.errors) {
        return response.errors
    }
    return;
};
export const validate_new_password = async (userNewPassword: UserNewPassword) => {
    const response = await passwordShema
        .validate(userNewPassword, { abortEarly: false })
        .catch((error) => error);
    if (response.errors) {
        return response.errors
    }
    return;
};
export const validate_basic_info_inputs = async (userBasicInfo: UserBasicInfo) => {
    const response = await userBasicInfoSchema
        .validate(userBasicInfo, { abortEarly: false })
        .catch((error) => error);
    if (response.errors) {
        return response.errors
    }
    return;
};

