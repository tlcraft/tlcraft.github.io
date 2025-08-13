import "./page.css";
import About from "@/components/about/about";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Marquee, { MarqueeProps } from "@/components/marquee/marquee";
import Technologies from "@/components/technologies/technologies";
import { faHtml5, faReact, faAngular, faAws, faPython, faCss3, faTrello, IconDefinition, faJira, faGithub, faGitlab, faBitbucket, faNpm, faLess, faSass, faBootstrap, faNode, faMicrosoft, faAtlassian, faConfluence, faGitAlt, faJs, faJenkins } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const technologies: IconDefinition[] = [
    faHtml5, faReact, faAngular, faPython, faCss3, faLess, faSass, faBootstrap, faNode, faJs
  ];

  const tools: IconDefinition[] = [
    faAws, faTrello, faGitAlt, faJira, faGithub, faGitlab, faBitbucket, faNpm, faMicrosoft, faConfluence, faAtlassian, faJenkins
  ];

  const technologyMarqueeProps: MarqueeProps = {
    items: technologies,
    leftToRight: false,
  };

  const toolMarqueeProps: MarqueeProps = {
    items: tools,
    leftToRight: true,
  };

  return (
    <div className="app grid grid-cols-3 gap-4">
      <section></section>
      <section>
        <Header />
        <About />
        <Technologies />
        <Marquee {...technologyMarqueeProps} />
        <Marquee {...toolMarqueeProps} />
        <Footer />
      </section>
      <section></section>
    </div>
  );
}
