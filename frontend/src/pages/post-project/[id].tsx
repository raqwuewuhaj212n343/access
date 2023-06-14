import { useRouter } from "next/router";
import Layout from './Layout';
import OverviewForm from "../../../components/post-project/OverviewForm/OverviewForm";
import DescriptionForm from "../../../components/post-project/DescriptionForm/DescriptionForm";
import VisualForm from "../../../components/post-project/VisualForm/VisualForm";
import FinalStep from "../../../components/post-project/Publish/FinaleStep";
type navItem = 'overview' | 'description' | 'visuals' | 'publish';

const PostProject = () => {

    const router = useRouter();
    const id = router.query.id?.toString() as navItem;
    let child;

    return (
        <Layout nav={id}>
            {//Changes component based on navigation
                id === 'overview' ?
                    child = <OverviewForm />
                    : id === 'description' ?
                        child = <DescriptionForm />
                        : id === 'visuals' ?
                            child = <VisualForm />
                            : id === 'publish' ?
                                child = <FinalStep />
                                : child = <></>}
        </Layout>
    )
}

export default PostProject;