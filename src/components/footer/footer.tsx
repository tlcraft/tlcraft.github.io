import "@/app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faStackOverflow, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import LayoutContainer from "@/components/theme/LayoutContainer";

function Footer() {
  return (
    <footer>
        <LayoutContainer className="py-8">
            <div className="social">
                <a href="https://github.com/tlcraft" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="https://bsky.app/profile/travislcraft.bsky.social" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faBluesky} /></a>
                <a href="https://www.linkedin.com/in/travislcraft/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://twitter.com/@travislcraft" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://stackoverflow.com/users/8094831/green-maru" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faStackOverflow} /></a>
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
