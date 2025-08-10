import "./page.css";
import About from "@/components/about/about";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Marquee, { MarqueeProps } from "@/components/marquee/marquee";
import Technologies from "@/components/technologies/technologies";
import { faHtml5, faReact, faAngular, faAws, faPython, faCss3, faTrello, IconDefinition } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const technologies: IconDefinition[] = [
    faHtml5, faReact, faAngular, faAws, faPython, faCss3, faTrello
  ];

  const marqueeProps: MarqueeProps = {
    items: technologies,
  };

  return (
    <div className="app grid grid-cols-3 gap-4">
      <section></section>
      <section>
        <Header />
        <About />
        <Technologies />
        <Marquee {...marqueeProps} />
        <Footer />
      </section>
      <section></section>
    </div>
  );
}
