"use client"

import styles from './ContactSlide.module.css'
import { useState, useRef } from 'react'

export default function ContactSlide() {

    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'sending'>('idle')
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
    const errorTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({})

    const validate = (form: HTMLFormElement) => {
        const newErrors: { [key: string]: boolean } = {}
        const fields = ['name', 'company', 'email', 'subject', 'message']
        fields.forEach(field => {
            const value = (form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement)?.value.trim()
            if (!value) newErrors[field] = true
            if (field === 'email' && value && !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(value)) newErrors[field] = true
        })
        return newErrors
    }

    const showError = (field: string) => {
        setErrors(prev => ({ ...prev, [field]: true }))
        if (errorTimeouts.current[field]) clearTimeout(errorTimeouts.current[field])
        errorTimeouts.current[field] = setTimeout(() => {
            setErrors(prev => ({ ...prev, [field]: false }))
        }, 2000)
    }

    const handleBlur = () => {}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('sending')
        const form = e.currentTarget
        const validationErrors = validate(form)
        if (Object.keys(validationErrors).length > 0) {
            Object.keys(validationErrors).forEach(showError)
            setStatus('idle')
            return
        }
        const data = new FormData(form)
        try {
            const res = await fetch('https://formspree.io/f/', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            })
            if (res.ok) {
                setStatus('success')
                form.reset()
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    return (
        <section id='contact-us' className={styles['content-wrapper']}>
            <img src="/big-logo.svg" className={styles['logo']}/>
            <div className={styles['left']}>
                <img src="/contact-us.svg" className={styles['title']}/>
                <p className={styles['form-title']}>We invest in scalable iGaming ventures and technologies that redefine the industry.<br />Our role goes beyond capital - we provide infrastructure, insight, and alignment.</p>

            </div>
            <form
                    className={styles['form-wrapper']}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div className={styles['form-row']}>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Name</label>
                            <input
                                className={`${styles.field} ${errors.name ? styles['field-error'] : ''}`}
                                type="text"
                                name="name"
                                placeholder="Your name"
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Company</label>
                            <input
                                className={`${styles.field} ${errors.company ? styles['field-error'] : ''}`}
                                type="text"
                                name="company"
                                placeholder="Company name"
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Email</label>
                        <input
                            className={`${styles.field} ${errors.email ? styles['field-error'] : ''}`}
                            type="text"
                            name="email"
                            placeholder="your@email.com"
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Subject</label>
                        <input
                            className={`${styles.field} ${errors.subject ? styles['field-error'] : ''}`}
                            type="text"
                            name="subject"
                            placeholder="What's this about?"
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Message</label>
                        <textarea
                            className={`${styles.field} ${styles['textarea-field']} ${errors.message ? styles['field-error'] : ''}`}
                            name="message"
                            placeholder="Tell us about your goals and how we might help"
                            onBlur={handleBlur}
                        ></textarea>
                    </div>

                    <button className={styles['submit']} type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send message'}
                    </button>
                    {status === 'success' && <p style={{color: 'white', fontFamily: 'Syne', fontWeight: '700', fontSize: '20px'}}>Your message has been sent!</p>}
                    {status === 'error' && <p style={{color: 'red', fontFamily: 'Syne', fontWeight: '700', fontSize: '20px'}}>Error sending message. Try again.</p>}
                </form>
        </section>
    )
}