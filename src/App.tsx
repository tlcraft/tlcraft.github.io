import './App.css';
import About from './components/about/about';
import Footer from './components/footer/footer';
import Technologies from './components/technologies/technologies';

function App() {
  return (
    <div className="app grid grid-cols-3 gap-4">
      <section></section>
      <section>
        <About />
        <Technologies />
        <Footer />
      </section>
      <section></section>
    </div>
  );
}

export default App;
