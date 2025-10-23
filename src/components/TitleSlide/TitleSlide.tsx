'use client'

import styles from './TitleSlide.module.css'

export default function TitleSlide() {

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
        <section id='' className={styles['content-wrapper']}>
            <video autoPlay muted loop playsInline className={styles['video']}>
                <source src="/slots.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* <img src="/bg.png" alt="" className={styles['bg']}/> */}
            <div className={styles['action-wrapper']}>
                <p>7995 - is a private iGaming investment vehicle and IT company focused on creating a long lasting synergetic partnerships within our ecosystem</p>
                <button onClick={handleScrollTo('about-us')}>
                    <img src="/plus.svg" alt="" />
                    Get Started
                </button>
            </div>
        </section>
    )
}