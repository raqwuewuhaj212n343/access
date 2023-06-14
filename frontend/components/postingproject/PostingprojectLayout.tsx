import { ReactNode } from 'react';
import Header from './Header'

type Props = {
    children: ReactNode;
    title?: string;
};

function PostingprojectLayout({ children, title = 'Next.js App' }: Props) {
    return (
        <div className="h-screen">
            <Header />
            <main className='px-4 pb-12 h-full bg-gray-200'>{children}</main>
        </div>
    );
}

export default PostingprojectLayout;