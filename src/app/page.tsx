import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import TitleSlide from "@/components/TitleSlide/TitleSlide";
import AboutSlide from "@/components/AboutSlide/AboutSlide";
import PartnershipSlide from "@/components/PartnershipSlide/PartnershipSlide";
import InvestmentsSlide from "@/components/InvestmentsSlide/InvestmentsSlide";
import FaqSlide from "@/components/FaqSlide/FaqSlide";
import ContactSlide from "@/components/ContactSlide/ContactSlide";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <TitleSlide/>
      <AboutSlide/>
      <PartnershipSlide/>
      <InvestmentsSlide/>
      <FaqSlide/>
      <ContactSlide/>
      <Footer/>
    </div>
  );
}
