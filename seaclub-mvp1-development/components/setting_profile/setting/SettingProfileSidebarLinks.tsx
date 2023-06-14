import { LinkProps } from "@/components/setting_profile/SidebarLinks";
import empty_wallet from "@/public/assets/setting-profile/icons/setting/empty-wallet.svg";
import empty_wallet_hover from "@/public/assets/setting-profile/icons/setting/empty-wallet-hover.svg";
import manage_email from "@/public/assets/setting-profile/icons/setting/manage-email.svg";
import manage_email_hover from "@/public/assets/setting-profile/icons/setting/manage-email-hover.svg";
import verification from "@/public/assets/setting-profile/icons/setting/shield-tick.svg";
import verification_hover from "@/public/assets/setting-profile/icons/setting/shield-tick-hover.svg";
import bubble from "@/public/assets/setting-profile/icons/setting/bubble.svg";
import bubble_hover from "@/public/assets/setting-profile/icons/setting/bubble-hover.svg";
import notification from "@/public/assets/setting-profile/icons/setting/notification.svg";
import notification_hover from "@/public/assets/setting-profile/icons/setting/notification-hover.svg";
import ManageWallet from "@/components/setting_profile/setting/ManageWallet";
import ManageEmail from "@/components/setting_profile/setting/ManageEmail";
import ManageVerification from "@/components/setting_profile/setting/ManageVerification";
import ManagePreferences from "@/components/setting_profile/setting/ManagePreferences";
import ManageNotifications from "@/components/setting_profile/setting/ManageNotifications";

{/* This is the Sidebar Link Data that's going to be provide to the Layout for  Setting Profile  Only */}
export const SidebarLinksData: LinkProps[] = [
    {
        icon: [empty_wallet, empty_wallet_hover],
        title: "Manage Wallet",
        link: "#/setting/manage-wallet",
        component: <ManageWallet />,
        isFirstLinkToLoad: true,
        isFirstComponentToLoad: true,
    },
    {
        icon: [manage_email, manage_email_hover],
        title: "Manage Email",
        link: "#/setting/manage-email",
        component: <ManageEmail />,
    },

    {
        icon: [verification, verification_hover],
        title: "Verification",
        link: "#/setting/verification",
        component: <ManageVerification />,
    },
    {
        icon: [bubble, bubble_hover],
        title: "Preferences",
        link: "#/setting/preferences",
        component: <ManagePreferences />,
    },
    {
        icon: [notification, notification_hover],
        title: "Notifications",
        link: "#/setting/notifications",
        component: <ManageNotifications />,
    },
];