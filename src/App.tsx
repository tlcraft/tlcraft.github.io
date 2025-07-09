import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faStackOverflow, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <div className="app grid grid-cols-3 gap-4">
      <section className="left"></section>
      <section>
        <div className="hero">
          <h1>Hello World!</h1>
          <p>My name is Travis Craft and I'm a full stack software engineer. My experience has revolved around .NET and AWS using agile practices (such as Scrum, SAFe, and Kanban).</p>
          <p>I like using SOLID principles and functional concepts to write clean code, and I learn a little more about software engineering each day as I work toward Microsoft and AWS certifications.</p>
          <p>
              I run a software engineering Meetup group in my community. We hold presentations, lightning talks and have an ongoing book club. We also have monthly lunch meetings.
              Check out our next meeting here:
              <a href="https://www.meetup.com/Kalispell-Software-Crafters/">Kalispell Software Crafters</a>.
          </p>
          <p>Apart from software I practice Aikido and study Japanese using Duolingo and have a recurring language exchange with a friend in Tokyo.</p>
        </div>
        <div className="technologies">
          <h2>Technical experience</h2>
          <div className="skills">
              <div className="card">
                  <h3>AWS</h3>
                  <ul className="list-disc">
                      <li>Lambda</li>
                      <li>Step Functions</li>
                      <li>DynamoDB</li>
                      <li>DocumentDB</li>
                      <li>Textract</li>
                      <li>PostgreSQL</li>   
                      <li>SQS</li>
                      <li>CDK</li>
                      <li>CLI</li>
                  </ul>
              </div>
              <div className="card">
                  <h3>Microsoft</h3>
                  <ul className="list-disc">
                      <li>TypeScript</li>
                      <li>ASP.NET Web API and MVC</li>
                      <li>SQL Server</li>
                      <li>Entity Framework</li>
                      <li>C#</li>
                      <li>Moq</li>
                      <li>AutoMapper</li>
                      <li>NuGet</li>
                      <li>TFS</li>
                  </ul>
              </div>
              <div className="card">
                  <h3>Other Technologies</h3>
                  <ul className="list-disc">
                      <li>Python</li>
                      <li>Node.js</li>
                      <li>Angular 2+</li>
                      <li>Jest / Jasmine</li>
                      <li>jQuery</li>
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>Less / Sass</li>
                      <li>npm</li>
                      <li>RESTful APIs</li>
                      <li>GraphQL</li>
                      <li>Microservices</li>
                      <li>Serverless</li>
                      <li>Terraform</li>
                  </ul>
              </div>
              <div className="card">
                  <h3>Tools</h3>
                  <ul className="list-disc">
                      <li>VS Code</li>
                      <li>Visual Studio</li>
                      <li>SQL Server Management Studio</li>
                      <li>DBeaver</li>
                      <li>TablePlus</li>
                      <li>NoSQL Workbench</li>
                      <li>Postman</li>
                      <li>Insomnia</li>
                      <li>git</li>
                      <li>Jira / Confluence</li>
                      <li>GitLab / GitHub</li>
                      <li>Bitbucket</li>
                      <li>Beyond Compare</li>
                      <li>Datadog</li>
                  </ul>
              </div>
          </div>
          <p className="profiles">
              <a href="https://github.com/tlcraft" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://bsky.app/profile/travislcraft.bsky.social" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faBluesky} /></a>
              <a href="https://www.linkedin.com/in/travislcraft/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://twitter.com/@travislcraft" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://stackoverflow.com/users/8094831/green-maru" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faStackOverflow} /></a>
          </p>
        </div>
        <footer>
            <hr/>
            <a href="https://travislcraft.com">travislcraft.com</a>
            <h3 id="copyright" className="copyright">Copyright &copy; 2016-{getCopyrightYear()}</h3>
        </footer>
      </section>
      <section className="right"></section>
    </div>
  );
}

function getCopyrightYear(): number {
  return new Date().getFullYear();
}

export default App;
