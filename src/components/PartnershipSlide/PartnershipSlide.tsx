import cn from 'classnames'
import styles from './PartnershipSlide.module.css'

export default function PartnershipSlide() {

    return (
        <section id='partnership' className={styles['content-wrapper']}>
            <img src="/planet.svg" className={styles['planet']}/>
            <img src="/partnership.svg" className={styles['title']}/>
            <p className={styles['text']}>We don’t sell platforms — we build businesses together. Our partnerships are private, long-term, and technology-driven.</p>
            <div className={`${styles['plates']} `}>
                <div id='first' className={`${styles['plate']} ${styles['first']}`}>
                    <img src="/tb.svg" alt="" />
                    <p className={styles['plate-text']}>Exclusive access to our in-house iGaming infrastructure - casino, sportsbook, management systems.</p>
                </div>
                <div id='second' className={`${styles['plate']} ${styles['second']}`}>
                    <img src="/oe.svg" alt="" />
                    <p className={styles['plate-text']}>Comprehensive technical and analytical support throughout every growth stage.</p>
                </div>
                <div id='third' className={`${styles['plate']} ${styles['third']}`}>
                    <img src="/cg.svg" alt="" />
                    <p className={styles['plate-text']}>Joint development, shared strategy, and aligned success metrics.</p>
                </div>
            </div>
        </section>
    )
}