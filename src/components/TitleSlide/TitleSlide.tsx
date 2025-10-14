import styles from './TitleSlide.module.css'

export default function TitleSlide() {

    return (
        <section id='' className={styles['content-wrapper']}>
            <video autoPlay muted loop playsInline className={styles['video']}>
                <source src="/slots.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles['action-wrapper']}>
                <p>7995 is a private iGaming investment vehicle and IT company focussed on creating <br />a long lasting synergetic partnerships within out ecosystem</p>
                <a>Get Started</a>
            </div>
        </section>
    )
}