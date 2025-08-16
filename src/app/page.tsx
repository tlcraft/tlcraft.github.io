import "./page.css";
import About from "@/components/about/about";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Technologies from "@/components/technologies/technologies";

export default function Home() {
  return (
    <div className="app grid grid-cols-3 gap-4">
      <section></section>
      <section>
        <Header />
        <About />
        <Technologies />
        <Footer />
      </section>
      <section></section>
    </div>
  );
}
