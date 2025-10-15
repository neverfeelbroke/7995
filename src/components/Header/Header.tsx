'use client'

import { useEffect, useState } from 'react';
import styles from './Header.module.css'
import cn from 'classnames';

export default function Header() {

    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Функция плавного скролла к секции
    const handleScrollTo = (id?: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false); // Закрываем мобильное меню при клике
        if (id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
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
                </div>

                <a className={styles['contact']} href="#contact-us" onClick={handleScrollTo('contact-us')}>
                    Cooperation
                </a>

                <button 
                    className={cn(styles['burger'], { [styles['burger-open']]: isMobileMenuOpen })}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile menu overlay */}
            <div className={cn(styles['mobile-menu'], { [styles['mobile-menu-open']]: isMobileMenuOpen })}>
                <div className={styles['mobile-nav-links']}>
                    <a className={styles['mobile-nav-link']} href="#about-us" onClick={handleScrollTo('about-us')}>
                        About us
                    </a>
                    <a className={styles['mobile-nav-link']} href="#partnership" onClick={handleScrollTo('partnership')}>
                        Partnership
                    </a>
                    <a className={styles['mobile-nav-link']} href="#investments" onClick={handleScrollTo('investments')}>
                        Investments
                    </a>
                    <a className={styles['mobile-nav-link']} href="#faq" onClick={handleScrollTo('faq')}>
                        FAQ
                    </a>
                    <a className={styles['mobile-contact']} href="#contact-us" onClick={handleScrollTo('contact-us')}>
                        Cooperation
                    </a>
                </div>
            </div>
        </>
    )
}