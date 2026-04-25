import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import Experience      from "@/components/Experience";
import Projects        from "@/components/Projects";
import Skills          from "@/components/Skills";
import About           from "@/components/About";
import Contact         from "@/components/Contact";
import Footer          from "@/components/Footer";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export default function Page() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
