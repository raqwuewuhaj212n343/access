import { ReactNode } from 'react';
import Coffee from '../../src/assets/postingproject/coffee.svg';
import Eye from '../../src/assets/postingproject/Eye.svg';
import Image from 'next/image';

type Props = {
    children: ReactNode;
    title?: string;
};

function FinalStep() {
    return (
        <div className='rounded-3xl h-full bg-white'>
            <div className='w-full flex justify-end p-tr-57-142 '>
                <div className='flex w-fit cursor-pointer'>
                    <Image src={Eye} alt="Eye" />
                    <p className='text-gray-200'>Preview</p>
                </div>
            </div>
            <div className='grid justify-items-center text-black p-t-117 p-l-142 p-r-142'>
                <Image src={Coffee} alt="Coffee" />
                <div className='py-3'>
                    <h1 className='text-2xl font-medium'>We're almost done!</h1>
                </div>
                <div className='py-1'>
                    <p className='w-31 text-center text-xl'>
                        Once we make your project public,
                        we can start getting buyers on board.
                    </p>
                </div>
                <div className='w-34 flex space-x-10'>
                    <button className='w-16 font-normal bg-whit text-xl text-gray-800 shadow-md hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full'>Save as Draft</button>
                    <button className='w-16 font-normal bg-black text-xl text-white shadow-md hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full'>Publish</button>
                </div>
            </div>
        </div>
    );
}

export default FinalStep;