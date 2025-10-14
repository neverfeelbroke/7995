import styles from './InvestmentsSlide.module.css'

export default function InvestmentsSlide() {

    return (
        <section id='investments' className={styles['content-wrapper']}>
            <img src="/investments.svg" className={styles['title']}/>
            <p className={styles['text']}>We invest in scalable iGaming ventures and technologies that redefine the industry. Our role goes beyond capital - we provide infrastructure, insight, and alignment.</p>
            <div className={`${styles['plates']} `}>
                <div className={`${styles['plate']} `}>
                    <div className={styles['left']}>
                        <p className={styles['plate-title']}>Focus Areas</p>
                        <div className={styles['list']}>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>iGaming platforms & infrastructure</span>
                            </div>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>Affiliate networks</span>
                            </div>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>Crypto/Blockchain</span>
                            </div>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>Emerging markets</span>
                            </div>
                        </div>
                    </div>
                    <img  className={styles['icon']} src="/focus.png" alt="stats"/>
                </div>
                <div className={`${styles['plate']} `}>
                    <div className={styles['left']}>
                        <p className={styles['plate-title']}>What Our Partners Gain</p>
                        <div className={styles['list']}>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>Growth capital</span>
                            </div>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>Access to technology</span>
                            </div>
                            <div className={styles['list-item']}>
                                <div className={styles['point']}></div>
                                <span className={styles['plate-text']}>Strategic collaboration</span>
                            </div>
                        </div>
                    </div>
                    <img  className={styles['icon']} src="/gain.png" alt="stats"/>
                </div>
            </div>
        </section>
    )
}