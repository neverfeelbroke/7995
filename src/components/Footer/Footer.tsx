'use client'

import styles from './Footer.module.css'
import cn from 'classnames';

export default function Footer() {

    const currentYear = new Date().getFullYear()

    // Функция плавного скролла к секции
    const handleScrollTo = (id?: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={cn(styles['wrapper'])}>
            <div className={styles['left']}>
                <a className={styles['logo']} href="#" onClick={handleScrollTo()}>
                    <img  className={styles['infinity']} src="/logo.svg" alt="infinity" />
                </a>
                <span className={styles['copyright']}>All Rights Reserved | 7995.io | Copyright © {currentYear}<br/>Hi Steaks Entertainment Limited 16068</span>
            </div>

            <div className={styles['nav-links']}>
                <a className={styles['nav-link']} href="#about-us" onClick={handleScrollTo('about-us')}>
                    About us
                </a>
                <a className={styles['nav-link']} href="#partnership" onClick={handleScrollTo('partnership')}>
                    Partnership
                </a>
                <a className={styles['nav-link']} href="#investments" onClick={handleScrollTo('investments')}>
                    Investments
                </a>
                <a className={styles['nav-link']} href="#faq" onClick={handleScrollTo('faq')}>
                    FAQ
                </a>
                <a className={styles['nav-link']} href="#contact-us" onClick={handleScrollTo('contact-us')}>
                    Contact us
                </a>
            </div>
        </div>
    )
}