import { useState } from "react";
import NavItem from './NavItem';
import Link from "next/link";
import GobackButton from '../GobackButton';
interface NavBarProps {
    nav: 'overview' | 'description' | 'visuals' | 'publish';
}

interface navInfo {
    link: string,
    number: string,
    title: string
}

//Sets up NavItem components
const navigationInfo: navInfo[] = [
    {
        link: '/post-project/overview', number: '/0001', title: 'OVERVIEW, PRICING & RANGE'
    },
    {
        link: '/post-project/description', number: '/0002', title: 'DESCRIPTION & REQUIREMENTS'
    },
    {
        link: '/post-project/visuals', number: '/0003', title: 'VISUALS'
    },
    {
        link: '/post-project/publish', number: '/0004', title: 'PUBLISH'
    }
]

const Navbar = ({ nav }: NavBarProps) => {

    return (
        <nav className="h-13.313 bg-black bg-lightGray flex gap-x-16 items-center justify-center ">
            <GobackButton />
            {navigationInfo.map((navItem, index) => {

                return (
                    <Link href={navItem.link} >
                        <li>
                            <NavItem key={index} number={navItem.number} title={navItem.title} clicked={nav !== undefined ? navItem.link.includes(nav) ? true : false : false} />
                        </li>
                    </Link>
                )
            })}
        </nav>
    );
}

export default Navbar;