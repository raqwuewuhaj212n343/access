import * as React from 'react';
import Image from 'next/image';
import logo from '../public/assets/components/logo/seaclubBlackLogo.svg'
import style from '../src/styles/component/TopLogo.module.css'
export interface ITopLogoProps {
    title: string,
    logoGap: boolean,
    bold?: boolean
}

export default function TopLogo({ title, bold, logoGap }: ITopLogoProps) {
    return (
        <div className={style.topLogoContainer}>
            <Image src={logo} alt="logo" className={logoGap ? style.bigGap : style.smallGap} />
            <h2 className={bold ? style.bigFont : style.smallFont}>{title}</h2>
        </div>
    );
}
