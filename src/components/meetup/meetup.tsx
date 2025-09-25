import LayoutContainer from "@/components/theme/LayoutContainer";

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
              Check out what we're doing next here: <a className="transition-colors hover:!text-[#008ac5]" href="https://www.meetup.com/Kalispell-Software-Crafters/">Kalispell Software Crafters</a>.
          </p>
        </div>
      </LayoutContainer>
    </section>
  );
}

export default Meetup;
