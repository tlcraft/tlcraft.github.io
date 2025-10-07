import "@/app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faStackOverflow, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import LayoutContainer from "@/components/theme/LayoutContainer";

function Footer() {
  return (
    <footer>
        <LayoutContainer className="py-8">
            <div className="social">
                <a href="https://github.com/tlcraft" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faGithub} /><span className="sr-only">GitHub</span></a>
                <a href="https://bsky.app/profile/travislcraft.bsky.social" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faBluesky} /><span className="sr-only">Bluesky</span></a>
                <a href="https://www.linkedin.com/in/travislcraft/" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} /><span className="sr-only">LinkedIn</span></a>
                <a href="https://twitter.com/@travislcraft" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faTwitter} /><span className="sr-only">Twitter</span></a>
                <a href="https://stackoverflow.com/users/8094831/green-maru" target="_blank" rel="noreferrer" aria-hidden="true"><FontAwesomeIcon icon={faStackOverflow} /><span className="sr-only">Stack Overflow</span></a>
            </div>
            <a href="https://travislcraft.com">travislcraft.com</a>
            <h3 id="copyright" className="copyright">Copyright &copy; 2016-{getCopyrightYear()}</h3>
        </LayoutContainer>
    </footer>
  );
}

function getCopyrightYear(): number {
    return new Date().getFullYear();
}

export default Footer;
