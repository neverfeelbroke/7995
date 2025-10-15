"use client"

import { useState } from 'react'
import styles from './FaqSlide.module.css'

export default function FaqSlide() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)

    const faqItems = [
        {
            question: "Do you work with everyone?",
            answer: "No. We collaborate only with a limited number of partners whose vision, values, and expertise align with ours. Each partnership is private, strategic, and long-term."
        },
        {
            question: "What types of projects do you invest in?",
            answer: "We focus on innovative technology projects that have the potential for significant impact and growth. Our investments span across various sectors including fintech, healthtech, and emerging technologies."
        },
        {
            question: "Can I access your technologies independently?",
            answer: "Our platform and technology are exclusively available through our partnership program. Independent access is not provided as we believe in collaborative development and shared success."
        },
        {
            question: "How does the partnership process start?",
            answer: "The partnership process begins with an initial consultation where we assess mutual fit and strategic alignment. This is followed by due diligence, terms negotiation, and formal partnership agreement."
        },
        {
            question: "Are you a white-label provider?",
            answer: "We offer both white-label solutions and co-branded partnerships depending on the specific needs and goals of our partners. Each arrangement is customized to maximize value for both parties."
        }
    ]

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? -1 : index)
    }

    return (
        <section id='faq' className={styles['content-wrapper']}>
            <div className={styles['right']}>
                <img src="/faq.svg" className={styles['title']}/>
                <div className={styles['faq-list']}>
                    {faqItems.map((item, index) => (
                        <div key={index} className={styles['faq-item']}>
                            <div 
                                className={`${styles['faq-question']} ${openFaqIndex === index ? styles['faq-question-active'] : ''}`}
                                onClick={() => handleFaqClick(index)}
                            >
                                <span>■</span>
                                <span>{item.question}</span>
                            </div>
                            <div className={`${styles['faq-answer']} ${openFaqIndex === index ? styles['faq-answer-open'] : ''}`}>
                                <div className={styles['line']}></div>
                                <span>{item.answer}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles['left']}>
                <video autoPlay muted loop playsInline className={styles['video']}>
                    <source src="/faq.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    )
}