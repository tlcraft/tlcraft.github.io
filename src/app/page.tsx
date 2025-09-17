import "./page.css";
import About from "@/components/about/about";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Technologies from "@/components/technologies/technologies";

export default function Home() {
  return (
    <main className="app">
      <Header />
      <About />
      <Technologies />
      <Footer />
    </main>
  );
}
