
import FirstAboutUsTemplate from "@/components/profile/add_section/aboutus/edit-aboutUs-template/FirstAboutUsTemplate/FirstAboutUsTemplate";
import SecondAboutUsTemplate from "@/components/profile/add_section/aboutus/edit-aboutUs-template/SecondAboutUsTemplate/SecondAboutUsTemplate";
import ThirdAboutUsTemplate from "@/components/profile/add_section/aboutus/edit-aboutUs-template/ThirdAboutUsTemplete/ThirdAboutUsTemplate";
import { useRouter } from "next/router";

const EditTemplate = () => {
    const router = useRouter()
    const templateId = router.query.id
    console.log(typeof templateId);

    return (
        <section>
            {templateId === '1' ? <FirstAboutUsTemplate /> : templateId === '2' ? <SecondAboutUsTemplate /> : templateId === '3' ? <ThirdAboutUsTemplate /> : ''}
        </section>
    );
}

export default EditTemplate;