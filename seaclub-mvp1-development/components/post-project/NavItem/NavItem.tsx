import { useState, useEffect } from "react";
import styles from '../../../src/styles/PostProject/NavItem.module.css'

interface NavItemProps {
    number: string,
    title: string,
    clicked: boolean
}

const NavItem = ({ number, title, clicked }: NavItemProps) => {

    return (
        <div className={clicked ? `${styles.container} ${styles.clicked}` : styles.container}>
            <div className={styles.textcontainer}>
                <h3 className={styles.number}>{number}</h3>
                <h3 className={styles.title}>{title}</h3>
            </div>
        </div>
    )
}

export default NavItem;