import styles from './PartnershipSlide.module.css'

export default function PartnershipSlide() {

    return (
        <section id='partnership' className={styles['content-wrapper']}>
            <img src="/partnerships.svg" className={styles['title']}/>
            <p className={styles['text']}>We don’t sell platforms — we build businesses together. Our partnerships are private, long-term, and technology-driven.</p>
            <div className={`${styles['plates']} `}>
                <div id='first' className={`${styles['plate']} ${styles['first']}`}>
                    <p className={styles['plate-title']}>Partnership</p>
                    <p className={styles['plate-text']}>Exclusive access to our in-house iGaming infrastructure - casino, sportsbook, management systems.</p>
                </div>
                <div id='second' className={`${styles['plate']} ${styles['second']}`}>
                    <p className={styles['plate-title']}>Investment</p>
                    <p className={styles['plate-text']}>Comprehensive technical and analytical support throughout every growth stage.</p>
                </div>
                <div id='third' className={`${styles['plate']} ${styles['third']}`}>
                    <p className={styles['plate-title']}>Growth</p>
                    <p className={styles['plate-text']}>Joint development, shared strategy, and aligned success metrics.</p>
                </div>
            </div>
            <div className={`${styles['ecosystem']}`}>
                <p>Our Ecosystem</p>
                <div className={`${styles['partner-plates']}`}>
                    <div className={`${styles['partner-plate']}`}>
                        <img src="bluff.png" alt="" className={`${styles['partner-logo']}`} />
                        <img src="online.svg" className={styles['online']}></img>
                    </div>
                    <div className={`${styles['partner-plate']}`}>
                        <img src="bb.png" alt="" className={`${styles['partner-logo']}`}/>
                        <img src="online.svg" className={styles['online']}></img>
                    </div>
                    <div className={`${styles['partner-plate']}`}>
                        <img src="reboost.png" alt="" className={`${styles['partner-logo']}`}/>
                        <img src="online.svg" className={styles['online']}></img>
                    </div>
                </div>
            </div>
        </section>
    )
}