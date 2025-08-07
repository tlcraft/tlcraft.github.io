import { faHtml5, faReact, faAngular, faAws, faPython, faCss3, faTrello } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Marquee() {
    return (
        <article className="overflow-hidden whitespace-nowrap w-full flex">
            <div className="relative">
                <ul className="marquee flex list-none pl-0">
                    <li className="m-2"><FontAwesomeIcon icon={faHtml5} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faCss3} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faReact} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faAngular} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faAws} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faPython} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faTrello} /></li>
                </ul>
                <ul className="marquee2 absolute top-0 flex list-none pl-0" aria-hidden="true">
                    <li className="m-2"><FontAwesomeIcon icon={faHtml5} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faCss3} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faReact} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faAngular} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faAws} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faPython} /></li>
                    <li className="m-2"><FontAwesomeIcon icon={faTrello} /></li>
                </ul>
            </div>
        </article>
    )
}

export default Marquee;
