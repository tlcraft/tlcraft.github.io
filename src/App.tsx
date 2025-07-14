import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faStackOverflow, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Technologies from './components/technologies/technologies';

function App() {
  return (
    <div className="app grid grid-cols-3 gap-4">
      <section></section>
      <section>
        <div className="hero">
          <h1>Hello World!</h1>
          <p>My name is Travis Craft and I'm a full stack software engineer. My experience has revolved around .NET and AWS using agile practices (such as Scrum, SAFe, and Kanban).</p>
          <p>I like using SOLID principles and functional concepts to write clean code, and I learn a little more about software engineering each day as I work toward Microsoft and AWS certifications.</p>
          <p>
              I run a software engineering Meetup group in my community. We hold presentations, lightning talks and have an ongoing book club. We also have monthly lunch meetings.
              Check out our next meeting here: <a href="https://www.meetup.com/Kalispell-Software-Crafters/">Kalispell Software Crafters</a>.
          </p>
          <p>Apart from software I practice Aikido and study Japanese using Duolingo and have a recurring language exchange with a friend in Tokyo.</p>
        </div>
        <Technologies />
        <footer>
            <hr/>
            <p className="profiles">
                <a href="https://github.com/tlcraft" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="https://bsky.app/profile/travislcraft.bsky.social" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faBluesky} /></a>
                <a href="https://www.linkedin.com/in/travislcraft/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://twitter.com/@travislcraft" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://stackoverflow.com/users/8094831/green-maru" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faStackOverflow} /></a>
            </p>
            <a href="https://travislcraft.com">travislcraft.com</a>
            <h3 id="copyright" className="copyright">Copyright &copy; 2016-{getCopyrightYear()}</h3>
        </footer>
      </section>
      <section></section>
    </div>
  );
}

function getCopyrightYear(): number {
  return new Date().getFullYear();
}

export default App;
