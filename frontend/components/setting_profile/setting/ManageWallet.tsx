/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Wallet from "./wallet/Wallet";
import metamask from "@/public/assets/setting-profile/setting/wallet/icons/Metamask.svg";
import connect_wallet from "@/public/assets/setting-profile/setting/wallet/icons/connect_wallet.svg";
import SaveOrCancelButtonsContainer from "../ConfirmationButtonsContainer";
export const ManageWallet = () => {
	return (
		<div className="h-full">
			<div className="ml-[5em] mt-[.68em]">
				<span className="text-[1.25em] font-helvetica-medium font-light ">
					Wallets
				</span>
				<div className="text-[.875em] leading-[1.28em] font-helvetica-regular flex flex-col mt-[2.31em] font-light ">
					<span className="text-cimen">
						Don't know how to connect a wallet?
					</span>
					<span className="text-alteredSilverColor">
						Go to your wallet extension and switch to the wallet you
						wish to connect to the profile
					</span>
				</div>
				<div className="mt-[.88em]">
					<span className="font-helvetica-medium text-[.93em] font-light leading-[1.28em] ">
						Wallet ID
					</span>
					<div className="mt-[1.125em]">
						<Wallet
							icon={metamask}
							description="Metamask"
							isDefaultWallet={true}
							walledId="0x2A773...63b33"
						/>

						<Wallet
							icon={connect_wallet}
							description="WalletConnect"
							isDefaultWallet={false}
							walledId="0x756E3...73b93"
						/>
					</div>
				</div>
			</div>
			<div className="ml-[5em]">
				<SaveOrCancelButtonsContainer title="Connect Wallet" />
			</div>
		</div>
	);
};
export default ManageWallet;
