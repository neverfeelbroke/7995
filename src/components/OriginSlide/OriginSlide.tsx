import styles from './OriginSlide.module.css'

export default function OriginSlide() {

    return (
        <section id='origin' className={styles['content-wrapper']}>
            {/* <img src="/bg2.svg" alt="" className={styles['bg']}/> */}
            <img src="/origin.svg" className={styles['title']}/>
            <div className={`${styles['plates']} `}>
                <div className={`${styles['left']} `}>
                    <div className={`${styles['plate']} `}>
                        <img  className={styles['icon']} src="/3-3.svg"/>
                        <div className={styles['text-wrapper']}>
                            <p className={styles['plate-title']}>Mission</p>
                            <p className={styles['plate-text']}>To build the technological and financial foundation for the next generation of iGaming leaders. We empower our partners to scale with precision, security, and confidence.</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles['right']} `}>
                    <div className={`${styles['plate']} `}>
                        <img  className={styles['icon']} src="/1-1.svg"/>
                        <div className={styles['text-wrapper']}>
                            <p className={styles['plate-title']}>Values</p>
                            <p className={styles['plate-text']}>Exclusivity. Precision. Integrity.We partner selectively, operate quietly, and deliver consistently.</p>
                        </div>
                    </div>
                    <div className={`${styles['plate']} `}>
                        <img  className={styles['icon']} src="/2-2.svg"/>
                        <div className={styles['text-wrapper']}>
                            <p className={styles['plate-title']}>Vision</p>
                            <p className={styles['plate-text']}>To redefine partnership in iGaming — combining capital, technology, and strategy into one seamless ecosystem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}