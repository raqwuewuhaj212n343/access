/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import EmailVerification from './verification/EmailVerification';
import OTPVerification from './verification/OTPVerification';
import { useSelector } from "react-redux";
import {DisplayOTPVerificationSelector} from "@/state_management/features/setting-profile/verification/DisplayOTPVerificationComponent"
import {DisplayVerificationCompletedSelector} from "@/state_management/features/setting-profile/verification/DisplayVerificationCompletedComponent"
import VerificationCompleted from './verification/VerificationCompleted';
const ManageVerification = () => {
    const displayOTPComponent = useSelector(DisplayOTPVerificationSelector);
    const displayVerificationCompletedComponent = useSelector(DisplayVerificationCompletedSelector);
    return (
        <div className="h-full">
            {
                !displayOTPComponent && !displayVerificationCompletedComponent && (
                    <EmailVerification />
                )
            }
            {
                displayOTPComponent && (
                    <OTPVerification />
                )
            }
            {
                displayVerificationCompletedComponent && (
                    <VerificationCompleted />
                )
            }
            
		</div>
    )
}
export default ManageVerification;
