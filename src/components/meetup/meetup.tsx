import LayoutContainer from "@/components/theme/LayoutContainer";
import { faMeetup, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Meetup() {
  return (
    <section id="meetup" className="w-full bg-[#D20014] text-white">
      <LayoutContainer className="py-8 lg:py-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Meetup</h2>
          <p>
              In the Fall of 2017 I happened to learn about the SOLID principles and Clean Code at a meetup in San Franscico. I was looking for ways to grow as an engineer and this was just what I was looking for. I started lunch and learn meetings at work twice a week and then decided to start a meetup group as well.  
          </p>
          <p>
              Check out what we&apos;re doing next following the link below. We have a GitHub page as well.
          </p>
          <div className="flex text-5xl justify-around mt-8">
              <a className="self-center transition-colors hover:!text-[#008ac5]" href="https://www.meetup.com/Kalispell-Software-Crafters/" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faMeetup} /><span className="sr-only">Kalispell Software Crafters Meetup</span></a>
              <a className="self-center transition-colors hover:!text-[#008ac5]" href="https://github.com/kalispell-software-crafters" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faGithub} /><span className="sr-only">Kalispell Software Crafters GitHub</span></a>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

export default Meetup;
