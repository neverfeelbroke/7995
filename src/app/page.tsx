'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import TitleSlide from "@/components/TitleSlide/TitleSlide";
import AboutSlide from "@/components/AboutSlide/AboutSlide";
import PartnershipSlide from "@/components/PartnershipSlide/PartnershipSlide";
import InvestmentsSlide from "@/components/InvestmentsSlide/InvestmentsSlide";
import FaqSlide from "@/components/FaqSlide/FaqSlide";
import ContactSlide from "@/components/ContactSlide/ContactSlide";
import Footer from "@/components/Footer/Footer";
import OriginSlide from "@/components/OriginSlide/OriginSlide";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure all resources are loaded
    const handleLoad = () => {
      // Add small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={styles.page}>
      <Header/>
      <TitleSlide/>
      <AboutSlide/>
      <OriginSlide/>
      <PartnershipSlide/>
      <InvestmentsSlide/>
      <FaqSlide/>
      <ContactSlide/>
      <Footer/>
    </div>
  );
}
