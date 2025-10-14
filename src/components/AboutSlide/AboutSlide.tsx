import styles from './AboutSlide.module.css'

export default function AboutSlide() {

    return (
        <section id='about-us' className={styles['content-wrapper']}>
            <img src="/about-us.svg" className={styles['title']}/>
            <p className={styles['text']}>We are a private technology and investment company in the iGaming sector. Our work is based on exclusivity, precision, and long-term collaboration. We partner only with selected projects that share our vision and ambition of building an iGaming ecosystem. Our interests include: betting syndicates, martech and adtech companies, affiliate business, game providers, payments companies and operator business specifically with a crypto focus.</p>
            <div className={`${styles['plates']} `}>
                <div className={`${styles['plate']} `}>
                    <p className={styles['plate-title']}>Partnership</p>
                    <p className={styles['plate-text']}>We build exclusive, long-term collaborations with selected partners in the iGaming sector. Our role goes beyond technology — we align strategy, operations, and growth to create lasting success.</p>
                    <img  className={styles['icon']} src="/partnership.png" alt="stats"/>
                </div>
                <div className={`${styles['plate']} `}>
                    <p className={styles['plate-title']}>Investment</p>
                    <p className={styles['plate-text']}>We invest in visionary iGaming projects with strong leadership and long-term potential. Capital, expertise, and technology combined to accelerate growth and innovation.</p>
                    <img  className={styles['icon']} src="/investment.png" alt="stats"/>
                </div>
                <div className={`${styles['plate']} `}>
                    <p className={styles['plate-title']}>Growth</p>
                    <p className={styles['plate-text']}>Growth is the outcome of alignment — between capital, strategy, and execution. We scale our partners’ operations through precision, technology, and trust.</p>
                    <img  className={styles['icon']} src="/growth.png" alt="stats"/>
                </div>
            </div>
        </section>
    )
}