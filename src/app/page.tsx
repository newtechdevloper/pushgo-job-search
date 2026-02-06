import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import JobCategories from "@/components/JobCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import JoinTeam from "@/components/JoinTeam";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <JobCategories />
      <WhyChooseUs />
      <JoinTeam />
      <CTA />
      <Footer />
    </main>
  );
}
