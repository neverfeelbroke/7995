'use client'

import { useEffect, useState } from 'react';
import styles from './Header.module.css'
import cn from 'classnames';

export default function Header() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <div className={cn(styles['wrapper'], { [styles.visible]: isVisible })}>
            <a className={styles['logo']} href="#" onClick={handleScrollTo()}>
                <img  className={styles['infinity']} src="/logo.svg" alt="infinity" />
            </a>

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