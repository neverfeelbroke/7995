"use client"

import { upload } from '@vercel/blob/client'
import { useForm } from 'react-hook-form'
import styles from './ContactSlide.module.css'
import { z } from 'zod'
import { useState, useRef, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    company: z.string().max(150).optional().or(z.literal("")),
    subject: z.string().min(3),
    message: z.string().min(10),
    file: z.any().refine(f => !f || f?.length <= 1, "Загрузите 1 PDF"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSlide() {

    const { register, handleSubmit, formState: { isSubmitting, errors: formErrors }, setValue, watch, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'sending'>('idle')
    const [isDragOver, setIsDragOver] = useState(false)
    const [tempErrors, setTempErrors] = useState<{ [key: string]: boolean }>({})
    
    const fileInputRef = useRef<HTMLInputElement>(null)
    const watchedFile = watch("file")

    useEffect(() => {
        const errorFields = Object.keys(formErrors)
        if (errorFields.length > 0) {
            const newTempErrors: { [key: string]: boolean } = {}
            errorFields.forEach(field => {
                newTempErrors[field] = true
            })
            setTempErrors(newTempErrors)

            const timeout = setTimeout(() => {
                setTempErrors({})
            }, 2000)

            return () => clearTimeout(timeout)
        }
    }, [formErrors])

    const onSubmit = async (values: FormValues) => {
        try {
            setStatus('sending');
            let blobUrl: string | null = null;
            const file: File | undefined = (values as any).file?.[0];

            if (file) {
                if (file.type !== "application/pdf") {
                    setStatus('error');
                    alert("Только PDF"); 
                    return;
                }
                if (file.size > 20 * 1024 * 1024) {
                    setStatus('error');
                    alert("Файл >20MB"); 
                    return;
                }

                const { url } = await upload(file.name, file, {
                    handleUploadUrl: "/api/blob/upload",
                    access: "public",
                });
                blobUrl = url;
            }

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    name: values.name,
                    company: values.company ?? "",
                    subject: values.subject,
                    message: values.message,
                    blobUrl,
                }),
            });

            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                setStatus('error');
                alert(j.error || "Ошибка отправки");
                return;
            }

            setStatus('success');
            reset();
            
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        } catch (error) {
            setStatus('error');
            alert("Ошибка отправки");
            console.error(error);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        
        const files = e.dataTransfer.files
        if (files.length > 0) {
            const file = files[0]
            if (file.type === "application/pdf") {
                const fileList = new DataTransfer()
                fileList.items.add(file)
                setValue("file", fileList.files)
            } else {
                alert("Только PDF файлы")
            }
        }
    }

    const handleFileClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setValue("file", files)
        }
    }

    const isLoading = status === 'sending' || isSubmitting;

    return (
        <section id='contact-us' className={styles['content-wrapper']}>
            <img src="/big-logo.svg" className={styles['logo']}/>
            <div className={styles['left']}>
                <img src="/contact-us.svg" className={styles['title']}/>
                <p className={styles['form-title']}>We invest in scalable iGaming ventures and technologies that redefine the industry.<br />Our role goes beyond capital - we provide infrastructure, insight, and alignment.</p>

            </div>
            <form
                    className={styles['form-wrapper']}
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <div className={styles['form-row']}>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Name*</label>
                            <input
                                className={`${styles.field} ${tempErrors.name ? styles['field-error'] : ''} ${isLoading ? styles['field-loading'] : ''}`}
                                type="text"
                                placeholder="Your name"
                                {...register("name")}
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Company</label>
                            <input
                                className={`${styles.field} ${tempErrors.company ? styles['field-error'] : ''} ${isLoading ? styles['field-loading'] : ''}`}
                                type="text"
                                {...register("company")}
                                placeholder="Company name"
                            />
                        </div>
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Email*</label>
                        <input
                            className={`${styles.field} ${tempErrors.email ? styles['field-error'] : ''} ${isLoading ? styles['field-loading'] : ''}`}
                            type="text"
                            {...register("email")}
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Subject*</label>
                        <input
                            className={`${styles.field} ${tempErrors.subject ? styles['field-error'] : ''} ${isLoading ? styles['field-loading'] : ''}`}
                            type="text"
                            {...register("subject")}
                            placeholder="What's this about?"
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Message* <span style={{ color: '#999', fontWeight: '400' }}>(min. 10 characters)</span></label>
                        <textarea
                            className={`${styles.field} ${styles['textarea-field']} ${tempErrors.message ? styles['field-error'] : ''} ${isLoading ? styles['field-loading'] : ''}`}
                            {...register("message")}
                            placeholder="Tell us about your goals and how we might help"
                        ></textarea>
                    </div>
                    
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Attachment (PDF only)</label>
                        <div 
                            className={`${styles['file-drop-zone']} ${isDragOver ? styles['drag-over'] : ''} ${tempErrors.file ? styles['field-error'] : ''} ${isLoading ? 'loading' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleFileClick}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <input
                                type="file"
                                {...register("file")}
                                style={{ display: 'none' }}
                            />
                            <div className={styles['file-drop-content']}>
                                {watchedFile && watchedFile.length > 0 ? (
                                    <>
                                        <svg className={styles['file-icon']} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14,2 14,8 20,8"></polyline>
                                        </svg>
                                        <p className={styles['file-name']}>{watchedFile[0]?.name}</p>
                                        <p className={styles['file-size']}>
                                            {(watchedFile[0]?.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <svg className={styles['upload-icon']} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="7,10 12,15 17,10"></polyline>
                                            <line x1="12" y1="15" x2="12" y2="3"></line>
                                        </svg>
                                        <p className={styles['drop-text']}>
                                            {isDragOver ? 'Drop PDF file here' : 'Drag & drop PDF file here or click to browse'}
                                        </p>
                                        <p className={styles['drop-subtext']}>Max file size: 20MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <button 
                        className={`${styles['submit']} ${status === 'success' ? styles['submit-success'] : ''} ${isLoading ? styles['submit-loading'] : ''}`}
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 
                         status === 'success' ? 'All good!' : 'Send message'}
                    </button>
                    {status === 'error' && <p style={{color: 'red', fontFamily: 'Syne', fontWeight: '700', fontSize: '20px'}}>Error sending message. Try again.</p>}
                </form>
        </section>
    )
}