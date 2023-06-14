
import basicInfoIcon from "@/public/assets/edit-profile/icons/basicInfoIcon.svg";
import basicInfoIcon_hover from "@/public/assets/edit-profile/icons/basicInfoIncon_hover.svg";
import additionalDetailsIcon from "@/public/assets/edit-profile/icons/additionalDetailsIcon.svg";
import additionalDetailsIcon_hover from "@/public/assets/edit-profile/icons/additionalDetailsIcon_hover.svg";
import bannerIcon from "@/public/assets/edit-profile/icons/bannerIcon.svg";
import bannerIcon_hover from "@/public/assets/edit-profile/icons/bannerIcon_hover.svg";
import logoIcon from "@/public/assets/edit-profile/icons/logoIcon.svg";
import logoIcon_hover from "@/public/assets/edit-profile/icons/logoIcon_hover.svg";
import manageSection from "@/public/assets/edit-profile/icons/manageSection.svg";
import manageSection_hover from "@/public/assets/edit-profile/icons/manageSection_hover.svg";
import { LinkProps } from "../setting_profile/SidebarLinks";
import ManageWallet from "../setting_profile/setting/ManageWallet";
import Language from "./additionalDetails/Language";
import TimeZone from "./additionalDetails/TimeZone";
import TargetLocation from "./additionalDetails/TargetLocation";
import ServiceLine from "./additionalDetails/ServiceLine";

import Logo from "./Logo";
import ManageSection from "./ManageSection";
import Banner from "./Banner";
import BasicInfo from "./BasicInfo";

export const profileSidebarLinksData: LinkProps[] = [
    {
        icon: [basicInfoIcon, basicInfoIcon_hover],
        title: 'Basic Info',
        component: <BasicInfo />,
        isFirstLinkToLoad: true,
        isFirstComponentToLoad: true,
        link: "#/edit-profile/basic-info",
    },
    {
        icon: [additionalDetailsIcon, additionalDetailsIcon_hover],
        title: 'Additional Details',
        subLinks: [
            {
                title: 'Language',
                link: '#/edit-profile/language',
                component: <Language />,
            },
            {
                title: 'Time Zone',
                link: '#/edit-profile/time-zone',
                component: <TimeZone />
            },
            {
                title: 'Target Locations',
                link: '#/edit-profile/target-locations',
                component: <TargetLocation />
            },
            {
                title: 'Service Lines',
                link: '#/edit-profile/service-lines',
                component: <ServiceLine />
            },
        ]
    },
    {
        icon: [bannerIcon, bannerIcon_hover],
        title: 'Banner',
        link: '#/edit-profile/banner',
        component: <Banner />
    },
    {
        icon: [logoIcon, logoIcon_hover],
        title: 'Logo',
        link: '#/edit-profile/logo',
        component: <Logo />
    },
    {
        icon: [manageSection, manageSection_hover],
        title: 'Manage Sections',
        link: '#/edit-profile/manage-section',
        component: <ManageSection />
    }
]


