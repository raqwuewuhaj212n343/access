import React, { useState, FormEvent } from "react";
import caretDown from "@/public/assets/components/icons/CaretDown.svg";
import SaveOrCancelButtonsContainer from "@/components/setting_profile/ConfirmationButtonsContainer";
import Image from "next/image";
import DeleteBoxPopup from "./DeleteBoxPopup";
import DeactivateAccountFirstStep from "./deactivateAccountPopups/DeactivateAccountFirstStep";

export const ManagePreferences = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

    const [openDeactivateAccount, setOpenDeactivateAccount] = useState<boolean>(false);
	const handleOpenDeactivateAccount = () => setOpenDeactivateAccount(true);
	const handleCloseDeactivateAccount = () => setOpenDeactivateAccount(false);
	const [language, setlanguage] = useState<string[]>([
		"English",
		"Spanish",
		"French",
		"Mandarin",
		"Arabic",
		"Hindi",
		"Russian",
		"Portuguese",
		"Japanese",
	]);
    const [currency, setCurrency] = useState<string[]>([
		"USD (US Dollar)",
		"EUR (Euro)",
		"GBP (British Pound)",
		"INR (Indian Rupee)",
		
	]);
	const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="ml-[5em] mt-[.68em] flex flex-col items-start ">
				<span className="text-[1.25em] font-helvetica-medium font-light ">
					Account preferences
				</span>
				<div>
					<div className="flex mt-[2.81em] ">
						<div className="flex flex-col items-start">
							<label
								htmlFor="language"
								className="font-helveticaDisplay text-[1em] "
							>
								Language
							</label>
							<span className="font-helveticaDisplay text-[.93em] font-light mt-[1em] ">
								Select the language you use
							</span>
							<div className="relative mt-[.625em] ">
								<select
									name="language"
									id="language"
									className=" flex items-center  w-[18em] h-[2.62em] rounded-[6.25em] border border-1 border-solid border-cimen
                                    text-[.93em] font-helvetica-regular font-light pl-[.825em] outline-none text-cimen appearance-none
                                    "
									required
								>
									<option value="" key="0">
										Select Language
									</option>
									{language.map((language) => (
										<option value={language} key={language}>
											{language}{" "}
										</option>
									))}
								</select>
								<Image
									src={caretDown}
									alt="caret icon"
									className="absolute bottom-0 overflow-auto m-auto top-0  right-[1em]  cursor-pointer "
								/>
							</div>
						</div>
						<div className="flex flex-col items-start ml-[.93em] ">
							<label
								htmlFor="language"
								className="font-helveticaDisplay text-[1em] "
							>
								Currency
							</label>
							<span className="font-helveticaDisplay text-[.93em] font-light mt-[1em] ">
								Select the currency you use
							</span>
							<div className="relative mt-[.625em] ">
								<select
									name="currencty"
									id="currency"
									className=" flex items-center  w-[18em] h-[2.62em] rounded-[6.25em] border border-1 border-solid border-cimen
                                    text-[.93em] font-helvetica-regular font-light pl-[.825em] outline-none text-cimen appearance-none
                                    "
									required
								>
									<option value="" key="0">
										Select Currency
									</option>
									{currency.map((currency) => (
										<option value={currency} key={currency}>
											{currency}{" "}
										</option>
									))}
								</select>
								<Image
									src={caretDown}
									alt="caret icon"
									className="absolute bottom-0 overflow-auto m-auto top-0  right-[1em]  cursor-pointer "
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start mt-[9.93em] font-helveticaText font-light text-[1.06em] ">
					<button onClick={handleOpenDeactivateAccount}>Deactivate account</button>
					<button className="text-magenta" onClick={handleOpen}>Delete account</button>
				</div>
			</div>
			<div className="ml-[5em]">
				<SaveOrCancelButtonsContainer title="Save Changes" type="submit" />
			</div>
            <DeleteBoxPopup
                openModal={openModal}
                handleClose={handleClose}
                buttonWithBackgroundColorTitle="Yes, Delete"
                buttonWithoutBackgroundColorTitle="No, Keep"
                headingTitle="Are you sure you want to delete your account?"
                subTitle="All your datas will be deleted and cannot be recovered again"
            />
            <DeactivateAccountFirstStep
            openModal={openDeactivateAccount}
            handleClose={handleCloseDeactivateAccount}
            buttonWithBackgroundColorTitle="Yes, Deactivate"
            buttonWithoutBackgroundColorTitle="No, Keep active"
            headingTitle="Deactivate your account is temporary"
            subTitle="Your profile will be invisibe to the public and you can reactivate whenever you wish."
            
            />
		</form>
	);
};
export default ManagePreferences;
