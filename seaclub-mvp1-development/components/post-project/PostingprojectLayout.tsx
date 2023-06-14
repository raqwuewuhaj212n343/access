import { ReactNode } from 'react';
import Header from './Publish/Header'
import Navbar from './Navbar'
type Props = {
    children: ReactNode;
    title?: string;
};
interface LayoutProps {
    children: ReactNode;
    nav: 'overview' | 'description' | 'visuals' | 'publish';
}

function PostingprojectLayout({ children, nav }: LayoutProps) {
    return (
        <div className="h-100vh-height">
            <ul>
                <Navbar nav={nav} />
            </ul>
            <main className='px-4 pb-12 h-100vh-height bg-lightGray p-lbr-1.25-2.625-1.25'>{children}</main>
        </div>
    );
}

export default PostingprojectLayout;